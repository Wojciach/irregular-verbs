function includeTable() {
    var elmnt = document.querySelector("#verbstable tbody");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status == 200) {elmnt.innerHTML = this.responseText;}
        if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
      }
    };
    //adding tier-checked and contains-filter to every tr element
    xhttp.addEventListener("load", loading);
    xhttp.open("GET", "TABLE.html", true);
    xhttp.send();
    /* Exit the function: */
  	return;
}

//function to run at the website load
function loading() {
  //adding 'label-tier-checked' class to all checked labels
  var labels = QSA("#tier-inputs label");
  labels.forEach(element => {
    element.classList.add('label-tier-checked');
  });
  // adding two classes to every table row to show all the verbs (only the rows with these two clases going to be visible - see css file)
  var allTr = document.querySelectorAll('#verbstable > tbody > tr');
  for(i=0; i<allTr.length; i++) {
      allTr[i].classList.add("tier-checked");
      allTr[i].classList.add("contains-filter");
  }
  finalView();
}
