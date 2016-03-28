'use strict';

var {CENTER_URL} = require('ozp-react-commons/OzoneConfig');
CENTER_URL = `/${CENTER_URL.match(/http.?:\/\/[^/]*\/(.*?)\/?$/)[1]}/`;

var PubSub = require('browser-pubsub');
var tourCh = new PubSub('tour');
var ObjectDB = require('object-db');
var tourDB = new ObjectDB('ozp_tour');

var readyObject = {};

// HACK: for some reason window.localstorage is lost in this file.
setInterval(() => {
  readyObject = Object.assign({}, readyObject, tourCh.get());
}, 1000);

const meTour = new Tour({
  backdrop: true,
  backdropPadding: 10,
  storage: false,
  template: '<div class="popover" role="tooltip"> <div class="arrow"></div> <h3 class="popover-title"></h3> <div class="popover-content"></div> <div class="popover-navigation"> <button class="btn btn-sm" id="end-tour-btn" data-role="end">End tour</button> <div class="btn-group"> <button class="btn btn-sm btn-default" data-role="prev">&laquo; Prev</button> <button class="btn btn-sm btn-default" data-role="next">Next &raquo;</button> <button class="btn btn-sm btn-default" data-role="pause-resume" data-pause-text="Pause" data-resume-text="Resume">Pause</button> </div> </div> </div>',
  steps: [
    {
      title: "Welcome. ",
      content: "This simple tour guides you through the toolbar items and introduces you to the primary components of the system: The Center, HUD, and Webtop. These three components enable you to discover, bookmark, rate, review, organize and launch mission and business applications from across the enterprise.",
      orphan: true,
      template: '<div class="popover" role="tooltip"> <h1 class="popover-header">Welcome to <img src="./images/marketplace-logo.png"></h1><h3 class="popover-title popover-subtitle"></h3> <div class="popover-content"></div> <div class="popover-navigation"> <button class="btn btn-sm" id="end-tour-btn" data-role="end" tabIndex="0">No thanks</button> <div class="btn-group"> <button class="btn btn-sm btn-default" data-role="next">Start the tour &raquo;</button></div> </div> </div>'
    },
    {
      element: "#tourstop-hud",
      title: "HUD",
      content: "Opens HUD (heads up display) where your bookmarked apps are stored, and can easily be organized and launched. Think of HUD as your homepage for favorite apps.",
      placement: "bottom",
      backdropContainer: ".navbar-fixed-top",
      backdropPadding: 0
    },
    {
      element: "#tourstop-center",
      title: "Center",
      content: "Opens the Center where you can search and discover app listings from across the IC. You can bookmark listings to your HUD and you can also launch apps into a seperate tab directly from the Center.",
      placement: "bottom",
      backdropContainer: ".navbar-fixed-top",
      backdropPadding: 0
    },
    {
      element: "#tourstop-webtop",
      title: "Webtop",
      content: "Opens the Webtop, a virtual desktop environment. It allows you to run web apps and widgets in a single window, and save your custom workflows as dashboards.",
      placement: "bottom",
      backdropContainer: ".navbar-fixed-top",
      backdropPadding: 0
    },
    {
      element: "#tourstop-notifications",
      title: "Notifications",
      content: "Receive AppsMall notifications here. If you have an unread notification, the icon will change to blue to alert you. Once you've read a notification, you can click the X to dismiss it. Otherwise, it will disappear from the list when it expires.",
      placement: "bottom",
      backdropContainer: ".navbar-fixed-top",
      backdropPadding: 0
    },
    {
      element: "#tourstop-help",
      title: "Help",
      content: "Access help videos and articles explaining how to use the platform. You can also contact the Help Desk or take this tour again from here.",
      placement: "left",
      backdropContainer: ".navbar-fixed-top",
      backdropPadding: 0
    },
    {
      element: "#tourstop-global-menu",
      title: "Global Menu",
      content: "The main menu provides a list of resources you can use to view your profile and settings, contact us, manage your listings, etc.",
      placement: "left",
      backdropContainer: ".navbar-fixed-top",
      backdropPadding: 0,
      onShown: function() {
        $("#tourstop-global-menu").addClass("open");
      }
    },
    {
      element: "#tourstop-center-search",
      title: "Search and Filter",
      content: "Use keywords and filters to explore listings. When you enter a search term, the system looks for your term in the listing's name, description, tags, etc.",
      placement: "bottom",
      backdropContainer: "#header"
    },
    {
      element: "#tourstop-center-categories",
      title: "Filter by Category",
      content: "Use categories to reduce your search results. When you click a category, only listings in that category will appear on the page. If you select multiple categories, only listings associated with all of the selected categories will appear.",
      placement: "right"
    },
    {
      element: "#tourstop-center-home",
      title: "Center Home",
      content: "After searching and filtering, click here to return to the Center Discovery page to see featured listings, new arrivals and most popular listings.",
      placement: "right"
    },
    {
      element: ".Discovery__SearchResults .listing:first, .infiniteScroll .listing:first",
      title: "Listing Tiles",
      content: "Hover over a tile for a short description of the app, to bookmark it to your HUD, or to launch it into a new tab. Click the tile to open the listing overview for more listing details.",
      placement: "top",
      onShown: function() {
        $(".Discovery__SearchResults .listing:first .slide-up, .infiniteScroll .listing:first .slide-up").css("top", "0px");
      },
      onHide: function() {
        $(".Discovery__SearchResults .listing:first .slide-up, .infiniteScroll .listing:first .slide-up").css("top", "137px");
      },
      onNext: function() {
        var nextStep = function() {
          meTour.goTo(11);
        };
        (function checkStatus() {
          if (readyObject.overviewLoaded) {
            nextStep();
          } else {
            setTimeout(checkStatus, 200);
          }
        })();
      }
    },
    {
      path: `${CENTER_URL}#/home/?%2F%3F=&listing=1&action=view&tab=overview`,
      element: ".modal-body",
      title: "Listing Overview",
      content: "Within this view are screenshots, long descriptions, reviews, and other resources. Use the links at the top right of the listing to launch, bookmark or close it.",
      placement: "left",
      backdropContainer: ".modal-content",
      backdropPadding: 0,
      onNext: function() {
        var nextStep = function() {
          tourCh.publish({
            overviewLoaded: false
          });
          meTour.goTo(12);
        };
        (function checkStatus() {
          if (readyObject.reviewsLoaded) {
            nextStep();
          } else {
            setTimeout(checkStatus, 200);
          }
        })();
      },
      onPrev: function() {
        $(".quickview").modal("hide");

      }
    },
    {
      path: `${CENTER_URL}#/home/?%2F%3F=&listing=1&action=view&tab=reviews`,
      element: ".modal-body .nav .active",
      title: "Listing Reviews",
      content: "Rate and review the listing, or read reviews from other users.",
      placement: "bottom",
      backdropContainer: ".modal-content",
      backdropPadding: 0,
      onNext: function() {
        var nextStep = function() {
          tourCh.publish({
            reviewsLoaded: false
          });
          meTour.goTo(13);
        };
        (function checkStatus() {
          if (readyObject.detailsLoaded) {
            nextStep();
          } else {
            setTimeout(checkStatus, 200);
          }
        })();
      },
      onPrev: function() {
        var prevStep = function() {
          meTour.goTo(11);
        };
        (function checkStatus() {
          if (readyObject.overviewLoaded) {
            prevStep();
          } else {
            setTimeout(checkStatus, 200);
          }
        })();
      }
    },
    {
      path: `${CENTER_URL}#/home/?%2F%3F=&listing=1&action=view&tab=details`,
      element: ".modal-body .nav .active",
      title: "Listing Details",
      content: "Here you'll find a list of new features, usage requirements, ownership information, tags, categories, etc.",
      placement: "bottom",
      backdropContainer: ".modal-content",
      backdropPadding: 0,
      onNext: function() {
        var nextStep = function() {
          tourCh.publish({
            detailsLoaded: false
          });
          meTour.goTo(14);
        };
        (function checkStatus() {
          if (readyObject.resourcesLoaded) {
            nextStep();
          } else {
            setTimeout(checkStatus, 200);
          }
        })();
      },
      onPrev: function() {
        var prevStep = function() {
          meTour.goTo(12);
        };
        (function checkStatus() {
          if (readyObject.reviewsLoaded) {
            prevStep();
          } else {
            setTimeout(checkStatus, 200);
          }
        })();
      }
    },
    {
      path: `${CENTER_URL}#/home/?%2F%3F=&listing=1&action=view&tab=resources`,
      element: ".modal-body .nav .active",
      title: "Listing Resources",
      content: "If the listing includes instructions like user manuals and contact information, you will find it here. Thank you for taking the time to tour AppsMall.",
      placement: "bottom",
      backdropContainer: ".modal-content",
      backdropPadding: 0,
      onPrev: function() {
        var prevStep = function() {
          meTour.goTo(13);
        };
        (function checkStatus() {
          if (readyObject.detailsLoaded) {
            prevStep();
          } else {
            setTimeout(checkStatus, 200);
          }
        })();
      }
    }
  ]
});

module.exports = meTour;
