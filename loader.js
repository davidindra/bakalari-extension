class Predictor {
  Predictor(doc){
    this.doc = doc;

    console.log("Predictor 0.1");
    console.log(this.doc);
  }
}

if(predictorLaunched) throw new Error("Predictor already launched.");

if(document.getElementsByTagName('frameset').length == 0){
 var doc = document;
}else{
 var doc = parent.frames[1].document;
}

var predictor = new Predictor(doc);

var predictorLaunched = true;
