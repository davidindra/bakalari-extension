if(document.getElementsByTagName('frameset').length == 0){
 var node = document.head;
}else{
 var node = parent.frames[1].document.head;
}

alert("We're live!");
