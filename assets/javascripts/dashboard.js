
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
 $('a[href*="ABC"]')
// Add highlight classes to it.
link.removeClass("text-indigo-400 focus_bg-indigo-700 hover_text-white hover_bg-indigo-700");
link.addClass("text-white bg-indigo-900");

// If current path is an admin path, highlight both /app/start and /app/admin
// If current path is a user path, highlight both links with /app/start and /app/user
// else highlight the matching link. (e.g. /app/xyz)
/*
// For top navbar based template link highlighting with /app/start => either user or admin based on current user.
let toplink = $(`a[href*="${paths}"]`);
let startlink = $(`a[href*="/app/start"]`);
let userlink = $(`a[href*="/app/user"]`);
let adminlink = $(`a[href*="/app/admin"]`);
let profile = $("#profile").attr("data-profile");

if (paths == "/app/user" || paths == "/app/admin") {
    startlink.addClass("border-indigo-500 border-b-2");
}



toplink.addClass("border-indigo-500 border-b-2");

if (profile == "user") {
 userlink.addClass("border-indigo-500 border-b-2");
}
if (profile == "admin") {
 console.log("Calling add class to admin")
 adminlink.addClass("border-indigo-500 border-b-2");
}
console.log("Profile:", profile)
*/