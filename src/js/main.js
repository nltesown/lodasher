$(main);

function main () {
  "use strict";

  var editor = {
    input: CodeMirror.fromTextArea(document.getElementById("input"), { mode: "javascript", tabSize: 2, json: true }),
    output: CodeMirror.fromTextArea(document.getElementById("output"), { mode: "javascript", tabSize: 2, json: true }),
    lodash: CodeMirror.fromTextArea(document.getElementById("lodash"), { mode: "javascript", tabSize: 2, json: false })
  };

  $("button").on("click", function () {
    var lodash =  editor.lodash.getValue();
    var input =  editor.input.getValue();

    var f = lodash.replace(/data/g, "(" + input + ")"); // Replace `data` by the input globally (the naive way)
    // var f = lodash.replace(/^_\(data\)\s*\./, "_(" + input + ").");

    editor.output.setValue(
      js_beautify(
        JSON.stringify(ev()),
        {
          "indent_size": 2,
          "brace_style": "expand"
        }
      )
    );


    function ev () {
      try {
        var res = eval(f);
        return res; // TODO: use a safe eval lib (https://github.com/mmckegg/notevil)
      } catch (e) {
        return { error: e.message };
      }
    }
  });
}