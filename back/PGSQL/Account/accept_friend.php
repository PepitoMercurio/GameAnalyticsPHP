<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
require '../connection.php';

global $connection;

$id = $_POST['id'];

// Créez la requête de suppression avec un paramètre
$query = "UPDATE friend SET is_accept = true WHERE id = $id;";

// Exécuter la requête
if (pg_query($connection, $query)) {
    echo "Données mise à jour avec succès.";
} else {
    echo "Erreur lors de l'insertion des données : " . pg_last_error($connection);
}

?>
