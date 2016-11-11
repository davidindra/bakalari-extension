class Predictor {
    var doc;

    constructor(doc) {
        this.doc = doc;

        var el = document.createElement("script");
        el.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js";
        this.doc.head.appendChild(el);

        console.log("Predictor 0.1");
    }
}

if (predictorLaunched) {
    throw new Error("Predictor already launched.");
} else {
    if ($('frameset').length == 0) {
        var doc = document;
    } else {
        var doc = parent.frames[1].document;
    }

    var predictor = new Predictor(doc);

    var predictorLaunched = true;
}