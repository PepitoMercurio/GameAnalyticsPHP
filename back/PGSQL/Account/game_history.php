<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');
require '../connection.php';

if (!$connection) {
    die("Erreur de connexion : " . pg_last_error());
}

$id_user = $_POST['id_user'];

$query = "SELECT * FROM score WHERE id_user = $id_user ORDER BY id DESC";
$result = pg_query($connection, $query);

if ($result) {
    $data = array();

    while ($row = pg_fetch_assoc($result)) {
        $data[] = $row;
    }
    // Envoie la réponse JSON
    echo json_encode($data);
} else {
    echo 'Erreur lors de la récupération des données : ' . pg_last_error($connection);
}

?> 
