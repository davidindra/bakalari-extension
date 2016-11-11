class Predictor {
    constructor(doc) {
        this.doc = doc;

        console.log("Loading jQuery...");
        var script = document.createElement("script");
        script.onload = this.setup;
        script.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js";
        this.doc.head.appendChild(script);
    }

    setup(){
        this.doc = $(this.doc);
        console.log('Predictor 0.1');

        var usertype = $('div.globlogjmeno > table > tbody > tr:nth-child(1) > td:nth-child(2)').text();
        if(usertype != 'žák' && usertype != 'rodič'){
            throw new Error('Unsupported user type.');
        }

        if($('#cphmain_Panelprub').length){
            this.gradesOverview();
        }else{
            throw new Error('Unsupported page.');
        }
    }

    gradesOverview(){
        alert('Fajn, jede to!');
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