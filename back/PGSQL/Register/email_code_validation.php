<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
require './phpmailer.php';


function CodeValidation($TrueCode,$InputCode){
    if($TrueCode === $InputCode){
        return true;
    } else {
        return false;
    }
}

if (isset($_POST['email'])) {
    $email = $_POST['email'];
    $code = Sendemail($email);
    $codeContent = "True_Code: " . $code . "\n";

    $codeFilename = "code.txt";


    file_put_contents($codeFilename, $codeContent);
    
    if ($code === 'error') {
        echo "Erreur lors de l'envoi de l'email.";
    } else {
        echo "Email envoyé avec succès. Votre code est : " . $code;
    }
}

if (isset($_POST['code'])) {
    $code_input = $_POST['code'];

    $codeContent = file_get_contents("code.txt");
    
    preg_match('/True_Code: (\d+)/', $codeContent, $matches);
    $True_Code = isset($matches[1]) ? $matches[1] : '';
    $CODE =  CodeValidation($True_Code,$code_input);
   
    $response = [
        $CODE? true: false
    ];
    
    header('Content-Type: application/json');
    echo json_encode($response);
}
?>
