var ObjectDB = require('object-db');

// Setup our LocalstorageDB we will use this to talk between Center,
// Webtop and Hud tours.
var tourDB = new ObjectDB('ozp_tour');

module.exports = new Tour({
  backdrop: true,
  backdropPadding: 10,
  storage: false,
  template: `
  <div class="popover" role="tooltip">
    <div class="arrow"></div>
    <h3 class="popover-title"></h3>
    <div class="popover-content"></div>
    <div class="popover-navigation">
      <button class="btn btn-sm" id="end-tour-btn" data-role="end">End tour</button>
      <div class="btn-group">
        <button class="btn btn-sm btn-default" data-role="prev">&laquo; Prev</button>
        <button class="btn btn-sm btn-default" data-role="next">Next &raquo;</button>
        <button class="btn btn-sm btn-default" data-role="pause-resume" data-pause-text="Pause" data-resume-text="Resume">Pause</button>
      </div>
    </div>
  </div>`,
  steps: [
    {
      title: "We're glad you're here.",
      content: "To give you a quick overview, we've put together a simple tour to walk through each area of the platform - the Center, HUD, and Webtop. These three areas create an ecosystem of software that enables users from numerous organizations to share data and manipulate it solely within browser memory.",
      orphan: true,
      template: '<div class="popover" role="tooltip"> <h1 class="popover-header">Welcome to <img src="./images/marketplace-logo.png"></h1><h3 class="popover-title popover-subtitle"></h3> <div class="popover-content"></div> <div class="popover-navigation"> <button class="btn btn-sm" data-role="end">No thanks</button> <div class="btn-group"> <button class="btn btn-sm btn-default" data-role="next">Start the tour &raquo;</button></div> </div> </div>'
    },
    {
      element: "#tourstop-hud",
      title: "HUD",
      content: "Opens HUD (heads up display) where your bookmarks are stored. Think of HUD like the home screen on a smart phone.",
      placement: "bottom",
      backdropContainer: ".navbar-fixed-top",
      backdropPadding: 0
    },
    {
      element: "#tourstop-center",
      title: "Center",
      content: "Opens Center where you can search for listings to bookmark to your HUD or open in Webtop.",
      placement: "bottom",
      backdropContainer: ".navbar-fixed-top",
      backdropPadding: 0
    },
    {
      element: "#tourstop-webtop",
      title: "Webtop",
      content: "Opens Webtop, your customizable workspace within the platform.",
      placement: "bottom",
      backdropContainer: ".navbar-fixed-top",
      backdropPadding: 0
    },
    {
      element: "#tourstop-notifications",
      title: "Notifications",
      content: "Receive notifications from your Center steward here. If you have an unread notification, the icon will change to blue to alert you. Once you've read a notification, you can click the X to dismiss it. Otherwise, it will disappear from the list when it expires.",
      placement: "bottom",
      backdropContainer: ".navbar-fixed-top",
      backdropPadding: 0
    },
    {
      element: "#tourstop-help",
      title: "Help",
      content: "Access help videos and articles explaining how to use the platform.",
      placement: "left",
      backdropContainer: ".navbar-fixed-top",
      backdropPadding: 0
    },
    {
      element: "#tourstop-global-menu",
      title: "Global Menu",
      content: "The main menu provides a list of resources you can use to submit listings, manage your listings, view your profile, contact us, etc.",
      placement: "left",
      backdropContainer: ".navbar-fixed-top",
      backdropPadding: 0,
      onShown: function() {
        $("#tourstop-global-menu").addClass("open");
      },
      onHide: function() {
        $("#tourstop-global-menu").removeClass("open");
        tourDB.set({
          center: {
            ran: true,
            startCenterTour: true
          }
        });
      }
    }
  ]
});
