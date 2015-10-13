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
      content: "If you have a notification, the icon will change colors and a line will display above it.",
      placement: "bottom",
      backdropContainer: ".navbar-fixed-top"
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
      element: "#global-nav-dropdown",
      title: "Global Menu",
      content: "The main menu provides a list of resources you can use to submit listings, manage your listings, change your settings, view your profile, etc.",
      placement: "left",
      backdropContainer: ".navbar-fixed-top",
      backdropPadding: 0,
      onShown: function() {
        $("#global-nav-dropdown").addClass("open");
      },
      onHide: function() {
        $("#global-nav-dropdown").removeClass("open");
      }
    },
    {
      element: "#tourstop-center-search",
      title: "Search and Filter",
      content: "Use keywords and filters to explore listings. When you enter a search term, the system looks for your term in the listing name, description, tags, etc.",
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
      content: "After searching and filtering, click here to return to the Center Discovery page.",
      placement: "right"
    },
    {
      element: ".Discovery__SearchResults .listing:first, .infiniteScroll .listing:first",
      title: "Listing Tiles",
      content: "Hover over a tile to read more information and choose to launch it in a new tab or bookmark it to your HUD. Click the tile to open a detail popup.",
      placement: "top",
      onShown: function() {
        $(".Discovery__SearchResults .listing:first .slide-up, .infiniteScroll .listing:first .slide-up").css("top", "0px");
      },
      onHide: function() {
        $(".Discovery__SearchResults .listing:first .slide-up, .infiniteScroll .listing:first .slide-up").css("top", "137px");
      }
    },
    {
      orphan: true,
      title: "Listing Detail View",
      content: "Click a tile to access the listing detail view. From this popup you can see screenshots, long descriptions, reviews, and other resources. Use the links at the top of the listing to launch, bookmark or close it.",
      onShow: function() {
        return window.location.assign("/dist/#/home/?%2F%3F=&listing=1&action=view&tab=overview");
      },
      onHidden: function() {
        return window.location.assign("/dist/#/home/");
      }
    }
  ]
});
