<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
require '../connection.php';

if (isset($_POST['id_article'], $_POST['title'], $_POST['text'])) {
    $title = $_POST['title'];
    $text = $_POST['text'];
    $id_article = $_POST['id_article'];

    $query = "UPDATE article SET title = $1, text = $2 WHERE id = $3";
    $stmt = pg_prepare($connection, "update_query", $query);

    if ($stmt) {
        $result = pg_execute($connection, "update_query", array(
            $title,
            $text,
            $id_article,
        ));

        if ($result) {
            echo 'Données mises à jour avec succès';
        } else {
            echo 'Erreur lors de la mise à jour des données : ' . pg_last_error($connection);
        }
    } else {
        echo 'Erreur lors de la préparation de la requête : ' . pg_last_error($connection);
    }
    pg_close($connection);
} else {
    echo 'Données non valides';
}
?>
