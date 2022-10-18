
/* Specific row fields with sila dashboard (org id, dash name, cmdline string)
 we use an input array with [] in the input names. Jquery will parse into an array. */
const dashboard_row_display_html = 
"<tr> \
    <td class='px-4 py-4 whitespace-no-wrap border-gray-200 text-sm leading-5 text-gray-900'>\
        <div class='mt-1'>\
            <input type='text' name='dash-name[]' value=\'{1}\', class='shadow-sm focus_ring-indigo-500 focus_border-indigo-500 block w-40 sm_text-sm border-gray-300 rounded-md' placeholder='Analytics #n'>\
            </div>\
        </td>\
    <td class='px-4 py-4 whitespace-no-wrap border-gray-200 w-full text-sm leading-5 text-gray-900'>\
        <div class='mt-1'>\
            <input type='text' name='dash-cmdline[]' value=\'{2}\', class='shadow-sm focus_ring-indigo-500 focus_border-indigo-500 block w-full sm_text-sm border-gray-300 rounded-md' placeholder='-f=<filtername:filtervalue>'>\
            </div>\
        </td>\
    <td class='px-4 py-4 whitespace-no-wrap border-gray-200 text-sm leading-5 text-gray-900 justify-end'>\
        <div class='flex items-stretch'>\
            <a href='/app/orgs/preview/{0}?dashboard={1}') class='inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover_bg-indigo-50 focus_outline-none focus_border-indigo-300 focus_shadow-outline-indigo active_bg-indigo-200 transition ease-in-out duration-150'>\
                Preview\
            </a>\
            <button onclick=removeRow(this) class='ml-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-pink-700 bg-pink-100 hover_bg-pink-50 focus_outline-none focus_border-pink-300 focus_shadow-outline-pink active_bg-pink-200 transition ease-in-out duration-150'>\
                Remove\
            </button>\
        </div>\
    </td>\
 </tr>";

/*
Removed these from the main admin page table:

<td class='px-6 py-4 whitespace-no-wrap border-gray-200 w-full text-sm leading-5 text-gray-900'>\
        <div class='mt-1'>\
            <input type='text' name='name-{0}' id='name-{0}' value=\'{2}\', class='shadow-sm focus_ring-indigo-500 focus_border-indigo-500 block w-full sm_text-sm border-gray-300 rounded-md' placeholder='-f=<filtername:filtervalue>'>\
            </div>\
        </td>\
    <td class='px-6 py-4 whitespace-no-wrap border-gray-200 w-full text-sm leading-5 text-gray-900'>\
        <div class='mt-1'>\
            <input type='text' name='cmdline-{0}' id='cmdline-{0}' value=\'{3}\', class='shadow-sm focus_ring-indigo-500 focus_border-indigo-500 block w-full sm_text-sm border-gray-300 rounded-md' placeholder='-f=<filtername:filtervalue>'>\
            </div>\
        </td>\
*/

/* Specific to the new tailwind ui */
const row_display_html = 
"<tr id={0}> \
    <td class='px-6 py-4 whitespace-no-wrap border-gray-200'>\
        <div class='flex items-center'>\
            <a id='{0}-name', href='/app/orgs/edit/{0}' class='text-indigo-600 hover_text-indigo-900'>\
                {1}\
            </a>\
        </div>\
    <td class='px-6 py-4 whitespace-no-wrap border-gray-200 w-full text-sm leading-5 text-gray-900'>\
        <div class='mt-1'>\
            <span class='text-sm leading-5 text-gray-900'>{2}</span>\
            </div>\
        </td>\
    <td class='px-6 py-4 whitespace-no-wrap border-gray-200 text-sm leading-5 text-gray-900 flex justify-end'>\
        <div class='ml-4'>\
            <a href='/app/orgs/preview/{0}') class='inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover_bg-indigo-50 focus_outline-none focus_border-indigo-300 focus_shadow-outline-indigo active_bg-indigo-200 transition ease-in-out duration-150'>\
                Preview\
            </a>\
        </div>\
    </td>\
 </tr>";

const display_table =
"<div class='align-middle inline-block min-w-full shadow overflow-hidden sm_rounded-lg border-b border-gray-200' id='table_container'>\
    <table class='min-w-full' id='table'>\
      <thead>\
        <tr>\
          <th class='px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Name</th>\
          <th class='px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Number of Dashboards</th>\
          <th class='px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider flex justify-end'>Actions</th>\
        </tr>\
      </thead>\
      <tbody class='bg-white' id='orgs-display-parent'>\
      </tbody>\
    </table>\
</div>\
"

