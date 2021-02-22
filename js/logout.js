const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("isLoggedin");

  window.location.href = "./login.html"
}