// adding extra details to filal view of the website
function finalView() { 
    var allViz = document.querySelectorAll('.tier-checked.contains-filter');
    doZebra(allViz);
    rowsQuan(allViz);
    extraInfo(allViz);
    setQwidth(allViz);
}

// adding colors to every odd and even table rows
function doZebra(allViz) {
    for(i=0; i<allViz.length; i++){
      if(i%2==0) allViz[i].classList.add('zebraEven'); else allViz[i].classList.remove('zebraEven');
      if(i%2==1) allViz[i].classList.add('zebraOdd'); else allViz[i].classList.remove('zebraOdd');
    }
}

// table description get information about how many table rows are currently displayed
function rowsQuan(allViz) { 
    document.querySelectorAll('#tablDescription span')[0].innerHTML = allViz.length;
}

// add extra information when all available verbs are visible or not a verb is visible
function extraInfo(allViz) {
    var description = document.getElementById('qExplanation');
    var fullTable = document.querySelectorAll('#verbstable > tbody > tr').length;
    if (allViz.length == fullTable) {
      description.innerText = "☑ All available verbs are now visible ☑ ";
      description.classList.remove("dsplNothing");
      description.classList.remove("dsplSomething");
      description.classList.add("dsplAll");
      description.style.display = 'inline';
    } else if (allViz.length < fullTable && allViz.length > 0) {
      description.innerText = "Change search phrase or tick more levels to see more verbs.";
      description.classList.remove("dsplNothing");
      description.classList.remove("dsplAll");
      description.classList.add("dsplSomething");
      description.style.display = 'inline';
    } else if (allViz.length == 0) {
      description.innerText = "☒ No verbs to show. ☒ Change search phrase or tick different level to see more verbs.";
      description.classList.remove("dsplAll");
      description.classList.remove("dsplSomething");
      description.classList.add("dsplNothing");
      description.style.display = 'inline';
    } else {
      description.style.display = 'none';
    }
}

function setQwidth(allViz) {
    var input = ID("questionQuantity");
    var width = QSA(".label-tier-checked").length;
    input.style.width = (width * 20) + "%";
    input.max = allViz.length;
    ID("max").innerHTML = "max " + allViz.length;
    if (allViz.length == 0) {
      showVal(0); return
    };
    showVal(ID("questionQuantity").value);
}
