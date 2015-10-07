module.exports = new Tour({
  backdrop: true,
  backdropPadding: 10,
  steps: [
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
      element: ".icon-bell-grayLightest",
      title: "Notifications",
      content: "Notifications happen here.",
      placement: "bottom",
      backdropContainer: ".navbar-fixed-top"
    },
    {
      element: ".icon-search",
      title: "Search",
      content: "Notifications happen here.",
      placement: "right",
      backdropContainer: "#header"
    },
    {
      element: ".Discovery__NewArrivals",
      title: "New Arrivals",
      content: "Notifications happen here.",
      placement: "left"
    },
    {
      element: ".loadMoreBtn",
      title: "Load more",
      content: "Notifications happen here.",
      placement: "top"
    }
  ]
});
