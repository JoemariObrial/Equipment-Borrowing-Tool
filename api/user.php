<!-- <?php

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");

class Users
{
    function Register($json)
    {
        include 'connection.php';

        $json = json_decode($json, true);

        $fullname = $json['fullname'];
        $username = $json['username'];
        $password = $json['password'];

        $sql = "INSERT INTO tbl_user(user_fullName, user_username, user_password) VALUES(:fullname, :username, :password)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":fullname", $fullname);
        $stmt->bindParam(":username", $username);
        $stmt->bindParam(":password", $password);
        $stmt->execute();

        $returnValue = 0;
        if ($stmt->rowCount() > 0) {
            $returnValue = 1;
        }
        $stmt = null;
        $conn = null;
        return $returnValue;
    }

    function Login($json)
    {
        include 'connection.php';

        $json = json_decode($json, true);

        $username = $json['username'];
        $password = $json['password'];

        $sql = "SELECT user_id, user_username, user_fullName FROM tbl_user WHERE user_username=:username AND user_password=:password";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":username", $username);
        $stmt->bindParam(":password", $password);
        $stmt->execute();

        $returnValue = 0;
        if ($stmt->rowCount() > 0) {
            $returnValue = $stmt->fetch(PDO::FETCH_ASSOC);
        }
        $stmt = null;
        $conn = null;

        return json_encode($returnValue);
    }
}

$operation = isset($_POST["operation"]) ? $_POST["operation"] : "Invalid";
$json = isset($_POST["json"]) ? $_POST["json"] : "";

$user = new Users();
switch ($operation) {
    case "Register":
        echo $user->Register($json);
        break;
    case "Login":
        echo $user->Login($json);
        break;
}