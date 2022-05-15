function deletePage(tplId, pageId) {
    $.ajax({
        url: '/dashboard/templates/' + tplId + "/pages/" + pageId + '/delete-json',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({pageId}),
        type: 'POST',
        success: ((res) => {
            // Replace follow button with unfollow.
            console.log("Result: ", res)
            $("#"+pageId).remove();
        }),
        error: ((error) => {
            console.log("Error:", error);
        })
    });
}

function deleteAssets(templateId) {
    let tplId = templateId;
    $.ajax({
        url: '/dashboard/templates/' + tplId + "/delete-assets-json",
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({tplId}),
        type: 'POST',
        success: ((res) => {
            // Replace follow button with unfollow.
            console.log("Result: ", res);
            // If table is empty remove it starting with its outer container.
            $("#table_container").remove();
            //$("#asset-display-parent").empty();
        }),
        error: ((error) => {
            console.log("Error:", error);
        })
    });
}


function deleteAsset(fileId) {
    const tplId = $("#data-upload").attr("data-templateId");
    $.ajax({
        url: '/dashboard/templates/' + tplId + "/assets/" + fileId + '/delete-json',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({fileId}),
        type: 'POST',
        success: ((res) => {
            // Replace follow button with unfollow.
            console.log("Result: ", res)
            $("#"+fileId).remove();

            // If table is empty remove it starting with its outer container.
            if ($("#table > tbody > tr").length == 0) {
                $("#table_container").remove();
            }
        }),
        error: ((error) => {
            console.log("Error:", error);
        })
    });
}

const createFileObject = function(file_meta, file_prefix) {
    let jwt = $("#token").attr("data-token");
    return new Promise((resolve, reject) => {
        $.ajax({
            // Submit file type, create file instance with unique path, get both read/write URLs.
            url: 'https://thinner.onrender.com/create-asset',
            contentType: 'application/json; charset=utf-8',
            headers: { Authorization: "Bearer " + jwt },
            dataType: 'json',
            data: JSON.stringify({file_meta, file_prefix}),
            type: 'POST',
            success: ((res) => {
                resolve(res);
            }),
            error: ((err) => {
                console.log("Error:", err)
                reject(err);
            }),
        });
    });
}

const completeUpload = function(fileObj, file, file_meta) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: fileObj.upload_url,
            type: 'PUT',
            processData: false, 
            contentType : file_meta.type,
            'x-amz-acl': 'public-read',
            data: file,
            success: ((res) => {
                resolve(res);
            }),
            error: ((err) => {
                reject(err);
            }),
        });
    })
}

// File index specific html to display uploaded file.
/*const file_display_html =
"<div id={2} class='list-item'> \
    <div class='flex'>\
        <a href='{0}'>\
        {1}\
        </a>\
    </div>\
    <div>\
        <a href='{0}' class='item-author text-color'>\
            {3} \
        </a> \
    </div>\
    <div class='no-wrap'>\
        <button onclick=deleteAsset('{2}') class='btn btn-primary btn-sm'>Delete </button>\
    </div>\
</div>"*/

/* Specific to the new tailwind ui */
const file_display_html = 
"<tr id={2}> \
    <td class='px-6 py-4 whitespace-no-wrap border-b border-gray-200'>\
        <div class='flex items-center'>\
            <a href='{0}' class='text-indigo-600 hover_text-indigo-900'>\
                {1}\
            </a>\
        </div>\
    <td class='px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-900'>\
        {3}\
    </td>\
    <td class='px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-900 flex justify-end'>\
        <div class='ml-4'>\
            <button type='button' onclick=deleteAsset('{2}') class='inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-pink-700 bg-pink-100 hover_bg-pink-50 focus_outline-none focus_border-pink-300 focus_shadow-outline-pink active_bg-pink-200 transition ease-in-out duration-150'>\
                Delete\
            </button>\
        </div>\
    </td>\
 </tr>";

const display_table =
"<div class='align-middle inline-block min-w-full shadow overflow-hidden sm_rounded-lg border-b border-gray-200' id='table_container'>\
    <table class='min-w-full' id='table'>\
      <thead>\
        <tr>\
          <th class='px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Name</th>\
          <th class='px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Type</th>\
          <th class='px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider flex justify-end'>Action</th>\
        </tr>\
      </thead>\
      <tbody class='bg-white' id='asset-display-parent'>\
      </tbody>\
    </table>\
</div>\
"

