const login = () => {
  var url = "http://localhost/defense/api/login.php";

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  if (username === "" || password === "") {
    alert("Fill in both username and password fields");
  } else {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    axios({
      url: url,
      method: "post",
      data: formData,
    })
      .then((response) => {
        var returnValue = response.data;
        if (returnValue == "0") {
          alert("Invalid username or password");
        } else {
          sessionStorage.setItem("uname", returnValue.user_username);
          sessionStorage.setItem("userid", returnValue.user_id);
          window.location.href = "main.html";
        }
      })
      .catch((error) => {
        alert("ERROR! - ");
      });
  }
};
