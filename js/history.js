let dataUser;

if(localStorage.isLoggedin != "true"){
    window.location.replace("login.html");
    alert('Anda Belum Login');
}
else{
    dataUser = JSON.parse(localStorage.user);
}

const display = (result) => {

    let parentID = document.getElementById("cartID");
    parentID.innerHTML = "";
    result.reverse();
    //ambil data baju di katalog
    result.forEach(item => {
        let urlKatalog = "https://602f36924410730017c51afd.mockapi.io/katalog/"+item.idKatalog;
        fetch(urlKatalog)
        .then(response => response.json())
        .then(result => {
            let cartData = document.createElement("div");
            cartData.setAttribute("id","cartID-"+item.id);
            cartData.setAttribute("idKatalog","katalogID-"+item.idKatalog);
            cartData.setAttribute("class","col-12 d-flex justify-content-lg-between justify-content-around align-items-center mb-3");
            cartData.innerHTML = `
                <div class="cart-detail d-lg-flex text-center text-lg-start align-items-center">
                    <div onclick="openGallery(${result.id})" class="cart-image border-1 border shadow hover-cursor-pointer">
                        <img class="img-fluid" src="${result.image[0]}" alt="">
                    </div>
                    <div class="fw-bold ms-3">
                        <p class="my-2">${result.nama}</p>
                        <p data="price" class="my-2">Rp. ${result.price}</p>
                    </div>
                </div>
                
                <div class="">
                    <span data="quantity" id="itembarang-${result.id}" class="mx-2 fw-bold">Quantity : ${item.quantity}</span>
                </div>
            `;
            parentID.appendChild(cartData);
        })
        .catch(error => {console.error('error : ', error)})
    });

}

const getDataCart = () => {
    let iniIDUser = dataUser.id;

    let urlcart = "https://602f36924410730017c51afd.mockapi.io/user/"+iniIDUser+"/history/";

  fetch(urlcart)
  .then(response => response.json())
  .then(result => {
    if(result == ""){
        displayEmptyCart();
    }
    else{
        display(result)
    }
    // console.log(result)
  })
  .catch(error => {console.error('error : ', error)})
}

getDataCart();

const clearHistory = () => {
    let iniIDUser = dataUser.id;
    let cartID = document.querySelectorAll('[id^="cartID-"]');

    let promises = [];
    cartID.forEach(item => {
        let id = parseInt(item.id.match(/\d+/g));

        let urlHistory = "https://602f36924410730017c51afd.mockapi.io/user/"+iniIDUser+"/history/"+id;
        promises.push(fetch(urlHistory,
            {
                method: "DELETE",
                headers: {'Content-Type': 'application/json'},
            }));

        document.getElementById(`cartID-${id}`).remove();
    })

    // console.log(promises);

    //NEED LOOP tO DELETE

    Promise.all(promises)
    .then()
    .catch(function handleError(error) {
        console.log("Error" + error);
    });

    document.getElementById("modalHistory").click();
    displayEmptyCart();
}

const displayEmptyCart = () => {
    let parentID = document.getElementById("cartID");
    parentID.innerHTML = `
    <div class="text-center">There is nothing to show <br>(ㆆ_ㆆ)</div>
    `;
}