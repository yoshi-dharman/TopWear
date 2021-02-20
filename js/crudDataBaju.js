
let url = "https://6023acfe6bf3e6001766b5db.mockapi.io/katalog/";

const getDataBaju = () => {

  fetch(url)
  .then(response => response.json())
  .then(result => {
    console.log(result);
    return "asd";
    // display(result)
    // console.log(result)
  })
  .catch((error) => console.log(error));

//   return hasil;
}



export {getDataBaju};