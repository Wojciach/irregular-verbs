<?php 

namespace Wojciach\Wojciach;

class RequestDatabase 
{
    private $mysqli;
    private $ip;

    public function __construct($databasePasses)
    {   
        require_once('getIP.php');
        require_once($databasePasses);
        $mysqli = new \mysqli($host, $user, $pass, $db_name);
        $this->mysqli = $mysqli; //i wonder if i can put new mysqli() here (directly)
        $this->ip = getIP();
    }
    public function howManyMessages() 
    {
        $sql = "SELECT COUNT(ip) FROM messages WHERE ip = '$this->ip'";
        $result = $this->mysqli->query($sql);
        $fetch = $result->fetch_assoc();
        $amount = $fetch['COUNT(ip)'];
        $result->free_result();
        return $amount;
    }
    public function sendData($name, $phone, $email, $msg)
    {
        $sql = "INSERT INTO `messages`(`ip`, `name`, `tel`, `email`, `msg`) VALUES ('$this->ip','$name', '$phone', '$email', '$msg')";
        $this->mysqli->query($sql);
    }
    public function close() {
        $this->mysqli->close();
    }
}
