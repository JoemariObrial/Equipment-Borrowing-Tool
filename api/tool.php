<?php
class Tooladd {
    function save($json){
        include "connection.php";

        $json = json_decode($json, true);

        $id = $json['id'];
        $tname = $json['tname'];
        $quantity = $json['quantity'];
        $available = $json['available'];
        $condition = $json['condition'];
        $serialNo = $json['serialNo'];
       

        $sql = "INSERT INTO tbl_tools(tools_id, tools_name, tools_quantity, tools_available, tools_condition, tools_serialNo) ";
        $sql .= "VALUES(:id, :tname, :quantity, :available, :condition, :serialNo)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":id", $id);
        $stmt->bindParam(":tname", $tname);
        $stmt->bindParam(":quantity", $quantity);
        $stmt->bindParam(":available", $available);
        $stmt->bindParam(":condition", $condition);
        $stmt->bindParam(":serialNo", $serialNo);
        
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
        
        $sql = "UPDATE tbl_borrow SET borrow_name = :name, borrow_tool = :tool ";
        $sql .= "WHERE borrow_id = :id";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":id", $id);
        $stmt->bindParam(":name", $name);
        $stmt->bindParam(":tool", $tool);

        $stmt->execute();
        $returnValue = $stmt->rowCount() > 0 ? "Updated Successfully" : "Not UPDATED";

        return $returnValue;
    }

    function delete($json){
        include "connection.php";
        $json = json_decode($json, true);
        $id = $json['id'];

        $sql = "DELETE FROM tblcars WHERE fam_id = :id";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":id", $id);

        $stmt->execute();
        $returnValue = $stmt->rowCount() > 0 ? 1 : 0;
        return $returnValue;
    }

    function ShowTool(){
        include "connection.php";

        $sql = "SELECT tools_name, tools_serialNo, tools_quantity, tools_available, tools_condition FROM tbl_tools ORDER BY tools_name";
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

$tool = new Tooladd();
switch($operation){
    case "save":
        echo $tool->save($json);
        break;
    case "update":
        echo $tool->update($json);
        break;
    case "delete":
        echo $tool->delete($json);
        break;
    case "ShowTool":
        echo $tool->ShowTool();
        break;
    /*case "getEmployeesByGender":
        echo $fam->getEmployeesByGender($json);
        break; */
}
?>
