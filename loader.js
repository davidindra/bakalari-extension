class Predictor {
    constructor(doc) {
        this.doc = doc;

        var script = document.createElement("script");
        script.onload = function(t = this) {
            t.setup();
        };
        script.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js";
        this.doc.head.appendChild(script);

        console.log("Predictor 0.1");
    }

    setup(){
        console.log($('html'));
    }
}

if (!predictorLaunched) {
    if (document.getElementsByTagName('frameset').length == 0) {
        var doc = document;
    } else {
        var doc = parent.frames[1].document;
    }

    var predictor = new Predictor(doc);

    var predictorLaunched = true;
} else {
    throw new Error("Predictor already launched.");
}