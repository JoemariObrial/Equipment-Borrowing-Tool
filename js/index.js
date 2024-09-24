const setEvenListeners = () =>{
    document.getElementById("btnLogin").addEventListener("click", ()=>{Login();});
    document.getElementById("linkRegister").addEventListener("click", ()=>{register();});
}

const Login = () => {
    const url = "http://localhost/defense/api/user.php";
    const json = {
      username: document.getElementById("txtUsernames").value,
      password: document.getElementById("txtPasswords").value,
    };
  
    const formData = new FormData();
    formData.append("json", JSON.stringify(json));
    formData.append("operation", "Login");
  
    if (
      document.getElementById("txtUsernames").value == "" &&
      !document.getElementById("txtPasswords").value == "" 
    ) {
      alert("Please Enter Username!");
      return;
    }
    else if (
      !document.getElementById("txtUsernames").value == "" &&
      document.getElementById("txtPasswords").value == "" 
    ) {
      alert("Please Enter Password!");
      return;
    }

    axios({
      url: url,
      method: "post",
      data: formData,
    }).then((response) => {
      if (response.data == 0) {
        alert("Login Failed!");
      } else {
        window.location = "dashboard.html";
      }
    });
  };

const register = () =>{
    document.getElementById("blankModalTitle").innerText = "Register";
    document.getElementById("blankModalMainDiv").innerText = "";
    document.getElementById("blankModalMainDiv2").innerText = "";
    document.getElementById("blankModalFooterDiv").innerText = "";

    var myHtml = `
    <label for="txtFullname" class="form-label mt-2">Full Name</label>
    <input type="text" id="txtFullname" class="form-control form-control-sm">
    <label for="txtUsername" class="form-label mt-2">Username</label>
    <input type="text" id="txtUsername" class="form-control form-control-sm">
    <label for="txtPassword" class="form-label mt-2">Password</label>
    <input type="text" id="txtPassword" class="form-control form-control-sm">
    <label for="txtCPassword" class="form-label mt-2">Confirm Password</label>
    <input type="text" id="txtCPassword" class="form-control form-control-sm">
    `;
    document.getElementById("blankModalMainDiv").innerHTML = myHtml;

    const btnRegister = document.createElement("button");
    btnRegister.innerText = "Register";
    btnRegister.classList.add("btn", "btn-success", "mt-3", "btn-sm", "w-300");
    btnRegister.onclick = () => {
      saveRegistration();
    };
  
    document.getElementById("blankModalMainDiv2").append(btnRegister);
  
    const myModal = new bootstrap.Modal(document.getElementById("blankModal"), {
      keyboard: true,
      backdrop: "static",
    });
    myModal.show();
  };

  const saveRegistration = () => {
    const url = "http://localhost/defense/api/user.php";
    const json = {
      fullname: document.getElementById("txtFullname").value,
      username: document.getElementById("txtUsername").value,
      password: document.getElementById("txtPassword").value,
    };
  
    const formData = new FormData();
    formData.append("json", JSON.stringify(json));
    formData.append("operation", "Register");
  
    if (
      document.getElementById("txtFullname").value == "" &&
      document.getElementById("txtUsername").value == "" &&
      document.getElementById("txtPassword").value == ""
    ) {
      alert("Please Input All Values");
      return;
    } else if (
      !document.getElementById("txtFullname").value == "" &&
      document.getElementById("txtUsername").value == "" &&
      document.getElementById("txtPassword").value == ""
    ) {
      alert("Please Enter Username & Password");
      return;
    } else if (
      document.getElementById("txtFullname").value == "" &&
      !document.getElementById("txtUsername").value == "" &&
      !document.getElementById("txtPassword").value == ""
    ) {
      alert("Please Enter Full Name");
      return;
    }else if (
      !document.getElementById("txtFullname").value == "" &&
      document.getElementById("txtUsername").value == "" &&
      !document.getElementById("txtPassword").value == ""
    ) {
      alert("Please Enter Username");
      return;
    } else if (
      !document.getElementById("txtFullname").value == "" &&
      !document.getElementById("txtUsername").value == "" &&
      document.getElementById("txtPassword").value == ""
    ) {
      alert("Please Enter Username & Password");
      return;
    }else if (
      document.getElementById("txtFullname").value == "" &&
      document.getElementById("txtUsername").value == "" &&
      !document.getElementById("txtPassword").value == "" &&
      !document.getElementById("txtCPassword").value == "" 
    ) {
      alert("Please Enter Fullname & Username");
      return;
    }
  
    if (
      document.getElementById("txtPassword").value !==
      document.getElementById("txtCPassword").value ||
      document.getElementById("txtCPassword").value !==
      document.getElementById("txtPassword").value
    ) {
      alert("Error Password/Confirm Passsword Not Match");
      return;
    }
  
    axios({
      url: url,
      method: "post",
      data: formData,
    }).then((response) => {
      if (response.data == 0) {
        alert("Error Invalid");
      } else {
        alert("Successfully Registered");
        const myModal = bootstrap.Modal.getInstance(
          document.getElementById("blankModal")
        );
        myModal.hide();
      }
    });
  };


    setEvenListeners();