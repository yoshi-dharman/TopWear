let notifID = document.getElementById("totalCart");
let dataUserNotif;
let userElement = document.getElementById("userNick");
let signBtn = document.getElementById("signBtn");

let notifCart = () => {
    let iniIDUser = dataUserNotif.id;

    let urlcart = "https://602f36924410730017c51afd.mockapi.io/user/" + iniIDUser + "/cart/";

    fetch(urlcart)
        .then(response => response.json())
        .then(result => {
            if (result == "") {
                notifID.innerHTML = "";
            }
            else {
                notifID.innerHTML = result.length;
            }
            // console.log(result)
        })
        .catch(error => { console.error('error : ', error) })
}

let helloUser = () => {
    userElement.innerText = "Hello, " + dataUserNotif.name;
    signBtn.setAttribute("onclick","logout()");
}


if (localStorage.isLoggedin != "true") {        //Untuk Membedakan user login atau tidak
    notifID.innerHTML = "";
    userElement.remove();
    signBtn.innerText = "Sign In"
    signBtn.setAttribute("href","login.html");
}
else {
    dataUserNotif = JSON.parse(localStorage.user);
    notifCart();
    helloUser();
}

