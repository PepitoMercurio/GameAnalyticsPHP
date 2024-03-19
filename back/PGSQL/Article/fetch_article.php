<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');
require '../connection.php';

if (!$connection) {
    die("Erreur de connexion : " . pg_last_error());
}

$query = "SELECT * FROM article";
$result = pg_query($connection, $query);

if ($result) {
    $articles = array();
    while ($row = pg_fetch_assoc($result)) {
        $userId = $row['id_user'];
        
        // Effectuer une requête pour récupérer le gamertag de l'utilisateur
        $userQuery = "SELECT gamertag FROM utilisateur WHERE id = $userId";
        $userResult = pg_query($connection, $userQuery);
        
        if ($userResult && pg_num_rows($userResult) > 0) {
            $userRow = pg_fetch_assoc($userResult);
            $row['gamertag'] = $userRow['gamertag'];
        } else {
            $row['gamertag'] = 'N/A'; // Valeur par défaut si le gamertag n'est pas trouvé
        }
        
        $articles[] = $row;
    }

    echo json_encode($articles);
} else {
    echo 'Erreur lors de la récupération des données : ' . pg_last_error($connection);
}

pg_close($connection);
?>
