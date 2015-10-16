'use strict';

var expect = require('chai').expect;
var Router = require('react-router');
var { Route } = Router;
var $ = require('jquery');
var { TestUtils } = require('react').addons;
var Routes = require('../../../components/Routes.jsx');
var TestLocation = require('react-router/lib/locations/TestLocation');
var ProfileMock = require('../../../__tests__/mocks/ProfileMock');
var createRoutes = require('../../../__tests__/createRoutes');
var ActiveState = require('../../../mixins/ActiveStateMixin');
var util = require('util');
var mockListing1 = [<tr>
                        <td className="titleColumn">
                            <a href="#/user-management/all-listings?listing=1&amp;action=view&amp;tab=overview">Air Mail</a>
                        </td>
                        <td className="ownersColumn">
                            <span>
                                <a href="#/user-management/all-listings?profile=2" className="">Test Admin 1</a>
                            </span>
                        </td>
                        <td className="commentsColumn" >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dictum lectus faucibus ante dapibus commodo.</td>
                        <td className="statusColumn" >Published</td>
                        <td className="updatedColumn" >08/12/15</td>
                        <td className="enabledColumn">Enabled</td>
                        <td className="featuredColumn">
                            <input type="checkbox" checked="true"/>
                        </td>
                        <td className="actionsColumn">
                            <label className="AdminOwnerListingTable__actionMenu" >
                                <a title="Edit" href="#/edit/1" >
                                    <i className="icon-pencil-12-blueDark"></i>
                                </a>
                                <a href="#/user-management/all-listings?listing=1&amp;action=view&amp;tab=overview" title="View">
                                    <i className="icon-eye-12-blueDark"></i>
                                </a>
                                <a href="#/user-management/all-listings?listing=1&amp;action=delete" title="Delete">
                                    <i className="icon-trash-12-blueDark"></i>
                                </a>
                            </label>
                        </td>
                        <td className="bufferColumn"></td>
                    </tr>];

describe('TableView', function () {

    var TableView = require('../TableView.jsx'),
        table,
        tablePage;

    var onSearch = function (value) { searchKey = value; },
        onSort = function (key) { sortKey = key; },
        searchKey = '',
        sortKey = 'name';

    var route = (<Route path='test' handler={TableView} />),
        location = new TestLocation(['/test']),
        router;

    beforeEach(function () {
        ProfileMock.mockAdmin("Test Organization");
    });

    var runRouter = function (listings) {
        var table;
        router = Router.run(route, location, function (Handler) {
            table = TestUtils.renderIntoDocument(
                <Handler onSearch={onSearch} onSort={onSort} sortKey={sortKey} searchKey={searchKey}>
                    {listings}
                </Handler>
            );
        });
        router.stop();
        return table.getDOMNode();
    };

    it('Check that an empty table loads.', function () {
        tablePage = runRouter(null);
        expect($(tablePage).find('td[class="tableView-empty"]')[0]).to.exist;
    });

    it('Check that table loads with 1 listing', function () {
        tablePage = runRouter(mockListing1);
        expect($(tablePage).find('td[class="tableView-empty"]')[0]).to.not.exist;
        expect($(tablePage).find('td[class="titleColumn"]')[0]).to.exist;
    });

    it('Check column sorting works and displays correct sort icon', function () {
        var ownerHeader;
        //Render#1 with sortKey='name'
        tablePage = runRouter(null);
        ownerHeader = $(tablePage).find('th[class="ownersColumn"]')[0];
        expect($(tablePage).find('i[class="headerSortIcon icon-caret-down-14-blueDark"]')[0]).to.exist;
        expect($(ownerHeader).find('i[class="headerSortIcon icon-caret-down-14-blueDark"]')[0]).to.not.exist;
        expect($(tablePage).find('i[class="headerSortIcon icon-caret-up-blueDark"]')[0]).to.not.exist;

        //Click changes sortKey => 'owner'
        TestUtils.Simulate.click(ownerHeader);
        expect(sortKey).to.equal("owner");

        //Render#2 with sortKey='owner'
        tablePage = runRouter(null);
        ownerHeader = $(tablePage).find('th[class="ownersColumn"]')[0];
        expect($(ownerHeader).find('i[class="headerSortIcon icon-caret-down-14-blueDark"]')[0]).to.exist;
        expect($(ownerHeader).find('i[class="headerSortIcon icon-caret-up-blueDark"]')[0]).to.not.exist;

        //Click changes sortKey => '!owner'
        TestUtils.Simulate.click(ownerHeader);
        expect(sortKey).to.equal("!owner");

        //Render#3 with sortKey='!owner'
        tablePage = runRouter(null);
        ownerHeader = $(tablePage).find('th[class="ownersColumn"]')[0];
        expect($(ownerHeader).find('i[class="headerSortIcon icon-caret-down-14-blueDark"]')[0]).to.not.exist;
        expect($(ownerHeader).find('i[class="headerSortIcon icon-caret-up-blueDark"]')[0]).to.exist;

        //Click changes sortKey => 'owner'
        TestUtils.Simulate.click(ownerHeader);
        expect(sortKey).to.equal("owner");
    });

    it('Check searchbar updates search value', function () {
        var searchbar, clearButton;

        tablePage = runRouter(null);
        searchbar = $(tablePage).find('input[class="tableViewSearchBar"]')[0];
        clearButton = $(tablePage).find('span')[0];
        clearButton = $(clearButton).find('span')[0];

        TestUtils.Simulate.change(searchbar, {"target": {"value": "testinput"}});
        expect(searchKey).to.equal("testinput");
        TestUtils.Simulate.click(clearButton);
        expect(searchKey).to.equal("");
    });

    afterEach(function () {
        ProfileMock.restore();
    });
});
