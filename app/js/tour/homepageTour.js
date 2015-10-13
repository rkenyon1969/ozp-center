module.exports = new Tour({
  backdrop: true,
  backdropPadding: 10,
  template: "<div class='popover tour'><div class='arrow'></div><",
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
      content: "Receive notifications from your Center steward here. If you have an unread notification, the icon will change colors to alert you. Once you've read a notification, you can click the X to dismiss it. Otherwise, it will disappear from the list when it expires.",
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
      content: "The main menu provides a list of resources you can use to submit listings, manage your listings, view your profile, contact us, etc.",
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
      path: "/dist/#/home/?%2F%3F=&listing=1&action=view&tab=overview",
      element: ".modal-body",
      title: "Listing Overview",
      content: "Click a tile to access the listing detail view. From this popup you can see screenshots, long descriptions, reviews, and other resources. Use the links at the top of the listing to launch, bookmark or close it.",
      placement: "left",
      backdropContainer: ".modal-content",
      backdropPadding: 0
    },
    {
      path: "/dist/#/home/?%2F%3F=&listing=1&action=view&tab=reviews",
      element: ".modal-body .li.active",
      title: "Listing Reviews",
      content: "Rate and review the listing, or read reviews from other users.",
      placement: "bottom",
      backdropContainer: ".modal-content",
      backdropPadding: 0
    },
    {
      path: "/dist/#/home/?%2F%3F=&listing=1&action=view&tab=details",
      element: ".modal-body li.active",
      title: "Listing Details",
      content: "Here you'll find a list of new features, usage requirements, ownership information, tags, categories, etc.",
      placement: "bottom",
      backdropContainer: ".modal-content",
      backdropPadding: 0
    },
    {
      path: "/dist/#/home/?%2F%3F=&listing=1&action=view&tab=resources",
      element: ".modal-body .li.active",
      title: "Listing Resources",
      content: "If the listing includes instructions like user manuals and contact information, you will find it here.",
      placement: "bottom",
      backdropContainer: ".modal-content",
      backdropPadding: 0,
      onHidden: function() {
        return window.location.assign("/dist/#/home/");
      }
    }
  ]
});
