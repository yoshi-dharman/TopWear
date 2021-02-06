


let catalogID = document.getElementById('catalogID');
let catalogTitle = document.getElementById('catalogTitle');

let display = ()=>{
    buah.forEach(item =>{

        let card = document.createElement("div");
        card.setAttribute("class","col-md-4 my-5 justify-content-center d-flex");
        card.innerHTML = `
            <div class="card" style="width: 18rem;">
                <img class="card-img-top" height="210px" src="${item.gambarBuah}" alt="Card image cap">
                <div class="card-body">
                  <h5 class="card-title">${item.nama}</h5>
                </div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">Warna : ${item.warna}</li>
                  <li class="list-group-item">Nama Latin : ${item.namaLatin}</li>
                  <li class="list-group-item">Tipe Biji : ${item.tipeBiji}</li>
                </ul>
            </div>

            <div class="card shadow border-primary my-card">
                <img src="image/catalog/polo1.jpg" class="card-img-top img-fluid"  alt="...">
                <div class="card-body">
                  <h5 class="card-title">Kaos Polos Putih</h5>
                  <p class="card-text">Rp 89.900</p>
                  <a href="#" class="btn btn-main w-100 ">Detail item</a>
                </div>
            </div>
        `;
        // `<h1>${var}</h1>`
        buahid.appendChild(card);

    });
}

display();