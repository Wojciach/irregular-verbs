<?php

//include_once('err.php');

if(!isset($_GET['liked'])) {exit('seeya!');}

require_once("./php/RequestDatabase.php");

use function Wojciach\Wojciach\getIP;
use  Wojciach\Wojciach\RequestDatabase;

$msg = htmlspecialchars($_GET['feedback']);
$like = htmlspecialchars($_GET['liked']);
 
function clear() {
  $msg = "";
  $like = "";
  $_GET['liked'] = "";
  $_GET['feedback'] = "";
}

try {
  $requestDatabase = new RequestDatabase("./php/db_passDev.php");
} catch(Exception $e) {
  echo '{"msgPHP":"Database connection error."}'; exit();
}

$fdbQ = $requestDatabase->howManyMessages();
$thanks = "<b>Thank you for your feedback.</b>";
$tooMany = "You have sent $fdbQ requests already. <br> Please allow us time to process them.";
$happy = " &#9786;";
$sad = " &#9785;";
$resp = '{"msgPHP":"'.$tooMany.'<br>'.$thanks.'","fdbQ":"'.$fdbQ.'"}';

if($requestDatabase->howManyMessages() >= 5) {
  echo $resp;
}

if($requestDatabase->howManyMessages() < 5) {

  try {
    $requestDatabase->sendData($msg, $like);
  } catch(Exception $e) {
    echo '{"msgPHP":"Database connection error: (wrong query)."}'; exit();
  }

  $resp = '{"msgPHP":"'.$thanks.'","fdbQ":"'.$fdbQ.'"}';
  if($like=="yes") {$resp = '{"msgPHP":"'.$thanks.$happy.$happy.$happy.'","fdbQ":"'.$fdbQ.'"}';}
  if($like=="no") {$resp = '{"msgPHP":"'.$thanks.'","fdbQ":"'.$fdbQ.'"}';}
  
  echo $resp;
}

$requestDatabase->close();
