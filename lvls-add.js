export function addLevelButtons() {

    var centerText = document.getElementById("textCenter");

    if(document.querySelectorAll("#textCenter #levDesc").length > 0) {return;}

   var clone = document.getElementById('levDesc').cloneNode(true);

   document.getElementById("textCenter").innerHTML = "";
   centerText.appendChild(clone);
   labDescShow();

   if (document.querySelectorAll('#levDesc').length > 1) document.querySelectorAll('#levDesc')[0].remove();



    var div = document.createElement("div");
    div.setAttribute("id" , 'info');
    centerText.insertBefore(div, clone);

  var inputs = clone.querySelectorAll("#tier-inputs > label > input");

  inputs.forEach(element => {
    element.addEventListener("change", () => {showHowMany(); adjustText();});
  });
   
  function showHowMany() {
    var allVisible =  document.querySelectorAll('.tier-checked.contains-filter');
    centerText.querySelectorAll("div")[0].innerText = allVisible.length + " verbs are included in the quiz";
    range.setAttribute("max" , allVisible.length);

    range.value = (range.max / 2);

    return allVisible.length;
  }

  var range = document.createElement("input");
  
    range.setAttribute("id" , 'range');
    range.setAttribute("type" , 'range');
    range.setAttribute("min" , '0');
    range.setAttribute("max" , showHowMany());
    range.setAttribute("value" , '0');

    

var div2 = document.createElement("div");
    div2.setAttribute("id", "rangeDiv");

  var text = document.createTextNode(range.value);

  div2.appendChild(text);
  div2.appendChild(range);
  centerText.appendChild(div2);

 var text = document.querySelectorAll('#rangeDiv')[0].childNodes[0];

 range.after(text);
 

//range.addEventListener("change", adjustText);

range.addEventListener("click", adjustText);

function adjustText() { 
    
    text.nodeValue = range.value + " questions in the quiz";
    console.log(range.value);
   
}

var startDiv = document.createElement('div');
var quizStartBTN = document.createElement('button'); quizStartBTN.setAttribute("onclick", "woda()");
var BTNtext = document.createTextNode("START QUIZ!");

startDiv.setAttribute("id", "startBTN");

quizStartBTN.appendChild(BTNtext);
startDiv.appendChild(quizStartBTN);

document.getElementById('textCenter').appendChild(startDiv);




}

