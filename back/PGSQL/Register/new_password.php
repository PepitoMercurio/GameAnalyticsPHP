<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
require '../connection.php';

if (isset($_POST['email'], $_POST['password'])) {
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT); 


    $query = "UPDATE utilisateur SET password = $1 WHERE email = $2";
    $stmt = pg_prepare($connection, "update_query", $query);

    if ($stmt) {
        $result = pg_execute($connection, "update_query", array(
            $password,
            $email,
       
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
