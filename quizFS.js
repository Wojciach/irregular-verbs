var verForQuiz;     //all verbs which from the quiz is going to be created (checked level)
var fs_cntr = 0;    //which question (verb) is displayed at the moment
var fs_qty = 0;     //information how many questions are in the current quiz
var quizQuan = 0;   //how many questions are going to be in the quiz
var arrayForQuiz = document.createElement('table');
var arrUserInput = document.createElement('table');
var ifRandom = true;    //if questions are going to be randomized

function FSmode() {
    //capture all needed data before "fetch" and website reload
    //taking all the verbs that possibly may be used in the quiz
    verForQuiz = document.querySelectorAll('.tier-checked.contains-filter');
    //check how many questions in the quiz user wants
    quizQuan = ID('qQ').value;
    //check if user wants questions to be randomized
    ifRandom = QSA('input[name="randomized"]:checked')[0].value;
    fetch("./quizFS.html", { cache: "no-store" })
        .then(response => {return response.text()})
        .then(data => QSA('body')[0].innerHTML = data)
        .then(()=>{QSA("#counter-FS span")[1].innerHTML = fs_qty;})
        .then(loadData)
    fs_cntr = 0;
    fs_qty = ID('qQ').value;
}

function counter(id) {
    takeInput();
    if (id == "next" && fs_cntr == fs_qty-1) {
        endQuiz(); return;
    } else if (id == "next" && fs_cntr < fs_qty-1) {
        fs_cntr ++ ;
    } if (id == "previous" && fs_cntr == 0) {
        return; 
    } else if (id == "previous" && fs_cntr > 0) {
        fs_cntr -- ;
    }

    if((fs_cntr +1) == fs_qty) showButton();
    if((id == "previous") && ((fs_cntr +1) < fs_qty)) hideButton();
    nextInput(fs_cntr);
    QSA("#counter-FS span")[0].innerHTML = fs_cntr +1;
}

function refresh() {
    if (confirm("End the quiz?") == true) {
        location.replace(location.href);
    } 
}

function clearrr() {
    QSA('#verb-FS input')[0].value = "";
    QSA('#verb-FS input')[1].value = "";
}

function loadData() {
    arrayForQuiz = prepareQuiz();
    arrUserInput = arrayForQuiz.cloneNode(true);
    clearInputs();
    QSA('#theVerb-FS b')[0].innerHTML = arrayForQuiz.children[0].children[0].innerHTML;
}

function clearInputs() {
    for(i=0; i<arrUserInput.children.length; i++) {
        arrUserInput.children[i].children[1].innerHTML = "";
        arrUserInput.children[i].children[2].innerHTML = "";
    }
}

function prepareQuiz() {
    //crating empty arrat for every verb we possibly need
    var arr = crArr(verForQuiz.length); 
    //creatin an subsidiary array which going to contain idexes of future quiz questions (it can be randomized if needed)
    var randArr;
    if(ifRandom == "true") randArr = shuffle(arr); else randArr = arr;
    //making array which specified number of records and asigning data to it
    for(i=0; i<quizQuan; i++) {
        //cloning original node with verbs to prevent data disapearing in uncontrollable way
        //also using randArr[] as array which contains randomized or not indexes for asaining elements from verForQuiz
        var randomEl = verForQuiz[randArr[i]].cloneNode(true);
        arrayForQuiz.appendChild(randomEl);              
    }
    return arrayForQuiz;   
}

//making an empty array to contain all verbs available
function crArr(hLong) {
    var arr = [];
    for(i=0; i<hLong; i++) {
        arr.push(i);
    }
    return arr;
}

//randomize array with verbs to display it in random order
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

//taking answers that user gave for quiz questions
function takeInput() {
    arrUserInput.children[fs_cntr].children[1].innerHTML = ID('pastSimIn').value.toLowerCase().trim();
    arrUserInput.children[fs_cntr].children[2].innerHTML = ID('pastParIn').value.toLowerCase().trim();
}

//showing next page with users answers if given if not showing empty form fields
function nextInput(fs_cntr) {
    QSA('#theVerb-FS b')[0].innerHTML = arrayForQuiz.children[fs_cntr].children[0].innerHTML;
    ID('pastSimIn').value = arrUserInput.children[fs_cntr].children[1].innerHTML;
    ID('pastParIn').value = arrUserInput.children[fs_cntr].children[2].innerHTML;
}

//sets of conditions to make quiz interface operable by keyboard
function focusNext(id) {
    if(this.event.key == "Enter") {
        if(id == 'pastSimIn') ID("pastParIn").focus();
            if(id == 'pastParIn') {
                counter("next");
                ID("pastSimIn").focus();
            } 
    }
    else if(this.event.key == "ArrowLeft" && this.event.target.value == "") counter("previous");
    else if(this.event.key == "ArrowRight" && this.event.target.value == "") counter("next");
    else if(this.event.key == "ArrowUp")  ID("pastSimIn").focus();
    else if(this.event.key == "ArrowDown")  ID("pastParIn").focus();
}

