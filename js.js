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
        xhttp.open("GET", "NEWBASETABLE.html", true);
        xhttp.send();
        /* Exit the function: */
        return;
      }
      
  // shows only verbs which coresponding go search result
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
    } finalView();
  }

  // if label with level is checked verbs coresponding to that level are going to be displayed 
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
    } finalView()
  }

  // adding two classes to every table row to show all the verbs (only the rows with these two clases going to be visible - see css file)
  function loading() {  
    var allTr = document.querySelectorAll('#verbstable > tbody > tr');

    for(i=0; i<allTr.length; i++) {
        allTr[i].classList.add("tier-checked");
        allTr[i].classList.add("contains-filter");
    }
    finalView();
  }

  function labDescShow() {

    var labels = document.querySelectorAll('#tier-inputs > label');
    labels.forEach(element => { element.addEventListener('mouseenter', (event)=>{addInfo(event);});
                               // element.addEventListener('mouseleave', (event)=>{removeInfo(event);}) 
    });

    // hidding level description 
    document.getElementById("verbstable").addEventListener("mouseenter", removeInfo);
    document.getElementById("intro").addEventListener("mouseenter", removeInfo);

  }



function addInfo(e){
  //how many table rows are vivible right now (including table header)
  var allVisible =  document.querySelectorAll('.tier-checked.contains-filter'); 

  var LvlName = document.getElementById('lvlDescription');
  var tablQuantity = document.getElementById('tablDescription');

  //adding level name into description
  LvlName.querySelectorAll('span')[0].innerHTML = e.target.innerText; 

  // adding 'stars' and a comment at the end of level description
    var commonness = "";
    switch(e.target.innerText){
      case 'Level 5': commonness = "★☆☆☆☆ (rarest)"; break;
      case 'Level 4': commonness = "★★☆☆☆"; break;
      case 'Level 3': commonness = "★★★☆☆"; break;
      case 'Level 2': commonness = "★★★★☆"; break;
      case 'Level 1': commonness = "★★★★★ (most common)"; break;
    }
    document.getElementById('stars').innerHTML = "<i>Commonness: </i>" + commonness;
    
  //adding information how many verbs are in particular level
  LvlName.querySelectorAll('span')[1].innerHTML = document.getElementsByClassName(e.target.firstChild.value).length;
  
  //adding information how many verbs are in the table currently
  tablQuantity.querySelector('span').innerHTML = allVisible.length; 

  //sliding down level description (to show it) and the whole table (to make space)
  document.getElementById('lvlDescription').classList.add("magic");
  document.getElementById('tableSection').classList.add("moveDown");
 
}

//sliding up level description (to hide it) and the whole table (to get rid of the gap)
function removeInfo(){
  document.getElementById('lvlDescription').classList.remove("magic");
  document.getElementById('tableSection').classList.remove("moveDown");
  
}

// adding extra details to filal view of the website
function finalView() { 
  var allViz = document.querySelectorAll('.tier-checked.contains-filter');
  doZebra(allViz);
  rowsQuan(allViz);
  extraInfo(allViz);
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
    }

    else if(allViz.length < fullTable && allViz.length > 0) {

      description.innerText = "Change search phrase or tick more levels to see more verbs.";

      description.classList.remove("dsplNothing");
      description.classList.remove("dsplAll");

      description.classList.add("dsplSomething");

      description.style.display = 'inline';

    } 
    else if(allViz.length == 0) {

      description.innerText = "☒ No verbs to show. ☒ Change search phrase or tick different level to see more verbs.";

      description.classList.remove("dsplAll");
      description.classList.remove("dsplSomething");

      description.classList.add("dsplNothing");

      description.style.display = 'inline';
      
    } else {
      description.style.display = 'none';
    }
   
  }
  
  function color(x) {
    if(x.value == 'yes') {
       
      x.parentElement.parentElement.style.backgroundColor = 'hsla(120, 100%, 30%, .7)';
      document.getElementById('textarea').firstElementChild.classList.remove('magic');
    }
    else if (x.value == 'no') {
      
      x.parentElement.parentElement.style.backgroundColor = 'hsla(0, 100%, 40%, .7)';
      
      document.getElementById('textarea').firstElementChild.classList.add('magic');
      document.getElementById('textarea').firstElementChild.focus();
     
      setTimeout( function() { window.scrollBy(0, 300);}, 260);

    }
    
  }

  function send() {

      var like = "";    
      document.getElementsByName('like')[0].checked ? like = "yes" : like = "no";
      console.log("yes or no: " + like)
     

      var str = document.getElementById('textarea').firstElementChild.value;
      console.log("just after setting str, str: " + str);

      const xhttp = new XMLHttpRequest();
      xhttp.onload = function() {

        console.log("THIS RESPONSE: " +  this.responseText)
       
        var resp = JSON.parse(this.responseText);

        document.querySelector('#survey div').innerHTML = resp.msgPHP;
        
          document.querySelector('#survey div').style.display = "block";
        
        
        console.log(resp.msgPHP);

        
      }
      xhttp.open("GET", "sendFeedback.php?feedback=" + str + "&liked=" + like );
      xhttp.send();
    }

  

/*
  function decode(str) {

    let txt = new DOMParser().parseFromString(str, "text/html");
    
    return txt.documentElement.textContent;
    
    }
 */
  