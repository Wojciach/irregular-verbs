<?php
$mysqli = new mysqli("127.0.0.1", "root", "", "irregular-lcl");
if($mysqli->connect_error) {
  exit('Could not connect');
}

$sql = "INSERT INTO `messages`(`id`, `time`, `ip`, `msg`) VALUES ('[value-1]','[value-2]','[value-3]','[value-4]')";

$stmt = $mysqli->prepare($sql);

$stmt->execute();
$stmt->store_result();
$stmt->bind_result($cid, $cid2, $cid3, $cid4);
$stmt->fetch();
$stmt->close();


echo  $cid . " " .  $cid3;

?>