function showButton() {
    ID('END').style.animationName = "animateShow";
}

function hideButton() {
    ID('END').style.animationName = "animateHide";
}

function endQuiz() {
    takeInput();
    if(confirm("Do you want end the quiz and chech results?")) checkResults();
}

//comparing users responses with original data using regExp
function checkResults() {
    for(i=0; i<arrayForQuiz.children.length; i++) {
        var input = arrUserInput.children[i];
        var origin = arrayForQuiz.children[i];
        input.classList.remove("zebraOdd");
        input.classList.remove("zebraEven");
        for(j=1; j<3; j++) {
            //exeption when ellipsis is in the original just add "correct" class
            var dots = /…/;
            if (dots.test(origin.children[j].innerHTML)) input.children[j].classList.add("correct");

            if (input.children[j].innerHTML != "" && input.children[j].innerHTML != " / ") {
                var regEx = new RegExp(`\\b${input.children[j].innerHTML}\\b`);
                if(regEx.test(origin.children[j].innerHTML)) {
                    input.children[j].classList.add("correct");
                //exeption if user omits slash
                } else if (origin.children[j].innerHTML == "was / were" && input.children[j].innerHTML == "was were") {
                    input.children[j].classList.add("correct");
                } else {
                    input.children[j].classList.add("wrong");
                }
            } else {
                input.children[j].classList.add("wrong");
            }
        }
    }
    showResults();
}

function showCorrect() {
    const parentIndex = getIndex(this.parentNode);
    const childIndex = getIndex(this);
    //parentIndex is decreased by 1 because of one table row is added to table element
    if(arrayForQuiz.children[parentIndex-1].children[childIndex].innerHTML != "") {
        this.innerHTML = arrayForQuiz.children[parentIndex-1].children[childIndex].innerHTML;
    } else {
        this.innerHTML = "";
    }
    this.classList.remove("wrong");
    this.classList.add("correction");
}

function hideCorrect() {
    const parentIndex = getIndex(this.parentNode);
    const childIndex = getIndex(this);
    this.classList.remove("correction");
    this.classList.add("wrong");
    //parentIndex is decreased by 1 because of one table row is added to table element
    if(arrUserInput.children[parentIndex-1].children[childIndex].innerHTML != "") { 
        this.innerHTML = arrUserInput.children[parentIndex-1].children[childIndex].innerHTML;
    } else {
        this.innerHTML = "";
    }
}

function getIndex(element) {
    // Get the parent element of the element
    const parent = element.parentNode;
    // Get a list of the child nodes of the parent element
    const children = parent.children;
    // Find the index of the element within the list of child nodes
    return Array.prototype.indexOf.call(children, element);
}

function showResults() {
    var body = QSA('body')[0];
    body.innerHTML = "";
    var main = document.createElement("main");
    main.setAttribute("id", "main");
    var article = document.createElement("article");
    var section = document.createElement("section");
    section.setAttribute("id", "tableSection");
    var table = arrUserInput.cloneNode(true);
    table.setAttribute("id", "verbstable");
    table.insertBefore(th, table.firstChild);
    section.appendChild(table);
    article.appendChild(section);
    main.appendChild(article);
    body.appendChild(main);
    var allViz = document.querySelectorAll('.tier-checked.contains-filter');
    doZebra(allViz);
    var wrongs = QSA("#verbstable > tr > td.wrong");
    for(i=0; i<wrongs.length; i++) {
        for(i=0; i<wrongs.length; i++) {
            wrongs[i].addEventListener("mouseover", showCorrect);
            wrongs[i].addEventListener("mouseleave", hideCorrect);
        }
    }
    addResultsSumarry();
}

function addResultsSumarry() {
    //how many naswers were wrong or correct
    var correct = QSA(".correct").length;
    var wrong = QSA(".wrong").length;
    //function for displaying results in percentages
    function toPercent(num) {
        return `${parseFloat(num * 100).toFixed(0)}%`;
    }
    //adding divs to display results of the quiz
    var div = document.createElement("div");
    div.setAttribute('id', 'quizResult');
    var wrongDIV = document.createElement("div");
    wrongDIV.classList.add('wrong');
    wrongDIV.innerHTML = "wrong: " + wrong + "<br/><b>" + toPercent(wrong/(correct + wrong)) + "</b>";
    var correctDIV = document.createElement("div");
    correctDIV.classList.add('correct');
    correctDIV.innerHTML = "correct: " + correct + "<br/><b>" + toPercent(correct/(correct + wrong)) + "</b>";
    var sumDIV = document.createElement("div");
    sumDIV.classList.add('sum');
    sumDIV.innerHTML = "sum: " + (correct + wrong) + "<br/>" + "100%";
    div.appendChild(correctDIV);
    div.appendChild(wrongDIV);
    div.appendChild(sumDIV);
    var resetButton = document.createElement("button");
    resetButton.classList.add("resetButton");
    resetButton.innerHTML = "reset";
    resetButton.addEventListener("click", refresh);
    ID("tableSection").appendChild(div);
    ID("tableSection").appendChild(resetButton);
}
