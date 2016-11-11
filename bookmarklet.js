if(!predictorInjected) {
  if(document.getElementsByTagName('frameset').length == 0){
   var head = document.head;
  }else{
   var node = parent.frames[1].document.head;
  }

  var script = document.createElement("script");
  script.src = "//predvidac.davidindra.cz/loader.js";
  head.appendChild(script);

  var predictorInjected = true;
}
