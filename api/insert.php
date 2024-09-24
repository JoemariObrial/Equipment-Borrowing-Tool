<?php
  header("Access-Control-Allow-Origin:*");
  // 1. establish connection to the database
  include("connection.php");
  
  // 2. get the data passed from the client
  $name = $_POST['name'];
  $username = $_POST['username'];
  $password = $_POST['password'];

  //3. Define SQL statement
  $sql = "INSERT INTO tbl_user(user_fullname ,user_username, user_password)";
  $sql .= "VALUES(:name,:username, :password)";
  //4. define prepared statement
  $stmt = $conn->prepare($sql);
  $stmt->bindParam(":name", $name);
  $stmt->bindParam(":username", $username);
  $stmt->bindParam(":password", $password);
  //5. execute the command
  $returnValue = 0;
  $stmt->execute();
  
  if($stmt->rowCount() > 0){
    $returnValue = 1;
  }

  echo $returnValue;
?>