<?php
class customer {
    function save($json){
        include "connection.php";

        $json = json_decode($json, true);
        
        $fname = $json['fname'];
        $lname = $json['lname'];
        $age = $json['age'];
        $contact = $json['contact'];
        $birthday = $json['birthday'];
        $address = $json['address'];

        $sql = "INSERT INTO tbl_customer(customer_fname, customer_lname, customer_age, customer_contact, customer_birthday, customer_address)";
        $sql .= "VALUES(:fname, :lname, :age, :contact, :birthday, :address)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":fname", $fname);
        $stmt->bindParam(":lname", $lname);
        $stmt->bindParam(":age", $age);
        $stmt->bindParam(":contact", $contact);
        $stmt->bindParam(":birthday", $birthday);
        $stmt->bindParam(":address", $address);
        
        $stmt->execute();
        $returnValue = $stmt->rowCount() > 0 ? 1 : 0;

        return $returnValue;

    }

    function CustomerUpdate($json){
        include "connection.php";
        $json = json_decode($json, true);

        $id = $json['id']; // Get customer ID from JSON
        $fname = $json['fname'];
        $lname = $json['lname'];
        $age = $json['age'];
        $contact = $json['contact_No']; // Corrected the key to match JavaScript
        $birthday = $json['birthday'];
        $address = $json['address'];
    
        $sql = "UPDATE tbl_customer SET customer_fname = :fname, customer_lname = :lname, 
        customer_age = :age, customer_contact = :contact, 
        customer_birthday = :birthday, customer_address = :address ";
        $sql .= "WHERE customer_id = :id"; // Bind the ID parameter
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":fname", $fname);
        $stmt->bindParam(":lname", $lname);
        $stmt->bindParam(":age", $age);
        $stmt->bindParam(":contact", $contact);
        $stmt->bindParam(":birthday", $birthday);
        $stmt->bindParam(":address", $address);
        $stmt->bindParam(":id", $id); // Bind the ID parameter
    
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

    function ShowCustomer(){
        include "connection.php";

        $sql = "SELECT customer_fname, customer_lname, customer_age, customer_contact, customer_birthday, customer_address FROM tbl_customer ORDER BY customer_lname";
        $stmt = $conn->prepare($sql);
        $stmt->execute();

        $returnValue = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $conn = null;
        $stmt = null;

        return json_encode($returnValue);
    }
}

$json = isset($_POST['json']) ? $_POST['json'] : "";
$operation = isset($_POST['operation']) ? $_POST['operation'] : "";

$customer = new customer();
switch($operation){
    case "save":
        echo $customer->save($json);
        break;
    case "CustomerUpdate":
        echo $customer->CustomerUpdate($json);
        break;
    case "delete":
        echo $customer->delete($json);
        break;
    case "ShowCustomer":
        echo $customer->ShowCustomer();
        break;
    /*case "getEmployeesByGender":
        echo $fam->getEmployeesByGender($json);
        break; */
}
?>
