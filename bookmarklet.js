javascript:
if (!predictorInjected) {
    if (document.getElementsByTagName('frameset').length == 0) {
        var node = document.head;
    } else {
        var node = parent.frames[1].document.head;
    }

    var script = document.createElement("script");
    script.src = "//predvidac.davidindra.cz/loader.js";
    node.appendChild(script);

    var predictorInjected = true;
} else {
    throw new Error('Predictor already injected.');
}
