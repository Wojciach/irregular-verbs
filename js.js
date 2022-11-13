function includeHTML() {

        var elmnt = document.querySelector("#verbstable tbody");
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status == 200) {elmnt.innerHTML = this.responseText;}
            if (this.status == 404) {elmnt.innerHTML = "Page not found.";}

          }
        }
        xhttp.addEventListener("load", loading); //adding tier-checked and contains-filter to every tr element
        xhttp.open("GET", "BASETABLE.html", true);
        xhttp.send();
        /* Exit the function: */
        return;
      }
      

  function search() { //shows only verbs which corespondinf go search result

   var input = document.getElementById("myInput");
   var filter = input.value.toUpperCase();
   var table = document.getElementById("verbstable");
   var tr = table.getElementsByTagName("tr");
   

    for(i=1; i < tr.length; i++){
      for(j=0; j < tr[i].children.length; j++) {
        var tableData = tr[i].children[j].innerText;
        if(tableData.toUpperCase().indexOf(filter) > -1) {
          tr[i].classList.add("contains-filter");
          break;
        } else {
          tr[i].classList.remove("contains-filter");
        }
      }
    } finalView();
  }


  function viz(id) { //if label with level is checked verbs coresponding to that level are going to be displayed 

    var input = document.getElementById(id);
    var selected = document.getElementsByClassName(input.value);
    input.parentElement.classList.toggle('label-tier-checked');
    
    for(i=0; i<=(selected.length-1); i++) {
        if (input.checked) {
          selected[i].classList.add("tier-checked");
        } else { 
          selected[i].classList.remove("tier-checked");
        }
    } finalView()
  }

  
  function loading() {  //adding two classes to every table row to show all the verbs (only the rows with these two clases going to be visible - see css file)

    var allTr = document.querySelectorAll('tr');

    for(i=0; i<=allTr.length-1; i++) {
        allTr[i].classList.add("tier-checked");
        allTr[i].classList.add("contains-filter");
    }
    finalView();
  }

  function labDescShow() {

    var labels = document.querySelectorAll('label');
    labels.forEach(element => { element.addEventListener('mouseenter', (event)=>{addInfo(event);});
                               // element.addEventListener('mouseleave', (event)=>{removeInfo(event);}) 
    });

    document.getElementById("verbstable").addEventListener("mouseenter", removeInfo);
    document.getElementById("intro").addEventListener("mouseenter", removeInfo);

  }



function addInfo(e){

  var allVisible =  document.querySelectorAll('.tier-checked.contains-filter'); //how many table rows are vivible right now (including table header)

  var LvlName = document.getElementById('lvlDescription');
  var tablQuantity = document.getElementById('tablDescription');

  LvlName.querySelectorAll('span')[0].innerHTML = e.target.innerText; //putting level name into description

  var commonness = "";
  if(e.target.innerText == 'Level 5') commonness = "★";
  if(e.target.innerText == 'Level 4') commonness = "★★";
  if(e.target.innerText == 'Level 3') commonness = "★★★";
  if(e.target.innerText == 'Level 2') commonness = "★★★★";
  if(e.target.innerText == 'Level 1') commonness = "★★★★★";

  
  commonness = commonness.padEnd(5, "☆");

  document.getElementById('stars').innerHTML = "<i>Commonness: </i>" + commonness;
    

  LvlName.querySelectorAll('span')[1].innerHTML = document.getElementsByClassName(e.target.firstChild.value).length;  //putting tier quantity into description
  tablQuantity.querySelector('span').innerHTML = allVisible.length -1;

 document.getElementById('lvlDescription').classList.add("magic");
 document.getElementById('tableSection').classList.add("moveDown");
 
}

function removeInfo(){
  document.getElementById('lvlDescription').classList.remove("magic");
  document.getElementById('tableSection').classList.remove("moveDown");
  
}


function finalView() { //adding extra details to filal view of the website
  var allViz = document.querySelectorAll('.tier-checked.contains-filter');
  doZebra(allViz);
  rowsQuan(allViz);
  extraInfo(allViz);
}

  
  function doZebra(allViz) {  // adding colors to every odd and even table rows
    
    for(i=0; i<=allViz.length-1; i++){
      if(i%2==0) allViz[i].classList.add('zebraEven'); else allViz[i].classList.remove('zebraEven');
      if(i%2==1) allViz[i].classList.add('zebraOdd'); else allViz[i].classList.remove('zebraOdd');
    }
  }

  function rowsQuan(allViz) { //table description get information about how many table rows are currently displayed
    
    document.querySelectorAll('#tablDescription span')[0].innerHTML = allViz.length -1;
  }

  function extraInfo(allViz) { // add extra information when all available verbs are visible or none verb is visible

    var description = document.getElementById('qExplanation');
    
    if (allViz.length == 189) {

      description.innerText = "☑ All available verbs are now visible ☑ ";

      description.classList.remove("dsplNothing");
      description.classList.add("dsplAll");

      description.style.display = 'inline';

    } else if(allViz.length <= 1) {

      description.innerText = "☒ No verbs to show. ☒ Change search phrase or check diferent level ☒";

      description.classList.remove("dsplAll");
      description.classList.add("dsplNothing");

      description.style.display = 'inline';
      
    } else {
      description.style.display = 'none';
    }
   
  
  }
  





  