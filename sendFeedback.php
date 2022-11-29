<?php



$mysqli = new mysqli("127.0.0.1", "root", "", "irregular-lcl");
if($mysqli->connect_error) {
  exit('Could not connect');
}


$msg = htmlspecialchars($_GET['q']);


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

echo $msg;  
 
$ip = $ip1."---".$ip2;  


$sql = "INSERT INTO `messages`(`ip`, `msg`) VALUES ('$ip','$msg')";

$stmt = $mysqli->prepare($sql);

$stmt->execute();

$stmt->close();



?>