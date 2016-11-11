class Predictor {
    constructor(doc) {
        this.doc = doc;

        var el = document.createElement("script");
        el.onload = function() {
            this.setup();
        };
        el.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js";
        this.doc.head.appendChild(el);

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