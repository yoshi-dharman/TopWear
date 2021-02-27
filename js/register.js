const register = async() => {
  let emailInputRegister = document.getElementById("email-form").value;
  let nameInputRegister = document.getElementById("name-form").value;
  let passwordInputRegister = document.getElementById("password-form").value;

  let userData = {
    name: nameInputRegister,
    email: emailInputRegister,
    password: passwordInputRegister
  }

  if(nameInputRegister === "" || emailInputRegister === "" || passwordInputRegister === "") {
    alert("Please input your data")
  } else {
    const api = "https://602f36924410730017c51afd.mockapi.io/user"
    const response = await fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    })
    const result = await response.json()
    alert("Registrasi berhasil, silahkan login")
    window.location.href = "./login.html"
  }
}