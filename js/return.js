const setEventListeners = () => {
    document.getElementById("btnreturn").addEventListener("click", () => {
        save();
    });
};

// Function to handle the form submission
const save = () => {
    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const age = document.getElementById("age").value;
    const contact_No = document.getElementById("contact_No").value;
    const birthday = document.getElementById("birthday").value;
    const address = document.getElementById("address").value;

    const json = {
        fname: fname,
        lname: lname,
        age: age,
        contact: contact_No,
        birthday: birthday,
        address: address,
    };

    const formData = new FormData();
    formData.append("json", JSON.stringify(json));
    formData.append("operation", "save");

    // Use Axios to send data to the API
    axios({
        url: "http://localhost/defense/api/customer.php", // Adjust the URL
        method: "post",
        data: formData,
    })
        .then((response) => {
            if (response.data === "0") {
                alert("Record Not Saved!");
            } else {
                alert("Customer Added Successfully!");
                window.location = "customer.html";
            }
        })
        .catch((error) => {
            alert(error);
        });
};

setEventListeners();


// Display Tools
const ShowReturn = () => {
    const formData = new FormData();
    formData.append("operation", "ShowReturn");

    axios({
        url: "http://localhost/defense/api/return.php",
        method: "post",
        data: formData // Use formData, not FormData
    })
    .then(response => {
        if (response.data.length === 0) {
            alert("There are no records retrieved.");
        } else {
            displayRecords(response.data);
        }
    })
    .catch(error => {
        alert(error);
    });
}

// Function to display records in a table
const displayRecords = (rsreturn) => {
    const mainDiv = document.getElementById("mainDiv");

    var html = `
        <table class="min-w-full bg-white shadow-md rounded-lg overflow-hidden mt-2">
            <thead>
                <tr class="sticky top-0">
                    <th class="py-3 px-6 text-left text-white bg-black font-semibold text-sm uppercase border-b border-gray-300">Last Name</th>
                    <th class="py-3 px-6 text-left text-white bg-black font-semibold text-sm uppercase border-b border-gray-300">First Name</th>
                    <th class="py-3 px-6 text-left text-white bg-black font-semibold text-sm uppercase border-b border-gray-300">Tool Name</th>
                    <th class="py-3 px-6 text-left text-white bg-black font-semibold text-sm uppercase border-b border-gray-300">Borow Date</th>
                    <th class="py-3 px-6 text-left text-white bg-black font-semibold text-sm uppercase border-b border-gray-300">Borrow Quantity</th>
                    <th class="py-3 px-6 text-left text-white bg-black font-semibold text-sm uppercase border-b border-gray-300">Return Date</th>
                    <th class="py-3 px-6 text-left text-white bg-black font-semibold text-sm uppercase border-b border-gray-300">Conditition</th>
                    <th class="py-3 px-6 text-left text-white bg-black font-semibold text-sm uppercase border-b border-gray-300">Return Quantity</th>
                    <th class="py-3 px-6 text-left text-white bg-black font-semibold text-sm uppercase border-b border-gray-300 text-center">Action</th>
                </tr>
            </thead>
            <tbody>`;

            rsreturn.forEach(returns => {
        html += `
            <tr>
                <td class="text-left py-3 px-6">${returns.customer_lname}</td>
                <td class="text-left px-6">${returns.customer_fname}</td>
                <td class="text-left px-6">${returns.tools_name}</td>
                <td class="text-left px-6">${returns.borrow_date}</td>
                <td class="text-left px-6">${returns.borrow_quantity}</td>
                <td class="text-left px-6">${returns.return_date}</td>
                <td class="text-left px-6">${returns.return_condition}</td>
                <td class="text-left px-6">${returns.return_quantity}</td>
                <td class="text-left px-6 text-center"><button class="bg-blue-500 text-white rounded h-10 w-20">Edit</button>
                <button class="bg-red-600 text-white rounded h-10 w-20">Delete</button></td>
            </tr>`;
    });

    html += `</tbody></table>`;
    mainDiv.innerHTML = html;
}

// Add a DOMContentLoaded event listener to run the code when the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    // Attach event listener to the "btnRefresh" button
    document.getElementById("btnRefresh").addEventListener("click", () => {
        ShowReturn();
    });

    // Initially fetch and display records when the page loads
    ShowReturn();
});

// Update Customer
// Function to handle updating a customer
const EditCus = (id) => {
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
    formData.append("operation", "update"); // Specify the update operation

    // Use Axios to send data to the API
    axios({
        url: "http://localhost/defense/api/customer.php",
        method: "get",
        data: formData,
    })
        .then((response) => {
            if (response.data === "Updated Successfully") {
                alert("Customer Updated Successfully!");
                window.location = "customer.html";
            } else {
                alert("Update Failed!");
            }
        })
        .catch((error) => {
            alert(error);
        });
    
};







// // Function to handle the form submission
// const CuUpdate = () => {
//     const fname = document.getElementById("fname").value;
//     const lname = document.getElementById("lname").value;
//     const age = document.getElementById("age").value;
//     const contact_No = document.getElementById("contact_No").value;
//     const birthday = document.getElementById("birthday").value;
//     const address = document.getElementById("address").value;

//     const json = {
//         fname: fname,
//         lname: lname,
//         age: age,
//         contact: contact_No,
//         birthday: birthday,
//         address: address,
//     };

//     const formData = new FormData();
//     formData.append("json", JSON.stringify(json));
//     formData.append("operation", "CustomerUpdate");

//     // Use Axios to send data to the API
//     axios({
//         url: "http://localhost/defense/api/customer.php", // Adjust the URL
//         method: "post",
//         data: formData,
//     })
//         .then((response) => {
//             if (response.data === "0") {
//                 alert("Update Not Saved!");
//             } else {
//                 alert("Customer Update Successfully!");
//                 window.location = "customer.html";
//             }
//         })
//         .catch((error) => {
//             alert(error);
//         });
// };

// setEventListeners();


// // Function to set up the event listener
// function initialize() {
//     // Attach event listener to the "save" button
//     document.getElementById("btnSave").addEventListener("click", () => {
//         save();
//     });
// }

// Call the initialize function once the DOM is ready
// document.addEventListener("DOMContentLoaded", initialize);

