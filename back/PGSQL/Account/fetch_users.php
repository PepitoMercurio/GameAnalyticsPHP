<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');
require '../connection.php';

if (!$connection) {
    die("Erreur de connexion : " . pg_last_error());
}

$id_user = $_POST['id_user'];
$search = $_POST['search'] . '%';

$query = "SELECT * FROM utilisateur WHERE id != $id_user AND gamertag LIKE '$search'";
$result = pg_query($connection, $query);

if ($result) {
    $data = array();

    while ($row = pg_fetch_assoc($result)) {
        $id_friend = $row['id'];

        $count = "SELECT COUNT(*) AS q FROM friend WHERE (id_friend = $id_friend AND id_user = $id_user) OR (id_user = $id_friend AND id_friend = $id_user)";
        $countRes = pg_query($connection, $count);

        $countRow = pg_fetch_assoc($countRes);

        if ($countRow['q'] == 0) {
            $row['here'] = pg_fetch_assoc($countRes);
            $row['logo'] = 'http://localhost:8000/PGSQL/Account/Account_Image/'. $id_friend .'/logo_'. $id_friend . '.jpg';
            $data[] = $row;
        }
    }

    // Envoie la réponse JSON
    echo json_encode($data);
} else {
    echo 'Erreur lors de la récupération des données : ' . pg_last_error($connection);
}

?> 
