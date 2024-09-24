const setEventListeners = () => {
    document.getElementById("update").addEventListener("click", () => { // Assuming you have an element with id "update" for the update action
        update();
    });
};

// Function to handle the form submission for update
const update = () => {
    const id = document.getElementById("customer_id").value; // Assuming you have an input field with id "customer_id" to identify the customer to be updated
    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const age = document.getElementById("age").value;
    const contact_No = document.getElementById("contact_No").value;
    const birthday = document.getElementById("birthday").value;
    const address = document.getElementById("address").value;

    const json = {
        id: id,
        fname: fname,
        lname: lname,
        age: age,
        contact: contact_No,
        birthday: birthday,
        address: address,
    };

    const formData = new FormData();
    formData.append("json", JSON.stringify(json));
    formData.append("operation", "update"); // Specify the update operation here

    // Use Axios to send data to the API
    axios({
        url: "http://localhost/defense/api/customer.php", // Adjust the URL
        method: "post",
        data: formData,
    })
        .then((response) => {
            if (response.data === "0") {
                alert("Update Failed!");
            } else {
                alert("Customer Updated Successfully!");
                window.location = "customer.html";
            }
        })
        .catch((error) => {
            alert(error);
        });
};

setEventListeners();
