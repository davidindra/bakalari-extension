function injectPredictor(){
  if(predictorInjected) return;

  if(document.getElementsByTagName('frameset').length == 0){
   var node = document.head;
  }else{
   var node = parent.frames[1].document.head;
  }

  var el = document.createElement("script");
  el.src = "//predvidac.davidindra.cz/loader.js";
  node.appendChild(el);

  var predictorInjected = true;
}

injectPredictor();
