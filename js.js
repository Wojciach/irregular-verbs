

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


  function searchFunction() {
    // Declare variables
    var input, filter, table, tr, td1, td2, td3, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("verbstable");
    tr = table.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 1; i < tr.length; i++) {
      td1 = tr[i].getElementsByTagName("td")[0];
      td2 = tr[i].getElementsByTagName("td")[1];
      td3 = tr[i].getElementsByTagName("td")[2]; 

       tdText = td1.innerText + " "  + td2.innerText + " " + td3.innerText;
      
      if (tdText) {
        
        if (tdText.toUpperCase().indexOf(filter) > -1) {

          tr[i].classList.add("contains-filter");
          
        } else {

          tr[i].classList.remove("contains-filter");
        }
      }
    } 
  }

  function viz(id) {
    var input = document.getElementById(id);
    var selected = document.getElementsByClassName(input.value);
    input.parentElement.classList.toggle('label-tier-checked');
    
    for(i=0; i<=(selected.length-1); i++) {
      

        if (input.checked) {

          selected[i].classList.add("tier-checked");

        }
        else { 

          selected[i].classList.remove("tier-checked");
      }
     
    }

  }

  function loading() {

    var allTr = document.querySelectorAll('tr');

    for(i=0; i<=allTr.length-1; i++) {
        allTr[i].classList.add("tier-checked");
        allTr[i].classList.add("contains-filter");
    }
  }




  





  