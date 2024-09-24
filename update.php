<?php
  header("Access-Control-Allow-Origin:*");
  // 1. establish connection to the database
  include("connection.php");
  
  //3. Define SQL statement
  $sql = "UPDATE tblemployee SET employee_name=:name, employee_address=:address,	employee_email=:email, ";
  $sql .= "employee_number=:number,	employee_status=:status,	employee_sex=:sex, employee_dpId=:dpId ";
  $sql .= "WHERE employee_id = :employeeId";
  //4. define prepared statement
  $stmt = $conn->prepare($sql);
  $stmt->bindParam(":name", $_POST['name']);
  $stmt->bindParam(":address", $_POST['address']);
  $stmt->bindParam(":email", $_POST['email']);
  $stmt->bindParam(":number", $_POST['number']);
  $stmt->bindParam(":status", $_POST['status']);
  $stmt->bindParam(":sex", $_POST['sex']);
  $stmt->bindParam(":employeeId", $_POST['employeeId']);
  $stmt->bindParam(":dpId", $_POST['dpId']);
  //5. execute the command
  $returnValue = 0;
  $stmt->execute();
  
  if($stmt->rowCount() > 0){
    $returnValue = 1;
  }

  echo $returnValue;
?>