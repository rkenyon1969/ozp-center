'use strict';
(function(){

  // Instance the tour
  var homepageTour = new Tour({
    steps: [
      {
        element: "#marketplace-logo",
        title: "Go Home",
        content: "If at any point you want to go home, just click here!"
      },
      {
        element: "#home",
        title: "Go Home",
        content: "You can also click here!"
      },
      {
        element: ".loadMoreBtn",
        title: "Moar apps!",
        content: "Hit this button to browse more listings.",
        placement: "top"
      },
      {
        element: ".icon-bell-grayLightest",
        title: "Notifications!",
        content: "Notifications happen here.",
        placement: "bottom"
      }
    ]
  });
  // Initialize the tour
  homepageTour.init();
  // Start the tour
  $(document).on('click', '#tour-button', function(){
    console.log('Starting tour');
    window.localStorage.clear();
    homepageTour.start();
  });
})();
