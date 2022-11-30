<?php






$msg = htmlspecialchars($_GET['f']);


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

 
 
 

$mysqli = new mysqli("127.0.0.1", "root", "", "irregular-lcl");
if($mysqli->connect_error) {
  exit('Could not connect');
}


$sql = "SELECT COUNT(ip) FROM messages WHERE ip = '$ip1'";
$result = $mysqli->query($sql);
$fetch = $result->fetch_assoc();

if($fetch['COUNT(ip)'] < 5) {

  $sql = "INSERT INTO `messages`(`ip`, `msg`) VALUES ('$ip1','$msg')";
  $stmt = $mysqli->query($sql);

} elseif($fetch['COUNT(ip)'] >= 5 && $msg != "") {
  echo "You have sent 5 requests already. Please allow us time to process them. <br><b> Thank you for your feedback.</b>";
}



$mysqli->close();



?>