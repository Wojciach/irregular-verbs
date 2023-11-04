// shows only verbs which coresponding go search result
function search() { 
    var input = document.getElementById("myInput");
    var filter = input.value.toUpperCase();
    var table = document.getElementById("verbstable");
    var tr = table.getElementsByTagName("tr");
    for(i=1; i < tr.length; i++) {
      for(j=0; j < tr[i].children.length; j++) {
        var tableData = tr[i].children[j].innerText;
        if(tableData.toUpperCase().indexOf(filter) > -1) {
          tr[i].classList.add("contains-filter");
          break;
        } else {
          tr[i].classList.remove("contains-filter");
        }
      }
    }
    finalView();
}

// if label with this level is checked verbs coresponding to that level are going to be displayed
function showOrHideVerbs(id) {
  var input = document.getElementById(id);
  var selected = document.getElementsByClassName(input.value);
  input.parentElement.classList.toggle('label-tier-checked');
  for(i=0; i<=(selected.length-1); i++) {
      if (input.checked) {
        selected[i].classList.add("tier-checked");
      } else { 
        selected[i].classList.remove("tier-checked");
      }
  }
  finalView();
}

function addInfoToLevelLabel(e) {
  //how many table rows are vivible right now (including table header)
  var allVisible =  document.querySelectorAll('.tier-checked.contains-filter'); 
  var LvlName = document.getElementById('lvlDescription');
  var tablQuantity = document.getElementById('tablDescription');
  //adding level name into description
  LvlName.querySelectorAll('span')[0].innerHTML = e.target.innerText; 
  // adding 'stars' and a comment at the end of level description
  var commonness = "";
  switch (e.target.innerText) {
    case 'Level 5': commonness = "★☆☆☆☆ (rarest)"; break;
    case 'Level 4': commonness = "★★☆☆☆"; break;
    case 'Level 3': commonness = "★★★☆☆"; break;
    case 'Level 2': commonness = "★★★★☆"; break;
    case 'Level 1': commonness = "★★★★★ (most common)"; break;
  }
  document.getElementById('stars').innerHTML = "<i>Commonness: </i>" + commonness;
  //adding information how many verbs are in particular level
  LvlName.querySelectorAll('span')[1].innerHTML = document.getElementsByClassName(e.target.firstElementChild.value).length;
  //adding information how many verbs are in the table currently
  tablQuantity.querySelector('span').innerHTML = allVisible.length; 
  //sliding down level description (to show it) and the whole table (to make space)
  document.getElementById('lvlDescription').classList.add("magic");
}

function scrollDown() {
  ID("tableSection").scrollIntoView();
}

function likeDislike(x) {
  if(x.value == 'yes') {
    x.parentElement.parentElement.style.backgroundColor = 'hsla(120, 100%, 30%, .7)';
    document.getElementById('textarea').firstElementChild.classList.remove('magic');
  } else if (x.value == 'no') {
    x.parentElement.parentElement.style.backgroundColor = 'hsla(0, 100%, 40%, .7)';
    document.getElementById('textarea').firstElementChild.classList.add('magic');
    document.getElementById('textarea').firstElementChild.focus();
    setTimeout( function() { window.scrollBy(0, 300);}, 260);
  }
}