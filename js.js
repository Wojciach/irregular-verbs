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
      

  function search() {

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


  function viz(id) {

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

  
  function loading() {

    var allTr = document.querySelectorAll('tr');

    for(i=0; i<=allTr.length-1; i++) {
        allTr[i].classList.add("tier-checked");
        allTr[i].classList.add("contains-filter");
    }
    doZebra();
  }

  function labDescShow() {

    var labels = document.querySelectorAll('label');
    labels.forEach(element => { element.addEventListener('mouseenter', (event)=>{/*showDescription(event);*/ addInfo(event);});
                               /* element.addEventListener('mouseleave', (event)=>{hideDescription(event);}) */
    });


  
  }
/*
function showDescription(e) {
  var elemetToHide = document.querySelectorAll('#lvlDescriptions p');
  elemetToHide.forEach(el => el.style.display = "none");
  var elementToShow = document.getElementById(e.target.firstChild.value);
  
  elementToShow.style.display = "block";

}
*/
function doZebra() {
  var zebra = document.querySelectorAll('.tier-checked.contains-filter');
  
  for(i=0; i<=zebra.length-1; i++){
    if(i%2==0) zebra[i].classList.add('zebra');
    if(i%2==1) zebra[i].classList.remove('zebra');

  }

  document.getElementsByTagName('span')[1].innerHTML = zebra.length -1;
 

}

function addInfo(e){

  var allVisible =  document.querySelectorAll('.tier-checked.contains-filter');

  var LvlName = document.getElementById('lvlDescription');
  var tablQuantity = document.getElementById('tablDescription');

  LvlName.querySelector('span').innerHTML = e.target.innerText;
  tablQuantity.querySelector('span').innerHTML = allVisible.length -1;

  document.getElementById('lvlDescription').style.display = "block";
  document.getElementById('tablDescription').style.display = "block";
  
  console.log(e.target.innerText);
}



  





  