document.addEventListener("DOMContentLoaded", () => {
  const onLoad = () => {
    document.getElementById("ngalan").innerText =
      sessionStorage.getItem("uname");
    // document.getElementById("picture").innerText = sessionStorage.getItem("images");
    //document.getElementById("userId").innerText = sessionStorage.getItem("studId");
  };
  const setEventListeners = () => {
    document.getElementById("save").addEventListener("click", () => {
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
          window.location = "main.html";
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  setEventListeners();

  // Display Customer
  const ShowCustomer = () => {
    const formData = new FormData();
    formData.append("operation", "ShowCustomer");
    formData.append("userid", sessionStorage.getItem("userid"));

    axios({
      url: "http://localhost/defense/api/customer.php",
      method: "post",
      data: formData, // Use formData, not FormData
    })
      .then((response) => {
        if (response.data.length === 0) {
          alert("There are no records retrieved.");
        } else {
          displayRecords(response.data);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  // Function to display records in a table
  const displayRecords = (rscustomer) => {
    const mainDiv = document.getElementById("mainDiv");

    var html = `
        <table class="min-w-full bg-white shadow-md rounded-lg overflow-hidden mt-2">
            <thead>
                <tr class="sticky top-0">
                    <th class="py-3 px-6 text-left text-white bg-black font-semibold text-sm uppercase border-b border-gray-300">Last Name</th>
                    <th class="py-3 px-6 text-left text-white bg-black font-semibold text-sm uppercase border-b border-gray-300">First Name</th>
                    <th class="py-3 px-6 text-left text-white bg-black font-semibold text-sm uppercase border-b border-gray-300">Age</th>
                    <th class="py-3 px-6 text-left text-white bg-black font-semibold text-sm uppercase border-b border-gray-300">Contact No</th>
                    <th class="py-3 px-6 text-left text-white bg-black font-semibold text-sm uppercase border-b border-gray-300">Birthday</th>
                    <th class="py-3 px-6 text-left text-white bg-black font-semibold text-sm uppercase border-b border-gray-300">Address</th>
                    <th class="py-3 px-6 text-left text-white bg-black font-semibold text-sm uppercase border-b border-gray-300 text-center">Action</th>
                </tr>
            </thead>
            <tbody>`;

    rscustomer.forEach((Customer) => {
      html += `
            <tr>
                <td class="text-left py-3 px-6">${Customer.customer_lname}</td>
                <td class="text-left px-6">${Customer.customer_fname}</td>
                <td class="text-left px-6">${Customer.customer_age}</td>
                <td class="text-left px-6">${Customer.customer_contact}</td>
                <td class="text-left px-6">${Customer.customer_birthday}</td>
                <td class="text-left px-6">${Customer.customer_address}</td>
                <td class="text-left px-6 text-center"><button class="bg-blue-500 text-white rounded h-10 w-20">Edit</button>
                <button class="bg-red-600 text-white rounded h-10 w-20">Delete</button></td>
            </tr>`;
    });

    html += `</tbody></table>`;
    mainDiv.innerHTML = html;
  };

  // Add a DOMContentLoaded event listener to run the code when the DOM is ready

  // Attach event listener to the "btnRefresh" button
  onLoad();

  setEventListeners();
  // Initially fetch and display records when the page loads
  ShowCustomer();
});

//   const displayContacts = () => {
//     var url = "http://localhost/exam/api/getcontacts.php";

//     const formData = new FormData();
//     formData.append("accId", sessionStorage.getItem("accId"));

//     axios({
//       url:url,
//       method:"post",
//       data:formData
//     }).then(response => {
//       var employees = response.data;
//       if(employees == "0"){
//         alert("There are no employees yet.");
//       }else{
//         refreshTable(employees);
//       }
//     }).catch(error => {
//       alert("ERROR! - " + error);
//     })
//   }

//   const refreshTable = (employeeList) => {
//     var html = `
//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>TITLE</th>
//             <th>SINGER</th>
//             <th>COMPOSER</th>
//             <th>GENRE</th>
//             <th>ACTIONS</th>
//           </tr>
//         </thead>
//         <tbody>
//     `;
//     employeeList.forEach(employee => {
//       html += `
//         <tr>
//           <td>${employee.employee_name}</td>
//           <td>${employee.employee_address}</td>
//           <td>${employee.dp_name}</td>
//           <td>
//             <button onclick="view(${employee.employee_id})">View</button>
//             <button onclick="update(${employee.employee_id})">Edit</button>
//             <button onclick="deleteRecord(${employee.employee_id})">Delete</button>
//           </td>
//         </tr>
//       `;
//     });

//     html += `</tbody></table>`;

//     document.getElementById("mainDiv").innerHTML = html;
//   }

//   const view = (employeeId) => {
//     const mainDiv = document.getElementById("mainDiv");

//    var myUrl = "http://localhost/exam/api/getcontact.php";
//    const formData = new FormData();
//    formData.append("employeeId", employeeId);

//    axios({
//       url:myUrl,
//       method:"post",
//       data:formData
//     }).then(response => {
//       var employee = response.data;
//       // console.log(contact1)
//       // console.log("email : " + contact1[0].grp_name)
//       //display
//       var html =`
//       <div class="details-container">
//         <h2>DETAILS</h2>
//         <div class="forms">
//           Name    : ${employee[0].employee_name}<br/><br/>
//           Address : ${employee[0].employee_address} <br/><br/>
//           Email   : ${employee[0].employee_email} <br/><br/>
//           Number  : ${employee[0].employee_number} <br/><br/>
//           Marital Status  : ${employee[0].employee_status} <br/><br/>
//           Sex   : ${employee[0].employee_sex} <br/><br/>
//           Group : ${employee[0].dp_name} <br/><br/>
//           <div class= "butt">
//             <button class="back" onclick="displayContacts()">Back to Main</button><br/><br/>
//           </div>
//         </div>
//       </div>
//       `;
//       mainDiv.innerHTML = "";
//       mainDiv.innerHTML = html;
//     }).catch(error =>{
//       alert(`ERROR OCCURED! ${error}`);
//     });
//   }

//   const update = (employeeId) => {
//     sessionStorage.setItem("employeeId", employeeId)
//     window.location.href = "update.html";
//   }

//   const deleteRecord = (employeeId) => {
//     var myUrl = "http://localhost/exam/api/delete.php";

//     var formData = new FormData();
//     formData.append("employeeId", employeeId);

//     axios({
//       url:myUrl,
//       method:"post",
//       data:formData
//     }).then(response => {
//       console.log(response.data)
//       if(response.data == 1){
//         alert("Record Successfully Deleted!");
//         displayContacts();
//       }else{
//         alert("Record NOT Deleted!");
//       }
//     }).catch(error =>{
//       alert(`ERROR OCCURED! ${error}`);
//     });
//   }
