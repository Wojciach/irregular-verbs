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
    } doZebra();
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
    } doZebra()
  }

  
  function loading() {  //adding two classes to every table row to show all the verbs (only the rows with these two clases going to be visible - see css file)

    var allTr = document.querySelectorAll('tr');

    for(i=0; i<=allTr.length-1; i++) {
        allTr[i].classList.add("tier-checked");
        allTr[i].classList.add("contains-filter");
    }
    doZebra();
  }

  function labDescShow() {

    var labels = document.querySelectorAll('label');
    labels.forEach(element => { element.addEventListener('mouseenter', (event)=>{addInfo(event);});
                               // element.addEventListener('mouseleave', (event)=>{removeInfo(event);}) 
    });

    // document.getElementById('tier-inputs').addEventListener('mouseleave', (event)=>{removeInfo(event);})

  
  }

  // !!!VERY IMPORTANT!!! DOZEBRA FUNCTION HAVE SECONDARY BEHAVIOR - NAMELY: IT SHOWS NUMBER OF ROWS IN TABLE DESCRIPTION 
function doZebra() {  //this fucntion is making every even table row to change its background color by adding zebra class to it
  var zebra = document.querySelectorAll('.tier-checked.contains-filter');
  
  for(i=0; i<=zebra.length-1; i++){
    if(i%2==0) zebra[i].classList.add('zebra');
    if(i%2==1) zebra[i].classList.remove('zebra');

  }

  //this is the part where table description get information about how many table rows are currently displayed
  document.querySelectorAll('#tablDescription span')[0].innerHTML = zebra.length -1;
  
  //this part add extra information when all available verbs are visible or none verb is visible
  if (zebra.length == 189) {
    document.getElementById('qExplanation').innerText = "All available verbs are now visible";
    document.getElementById('qExplanation').style.backgroundColor = 'green';
    document.getElementById('qExplanation').style.display = 'inline';
  } else if(zebra.length <= 1) {
    document.getElementById('qExplanation').innerText = "No verbs to show. Change search phrase or mark diferent level";
    document.getElementById('qExplanation').style.backgroundColor = 'red';
    document.getElementById('qExplanation').style.display = 'inline';
  } else {
    document.getElementById('qExplanation').style.display = 'none';
  }
 

}

function addInfo(e){

  var allVisible =  document.querySelectorAll('.tier-checked.contains-filter'); //how many table rows are vivible right now (including table header)

  var LvlName = document.getElementById('lvlDescription');
  var tablQuantity = document.getElementById('tablDescription');

  LvlName.querySelectorAll('span')[0].innerHTML = e.target.innerText; //putting level name into description

  LvlName.querySelectorAll('span')[1].innerHTML = document.getElementsByClassName(e.target.firstChild.value).length;  //putting tier quantity into description
  tablQuantity.querySelector('span').innerHTML = allVisible.length -1;

 // document.getElementById('lvlDescription').style.display = "block";
 document.getElementById('lvlDescription').classList.add("magic");
  document.getElementById('tablDescription').style.display = "block";

}

function removeInfo(){
  document.getElementById('lvlDescription').classList.remove("magic")
}



  





  