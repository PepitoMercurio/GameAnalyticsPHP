<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if (isset($_POST['data'])) {
    $inputData = $_POST['data'];
    
    // Stockage des données dans un fichier texte
    $file = fopen("data.txt", "a");
    fwrite($file, $inputData . PHP_EOL);
    fclose($file);
    
    $response = ['message' => $inputData];
    echo json_encode($response);
} else {
    $response = ['error' => 'Données non valides'];
    http_response_code(400); // Définir le code de réponse HTTP sur 400 (Bad Request)
    echo json_encode($response);
}
?>
