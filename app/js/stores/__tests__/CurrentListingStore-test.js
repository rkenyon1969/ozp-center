'use strict';

var expect = require('chai').expect;
var sinon = require('sinon');

var $ = require('jquery');

describe('CurrentListingStore', function() {
    var listingSaveSpy,
        imageSaveSpy,
        listingTitle = 'test listing',
        listingType = 'Test Type',
        imageId = 'asdf';

    it('saves the images first, followed by the listing', function(done) {
        var listingSaveSpy = sinon.spy(function() {
                expect(imageSaveSpy.callCount).to.equal(8);
                expect(imageSaveSpy.calledWith(smallIcon)).to.be.true();
                expect(imageSaveSpy.calledWith(largeIcon)).to.be.true();
                expect(imageSaveSpy.calledWith(bannerIcon)).to.be.true();
                expect(imageSaveSpy.calledWith(featuredBannerIcon)).to.be.true();
                expect(imageSaveSpy.calledWith(smallScreenshot1)).to.be.true();
                expect(imageSaveSpy.calledWith(largeScreenshot1)).to.be.true();
                expect(imageSaveSpy.calledWith(smallScreenshot2)).to.be.true();
                expect(imageSaveSpy.calledWith(largeScreenshot2)).to.be.true();

                expect(listingSaveSpy.calledOnce).to.be.true();
                expect(listingSaveSpy.calledWithMatch({
                    title: listingTitle,
                    type: listingType,
                    smallIconId: imageId,
                    largeIconId: imageId,
                    bannerIconId: imageId,
                    featuredBannerIconId: imageId,
                    screenshots: [{
                        smallImageId: imageId,
                        largeImageId: imageId
                    }, {
                        smallImageId: imageId,
                        largeImageId: imageId
                    }]
                })).to.be.true();

                expect(savingImages).to.be.true();
                expect(savingListing).to.be.true();

                done();
            }),
            imageSaveSpy = sinon.spy(function() {
                return $.Deferred().resolve({
                    id: imageId,
                    _links: {
                        self: {
                            href: 'https://localhost/image/' + imageId
                        }
                    }
                }).promise();
            }),

            CurrentListingStore =
            require('inject?../actions/ListingActions&../webapi/Image!../CurrentListingStore')({
                '../actions/ListingActions': {
                    save: listingSaveSpy
                },
                '../webapi/Image': {
                    ImageApi: {
                        save: imageSaveSpy
                    }
                }
            }),

            //note, in real operation these would be Files
            smallIcon = 'asdf',
            largeIcon = 'asdf',
            bannerIcon = 'asdf',
            featuredBannerIcon = 'asdf',
            smallScreenshot1 = 'asdf',
            largeScreenshot1 = 'asdf',
            smallScreenshot2 = 'asdf',
            largeScreenshot2 = 'asdf',

            savingImages, savingListing,
            listenSpy = sinon.spy(function(triggerData) {
                switch (triggerData.saveStatus) {
                    case 'images': savingImages = true; break;
                    case 'listing': savingListing = true; break;
                    default:
                        expect(triggerData.errors).to.not.be.ok();
                }
            });

        CurrentListingStore.refreshListing({
            title: listingTitle,
            type: listingType,
            categories: [],
            tags: [],
            intents: [],
            owners: [{username: "testAdmin1"}],
            docUrls: [],
            contacts: [],
            screenshots: []
        });

        CurrentListingStore.onUpdateListing(['smallIcon'], smallIcon);
        CurrentListingStore.onUpdateListing(['largeIcon'], largeIcon);
        CurrentListingStore.onUpdateListing(['bannerIcon'], bannerIcon);
        CurrentListingStore.onUpdateListing(['featuredBannerIcon'], featuredBannerIcon);
        CurrentListingStore.onUpdateListing(['screenshots',0, 'smallImage'], smallScreenshot1);
        CurrentListingStore.onUpdateListing(['screenshots',0, 'largeImage'], largeScreenshot1);
        CurrentListingStore.onUpdateListing(['screenshots',1, 'smallImage'], smallScreenshot2);
        CurrentListingStore.onUpdateListing(['screenshots',1, 'largeImage'], largeScreenshot2);

        CurrentListingStore.listen(listenSpy);

        CurrentListingStore.onSave();
    });

    it('shows server errors for image save on the imageErrors object', function(done) {

        var imageSaveSpy = sinon.spy(function() {
                return $.Deferred().reject({
                    responseJSON: {"message": "Image too large"}
                }, 'error', 'Image tooooo large').promise();
            }),

            CurrentListingStore =
            require('inject?../webapi/Image!../CurrentListingStore')({
                '../webapi/Image': {
                    ImageApi: {
                        save: imageSaveSpy
                    }
                }
            }),

            //note, in real operation these would be Files
            smallIcon = 'asdf',
            smallScreenshot1 = 'asdf',

            listenSpy = sinon.spy(function(triggerData) {
                if (!triggerData.saveStatus) {

                    //trigger will get called multiple times with increasing imageErrors,
                    //wait until the last time to evaluate
                    if (triggerData.imageErrors.smallIcon &&
                            triggerData.imageErrors.screenshots &&
                            triggerData.imageErrors.screenshots[0]) {
                        expect(triggerData.imageErrors.smallIcon).to.equal('Image too large');
                        expect(triggerData.imageErrors.screenshots[0].smallImage)
                            .to.equal('Image too large');

                        done();
                    }
                }
            });

        CurrentListingStore.refreshListing({
            title: listingTitle,
            type: listingType,
            categories: [],
            tags: [],
            intents: [],
            owners: [],
            docUrls: [],
            contacts: [],
            screenshots: []
        });

        CurrentListingStore.onUpdateListing(['smallIcon'], smallIcon);
        CurrentListingStore.onUpdateListing(['screenshots',0, 'smallImage'], smallScreenshot1);

        CurrentListingStore.listen(listenSpy);

        CurrentListingStore.onSave();
    });
});
