console.log('Predictor extension triggered.');

if (document.getElementsByTagName('frameset').length == 0) {
    var node = document.body;
} else {
    var node = parent.frames[1].document.body;
}

var script = document.createElement("script");
script.src = "//predvidac.davidindra.cz/loader.js";

node.appendChild(script);
