<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT,DELETE');

$db_host = "localhost";
$db_username = "root";
$db_password = "";
$db_name = "longping";
$method = $_SERVER['REQUEST_METHOD'];
$db_link = @new mysqli($db_host, $db_username, $db_password, $db_name);
if ($db_link->connect_error != "") {
  echo "資料庫連結失敗";
} else {
  $db_link->query("SET NAMES utf8");
}

$json = json_decode(file_get_contents('php://input'), true);
$sql_query = "INSERT INTO orderinformation(takeway, takedate,taketime,username,usertel,usermail,address) VALUES('$json[takeway]', '$json[takedate]','$json[taketime]','$json[username]','$json[usertel]','$json[usermail]','$json[address]')";
$query_result = $db_link ->query($sql_query);

if ($query_result === true)
{
 $message = 'Success!';
}

else
{
  $message = 'Error! Try Again(' . $db_link->error . ')';}

echo json_encode($message);

$db_link ->close(); 