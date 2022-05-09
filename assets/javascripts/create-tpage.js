

$(document).ready (function(){
	
	let jscript = `<!-- <script src="https://cdn.politepop.com/v1.0.0-beta/polite-pop.js"></script> -->
    <script src="polite-pop.js?v=3"></script>
    <script>
      var myPolitePop = PolitePop({
        debug: true,
        politePopHtml: "Hey, I've been cooking up something cool. Want to get a peek?",
        exitIntentPopHtml: "Want to hear about the next awesome thing I’m working on?",
        modalHtml: "<p>Go beyond social newsfeeds and explore the wild, undiscovered web.</p><p>Join my weekly newsletter where you’ll see:</p><ul><li>Evolving ideas in techno-spirituality</li><li>Life-affirming art that will help you grow</li><li>New ways of communicating on the web</li></ul><p>My mission is to make the web more fun<i>!</i> 🤪</p>"
      });
    </script>`
    // Set to default value for the time being until it is fetched from the server.
    $("#data-file-contents").attr("data-file-contents", jscript);

	const file_contents = $("#data-file-contents").attr("data-file-contents")
	const template_id = $("#data-template-id").attr("data-template-id")
	const page_id = $("#data-template-id").attr("data-page-id");

	let editor = ace.edit("editor");

	editor.setTheme("ace/theme/textmate");
	editor.session.setMode("ace/mode/html");

	editor.setOptions({maxLines: 40});

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