<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
require '../connection.php';

global $connection;

$id_user = $_POST['id_user'];
$id_friend = $_POST['id_friend'];

// Créez la requête de suppression avec un paramètre
$query = "INSERT INTO friend (id_user, id_friend, is_accept) VALUES ($id_user, $id_friend, FALSE)";

// Exécuter la requête
if (pg_query($connection, $query)) {
    echo "Données insérées avec succès dans la base de données.";
} else {
    echo "Erreur lors de l'insertion des données : " . pg_last_error($connection);
}

?>
