

$(document).ready (function(){

	const file_contents = $("#data-file-contents").attr("data-file-contents")
	const template_id = $("#data-template-id").attr("data-template-id")
	const page_id = $("#data-template-id").attr("data-page-id");

	let editor = ace.edit("editor");

	editor.setTheme("ace/theme/textmate");
	let render_mode = document.querySelector('input[name=render_mode]:checked').value;
	console.log("Render mode:", render_mode)
	if (render_mode == "html") {
		editor.session.setMode("ace/mode/html");
	} else if(render_mode =="pug") {
		editor.session.setMode("ace/mode/jade");
		editor.setOptions({ tabSize: 2, useSoftTabs: false })
		//editor.getSession().setTabSize(2);
    	//editor.getSession().setUseSoftTabs(true);
    }
	editor.setOptions({minLines: 20});

	if (file_contents) {
		editor.setValue(file_contents, -1);
	}

	/*editor.setOptions({
	    enableBasicAutocompletion: true
	});*/
	editor.resize();
    $(".render_mode").on('click',
        function() {
        	console.log("Render mode on click event");
            render_mode = $(this).val()
        	if (render_mode == "html") {
        		editor.session.setMode("ace/mode/html");
        		console.log("Set editor mode html")
        	} else if (render_mode =="pug") {
      			editor.session.setMode("ace/mode/jade");
      			console.log("Set editor mode Jade");
      			editor.setOptions({ tabSize: 2, useSoftTabs: true })
      			//editor.getSession().setTabSize(2);
    			//editor.getSession().setUseSoftTabs(true);
        	} else {
      			console.log("Don't know the mode:", render_mode);
      		}
        }
    );

    // Plain form submit and save button
	document.getElementById("editor_submit").onclick = function(e) {
		e.preventDefault();
		let text = editor.getSession().getValue()
		let elem = document.createElement('textarea');
		elem.setAttribute("style", "display: none;");
		elem.value = text;
		elem.name = "editor_content";
		form = document.getElementById("page_form");
		form.appendChild(elem);
		form.submit();
	};
	
	// Change form action to route that saves and also converts file to pug template.
	document.getElementById("convert_to_pug").onclick = function(e) {
		e.preventDefault();
		let text = editor.getSession().getValue()
		let elem = document.createElement('textarea');
		elem.setAttribute("style", "display: none;");
		elem.value = text;
		elem.name = "editor_content";
		form = document.getElementById("page_form");
		form.appendChild(elem);

		// If submit button is convert-to-pug, update form target.
		form.action = '/dashboard/templates/' + template_id + "/pages/" + page_id + "/save-and-convert-to-pug";
		form.submit();
	};
});