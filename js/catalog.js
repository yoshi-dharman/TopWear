// import {dataCatalog} from "./data-util/data.js";

// console.log(dataCatalog);


if(localStorage.categoryItem == null){
  localStorage.categoryItem = "all";
}
// console.log(localStorage.categoryItem);
// delete localStorage.categoryItem;


let catalogID = document.getElementById('catalogID');
let catalogTitle = document.getElementById('catalogTitle');

let display = (dataCatalog)=>{

    if(localStorage.categoryItem == 'kaos-polo'){
      catalogTitle.innerText = "KAOS POLO";
    } else if(localStorage.categoryItem == 'kaos-polos'){
      catalogTitle.innerText = "KAOS POLOS";
    } else if(localStorage.categoryItem == 'kemeja'){
      catalogTitle.innerText = "KEMEJA";
    } else{
      catalogTitle.innerText = "ALL CATEGORY";
    }

    dataCatalog.forEach(item =>{

      if(localStorage.categoryItem == item.categoryItem || localStorage.categoryItem == "all"){     
        let card = document.createElement("div");
        card.setAttribute("class","col-md-6 col-lg-4 my-5 justify-content-center d-flex");
        card.innerHTML = `
            <div class="card border-1 border shadow my-card">
                <img src="${item.image}" class="card-img-top img-fluid"  alt="...">
                <div class="card-body">
                  <h5 class="card-title">${item.nama}</h5>
                  <p class="card-text my-2">Rp ${item.price}</p>
                  <a onclick="goToCatalogDetail(${item.id})" href="catalog-detail.html" class="btn btn-main w-100 ">Detail item</a>
                </div>
            </div>
        `;
        catalogID.appendChild(card);
      }

    });
}

// display();

let url = "https://602f36924410730017c51afd.mockapi.io/katalog/";

const getDataBaju = () => {
  fetch(url)
  .then(response => response.json())
  .then(result => {
    display(result)
    // console.log(result)
  })
  .catch(error => {console.error('error : ', error)})
}

getDataBaju();