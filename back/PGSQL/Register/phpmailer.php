<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
use PHPMailer\PHPMailer\PHPMailer;
require '../../vendor/autoload.php';

    function Sendemail($email_sended_to) {
        $init = new PHPMailer(true);
        $init->isSMTP();
        $init->Host = null;
        $init->SMTPAuth = true;
        $init->Username = null;
        $init->Password = null;
        $init-> SMTPSecure =  PHPMailer::ENCRYPTION_SMTPS;
        $init->Port = "465";
        $init->setFrom(null);
        $init->addAddress($email_sended_to);
        $init->isHTML(true);
        $init->Subject = "Barrage";
        $num_str = sprintf("%06d", mt_rand(1, 999999));
        $init->Body = "Votre code est :"."\n".$num_str;
        if($init -> send()){
            return $num_str;
        }else {
            return 'error';
        }
     
            

    
    }


?>
