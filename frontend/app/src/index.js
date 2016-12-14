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
    const $button = document.getElementById("give-gutti");
    const $msgSuccess = document.getElementById("msg-gutti-success");
    const $msgError = document.getElementById("msg-gutti-error");

    $button.addEventListener("click", () => {
        $button.classList.add("sz-button--clicked");
        $button.classList.add("sz-button--disabled");

        setTimeout(() => {
            fetch("/gutti")
                .then((res) => res.text())
                .then((text) => {
                    $button.style.display = "none";

                    if (text === "ok") {
                        $msgSuccess.style.display = "block";
                    } else {
                        $msgError.style.display = "block";
                    }
                })
                .catch((err) => {
                    console.log("Error", err);

                    $button.style.display = "none";
                    $msgError.style.display = "block";
                });
        }, 300);
    });
}
