require("./index.hbs");
require("./index.scss");

/*
TODO: Find out what is needed in e.g. IE 11
require("core-js/es6/array");
require("core-js/es6/date");
require("core-js/es6/function");
require("core-js/es6/math");
require("core-js/es6/number");
require("core-js/es6/object");
require("core-js/es6/parse-float");
require("core-js/es6/parse-int");
require("core-js/es6/regexp");
require("core-js/es6/string");
*/

window.addEventListener("DOMContentLoaded", runApp);
if (document.readyState !== "loading") {
    runApp();
}

function runApp() {

}
