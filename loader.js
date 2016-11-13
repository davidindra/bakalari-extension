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
        /*if (usertype != 'žák' && usertype != 'rodič') {
            throw new Error('Unsupported user type.');
        }*/

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

        $('body').append(
            '<div class="pr-users"></div>'
        );

        $('div.pr-users').load('/bakaweb/login.aspx?s=-202 table.loglinktable', function(){
            $('div.pr-users table.loglinktable').prepend('<div class="heading">Spojené účty</div>');
        });

        document.getElementsByTagName('html')[0].style.visibility = 'visible';
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

            var g1 = predictor.neededPoints(earnedTotal, maximumTotal, 89.5);
            var g2 = predictor.neededPoints(earnedTotal, maximumTotal, 74.5);
            var g3 = predictor.neededPoints(earnedTotal, maximumTotal, 54.5);
            var g4 = predictor.neededPoints(earnedTotal, maximumTotal, 39.5);

            $(this).find('td.predm:nth-child(2)')
                .attr('title', null)
                .html(
                    `<div data-ot="
                    <!--${earnedTotal} / ${maximumTotal}<br>-->
                    1: ${g1[0] == 'more' ? g1[1] : '0'}/${g1[1]}<br>
                    2: ${g2[0] == 'more' ? g2[1] : '0'}/${g2[1]}<br>
                    3: ${g3[0] == 'more' ? g3[1] : '0'}/${g3[1]}<br>
                    4: ${g4[0] == 'more' ? g4[1] : '0'}/${g4[1]}
                    " class="detprumerdiv pr-grade-${predictor.grade(ratioTotal)}">
                    ${(maximumTotal == 0 ? '-' : (ratioTotal + '% (' + predictor.grade(ratioTotal) + ')'))}
                    </div>`
                );
        });
    }

    grade(percent) {
        if (percent >= 89.5) return 1;
        if (percent >= 74.5) return 2;
        if (percent >= 54.5) return 3;
        if (percent >= 39.5) return 4;
        if (percent >= 0) return 5;
    }

    neededPoints(earned, maximum, limit){
        if(limit / 100 > earned / maximum) {
            return ['more', Math.ceil(((limit * maximum) / 100 - earned) / (1 - (limit / 100)))];
        }else{
            if(limit / 100 == earned / maximum){
                return ['less', 0];
            }else {
                return ['less', (100*earned - limit * maximum)/limit];
            }
        }
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