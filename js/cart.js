
// console.log(JSON.parse(localStorage.user).id);
let dataUser;

if(localStorage.isLoggedin != "true"){
    window.location.replace("login.html");
    alert('Anda Belum Login');
}
else{
    dataUser = JSON.parse(localStorage.user);
}

let updateData = (id,num) => {    //update Data quantity cart
    let iniIDUser = dataUser.id;

    let urlcartID = "https://602f36924410730017c51afd.mockapi.io/user/"+iniIDUser+"/cart/"+id;
    fetch(urlcartID,{
        method: "PUT",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({quantity : parseInt(num)}),
    })
}

let deleteData = (id) => {
    let iniIDUser = dataUser.id;

    let urlcartID = "https://602f36924410730017c51afd.mockapi.io/user/"+iniIDUser+"/cart/"+id;
    fetch(urlcartID,{
        method: "DELETE",
        headers: {'Content-Type': 'application/json'},
    })
    .then(() => {
        notifCart();
    })
}

let kuranginCart = (idKatalog,idCart,e) => {
    e.preventDefault();
    let element = document.getElementById(`itembarang-${idKatalog}`);
    element.innerHTML = parseInt(element.innerText) - 1;
    if(element.innerText === "0"){
        document.getElementById(`cartID-${idKatalog}`).remove();
        deleteData(idCart);
    }
    else{
        updateData(idCart,element.innerText);
    }
    calculateHarga();

}

let tambahinCart = (idKatalog,idCart,e) => {
    e.preventDefault();
    let element = document.getElementById(`itembarang-${idKatalog}`);
    element.innerHTML = parseInt(element.innerText) + 1;
    updateData(idCart,element.innerText);
    calculateHarga();
    
}

const displayEmptyCart = () => {
    let parentID = document.getElementById("cartID");
    parentID.innerHTML = `
    <div class="text-center">There is nothing to show <br>(ㆆ_ㆆ)</div>
    `;
}


const display = (result) => {

    let parentID = document.getElementById("cartID");
    parentID.innerHTML = "";

    //ambil data baju di katalog
    result.forEach(item => {
        let urlKatalog = "https://602f36924410730017c51afd.mockapi.io/katalog/"+item.idKatalog;
        fetch(urlKatalog)
        .then(response => response.json())
        .then(result => {
            let cartData = document.createElement("div");
            cartData.setAttribute("id","cartID-"+item.idKatalog);
            cartData.setAttribute("class","col-12 d-flex justify-content-lg-between justify-content-around align-items-center mb-3");
            cartData.innerHTML = `
                <div class="cart-detail d-lg-flex text-center text-lg-start align-items-center">
                    <div class="cart-image border-primary shadow">
                        <img class="img-fluid" src="${result.image}" alt="">
                    </div>
                    <div class="fw-bold ms-3">
                        <p class="my-2">${result.nama}</p>
                        <p data="price" class="my-2">Rp. ${result.price}</p>
                    </div>
                </div>
                
                <div class="">
                    <a href="" onclick="kuranginCart(${result.id},${item.id},event)" class="text-decoration-none link-dark"><i class="bi bi-dash-circle fs-4"></i></a>
                    <span data="quantity" id="itembarang-${result.id}" class="mx-2">${item.quantity}</span>
                    <a href="" onclick="tambahinCart(${result.id},${item.id},event)" class="text-decoration-none link-dark"><i class="bi bi-plus-circle fs-4"></i></a>
                </div>
            `;
            parentID.appendChild(cartData);
        })
        .then(()=> calculateHarga())
        .catch(error => {console.error('error : ', error)})
    });

}

const getDataCart = () => {
    let iniIDUser = dataUser.id;

    let urlcart = "https://602f36924410730017c51afd.mockapi.io/user/"+iniIDUser+"/cart/";

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

const calculateHarga = () =>{
    let dataPrice = document.querySelectorAll('[data="price"]');
    let dataQuantity = document.querySelectorAll('[data="quantity"]');

    let totalBarang = document.getElementById("totalBarang");
    let pajakHarga = document.getElementById("pajakHarga"); 
    let totalHarga = document.getElementById("totalHarga");

    if(dataPrice.length == 0){
        totalBarang.innerHTML = 0;
        pajakHarga.innerHTML = `Rp. 0`;
        totalHarga.innerHTML = `Rp. 0`;
        displayEmptyCart();
    }
    else{

        let total = 0;
        let quantity = 0;
        dataPrice.forEach((item, index) => {
            var numberPattern = /\d+/g;

            // console.log(item.innerHTML.match(numberPattern));
            item = parseInt(item.innerHTML.match(numberPattern).join(""));
            total += item * dataQuantity[index].innerText;
            quantity += parseInt(dataQuantity[index].innerText);

            totalBarang.innerHTML = quantity;
            pajakHarga.innerHTML = `Rp. ${(total*10/100).toLocaleString().replaceAll(",", ".")}`;
            totalHarga.innerHTML = `Rp. ${(total+10000+(total*10/100)).toLocaleString().replaceAll(",", ".")}`;
        })
    }

}

function on(){
    document.getElementById("modalAlert").click();
}