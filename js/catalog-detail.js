// import {dataCatalog} from "./data-util/data.js";

let dataUser;

let catalogDetailID = document.getElementById('catalogDetailID');
let id = localStorage.catalogDetailItem;

let display = (dataCatalog)=>{
  // console.log(dataCatalog);

    catalogDetailID.innerHTML = `
        <div class="col-lg-5 my-lg-5">
              <div class="border-primary rounded">
                <img src="${dataCatalog.image}" class="img-fluid" alt="">
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
                  <p class="card-text my-2">Rp. ${dataCatalog.price}</p>
                  <h5 class="card-title fw-bold my-2">Descripstion: </h5>
                  <p class="card-text my-2">${dataCatalog.description}</p>
                  <a href="" onclick="postDataCart(${dataCatalog.id},event)" class="btn btn-main my-2 px-4 py-2">Add to Cart</a>
                </div>
              </div>
            </div>   
    `;

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
    window.location.replace("landing-page.html");
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
      .then(() => on())
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