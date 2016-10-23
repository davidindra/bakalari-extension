class Predictor {
  function Predictor(doc){
    this.doc = doc;

    console.log("Predictor 0.1");
    console.log(this.doc);
  }
}

function launchPredictor(){
  if(predictorLaunched) return;
  var predictorLaunched = true;

  if(document.getElementsByTagName('frameset').length == 0){
   var doc = document;
  }else{
   var doc = parent.frames[1].document;
  }

  var predictor = new Predictor(doc);
}

launchPredictor();
