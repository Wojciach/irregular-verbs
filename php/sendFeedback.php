<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
//header('Content-Type: text/plain');
header('Content-Type: application/json');

//include_once('err.php');

use function Wojciach\Wojciach\getIP;
use  Wojciach\Wojciach\RequestDatabase;

try {

    if(!isset($_GET['liked'])) {exit('seeya!');}

    $msg = htmlspecialchars($_GET['feedback']);
    $like = htmlspecialchars($_GET['liked']);
    
    require_once("./ResponseCreator.php");
    $responseCreator = new ResponseCreator($like);

    try {
        require_once("./RequestDatabase.php");
        $requestDatabase = new RequestDatabase("./passes/db_passProd.php");
    } catch(Exception $e) {
        echo $responseCreator->getDatabaseErrorResponse(); 
        exit();
    }

    if($requestDatabase->howManyMessages() >= 5) {
        echo $responseCreator->getTooManyResponse(5); 
        exit();
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

} catch(Exception $e) {
    $responseArray = ['msgPHP' => 'Sorry! <br> Database connection error.'];
    echo json_encode($responseArray);
    exit();
}