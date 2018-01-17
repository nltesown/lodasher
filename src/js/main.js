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
    var output;



    // If the input can't be JSON-parsed, interpret it as an array where each line is an item
    try {
      JSON.parse(input);
    } catch (e) {
      input = JSON.stringify(
        _(input.split("\n"))
        .filter(d => d !== "") // Remove white lines (TODO: improve)
        .map(d => isNaN(d) ? d : (d * 1))
        .value()
      );
    }

    var f = lodash.replace(/data/g, "(" + input + ")"); // Replace `data` by the input globally (the naive way)
    // var f = lodash.replace(/^_\(data\)\s*\./, "_(" + input + ").");

    output = ev();

    // Automatically call value() if necessary
    if (output instanceof _) {
      output = output.value();
    }

    if (typeof output === "object" && typeof output.length !== "undefined") {
      $(".outlength").html(" (" + output.length + " items)");
    } else {
      $(".outlength").html("");
    }


    editor.output.setValue(
      js_beautify(
        JSON.stringify(output),
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