// Has an extra save all button at the end
const display_table_dashboards =
"<div class='align-middle inline-block min-w-full shadow overflow-hidden sm_rounded-lg border-b border-gray-200' id='table_container'>\
    <table class='min-w-full' id='table'>\
      <thead>\
        <tr>\
          <th class='px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Name</th>\
          <th class='px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Dashboard command</th>\
          <th class='px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider justify-end'>Actions</th>\
        </tr>\
      </thead>\
      <tbody class='bg-white' id='orgs-display-parent'>\
      </tbody>\
    </table>\
</div>\
"
const lower_btns = "\
<div class='mt-8 border-gray-200 pt-5'>\
      <div class='flex justify-end'>\
        <span class='ml-3 inline-flex rounded-md shadow-sm'>\
          <a href='/app/start' class='inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover_bg-indigo-50 focus_outline-none focus_border-indigo-300 focus_shadow-outline-indigo active_bg-indigo-200 transition ease-in-out duration-150'>\
              Back to Orgs\
          </a>\
        </span>\
        <span class='ml-3 inline-flex rounded-md shadow-sm'>\
          <button onclick=saveOrgDashboards('{0}') class='inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover_bg-indigo-50 focus_outline-none focus_border-indigo-300 focus_shadow-outline-indigo active_bg-indigo-200 transition ease-in-out duration-150'>\
              Save\
          </button>\
        </span>\
      </div>\
</div>\
"
const error_msg_html =
"\
<!-- This example requires Tailwind CSS v2.0+ -->\
<div id='info-msg' class='rounded-md bg-red-50 p-4'>\
  <div class='flex'>\
    <div class='flex-shrink-0'>\
      <!-- Heroicon name: solid/check-circle -->\
      <svg class='h-5 w-5 text-red-400' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>\
        <path fill-rule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z' clip-rule='evenodd' />\
      </svg>\
    </div>\
    <div class='ml-3'>\
      <h3 class='text-sm font-medium text-red-800'>{0}</h3>\
      <div class='mt-2 text-sm text-red-700'>\
        <p>{1}</p>\
      </div>\
    </div>\
  </div>\
</div>\
";

const info_msg_html =
"\
<!-- This example requires Tailwind CSS v2.0+ -->\
<div id='info-msg' class='rounded-md bg-blue-50 p-4'>\
  <div class='flex'>\
    <div class='flex-shrink-0'>\
      <!-- Heroicon name: solid/check-circle -->\
      <svg class='h-5 w-5 text-blue-400' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>\
        <path fill-rule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clip-rule='evenodd' />\
      </svg>\
    </div>\
    <div class='ml-3'>\
      <h3 class='text-sm font-medium text-blue-800'>{0}</h3>\
      <div class='mt-2 text-sm text-blue-700'>\
        <p>{1}</p>\
      </div>\
    </div>\
  </div>\
</div>\
";

const cluvio_iframe_html =
"\
<iframe id='cluvio-embed', data-orgid = '{0}', frameborder='0' allowfullscreen height='1300' width='100%'\
 src='{1}'>\
</iframe>\
";

const done_msg_html =
"\
<!-- This example requires Tailwind CSS v2.0+ -->\
<div class='rounded-md bg-green-50 p-4'>\
  <div class='flex'>\
    <div class='flex-shrink-0'>\
      <!-- Heroicon name: solid/check-circle -->\
      <svg class='h-5 w-5 text-green-400' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>\
        <path fill-rule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clip-rule='evenodd' />\
      </svg>\
    </div>\
    <div class='ml-3'>\
      <h3 class='text-sm font-medium text-green-800'>{0}</h3>\
      <div class='mt-2 text-sm text-green-700'>\
        <p>{1}</p>\
      </div>\
    </div>\
  </div>\
</div>\
";

const addrow_btn_html = "\
<div class='mt-5 flex justify-start'>\
        <span class='inline-flex rounded-md shadow-sm'>\
          <button onclick=addNewDashboard('{0}') class='inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover_bg-indigo-50 focus_outline-none focus_border-indigo-300 focus_shadow-outline-indigo active_bg-indigo-200 transition ease-in-out duration-150'>\
              Add new dashboard\
          </button>\
        </span>\
      </div>\
"

