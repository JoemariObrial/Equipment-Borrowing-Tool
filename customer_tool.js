const onLoad = () => {
    document.getElementById("ngalan").innerText = sessionStorage.getItem("uname");
    // document.getElementById("picture").innerText = sessionStorage.getItem("images");
    //document.getElementById("userId").innerText = sessionStorage.getItem("studId");
    ShowTool();
  }
 
 // Function to handle the form submission
 const save = () => {
    const toolname = document.getElementById("ToolName").value;
    const serialNo = document.getElementById("serialNo").value;
    const quantity = document.getElementById("Quantity").value;
    const available = document.getElementById("Available").value;
    const condition = document.getElementById("condition").value;

    const json = {
        tname: toolname,
        serialNo: serialNo,
        quantity: quantity,
        available: available,
        condition: condition
    };

    const formData = new FormData();
    formData.append("json", JSON.stringify(json));
    formData.append("operation", "save");

    // Use Axios to send data to the API
    axios({
        url: "http://localhost/defense/api/tool.php", // Check the URL
        method: "post",
        data: formData
    })
    .then(response => {
        if (response.data == 0) {
            alert("Record Not Saved!");
        } else {
            alert("Tools Added Successfully!");
        }
    })
    .catch(error => {
        alert(error);
    });
}

// Function to set up the event listener
function initialize() {
    // Attach event listener to the "save" button
    document.getElementById("btnSave").addEventListener("click", () => {
        save();
    });
}

// Call the initialize function once the DOM is ready
document.addEventListener("DOMContentLoaded", initialize);


// Display Tools
const ShowTool = () => {
    const formData = new FormData();
    formData.append("operation", "ShowTool");

    axios({
        url: "http://localhost/defense/api/tool.php",
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
const displayRecords = (rsTool) => {
    const mainDiv = document.getElementById("mainDiv");

    var html = `
        <table class="min-w-full bg-white shadow-md rounded-lg overflow-hidden mt-2">
            <thead>
                <tr class="sticky top-0">
                    <th class="py-3 px-6 text-left text-white bg-black font-semibold text-sm uppercase border-b border-gray-300">Tool Name</th>
                    <th class="py-3 px-6 text-left text-white bg-black font-semibold text-sm uppercase border-b border-gray-300">Serial No</th>
                    <th class="py-3 px-6 text-left text-white bg-black font-semibold text-sm uppercase border-b border-gray-300">Quantity</th>
                    <th class="py-3 px-6 text-left text-white bg-black font-semibold text-sm uppercase border-b border-gray-300">Available</th>
                    <th class="py-3 px-6 text-left text-white bg-black font-semibold text-sm uppercase border-b border-gray-300">Condition</th>
                    <th class="py-3 px-6 text-left text-white bg-black font-semibold text-sm uppercase border-b border-gray-300 text-center">Action</th>
                </tr>
            </thead>
            <tbody>`;

    rsTool.forEach(tool => {
        html += `
            <tr>
                <td class="text-left py-3 px-6">${tool.tools_name}</td>
                <td class="text-left px-6">${tool.tools_serialNo}</td>
                <td class="text-left px-6">${tool.tools_quantity}</td>
                <td class="text-left px-6">${tool.tools_available}</td>
                <td class="text-left px-6">${tool.tools_condition}</td>
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
    document.getElementById("btnTool").addEventListener("click", () => {
        ShowTool();
    });

    // Initially fetch and display records when the page loads
    ShowTool();
});