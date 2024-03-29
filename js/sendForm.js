function sendForm() {
    var like = "";
    document.getElementsByName('like')[0].checked ? like = "yes" : like = "no";
    var str = ID('textarea').firstElementChild.value;

    const productionAddress = `./php/sendFeedback.php?feedback=${str}&liked=${like}`;
    fetch(productionAddress, {
        mode: 'cors',
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        //display the message from php
        //console.log(data);
        QS('#submInfo').innerHTML = data.msgPHP;
        QS('#submInfo').style.display = "block";

        //clear the form and disable it after submit
        QS('#textarea textarea').value = "";
        QS('#textarea textarea').style.display = "none";
        QS('#submit input').disabled = "true";
        QSA('#answers input')[0].disabled = "true";
        QSA('#answers input')[1].disabled = "true";
        QS('#answers').classList.add("greyedOut");
    })
    .catch((e) => {
        console.log("EEEERRRRRORRRR", e);
        QS('#submInfo').innerHTML = "Sorry ;( <br> Error occured.";
        QS('#submInfo').style.display = "block";
    });
}
