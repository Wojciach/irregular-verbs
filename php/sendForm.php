<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: text/plain');

//quiet errors meesages
//include_once('err.php');

require 'vendor/autoload.php';

use Wojciach\Wojciach\PHPMailerEmail;
use Wojciach\Wojciach\RequestDatabase;
use Wojciach\Wojciach\EmailBody;

$RequestDatabase = new RequestDatabase("db_passDev.php");

if($RequestDatabase->howManyMessages() >= 5) {
  echo 'tooMany';
  exit();
}

if($RequestDatabase->howManyMessages() < 5) {
  $emailBody = new EmailBody();
  $RequestDatabase->sendData(
    $emailBody->name,
    $emailBody->phone,
    $emailBody->email,
    $emailBody->message
  );
  $email = new PHPMailerEmail($emailBody->getBody());
  $email->send();
  echo 'ok';
  exit();
}
$RequestDatabase->close();
