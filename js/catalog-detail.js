import {dataCatalog} from "./data-util/data.js";


let catalogDetailID = document.getElementById('catalogDetailID');
let id = localStorage.catalogDetailItem;

let display = ()=>{

    catalogDetailID.innerHTML = `
        <div class="col-lg-5 my-5">
              <div class="catalog-image-detail" style="background-image: url(${dataCatalog[id].image});"></div>
            </div>
            <div class="col-lg-5 my-5">
              <div class="card border-0">
                <div class="card-body">
                  <h5 class="card-title fw-bold my-2">${dataCatalog[id].nama}</h5>
                  <h5 class="card-title my-1"><span class="fw-bold">Size Ready: </span> 
                    <span class="ready-size active">S</span>
                    <span class="ready-size active">M</span>
                    <span class="ready-size active">L</span>
                    <span class="ready-size">XL</span>
                  </h5>
                  <p class="card-text my-2">Rp. ${dataCatalog[id].price}</p>
                  <h5 class="card-title fw-bold my-2">Descripstion: </h5>
                  <p class="card-text my-2">${dataCatalog[id].description}</p>
                  <a href="#" class="btn btn-main my-2 px-4 py-2">Add to Cart</a>
                </div>
              </div>
            </div>   
    `;

}

display();