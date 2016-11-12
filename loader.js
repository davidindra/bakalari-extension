class Predictor {
    constructor(doc) {
        this.doc = doc;

        console.log("Loading jQuery...");
        var script = document.createElement("script");
        script.onload = this.setup;
        script.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js";
        this.doc.head.appendChild(script);
    }

    setup() {
        this.doc = $(this.doc);
        console.log('Predictor 0.1');

        $('head').append(
            '<link type="text/css" href="//predvidac.davidindra.cz/loader.css" rel="stylesheet">' +
            '<link type="text/css" href="//predvidac.davidindra.cz/opentip.css" rel="stylesheet">' +
            '<script type="text/javascript" src="//predvidac.davidindra.cz/opentip-jquery.min.js"></script>'
        );

        var usertype = $('div.globlogjmeno > table > tbody > tr:nth-child(1) > td:nth-child(2)').text();
        if (usertype != 'žák' && usertype != 'rodič') {
            throw new Error('Unsupported user type.');
        }

        if ($('#cphmain_Panelprub').length) {
            predictor.gradesOverview();
        } else {
            predictor.finishSetup();
            throw new Error('Unsupported page.');
        }

        predictor.finishSetup(true);
    }

    finishSetup(active = false) {
        $('body').append(
            '<img style="visibility: hidden;" id="pr-logo"' + (!active ? ' class="grayscale"' : '') + '" src="//predvidac.davidindra.cz/icon-48.png" data-ot="<b>Bakaláři 2</b> ' + (active ? 'aktivní' : 'neaktivní') + '<br>&copy; David Indra">'
        );

        document.getElementsByTagName('html')[0].style.display = 'block';
        document.getElementsByClassName('pr-loader')[0].remove();
    }

    gradesOverview() {
        $('#cphmain_roundprub_RPC > div > div > table > tbody > tr').each(function () {
            var earnedTotal = 0, maximumTotal = 0;
            $(this).find('td.predm:nth-child(4) > table > tbody > tr.detznamka > td').each(function () {
                if ($(this).text().length > 5) {
                    var earned = parseInt($(this).text().split(' ')[0]);
                    var maximum = parseInt($(this).text().split(' ')[1].split('max')[1].split('b')[0]);
                    var valid = false;
                    if (typeof earned == 'number' && typeof maximum == 'number') {
                        earnedTotal += earned;
                        maximumTotal += maximum;

                        valid = true;
                    }
                }

                if (valid) {
                    $(this)
                        .attr('data-ot', $(this).attr('title'))
                        .attr('title', null)
                        .addClass('pr-grade-' + predictor.grade(earned / maximum * 100))
                        .html('<sup>' + earned + '</sup><i>/</i><sub>' + maximum + '</sub>');
                } else {
                    $(this)
                        .attr('data-ot', $(this).attr('title'))
                        .attr('title', null)
                        .addClass('smaller')
                        .html($(this).text());
                }
            });
            var ratioTotal = +(earnedTotal / maximumTotal * 100).toFixed(2);
            $(this).data('predictor', {
                earned: earnedTotal,
                maximum: maximumTotal,
                ratio: ratioTotal
            });

            /*$(this).find('td.predm:nth-child(4) > table > tbody > tr').prepend(
             '<td>' + earnedTotal + '/' + maximumTotal + '</td>'
             );*/

            $(this).find('td.predm:nth-child(2)')
                .attr('title', null)
                .html(
                    '<div data-ot="' + earnedTotal + ' / ' + maximumTotal + '" class="detprumerdiv pr-grade-' + predictor.grade(ratioTotal) + '">' + (maximumTotal == 0 ? '-' : (ratioTotal + '% (' + predictor.grade(ratioTotal) + ')')) + '</div>'
                );

            //$(this).addClass('pr-grade-bg-' + predictor.grade(ratioTotal));
        });
    }

    grade(percent) {
        if (percent >= 89.5) return 1;
        if (percent >= 74.5) return 2;
        if (percent >= 54.5) return 3;
        if (percent >= 39.5) return 4;
        if (percent >= 0) return 5;
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