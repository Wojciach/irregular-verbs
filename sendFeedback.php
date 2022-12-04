<?php


$msg = htmlspecialchars($_GET['feedback']);
$like = htmlspecialchars($_GET['liked']);


$ip1 = $_SERVER['REMOTE_ADDR'];


function getIPAddress() {  
  //whether ip is from the share internet  
   if(!empty($_SERVER['HTTP_CLIENT_IP'])) {  
              $ip = $_SERVER['HTTP_CLIENT_IP'];  
      }  
  //whether ip is from the proxy  
  elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {  
              $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];  
   }  
//whether ip is from the remote address  
  else{  
           $ip = $_SERVER['REMOTE_ADDR'];  
   }  
   return $ip;  
}  

$ip2 = getIPAddress();  

 
 function clear() {
  $msg = "";
  $like = "";
  $_GET['liked'] = "";
  $_GET['feedback'] = "";
 }
 

$mysqli = new mysqli("127.0.0.1", "root", "", "irregular-lcl");
if($mysqli->connect_error) {
  exit('Could not connect');
}


$sql = "SELECT COUNT(ip) FROM messages WHERE ip = '$ip1'";
$result = $mysqli->query($sql);
$fetch = $result->fetch_assoc();
$fdbQ = $fetch['COUNT(ip)'];

function sendData($ip1, $msg, $like) {
  $sql = "INSERT INTO `messages`(`ip`, `msg`, `liked`) VALUES ('$ip1','$msg', '$like')";
  global $mysqli;
  $stmt = $mysqli->query($sql);
}

$thanks = "<b>Thank you for your feedback.</b>";
$tooMany = "You have sent $fdbQ requests already. <br> Please allow us time to process them.";
$happy = " &#9786;";
$sad = " &#9785;";
$resp = '{"msgPHP":"'.$tooMany.'<br>'.$thanks.'","fdbQ":"'.$fdbQ.'"}';

if($fdbQ >= 5) {echo $resp;}

if($fdbQ < 5) {
  sendData($ip1, $msg, $like);
  $resp = '{"msgPHP":"'.$thanks.'","fdbQ":"'.$fdbQ.'"}';
  if($like=="yes") {$resp = '{"msgPHP":"'.$thanks.$happy.$happy.$happy.'","fdbQ":"'.$fdbQ.'"}';}
  if($like=="no") {$resp = '{"msgPHP":"'.$thanks.'","fdbQ":"'.$fdbQ.'"}';}
  
  echo $resp;
}


$mysqli->close();

?>