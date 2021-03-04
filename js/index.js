let diskonID = document.getElementById('diskonID');

let display = (dataCatalog)=>{

    dataCatalog.forEach(item =>{

      if(item.diskon > 0){     
        let card = document.createElement("div");
        card.setAttribute("class"," col-6 col-md-3 col-lg-2 my-5 justify-content-center d-flex");
        card.innerHTML = `
            <div class="card border-1 border shadow ">
                <img src="${item.image[0]}" class="card-img-top img-fluid"  alt="...">
                <div class="card-body">
                  <h5 class="card-title">${item.nama}</h5>
                  <p class="card-text my-2">Rp ${item.diskon > 0 
                    ? `<strike class="text-muted">${item.price}</strike> 
                        ${(parseInt(item.price.match(/\d+/g).join("")) - parseInt(item.price.match(/\d+/g).join("")) * item.diskon / 100).toLocaleString().replaceAll(",", ".")} 
                        <span class="badge bg-danger">${item.diskon}%</span>`
                    : `${item.price}`} </p>
                  <a onclick="goToCatalogDetail(${item.id})" href="catalog-detail.html" class="btn btn-main w-100 ">Detail item</a>
                </div>
            </div>
        `;
        diskonID.appendChild(card);
      }

    });
}


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

const close = document.getElementById("close-button")

close.addEventListener("click", closeButton);
function closeButton() {
  document.getElementById("container").remove()
  document.getElementById("modal-container").remove()
}