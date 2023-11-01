<?php

namespace Wojciach\Wojciach;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

class PHPMailerEmail 
{
    private $mail;
    
    public function __construct($body)
    {
        $this->mail = new PHPMailer(true);

        //Server settings
        //$this->mail->SMTPDebug = SMTP::DEBUG_SERVER;
        $this->mail->isSMTP();
        $this->mail->Host       = 'smtp.hostinger.com';
        $this->mail->SMTPAuth   = true;
        $this->mail->Username   = 'cv-message@wyrwoj.website';
        $this->mail->Password   = 'Mesedz!@#800';
        $this->mail->SMTPSecure = 'ssl';
        $this->mail->Port       = 465;
        $this->mail->SMTPOptions = array(
            'ssl' => array(
                //false for local dev true for production
                'verify_peer' => true,
                'verify_peer_name' => true,
                'allow_self_signed' => true
            )
        );
        //Recipient
        $this->mail->setFrom('cv-message@wyrwoj.website', 'CV-message');
        $this->mail->addAddress('wojciech.wyroslak@gmail.com');
        //Content
        $this->mail->isHTML(true);
        $this->mail->CharSet = 'UTF-8';
        $this->mail->Subject = 'WYRWOJ-message';
        $this->mail->Body = $body;
        // $this->mail->send();
        return $this->mail;
    }
    public function send()
    {
        $this->mail->send();
    }
}
