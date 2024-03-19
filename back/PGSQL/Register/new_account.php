<?php

header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
require '../connection.php';

if (isset($_POST['name'], $_POST['surname'], $_POST['pseudo'], $_POST['email'], $_POST['password'], $_FILES['banner'], $_FILES['logo'])) {
    $name = $_POST['name'];
    $surname = $_POST['surname'];
    $gamertag = $_POST['pseudo'];
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT); 
    $banner = $_FILES['banner'];
    $logo = $_FILES['logo'];
    $userDirectory = './IMG/' . $email . '/';
    if (!file_exists($userDirectory)) {
        mkdir($userDirectory, 0777, true);
    }
    $bannerPath = $userDirectory . basename($banner['name']);
    $logoPath = $userDirectory . basename($logo['name']);
    if (move_uploaded_file($banner['tmp_name'], $bannerPath) && move_uploaded_file($logo['tmp_name'], $logoPath)) {
        if (file_exists($bannerPath) && file_exists($logoPath)) {
            $logo_img = fopen($logoPath, 'r');
            $banner_img = fopen($bannerPath, 'r');

            $logo_data = fread($logo_img, filesize($logoPath));
            $banner_data = fread($banner_img, filesize($bannerPath));
            
            $logoData = pg_escape_bytea($connection,$logo_data);
            $bannerData = pg_escape_bytea($connection,$banner_data);

            fclose($logo_img);
            fclose($banner_img);

            $query = "INSERT INTO utilisateur (nom, prenom, gamertag, email, password, logo, banner, is_admin, creation_date) VALUES ($1, $2, $3, $4, $5, $6, $7, false, CURRENT_DATE)";
            $stmt = pg_prepare($connection, "insert_query", $query);
            
            if ($stmt) {
                $result = pg_execute($connection, "insert_query", array(
                    $name,
                    $surname,
                    $gamertag,
                    $email,
                    $password,
                    $logoData,
                    $bannerData
                ));

                if ($result) {
                    echo 'Données ajoutées avec succès';
                } else {
                    echo 'Erreur lors de l\'ajout des données : ' . pg_last_error($connection);
                }
            } else {
                echo 'Erreur lors de la préparation de la requête : ' . pg_last_error($connection);
            }
        } else {
            echo 'Les fichiers spécifiés n\'existent pas';
        }
    } else {
        echo 'Erreur lors du déplacement des fichiers';
    }
    pg_close($connection);
} else {
    echo 'Données non valides';
}
?>
