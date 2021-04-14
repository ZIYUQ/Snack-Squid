// Get the modal
var modal01 = document.getElementById('id01');
var modal02 = document.getElementById('id02');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal01) {
        modal01.style.display = "none";
    }
    if (event.target == modal02) {
        modal02.style.display = "none";
    }
}

function disappear() {
    modal01.style.display = "none";
}

const { Customers } = require('../model/customers')

var login_uname = document.getElementById('login_uname');
var login_psw = document.getElementById('login_psw');


function login() {
    console.log('12345');
    //let result = Customers.find({email_address: login_uname, password: login_psw}, {})
    console.log('12122345');
}


