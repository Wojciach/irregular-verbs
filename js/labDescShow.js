function labDescShow() {
    var labels = document.querySelectorAll('#tier-inputs > label');
    labels.forEach(element => {
      element.addEventListener('mouseenter', (event)=>{addInfoToLevelLabel(event);});
      element.addEventListener('mouseenter', slideDown);
    });
    // hidding level description 
    ID("verbstable").addEventListener("mouseenter", removeInfo);
    ID("intro").addEventListener("mouseenter", removeInfo);
  }

  function slideDown() {
    ID('tableSection').classList.add("moveDown");
  }

//sliding up level description (to hide it) and the whole table (to get rid of the gap)
function removeInfo() {
  ID('lvlDescription').classList.remove("magic");
  ID('tableSection').classList.remove("moveDown");
}
