// import {dataCatalog} from "./data-util/data.js";

let dataUser;

let catalogDetailID = document.getElementById('catalogDetailID');
let id = localStorage.catalogDetailItem;

let display = (dataCatalog)=>{
  // console.log(dataCatalog);

    catalogDetailID.innerHTML = `
        <div class="col-lg-5 my-lg-5">
          <div class="">
            <div onclick="openGallery()" class="hover-cursor-pointer">
              <img id="imgMain" src="${dataCatalog.image[0]}" class="img-fluid object-contain border rounded-3" alt="">
            </div>
            <div class="mt-2 d-flex row-cols-6 w-auto justify-content-between">
              <div onclick="changeImgMain(0)" class=""><img id="img-0" src="${dataCatalog.image[0]}" class="img-fluid object-contain border border-primary rounded-3 hover-cursor-pointer" alt=""></div>
              ${dataCatalog.image[1] ? 
              `<div onclick="changeImgMain(1)" class=""><img id="img-1" src="${dataCatalog.image[1]}" class="img-fluid object-contain rounded-3 hover-cursor-pointer" alt=""></div>` 
              : `<div></div>`}
              ${dataCatalog.image[2] ? 
              `<div onclick="changeImgMain(2)" class=""><img id="img-2" src="${dataCatalog.image[2]}" class="img-fluid object-contain rounded-3 hover-cursor-pointer" alt=""></div>` 
              : `<div></div>`}
              ${dataCatalog.image[3] ? 
              `<div onclick="changeImgMain(3)" class=""><img id="img-3" src="${dataCatalog.image[3]}" class="img-fluid object-contain rounded-3 hover-cursor-pointer" alt=""></div>` 
              : `<div></div>`}
              ${dataCatalog.image[4] ?
              `<div onclick="changeImgMain(4)" class=""><img id="img-4" src="${dataCatalog.image[4]}" class="img-fluid object-contain rounded-3 hover-cursor-pointer" alt=""></div>` 
              : `<div></div>`}
            </div>
          </div>
        </div>
        <div class="col-lg-5 my-lg-5">
          <div class="card border-0">
            <div class="card-body">
              <h5 class="card-title fw-bold my-2">${dataCatalog.nama}</h5>
              <h5 class="card-title my-1"><span class="fw-bold">Size Ready: </span>
                ${dataCatalog.size.includes("S") ? '<span class="ready-size active">S</span>' : '<span class="ready-size">S</span>'}
                ${dataCatalog.size.includes("M") ? '<span class="ready-size active">M</span>' : '<span class="ready-size">M</span>'}
                ${dataCatalog.size.includes("L") ? '<span class="ready-size active">L</span>' : '<span class="ready-size">L</span>'}
                ${dataCatalog.size.includes("XL") ? '<span class="ready-size active">XL</span>' : '<span class="ready-size">XL</span>'}
              
              </h5>
              <p class="card-text my-2">Rp ${dataCatalog.diskon > 0 
                ? `<strike class="text-muted">${dataCatalog.price}</strike> 
                    ${(parseInt(dataCatalog.price.match(/\d+/g).join("")) - parseInt(dataCatalog.price.match(/\d+/g).join("")) * dataCatalog.diskon / 100).toLocaleString().replaceAll(",", ".")} 
                    <span class="badge bg-danger">${dataCatalog.diskon}%</span>`
                : `${dataCatalog.price}`} </p>
              <h5 class="card-title fw-bold my-2">Descripstion: </h5>
              <p class="card-text my-2">${dataCatalog.description}</p>
              <a href="" onclick="postDataCart(${dataCatalog.id},event)" class="btn btn-main my-2 px-4 py-2">Add to Cart</a>
            </div>
          </div>
        </div>   
    `;

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
}

// display();

let url = "https://602f36924410730017c51afd.mockapi.io/katalog/";

const getDataBajuDetail = (id) => {
  fetch(url+id)
  .then(response => response.json())
  .then(result => {
    display(result)
    // console.log(result)
  })
  .catch(error => {console.error('error : ', error)})
}

const postDataCart = (id,e) =>{
  e.preventDefault()

  if(localStorage.isLoggedin != "true"){
    window.location.replace("login.html");
    alert('Anda Belum Login');
  }
  else{
      dataUser = JSON.parse(localStorage.user);
  }

  let iniIDUser = dataUser.id;  //dummy id user
  // check ada datanya blm GET

  let urlcart = "https://602f36924410730017c51afd.mockapi.io/user/"+iniIDUser+"/cart/";
  fetch(urlcart)
  .then(response => response.json())
  .then(data => {

    let targetData = "";
    if(data != "Not found"){
      targetData = data.filter((item)=>{
        return item.idKatalog == id;
      })
    }

    if(targetData != ""){
      //ada barang
      //update
      
      fetch(urlcart+targetData[0].id,{
        method: "PUT",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({quantity : targetData[0].quantity + 1}),
      })
      .then(response => {
        response.json()
        on();
        notifCart();
      })
      // .then(data => console.log(data))
      .catch(error => {console.error('error : ', error)})
    }
    else{
      //barang kosong
      //post baru

      fetch(urlcart,{
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          userId : iniIDUser,
          idKatalog : id,
          quantity : 1
        }),
      })
      .then(() => {
        on();
        notifCart();
      })
    }
  })
  .catch(error => {console.error('error : ', error)})
  
}



getDataBajuDetail(id);

function on() {
  document.getElementById("modalAlert").click();
  // document.getElementById("overlay").style.display = "block";
}

// function off() {
//   document.getElementById("overlay").style.display = "none";
// }

let changeImgMain = (id) => {
  let imgMain = document.getElementById("imgMain");
  let data = document.getElementById("img-"+id);

  imgMain.setAttribute("src", data.getAttribute("src"));

  for(let i = 0; i < 5; i++){
    let dataImg = document.getElementById("img-"+i);
    if(dataImg != null){
      dataImg.setAttribute("class","img-fluid object-contain rounded-3 hover-cursor-pointer");
    }
  }

  data.setAttribute("class","img-fluid object-contain border border-primary rounded-3 hover-cursor-pointer");

}

let openGallery = () => {
  document.getElementById("modalGallery").click();
}