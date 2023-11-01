
function sendForm() {

    var like = "";
    document.getElementsByName('like')[0].checked ? like = "yes" : like = "no";
    var str = document.getElementById('textarea').firstElementChild.value;

    const production = `sendFeedback.php?feedback=${str}&liked=${like}`;

    fetch(production, {
        mode: 'cors',
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        //display the message from php
        console.log(data);
        document.querySelector('#submInfo').innerHTML = data.msgPHP;
        document.querySelector('#submInfo').style.display = "block";

        //clear the form and disable it after submit
        document.querySelector('#textarea textarea').value = "";
        document.querySelector('#textarea textarea').style.display = "none";
        document.querySelector('#submit input').disabled = "true";
        document.querySelectorAll('#answers input')[0].disabled = "true";
        document.querySelectorAll('#answers input')[1].disabled = "true";
    })
    .catch((e) => {
        console.log("EEEERRRRRORRRR", e);
    });
}
