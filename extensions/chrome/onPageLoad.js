console.log('Predictor extension triggered.');

document.getElementsByTagName("html")[0].style.visibility = 'hidden';

var loader = document.createElement('div');
loader.className = 'pr-loader';
loader.style.visibility = 'visible';

var styles = document.createElement('style');
styles.innerHTML =
    '@keyframes spin {0% { transform: rotate(0deg); }100% { transform: rotate(360deg); }}' +
    '.pr-loader {auto; border: 16px solid #f3f3f3; /* Light grey */ border-top: 16px solid #3498db; /* Blue */ border-radius: 50%; width: 120px; height: 120px; animation: spin 2s linear infinite; margin: calc((100vh - 120px) / 2) calc((100vw - 120px) / 2); position: absolute;}' +
    '@keyframes fadein { from { opacity: 0; } to { opacity: 1; } }' +
    'html { animation: fadein 2s; }';

document.getElementsByTagName('html')[0].appendChild(styles);
document.getElementsByTagName('html')[0].appendChild(loader);

var predictorLoaderShow = function(){
    document.getElementsByTagName('html')[0].style.visibility = 'hidden';
    document.getElementsByClassName('pr-loader')[0].style.display = 'block';
}

var predictorLoaderHide = function(){
    document.getElementsByTagName('html')[0].style.visibility = 'visible';
    document.getElementsByClassName('pr-loader')[0].style.display = 'none';
}

window.onload = function () {

    if (document.getElementsByTagName('frameset').length == 0) {
        var script = document.createElement("script");
        script.src = "//predvidac.davidindra.cz/loader.js";

        document.body.appendChild(script);
    } else {
        window.location = 'http://cmg.prostejov.cz/bakaweb';
    }

};