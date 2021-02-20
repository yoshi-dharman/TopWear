
let kuranginCart = (id,e) => {
    e.preventDefault();
    let element = document.getElementById(`itembarang-${id}`);
    element.innerHTML -= 1;
    if(element.innerText === "0"){
        document.getElementById(`cartID-${id}`).remove();
    }
}

let tambahinCart = (id,e) => {
    e.preventDefault();
    let element = document.getElementById(`itembarang-${id}`);
    element.innerHTML = parseInt(element.innerText) + 1;
}