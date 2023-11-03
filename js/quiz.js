function quizFirstStep() {
    ID('myInput').value = "";
    search();
    rem();

    var labels = document.querySelectorAll('#tier-inputs > label');
    labels.forEach(element => { 
        element.removeEventListener('mouseenter', slideDown);
    });
    ID('quizInfo').classList.toggle('magic');
    ID('lvlDescription').classList.toggle('magic');
    ID('quizBTN').classList.toggle('dsplNothing');
    if (ID('quizInfo').classList.contains('magic')) {
        ID('myInput').style.display = "none";
        ID('myInput').setAttribute("disabled", true);
        ID('quizBTN').childNodes[0].nodeValue = "End the quiz";
        ID('quizInfo').insertBefore(ID('levDesc'), ID('quizControls'));
        ID("intro").removeEventListener("mouseenter", removeInfo);
        ID("verbstable").removeEventListener("mouseenter", removeInfo);
        ID("lvlDescription").style.position = "relative";
        ID("quizInfo").style.position = "relative";
    } else {
        ID('myInput').style.display = "block";
        ID('myInput').removeAttribute("disabled");
        ID('quizBTN').childNodes[0].nodeValue = "Take a quiz";
        document.querySelector('#main > article').insertBefore(ID('levDesc'), ID('tableSection'));
        ID("lvlDescription").style.position = "absolute";
        ID("quizInfo").style.position = "absolute";
        labels.forEach(element => { 
            element.addEventListener('mouseenter', slideDown);
        });
        labDescShow();
    }
}

function showVal(x) {
    if(x === 0) {
        ID('val').innerHTML = "You cannot start the quiz unless you choose at least one level";
        ID('val').classList.add("dsplNothing");
    } else {
        ID('val').classList.remove("dsplNothing");
        (x == 1) ? ID('val').innerHTML = x + " question" : ID('val').innerHTML = x + " questions";
    }
}



function rem() {
    ID('tableSection').classList.remove("moveDown");
}
