const submit = () => {

    const name = document.getElementById("name").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const retypepassword = document.getElementById("retypepassword").value;

    if (username === '' || password === '' || name === '' || retypepassword === '') {
        alert('Fill in all fields');
        return;
    }if  (password !== retypepassword) {
      // Display error message indicating that passwords do not match
      alert('Please match the password');
      return;
    
    } else {
        var myUrl = "http://localhost/defense/api/insert.php";
        const formData = new FormData();
        formData.append("name", name);
        formData.append("username", username);
        formData.append("password", password);

        axios({
        url:myUrl,
        method:"post",
        data:formData
        }).then(response => {
        if(response.data == 1){
            alert("Record Successfully Saved!");
            window.location.href = "index.html";
        }else{
            alert("Record NOT Saved!");
        }
        }).catch(error =>{
        alert(`ERROR OCCURED! ${error}`);
        });
    }
  }