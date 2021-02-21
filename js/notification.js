let notifID = document.getElementById("totalCart");
let dataUserNotif;


let notifCart = () => {
    let iniIDUser = dataUserNotif.id;

    let urlcart = "https://602f36924410730017c51afd.mockapi.io/user/"+iniIDUser+"/cart/";

  fetch(urlcart)
  .then(response => response.json())
  .then(result => {
    if(result == ""){
        notifID.innerHTML = "";
    }
    else{
        notifID.innerHTML = result.length;
    }
    // console.log(result)
  })
  .catch(error => {console.error('error : ', error)})
}


if(localStorage.isLoggedin != "true"){
    notifID.innerHTML = "";
}
else{
    dataUserNotif = JSON.parse(localStorage.user);
    notifCart();
}

