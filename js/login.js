const login = () => {
  let emailInputSignin = document.getElementById("email-form").value;
  let passwordInputSignin = document.getElementById("password-form").value;

  if (emailInputSignin === "" || passwordInputSignin === "") {
    alert("Please input your data")
  } else {
    const api = "https://602f36924410730017c51afd.mockapi.io/user"
    fetch(api)
      .then((response) => response.json())
      .then((result) => {
        const user = result.find((user) => user.email === emailInputSignin && user.password === passwordInputSignin)
        let { password, ...userData } = user

        if (user) {
          localStorage.setItem("user", JSON.stringify(userData))
          localStorage.setItem("isLoggedin", true)
          alert("Login berhasil")
          window.location.href = "./index.html"
        } else {
          alert("Email dan password anda belum terdaftar")
        }
      })
      .catch((error) => console.log(error))
  }
}