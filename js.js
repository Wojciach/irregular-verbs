function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
      elmnt = z[i];
      /*search for elements with a certain atrribute:*/
      file = elmnt.getAttribute("w3-include-html");
      if (file) {
        /* Make an HTTP request using the attribute value as the file name: */
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status == 200) {elmnt.innerHTML = this.responseText;}
            if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
            /* Remove the attribute, and call this function once more: */
            elmnt.removeAttribute("w3-include-html");
            includeHTML();
          }
        }
        xhttp.open("GET", file, true);
        xhttp.send();
        /* Exit the function: */
        return;
      }
    } 
  }

  function myFunction() {
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
          tr[i].style.display = "";
          tr[i].classList.add("zebra");
          if (input.value == "") {tr[i].classList.remove("zebra");}
          
        } else {
          tr[i].style.display = "none";
          tr[i].classList.remove("zebra");
        }
      }
    } if (input.value == "") {}
  }

  function viz(id) {
    var input = document.getElementById(id);
    var selected = document.getElementsByClassName(input.value);

    for(i=0; i<=(selected.length-1); i++) {
      input.checked ? selected[i].style.display = "" : selected[i].style.display = "none";
     
    }
      
   

    

  }

  