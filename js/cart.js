
// console.log(JSON.parse(localStorage.user).id);
let dataUser;

if(localStorage.isLoggedin != "true"){
    window.location.replace("login.html");
    alert('Anda Belum Login');
}
else{
    dataUser = JSON.parse(localStorage.user);
}

let updateData = async (id,num) => {    //update Data quantity cart
    let iniIDUser = dataUser.id;

    let urlcartID = "https://602f36924410730017c51afd.mockapi.io/user/"+iniIDUser+"/cart/"+id;

    let data = await fetch(urlcartID,{
        method: "PUT",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({quantity : parseInt(num)}),
    })
}

let deleteData = (id,history) => {
    let iniIDUser = dataUser.id;

    let urlcartID = "https://602f36924410730017c51afd.mockapi.io/user/"+iniIDUser+"/cart/"+id;
    fetch(urlcartID,{
        method: "DELETE",
        headers: {'Content-Type': 'application/json'},
    })
    .then(() => {
        notifCart();
        if(history){
            // console.log(history);
            // console.log(history.katalogID);
            // console.log(history.quantity);
            let urlUser = "https://602f36924410730017c51afd.mockapi.io/user/"+iniIDUser+"/history";
            fetch(urlUser,{
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    idKatalog : history.katalogID,
                    quantity : history.quantity
                })
            })

        }
    })
}

let kuranginCart = (idKatalog,idCart,e) => {
    e.preventDefault();
    let element = document.getElementById(`itembarang-${idKatalog}`);
    element.innerHTML = parseInt(element.innerText) - 1;
    if(element.innerText === "0"){
        document.getElementById(`cartID-${idCart}`).remove();
        deleteData(idCart,false);
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
                        <p class="my-2">Rp ${result.diskon > 0 
                            ? `<strike class="text-muted">${result.price}</strike> <span data="price">
                                ${(parseInt(result.price.match(/\d+/g).join("")) - parseInt(result.price.match(/\d+/g).join("")) * result.diskon / 100).toLocaleString().replaceAll(",", ".")} 
                                </span><span class="badge bg-danger">${result.diskon}%</span>`
                            : `<span data="price">${result.price}</span>`} </p>
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
            // console.log(item.innerHTML);
            item = parseInt(item.innerText.match(numberPattern).join(""));
            total += item * dataQuantity[index].innerText;
            quantity += parseInt(dataQuantity[index].innerText);

            totalBarang.innerHTML = quantity;
            pajakHarga.innerHTML = `Rp. ${(total*10/100).toLocaleString().replaceAll(",", ".")}`;
            totalHarga.innerHTML = `Rp. ${(total+10000+(total*10/100)).toLocaleString().replaceAll(",", ".")}`;
        })
    }

}

function on(){
    let cartID = document.querySelectorAll('[id^="cartID-"]');
    // let katalogID = document.querySelectorAll('[idKatalog^="katalogID-"]');

    if(cartID.length <= 0){
        alert("Tidak ada cart");
    }
    else{

        cartID.forEach(item => {
            let id = parseInt(item.id.match(/\d+/g));
            let katalogID = parseInt(item.getAttribute("idKatalog").match(/\d+/g));
            let quantity = document.getElementById("itembarang-"+katalogID).innerText;

            // console.log(id +" and "+ katalogID);
            
            deleteData(id,{"katalogID" : katalogID, "quantity" : quantity});
            document.getElementById(`cartID-`+id).remove();
        })
        document.getElementById("modalAlert").click();
    
        setTimeout(function(){ window.location.href = "./index.html"},5000);
    }
    

    
}

let openGallery = (idKatalog) => {
    document.getElementById("modalGallery").click();

    let urlKatalog = "https://602f36924410730017c51afd.mockapi.io/katalog/"+idKatalog;
    fetch(urlKatalog)
    .then(response => response.json())
    .then(dataCatalog => {
        
        document.getElementById("galleryModalLabel").innerHTML = dataCatalog.nama;

        let galleryModal = document.getElementById("galleryModalBody");

        galleryModal.innerHTML = `
        <div id="carouselExampleFade" class="carousel slide carousel-fade" data-bs-ride="carousel">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img src="${dataCatalog.image[0]}" class="img-fluid d-block w-100" alt="...">
              </div>
              ${dataCatalog.image[1] ? `<div class="carousel-item"><img src="${dataCatalog.image[1]}" class="img-fluid d-block w-100" alt="..."></div>`
              : `` }
              ${dataCatalog.image[2] ? `<div class="carousel-item"><img src="${dataCatalog.image[2]}" class="img-fluid d-block w-100" alt="..."></div>`
              : `` }
              ${dataCatalog.image[3] ? `<div class="carousel-item"><img src="${dataCatalog.image[3]}" class="img-fluid d-block w-100" alt="..."></div>`
              : `` }
              ${dataCatalog.image[4] ? `<div class="carousel-item"><img src="${dataCatalog.image[4]}" class="img-fluid d-block w-100" alt="..."></div>`
              : `` }
            </div>
            <div class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade"  data-bs-slide="prev">
              <div class="bg-dark p-2 rounded-circle d-flex">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              </div>
              <span class="visually-hidden">Previous</span>
            </div>
            <div class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade"  data-bs-slide="next">
              <div class="bg-dark p-2 rounded-circle d-flex">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
              </div>
              <span class="visually-hidden">Next</span>
            </div>
          </div>
    `

    })
}
