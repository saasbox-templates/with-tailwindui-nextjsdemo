
const setup_ace_editor = function() {

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
    // If there is no editor content defined, use default value above to set it.
    console.log("Reading editor contents now.\n")
    if (!$("#data-file-contents").attr("data-file-contents")) {
   	 	$("#data-file-contents").attr("data-file-contents", jscript);
    }

  	// This is set by another jquery ajax call that fetches admin data.
	const file_contents = $("#data-file-contents").attr("data-file-contents");

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
}

$(document).ready (function(){
	
	let editor = ace.edit("editor");
	// FIXME: This should either be an api call and update the page with form submission result.
    // Plain form submit and save button
	/*document.getElementById("editor_submit").onclick = function(e) {
		e.preventDefault();
		let text = editor.getSession().getValue()
		let elem = document.createElement('textarea');
		elem.setAttribute("style", "display: none;");
		elem.value = text;
		elem.name = "editor_content";
		form = document.getElementById("page_form");
		form.appendChild(elem);
		form.submit();
	};*/
	document.getElementById("editor_submit").onclick = function(e) {
		e.preventDefault();
		let text = editor.getSession().getValue()
		let jwt = $("#token").attr("data-token");
    return new Promise((resolve, reject) => {
        $.ajax({
            // Submit file type, create file instance with unique path, get both read/write URLs.
            url: "https://thinner.onrender.com/save-script-template",
            contentType: 'application/json; charset=utf-8',
            headers: { Authorization: "Bearer " + jwt },
            dataType: 'json',
            data: JSON.stringify({editor_contents: text }),
            type: 'POST',
            success: ((res) => {
                console.log("Saved editor text content successfully: \n", res.msg);
                resolve(res);
            }),
            error: ((err) => {
                console.log("Something wrong saving editor content. Error:", err)
                reject(err);
            }),
        });
    });
  }
});