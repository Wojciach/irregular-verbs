<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
//header('Content-Type: text/plain');
header('Content-Type: application/json');

//include_once('err.php');

use function Wojciach\Wojciach\getIP;
use  Wojciach\Wojciach\RequestDatabase;

if(!isset($_GET['liked'])) {exit('seeya!');}

$msg = htmlspecialchars($_GET['feedback']);
$like = htmlspecialchars($_GET['liked']);
 
function clear() {
  $msg = "";
  $like = "";
  $_GET['liked'] = "";
  $_GET['feedback'] = "";
}
require_once("./ResponseCreator.php");
$responseCreator = new ResponseCreator($like);

try {
  require_once("./RequestDatabase.php");
  $requestDatabase = new RequestDatabase("./db_passDev.php");
} catch(Exception $e) {
  echo $responseCreator->getDatabaseErrorResponse(); exit();
}

if($requestDatabase->howManyMessages() >= 5) {
  echo $responseCreator->getTooManyResponse(5); exit();
}

if($requestDatabase->howManyMessages() < 5) {
  try {
    $requestDatabase->sendData($msg, $like);
    echo $responseCreator->getOkResponse(); exit();
  } catch(Exception $e) {
    echo $responseCreator->getDatabaseErrorResponse(); exit();
  }
}

$requestDatabase->close();