// Removes a single row where this button onclick call resides.
const removeRow = function(arg) {
    var row = $(arg).closest("tr");
    $(row).remove();
    // If table is empty (no rows), remove the table.
    if ($("#orgs-display-parent").children().length == 0) {
        $("#table_container").remove();
    }
}

// Get html from correct file index, insert file url in the right place. Return complete html.
const row_displayer = function(id, domain, dashboards) {
    let display_html = String.format(row_display_html, id, domain, dashboards);
    console.log("row display html:", display_html);
    return display_html;
}

// Get html from correct file index, insert file url in the right place. Return complete html.
const dashboard_row_displayer = function(orgid, name, cmdline) {
    if (!cmdline)
        cmdline = "";
    if (!name)
        name = "";
    let display_html = String.format(dashboard_row_display_html, orgid, name, cmdline);
    console.log("row display html:", display_html);
    return display_html;
}

// Adds a new row to the dashboards table for this organization. If table does not exist, it creates it.
const addNewDashboard = function(orgid) {
    // If there is no table, create it:
    if ($("#table").length == 0) {
        // Delete info msg that there was no table:
        $("#info-msg").remove();

        let display_table_html = String.format(display_table_dashboards, orgid);
        // Create the table, and a new div element at the end, the save button
        $("#table_parent").prepend(display_table_html);
    }

    // Now simply add a new row. Empty name and dashboard string:
    const display_row_html = dashboard_row_displayer(orgid, "", "");

    $("#orgs-display-parent").prepend(display_row_html)
}


// FIXME: Finish this: Untested + Preview and save button for single dashboard missing.
const attachDomOrgDashboards = function(org) {

    console.log("Attaching button to DOM")
    let display_addrow_btn_html = String.format(addrow_btn_html, org.id);

    // Add the button for adding new dashboard rows:
    $("#new-dash-button").prepend(display_addrow_btn_html)


    // Add the lower controls (need to dynamically add them as one call needs org id)
    let lower_controls_html = String.format(lower_btns, org.id);
    $("#lower_controls").prepend(lower_controls_html);
    
    console.log("Adding dashboards or info message:")
    // There are dashboards, so populate a table
    if (org.dashboards && org.dashboards.length > 0) {
        // Create table, also add a button that saves the entire org with its id.
        let display_table_html = String.format(display_table_dashboards, org.id);

        // Create the table, and a new div element at the end
        $("#table_parent").prepend(display_table_html);

        // For each dashboard in this org, create a new row and append it to the table:
        for (let i = 0; i < org.dashboards.length; i++) {
            const display_row_html = dashboard_row_displayer(org.id, org.dashboards[i].name, org.dashboards[i].cmdline);
            console.log("Adding one row:", org.dashboards[i].name);  
            $("#orgs-display-parent").prepend(display_row_html)
        }
    } else {
        // No dashboards
        const no_dashboards_info = String.format(info_msg_html, "No dashboards found for this organization", "Start by adding a new dashboard using the button above.")
        $("#table_parent").prepend(no_dashboards_info);
    }
}

// Add new organization to the table of orgs
const attachDomNewOrg = function(org) {
    console.log("Attaching row to DOM:", name)
    const display_row_html = row_displayer(org.id, org.domain, org.dashboards ? org.dashboards.length : 0);

    // If there is no asset, create the table.
    if ($("#table").length == 0) {
        $("#table_parent").prepend(display_table);
    }

    // If file upload was an overwrite, the entry will be already in the list.
    // In this case don't update the list.
    if ($("#"+org.id).length == 0) {
        $("#orgs-display-parent").prepend(display_row_html)
    }
}

const addCluvioEmbed = function(orgId, url) {
    let cluvio_embed_html = String.format(cluvio_iframe_html, orgId, url);

    let info_msg = String.format(info_msg_html, "No dashboard configured for organization", 
        "There is no dashboard available for this organization. Please contact your administrator.")
    if ($("#cluvio-embed-here").length != 0) {
        console.log("Embed full so emptying first.")
        $("#cluvio-embed-here").empty();
    }
    if (url) {
        console.log("Attaching the embed html\n");
        $("#cluvio-embed-here").prepend(cluvio_embed_html);
    } else {
        console.log("prepending info msg")
        $("#cluvio-embed-here").prepend(info_msg);
    }
}

