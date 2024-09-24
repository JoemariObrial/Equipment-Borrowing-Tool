<?php
class borrow {
    function save($json){
        include "connection.php";

        $json = json_decode($json, true);

        $customer_id = $json['customer_id'];
        $tools_id = $json['tools_id'];
        $borrow_quantity = $json['borrow_quantity'];
        $borrow_date = $json['borrow_date'];
       

        $sql = "INSERT INTO tbl_borrow(customer_id, tools_id, borrow_quantity, borrow_date) ";
        $sql .= "VALUES(:customer_id, :tools_id, :borrow_quantity, :borrow_date)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":customer_id", $customer_id);
        $stmt->bindParam(":tools_id", $tools_id);
        $stmt->bindParam(":borrow_quantity", $borrow_quantity);
        $stmt->bindParam(":borrow_date", $borrow_date);


        $stmt->execute();
        $returnValue = $stmt->rowCount() > 0 ? 1 : 0;

        return $returnValue;
    }

    function update($json){
        include "connection.php";
        $json = json_decode($json, true);
        $id = $json['id'];
        $name = $json['name'];
        $tool = $json['tool'];
        
        $sql = "UPDATE tbl_borrow SET borrow_name = :name, borrow_tool = :tool, borrow_quantity = :quantity, borrow_date = :date ";
        $sql .= "WHERE borrow_id = :id";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":id", $id);
        $stmt->bindParam(":name", $name);
        $stmt->bindParam(":tool", $tool);
        $stmt->bindParam(":quantity",$quantity);
        $stmt->bindParam(":date", $date);

        $stmt->execute();
        $returnValue = $stmt->rowCount() > 0 ? "Updated Successfully" : "Not UPDATED";

        return $returnValue;
    }

    function delete($json){
        include "connection.php";
        $json = json_decode($json, true);
        $id = $json['id'];

        $sql = "DELETE FROM tbl_borrow WHERE borrow_id = :id";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":id", $id);

        $stmt->execute();
        $returnValue = $stmt->rowCount() > 0 ? 1 : 0;
        return $returnValue;
    }

    function ShowBorrow(){
        include "connection.php";

        $sql = "SELECT tbl_customer.customer_lname,
         tbl_customer.customer_fname, 
         tbl_customer.customer_address, 
         tbl_customer.customer_contact, 
         tbl_tools.tools_name, 
         tbl_tools.tools_serialNo, 
         tbl_borrow.borrow_quantity, 
         tbl_borrow.borrow_date 
         FROM tbl_borrow 
         INNER JOIN tbl_customer ON tbl_borrow.customer_id = tbl_customer.customer_id 
         INNER JOIN tbl_tools ON tbl_borrow.tools_id = tbl_tools.tools_id ORDER BY customer_lname";
        $stmt = $conn->prepare($sql);
        $stmt->execute();

        $returnValue = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $conn = null;
        $stmt = null;

        return json_encode($returnValue);
    }

    function showCustomer()
    {
        include "connection.php"; // Include your database connection script

        $sql = "SELECT customer_id, customer_fname, customer_lname FROM tbl_customer";
        $stmt = $conn->prepare($sql);
        $stmt->execute();

        $returnValue = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $conn = null;
        $stmt = null;

        // Return the result as a JSON-encoded string
        return json_encode($returnValue);
    }
    
    function showTool()
    {
        include "connection.php"; // Include your database connection script

        $sql = "SELECT tools_id, tools_name FROM tbl_tools";
        $stmt = $conn->prepare($sql);
        $stmt->execute();

        $returnValue = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $conn = null;
        $stmt = null;

        // Return the result as a JSON-encoded string
        return json_encode($returnValue);
    }



}


$json = isset($_POST['json']) ? $_POST['json'] : "";
$operation = isset($_POST['operation']) ? $_POST['operation'] : "";

$borrow = new borrow();
switch($operation){
    case "save":
        echo $borrow->save($json);
        break;
    case "update":
        echo $borrow->update($json);
        break;
    case "delete":
        echo $borrow->delete($json);
        break;
    case "ShowBorrow":
        echo $borrow->ShowBorrow();
        break;
    case "showCustomer":
        echo $borrow->showCustomer();
        break;
    case "showTool":
        echo $borrow->showTool();
        break;
    /*case "getEmployeesByGender":
        echo $fam->getEmployeesByGender($json);
        break; */
}
?>