// Get html from correct file index, insert file url in the right place. Return complete html.
const file_displayer = function(url, name, id, type) {
    let display_html = String.format(file_display_html, url, name, id, type);
    console.log("file display html:", display_html);
    return display_html;
}

// Update visible page with uploaded file information
const attachDomNewFile = function(url, name, id, type) {
    console.log("Attaching file to DOM:", name)
    const display_section = file_displayer(url, name, id, type);

    // If there is no asset, create the table.
    if ($("#table").length == 0) {
        $("#table_parent").prepend(display_table);
    }

    // If file upload was an overwrite, the entry will be already in the list.
    // In this case don't update the list.
    if ($("#"+id).length == 0) {
        $("#asset-display-parent").prepend(display_section)
    }
}

const declareAssetValid = function(file) {
    const tplId = $("#data-upload").attr("data-templateId");
    const fileId = file.id;
    let jwt = $("#token").attr("data-token");
    return new Promise((resolve, reject) => {
        $.ajax({
            // Submit file type, create file instance with unique path, get both read/write URLs.
            url: "https://thinner.onrender.com/declare-asset-valid",
            contentType: 'application/json; charset=utf-8',
            headers: { Authorization: "Bearer " + jwt },
            dataType: 'json',
            data: JSON.stringify({fileId}),
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

const requestInvalidation = function() {
    const file_prefix = $("#data-upload").attr("data-foldername");
    return new Promise((resolve, reject) => {
        $.ajax({
            // Submit file type, create file instance with unique path, get both read/write URLs.
            url: "https://thinner.onrender.com/request-invalidation",
            contentType: 'application/json; charset=utf-8',
            headers: { Authorization: "Bearer " + jwt },
            dataType: 'json',
            data: JSON.stringify({ path: "/" + file_prefix + "/*"}),   // Looks like: /popup-v1/*
            type: 'POST',
            success: ((res) => {
                console.log("Invalidate request success with msg: ", res.msg);
                resolve(res);
            }),
            error: ((err) => {
                console.log("Error requesting invalidate: ", err)
                reject(err);
            }),
        });
    })
}

const uploadFile = function(file) {
    /* Tells whether the file is a private or public one */
    let file_meta = {
        type: file.type,
        privacy: "public",
        natural_path: file.filepath
    };
    const file_prefix = $("#data-upload").attr("data-foldername");

    return createFileObject(file_meta, file_prefix).then(fileObj => {
        console.log("createfileObject success:", fileObj);
        return completeUpload(fileObj, file, file_meta).then(res => {
            console.log("completeUpload success:", res);
            console.log("read url:", fileObj.read_url);
            attachDomNewFile(fileObj.read_url, file_prefix + "/" + file_meta.natural_path, fileObj.id, file.type);
            return declareAssetValid(fileObj).then(result => {
                return fileObj;
            })
        }).catch(error => { console.log("Error completing completeUpload:", error) });
    }).catch(error => { console.log("Error completing createfileObject:", error) });
}

$(document).ready (function(){
    const dropzone = document.querySelector('#dropzone')
    
    dropzone.addEventListener('dragover', evt => evt.preventDefault())
    
    dropzone.addEventListener('drop', event => {
        event.preventDefault()
        const items = event.dataTransfer.items
        window.getFilesFromDataTransferItems(items).then(files => {
            //console.log(files[0].filepath)
            console.log('files', files)
            let promises = [];
            files.forEach((file, i) => {
              console.log(i, file.filepath)
              promises.push(uploadFile(file));
            });
            return Promise.all(promises).then(uploaded => {
                // Request single invalidation for all paths in current folder. (There is only one folder)
                return requestInvalidation();
            });
        })
    }, false) 

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

  var file_meta = {};


  document.getElementById('upload0').onclick = function () {
    $('#file0').trigger("click");
  }

  document.getElementById('upload1').onclick = function () {
    $('#file0').trigger("click");
  }

  $('#file0').on('change', function() {
    console.log("file:",this.files[0]);
    this.files[0].filepath = this.files[0].name;
    uploadFile(this.files[0]).then(uploaded => {
        // Request single invalidation for all paths in current folder. (There is only one folder)
        return requestInvalidation();
    })
  })




});