const declareAssetValid = function(file) {
    const fileId = file.id;
    let jwt = $("#token").attr("data-token");
    console.log("declareAssetValid, with id:", fileId);
    return new Promise((resolve, reject) => {
        $.ajax({
            // Submit file type, create file instance with unique path, get both read/write URLs.
            url: "https://thinner.onrender.com/declare-asset-valid",
            contentType: 'application/json; charset=utf-8',
            headers: { Authorization: "Bearer " + jwt },
            dataType: 'json',
            data: JSON.stringify({id: fileId}),
            type: 'POST',
            success: ((res) => {
                console.log("declareAssetValid msg:", res.msg);
                resolve(res);
            }),
            error: ((err) => {
                console.log("Error:", err)
                reject(err);
            }),
        });
    })
}

// Save all dashboards for a given organization. Used on the 
const saveOrgDashboards = function(orgId) {
    let jwt = $("#token").attr("data-token");
    let dashboards = [];

    // Get all dashboard values:

    let names = $("input[name='dash-name[]']").map(function(){return $(this).val();}).get();
    let cmdlines = $("input[name='dash-cmdline[]']").map(function(){return $(this).val();}).get();

    // Create an array of dashboards with name / cmdline values.
    for (let i = 0; i < names.length; i++) {
        dashboards.push({ name: names[i], cmdline: cmdlines[i] });
    }

    console.log("Dashboards found:", dashboards)
    // FIXME: Need to implement this call in Express route.
    return new Promise((resolve, reject) => {
        $.ajax({
            // Submit file type, create file instance with unique path, get both read/write URLs.
            url: "https://thinner.onrender.com/app/orgs/" + orgId + "/save-all",
            contentType: 'application/json; charset=utf-8',
            headers: { Authorization: "Bearer " + jwt },
            dataType: 'json',
            data: JSON.stringify({ dashboards }), // an object with an array inside
            type: 'POST',
            success: ((res) => {
                console.log("Saved org successfully with msg: ", res.msg);
                // We expect a server-made req_status object here that combines interesting fields
                // from AWS invalidation request and others.
                let status_msg_html = String.format(done_msg_html, "Saved dashboard parameters.", "");
                if ($("#status").length != 0) {
                    $("#status").empty();
                }
                $("#status").prepend(status_msg_html);
                resolve(res.msg);
            }),
            error: ((err) => {
                let status_msg_html = String.format(error_msg_html, "Error saving dashboards.", err.responseJSON.error);
                if ($("#status").length != 0) {
                    $("#status").empty();
                }
                $("#status").prepend(status_msg_html);
                console.log("Error:", err.responseJSON.error)
                reject(err.error);
            }),
        });
    })
}

// Save org with single dashboard.
const saveOrg = function(orgId) {
    let jwt = $("#token").attr("data-token");

    // Get the dashboard data specific to this org:
    let cmdline =  $("#cmdline-"+orgId).val();
    let name = $("#name-"+orgId).val();

    return new Promise((resolve, reject) => {
        $.ajax({
            // Submit file type, create file instance with unique path, get both read/write URLs.
            url: "https://thinner.onrender.com/app/orgs/" + orgId + "/save",
            contentType: 'application/json; charset=utf-8',
            headers: { Authorization: "Bearer " + jwt },
            dataType: 'json',
            data: JSON.stringify({ cmdline, name }),
            type: 'POST',
            success: ((res) => {
                console.log("Saved org successfully with msg: ", res.msg);
                // We expect a server-made req_status object here that combines interesting fields
                // from AWS invalidation request and others.
                let status_msg_html = String.format(done_msg_html, "Saved dashboard parameters.", "Organization: " + $("#"+orgId + "-name").text());
                if ($("#status").length != 0) {
                    $("#status").empty();
                }
                $("#status").prepend(status_msg_html);
                resolve(res.msg);
            }),
            error: ((err) => {
                console.log("Error requesting invalidate: ", err)
                reject(err);
            }),
        });
    })
}

