
/*
 * 
 * This file detects the current url path
 *
 * It finds the dashboard link element with the same href.
 * 
 * It then removes the non-select dashboard entry classes, and adds select dashboard entry classes.
 *
 */ 

// Get path
let paths = window.location.pathname;

// Find link with matching path. Search only links under sidebar and sidebar mobile. Otherwise we color other links.
let link1 = $("#sidebar-nav-mobile").find(`a[href*="${paths}"]`);
let link2 = $("#sidebar-nav").find(`a[href*="${paths}"]`);
let link = $.merge(link1, link2)

let parent = link.parents(".topmenu");

// This keeps the submenu open while a submenu link (or the top menu item) is selected.
parent.attr("x-data", '\{ isExpanded: true \}');

// Add highlight classes to it.
link.removeClass("text-indigo-400 focus_bg-indigo-700 hover_text-white hover_bg-indigo-700");
link.addClass("text-white bg-indigo-900");
