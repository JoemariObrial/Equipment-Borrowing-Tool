document.addEventListener("DOMContentLoaded", () => {
  // Call your functions to fetch and populate dropdowns
  borrow();
  tool();
});

function borrow() {
  const selectmain = document.getElementById("selectmain");

  // Fetch company records and populate the company dropdown
  const formData = new FormData();
  formData.append("operation", "showCustomer");

  axios({
    url: "http://localhost/defense/api/borrow.php",
    method: "post",
    data: formData,
  })
    .then((response) => {
      console.log("Company Response:", response);
      if (response.data.length === 0) {
        alert("There are no company records retrieved.");
      } else {
        // Clear existing options in the company dropdown
        selectmain.innerHTML = "";

        const borrows = response.data;
        borrows.forEach((borrowss) => {
          const option = document.createElement("option");
          option.value = borrowss.customer_id; // Adjust to the appropriate ID field
          option.textContent =
            borrowss.customer_fname + " " + borrowss.customer_lname; // Adjust to the appropriate name field
          selectmain.appendChild(option);
        });
      }
    })
    .catch((error) => {
      console.error("Error fetching company records:", error);
      alert("Failed to fetch company records.");
    });
}

function tool() {
  const selecttool = document.getElementById("selecttool");

  // Fetch company records and populate the company dropdown
  const formData = new FormData();
  formData.append("operation", "showTool");

  axios({
    url: "http://localhost/defense/api/borrow.php",
    method: "post",
    data: formData,
  })
    .then((response) => {
      console.log("Company Response:", response);
      if (response.data.length === 0) {
        alert("There are no company records retrieved.");
      } else {
        // Clear existing options in the company dropdown
        selecttool.innerHTML = "";

        const tools = response.data;
        tools.forEach((toolss) => {
          const option = document.createElement("option");
          option.value = toolss.tools_id; // Adjust to the appropriate ID field
          option.textContent = toolss.tools_name; // Adjust to the appropriate name field
          selecttool.appendChild(option);
        });
      }
    })
    .catch((error) => {
      console.error("Error fetching company records:", error);
      alert("Failed to fetch company records.");
    });
}

const setEventListeners = () => {
  document.getElementById("btnAdd").addEventListener("click", () => {
    save();
  });
};

// Function to handle the form submission
const save = () => {
  const customer_id = document.getElementById("selectmain").value;
  const tools_id = document.getElementById("selecttool").value;
  const quantity = document.getElementById("quantity").value;
  const date = document.getElementById("date").value;

  const json = {
    customer_id: customer_id,
    tools_id: tools_id,
    borrow_quantity: quantity,
    borrow_date: date,
  };

  const formData = new FormData();
  formData.append("json", JSON.stringify(json));
  formData.append("operation", "save");

  // Use Axios to send data to the API
  axios({
    url: "http://localhost/defense/api/borrow.php", // Check the URL
    method: "post",
    data: formData,
  })
    .then((response) => {
      if (response.data == 0) {
        alert("Record Not Saved!");
      } else {
        alert("Borrow Added Successfully!");
        window.location = "borrow.html";
      }
    })
    .catch((error) => {
      alert(error);
    });
};

setEventListeners();

// Function to set up the event listener

// Display Borrow
const ShowBorrow = () => {
  const formData = new FormData();
  formData.append("operation", "ShowBorrow");

  axios({
    url: "http://localhost/defense/api/borrow.php",
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
const displayRecords = (rsborrow) => {
  const mainDiv = document.getElementById("mainDiv");

  var html = `
        <table class="min-w-full bg-white shadow-md rounded-lg overflow-hidden mt-2">
            <thead>
                <tr class="sticky top-0">
                    <th class="py-3 px-6 text-left text-white bg-black font-semibold text-sm uppercase border-b border-gray-300">Last Name</th>
                    <th class="py-3 px-6 text-left text-white bg-black font-semibold text-sm uppercase border-b border-gray-300">First Name</th>
                    <th class="py-3 px-6 text-left text-white bg-black font-semibold text-sm uppercase border-b border-gray-300">Address</th>
                    <th class="py-3 px-6 text-left text-white bg-black font-semibold text-sm uppercase border-b border-gray-300">Contact No</th>
                    <th class="py-3 px-6 text-left text-white bg-black font-semibold text-sm uppercase border-b border-gray-300">Tools Name</th>
                    <th class="py-3 px-6 text-left text-white bg-black font-semibold text-sm uppercase border-b border-gray-300">Serial No</th>
                    <th class="py-3 px-6 text-left text-white bg-black font-semibold text-sm uppercase border-b border-gray-300">Quantity</th>
                    <th class="py-3 px-6 text-left text-white bg-black font-semibold text-sm uppercase border-b border-gray-300">Borrow Date</th>
                    <th class="py-3 px-6 text-left text-white bg-black font-semibold text-sm uppercase border-b border-gray-300 text-center">Action</th>
                </tr>
            </thead>
            <tbody>`;

  rsborrow.forEach((Borrow) => {
    html += `
            <tr>
                <td class="text-left py-3 px-6">${Borrow.customer_lname}</td>
                <td class="text-left px-6">${Borrow.customer_fname}</td>
                <td class="text-left px-6">${Borrow.customer_address}</td>
                <td class="text-left px-6">${Borrow.customer_contact}</td>
                <td class="text-left px-6">${Borrow.tools_name}</td>
                <td class="text-left px-6">${Borrow.tools_serialNo}</td>
                <td class="text-left px-6">${Borrow.borrow_quantity}</td>
                <td class="text-left px-6">${Borrow.borrow_date}</td>
                <td class="text-left px-6 text-center"><button class="bg-blue-500 text-white rounded h-10 w-20">Edit</button>
                <button class="bg-red-600 text-white rounded h-10 w-20">Delete</button></td>
            </tr>`;
  });

  html += `</tbody></table>`;
  mainDiv.innerHTML = html;
};

// Add a DOMContentLoaded event listener to run the code when the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  // Attach event listener to the "btnRefresh" button
  document.getElementById("btnBorrow").addEventListener("click", () => {
    ShowBorrow();
  });

  // Initially fetch and display records when the page loads
  ShowBorrow();
});