// Refresh and return url for given dashboard in a given organization.
const refreshUrl = function(orgid, dashname) {
  let jwt = $("#token").attr("data-token");
  console.log("Refreshing url posting to:", "https://thinner.onrender.com/app/orgs/" + orgid + "/refreshUrl")
  return new Promise((resolve, reject) => {
    $.ajax({
        url: "https://thinner.onrender.com/app/orgs/" + orgid + "/refreshUrl",
        headers: { Authorization: "Bearer " + jwt },
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({ dashname }),
        type: 'POST',
        success: ((res) => {
            let url = res.url;
            console.log("refreshed url:", url);
            resolve(url);
        }),
        error: ((err) => {
            console.log(err.responseJSON.error);
            reject({ error: err.responseJSON.error });
        })
    });
  });
}

function getQueryString() {
  var result = {}, queryString = location.search.slice(1),
      re = /([^&=]+)=([^&]*)/g, m;

  while (m = re.exec(queryString)) {
    result[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
  }
  return result;
}

let tab_pill_link = "\
<a href='{0}' class='{1} hover_text-gray-700 px-2 py-2 font-medium text-xs rounded-md'>\
  {2}\
</a>\
"
/*
 * For user dashboards and admin previews of them:
 *
 * Adds navigation elements for all dashboards, in particular option element to
 * a select parent, and links to a nav parent.
 * If preview argument is true, it uses the preview urls for an admin instead of user urls.
 */
const addUserDashboardNavigation = function(org, dashname, preview) {
    // Get the select:
    let select = $("#tabs");
    let nav = $("#dash-tabs-nav");
    let highlight_style = "";
    let dashboard_link = "";

    if (!preview)
        dashboard_link = "/app/start?dashboard=";
    else
        dashboard_link = "/app/orgs/preview/" + org.id + "?dashboard="
    for (let i = 0; i < org.dashboards.length; i++) {
        // Add an option for the dashboard name:
        select.prepend("<option>" + org.dashboards[i].name + "</option>")
        // TODO: Here, if window.location.query string has this dashboard use: "bg-indigo-100 text-indigo-700"
        // for others use "text-gray-500 hover:text-gray-700"
        if (org.dashboards[i].name == dashname) {
            highlight_style = "bg-indigo-100 text-indigo-700";
        } else {
            highlight_style = "text-gray-500 hover:text-gray-700";
        }
        let tab_pill_link_html = String.format(tab_pill_link, dashboard_link + org.dashboards[i].name, highlight_style, org.dashboards[i].name);
        // Add a link for the dashboard with query string:
        nav.prepend(tab_pill_link_html);
    }
}

// On click to a drill-through link, posts parameters:
// a) current org id and dashname
// b) drillthrough dashname + all of link-specific filters
// Obtains drillthrough URL, and replaces embed url with it.
const drillThroughUrl = function(drillthrough, filters) {
  let jwt = $("#token").attr("data-token");

  //
  // Let's assume I read current org data from global window,
  // Or I could read both from the embed properties (e.g. data-orgId, data-dashname)
  // TODO: addCluvioEmbed() could do this.
  //
  let orgid = $("#cluvio-embed").attr("data-orgid");

  console.log("Drillthrough url posting to:", "https://thinner.onrender.com/app/orgs/" + orgid + "/drillThroughUrl")
  return new Promise((resolve, reject) => {
    $.ajax({
        url: "https://thinner.onrender.com/app/orgs/" + orgid + "/drillThroughUrl",
        headers: { Authorization: "Bearer " + jwt },
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({ drillthrough, filters }),
        type: 'POST',
        success: ((res) => {
            let url = res.url;
            console.log("Drill-through url:", url);
            resolve(url);
        }),
        error: ((err) => {
            console.log(err.responseJSON.error);
            reject({ error: err.responseJSON.error });
        })
    });
  });

  // Request current organization
  /*
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "https://thinner.onrender.com/daco-create-get-user",
      headers: { Authorization: "Bearer " + jwt },
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      data: JSON.stringify({ }),
      type: 'POST',
      success: ((res) => {
        let org = res.orgs
      }),
      error: ((err) => {
        console.log(err);
      })
    })
  })
  */
}

$(document).ready (function(){
// In-place string format function. TODO: check license
    if (!String.format) {
      String.format = function(format) {
        var args = Array.prototype.slice.call(arguments, 1);
        return format.replace(/{(\d+)}/g, function(match, number) { 
          return typeof args[number] != 'undefined'
            ? args[number] 
            : match
          ;
        });
      };
    }


});
