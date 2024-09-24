<?php
class returns {
    function save($json){
        include "connection.php";

        $json = json_decode($json, true);

        $return_id = $json['return_id'];
        $borrow_id = $json['borrow_id'];
        $return_date = $json['return_date'];
        $return_condtion = $json['return_condtion'];
        $return_quantity = $json['return_quantity'];


        $sql = "INSERT INTO tbl_return(return_id, borrow_id, return_date, return_condtion, return_quantity) ";
        $sql .= "VALUES(:return_id, :borrow_id, :return_date, :return_condtion, :return_quantity)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":return_id", $return_id);
        $stmt->bindParam(":borrow_id", $borrow_id);
        $stmt->bindParam(":return_date", $return_date);
        $stmt->bindParam(":return_condtion", $return_condtion);
        $stmt->bindParam(":return_quantity", $return_quantity);

        
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

    function ShowReturn(){
        include "connection.php";

        $sql = "SELECT tbl_customer.customer_lname, 
        tbl_customer.customer_fname, 
        tbl_tools.tools_name, 
        tbl_borrow.borrow_date, 
        tbl_borrow.borrow_quantity, 
        tbl_return.return_date, 
        tbl_return.return_condition,
        tbl_return.return_quantity 
        FROM tbl_borrow 
        INNER JOIN tbl_customer ON tbl_borrow.customer_id = tbl_customer.customer_id 
        INNER JOIN tbl_tools ON tbl_borrow.tools_id = tbl_tools.tools_id 
        INNER JOIN tbl_return ON tbl_return.return_id = tbl_return.return_id ORDER BY customer_lname DESC";
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

$return = new returns();
switch($operation){
    case "save":
        echo $return->save($json);
        break;
    case "update":
        echo $return->update($json);
        break;
    case "delete":
        echo $return->delete($json);
        break;
    case "ShowReturn":
        echo $return->ShowReturn();
        break;
    /*case "getEmployeesByGender":
        echo $fam->getEmployeesByGender($json);
        break; */
}
?>
