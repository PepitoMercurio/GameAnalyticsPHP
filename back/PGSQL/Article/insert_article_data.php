<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
require '../connection.php';

if (isset($_POST['title'], $_POST['text'],$_POST['id'], $_POST['gamertag'])) {
    $title = $_POST['title'];
    $text = $_POST['text'];
    $id = $_POST['id'];
    $gamertag = $_POST['gamertag'];

             $query = "INSERT INTO article (id_user, title, text) VALUES ($1, $2, $3)";
             $stmt = pg_prepare($connection, "insert_query", $query);
    
            if ($stmt) {
                $result = pg_execute($connection, "insert_query", array(
                    $id,
                    $title,
                    $text,
                ));

                if ($result) {
                    echo 'Données ajoutées avec succès';
                } else {
                    echo 'Erreur lors de l\'ajout des données : ' . pg_last_error($connection);
                }
            } else {
                echo 'Erreur lors de la préparation de la requête : ' . pg_last_error($connection);
            }
    pg_close($connection);
} else {
    echo 'Données non valides';
}
?>
