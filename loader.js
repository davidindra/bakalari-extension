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
            predictor.gradesOverview();
        }else{
            throw new Error('Unsupported page.');
        }
    }

    gradesOverview(){
        $('#cphmain_roundprub_RPC > div > div > table > tbody > tr').each(function(){
            var earnedTotal = 0, maximumTotal = 0;
            $(this).find('td:nth-child(4) > table > tbody > tr > td').each(function(){
                if($(this).text().length > 5) {
                    var earned = parseInt($(this).text().split(' ')[0]);
                    var maximum = parseInt($(this).text().split(' ')[1].split('max')[1].split('b')[0]);
                    if (typeof earned == 'number' && typeof maximum == 'number') {
                        earnedTotal += earned;
                        maximumTotal += maximum;
                    }
                }
            });
            $(this).attr('data-earned', earnedTotal);
            $(this).attr('data-maximum', maximumTotal);
            $(this).attr('data-ratio', +(earnedTotal / maximumTotal * 100).toFixed(2));
        });
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