


$(document).ready (function(){
    //console.log("window.location:", window.location.pathname);
    /* If tab link matches current url, highlight it with indigo */
    $("#tabs").find('a').each(function() {
        if ($(this).attr('href').slice(-10) == window.location.pathname.slice(-10)) {
            $(this).removeClass("text-gray-500 hover_text-gray-700 hover_border-gray-300 focus_outline-none focus_text-gray-700 focus_border-gray-300");
            $(this).addClass("text-indigo-600 focus_outline-none focus_text-indigo-800 focus_border-indigo-700 border-b-2 border-indigo-500");
            $(this).children("svg").removeClass("text-gray-400 group-hover_text-gray-500 group-focus_text-gray-600");
            $(this).children("svg").addClass("text-indigo-500 group-focus_text-indigo-600");
        }
    });

    // Aesthetic table fix:

    /* Removing this border class makes bottom of table look smoother */
    let lastRow = $('#table tr:last > td');
    lastRow.removeClass("border-b");

    // Aesthetic tag coloring:
    $(".tagsparent").find('span').each(function() {
        console.log("text:", $(this).text());
        switch($(this).text()) {
        case "no code":
        case "nocode":
        case "no-code":
        case "airtable":
            $(this).addClass("pg-red-100 text-red-800");
            break;
        case "react":
        case "reactjs":
            $(this).addClass("bg-indigo-100 text-indigo-800");
            break;
        case "free":
            $(this).addClass("bg-green-100 text-green-800");
            break;
        case "needs license purchase":
        case "needs license":
            $(this).addClass("bg-orange-100 text-orange-800");
            break;
        case "laravel":
            $(this).addClass("bg-red-100 text-red-800");
            break;
        case "python":
            $(this).addClass("bg-blue-100 text-blue-800");
            break;
        case "php":
            $(this).addClass("bg-gray-100 text-gray-800");
            break;
        case "vue":
        case "vuejs":
            $(this).addClass("bg-green-100 text-green-800");
            break;
        case "django":
        case "django":
            $(this).addClass("bg-green-100 text-green-800");
            break;
        case "jquery":
            $(this).addClass("bg-pink-100 text-pink-800");
            break;
        case "bootstrap":
            $(this).addClass("bg-blue-100 text-blue-800");
            break;
        case "tailwind":
        case "tailwindcss":
            $(this).addClass("bg-indigo-100 text-indigo-800");
            break;
        default:
            $(this).addClass("bg-blue-100 text-blue-800");
            break;
        }
    });
});


function useTemplate(tplId) {
    $.ajax({
        url: '/dashboard/templates/' + tplId + '/use',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({template_id: tplId}),
        type: 'POST',
        success: ((res) => {
            // Replace follow button with unfollow.
            window.location.reload();
            console.log("Result: ", res)
        }),
        error: ((error) => {
            console.log("Error:", error);
        })
    });
}
function shareTemplate(tplId) {
    $.ajax({
        url: '/dashboard/templates/' + tplId + '/share',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({template_id: tplId}),
        type: 'POST',
        success: ((res) => {
            // Replace follow button with unfollow.
            window.location.reload();
            console.log("Result: ", res)
        }),
        error: ((error) => {
            console.log("Error:", error);
        })
    });
}

function copyTemplate(tplId) {
    $.ajax({
        url: '/dashboard/templates/' + tplId + '/copy',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({template_id: tplId}),
        type: 'POST',
        success: ((res) => {
            // Replace follow button with unfollow.
            console.log("Result: ", res)
            window.location.reload();
        }),
        error: ((error) => {
            console.log("Error:", error);
        })
    });
} 

// Same as use, go back to local workspace url
function useGlobalTemplate(tplId) {
    $.ajax({
        url: '/dashboard/templates/' + tplId + '/use',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({template_id: tplId}),
        type: 'POST',
        success: ((res) => {
            // Same as use, go back to local workspace url
            window.location.pathname = "/dashboard/templates";
            console.log("Result: ", res)
        }),
        error: ((error) => {
            console.log("Error:", error);
        })
    });
}

// Same as copy, go back to local workspace url
function copyGlobalTemplate(tplId) {
    $.ajax({
        url: '/dashboard/templates/' + tplId + '/copy',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({template_id: tplId}),
        type: 'POST',
        success: ((res) => {
            // Same as copy, go back to local workspace url
            console.log("Result: ", res)
            window.location.pathname = "/dashboard/templates"
        }),
        error: ((error) => {
            console.log("Error:", error);
        })
    });
}


function deleteTemplate(tplId) {
    $.ajax({
        url: '/dashboard/templates/' + tplId + '/delete',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({template_id: tplId}),
        type: 'POST',
        success: ((res) => {
            // Replace follow button with unfollow.
            console.log("Result: ", res)
            $("#"+tplId).remove();
        }),
        error: ((error) => {
            console.log("Error:", error);
        })
    });
}

