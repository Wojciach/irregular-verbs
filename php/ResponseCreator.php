<?php
class ResponseCreator 
{
   private $like;
   private $thanks = "<b>Thank you for your feedback.</b>";
   private $happyFaces = "&#9786;&#9786;&#9786;";
   private $sadFaces = "&#9785;&#9785;&#9785;";
   private $responseOkThanks;
   private $responseDatabaseError = "Sorry! <br> Database connection error.";
   private $responseArray = ['msgPHP' => ''];

    public function __construct($like)
    {
        $this->like = $like;

        $this->responseOkThanks = $this->thanks . " " . (($like === "yes") ? $this->happyFaces : "");

    }

    public function getOkResponse()
    {
        $this->responseArray['msgPHP'] = $this->responseOkThanks;
        return json_encode($this->responseArray);
    }

    public function getTooManyResponse($quantity)
    {
        $this->responseArray['msgPHP'] = "You have sent $quantity requests already. <br> Please allow us time to process them.";
        return json_encode($this->responseArray);
    }

    public function getDatabaseErrorResponse()
    {
        $this->responseArray['msgPHP'] = $this->responseDatabaseError;
        return json_encode($this->responseArray);
    }
}