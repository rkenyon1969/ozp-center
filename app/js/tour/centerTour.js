'use strict';

module.exports = new Tour({
  backdrop: true,
  backdropPadding: 10,
  template: '<div class="popover" role="tooltip"> <div class="arrow"></div> <h3 class="popover-title"></h3> <div class="popover-content"></div> <div class="popover-navigation"> <button class="btn btn-sm" id="end-tour-btn" data-role="end">End tour</button> <div class="btn-group"> <button class="btn btn-sm btn-default" data-role="prev">&laquo; Prev</button> <button class="btn btn-sm btn-default" data-role="next">Next &raquo;</button> <button class="btn btn-sm btn-default" data-role="pause-resume" data-pause-text="Pause" data-resume-text="Resume">Pause</button> </div> </div> </div>',
  steps: [
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
