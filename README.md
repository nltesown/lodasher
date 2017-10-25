# Lodasher

Write, execute, test, play with Lodash in the browser. An online editor to transform your JSON data using Lodash.

* Write a Lodash expression in the "Lodash" field. It must start with `_(data).`, which references your data. The chaining syntax is used, so the Lodash field will have to end with `.value()` where appropriate.
* Write or paste your JSON data in the "input" field.
* Click "Run" and get the evaluation of the Lodash expression fed with your data in the "output" field.

The Moment.js library is loaded and can be used in the Lodash expression.

TODO:

* Use safe eval
* Make it possible to reference `data` elsewhere in the Lodash expression.