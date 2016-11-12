console.log('Predictor extension triggered.');

if (document.getElementsByTagName('frameset').length == 0) {
    var script = document.createElement("script");
    script.src = "//predvidac.davidindra.cz/loader.js";

    document.body.appendChild(script);
} else {
    window.location = 'http://cmg.prostejov.cz/bakaweb';
}
