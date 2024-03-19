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

$query = "SELECT id, id_user AS combined_id
FROM friend
WHERE id_friend = $id_user AND is_accept = FALSE";
$result = pg_query($connection, $query);

if ($result) {
    $rank = array();
    while ($row = pg_fetch_assoc($result)) {
        $userId = $row['combined_id'];

        // Effectuer une requête pour récupérer le gamertag et le logo de l'utilisateur
        $userQuery = "SELECT gamertag, id FROM utilisateur WHERE id = $userId AND gamertag LIKE '$search'";
        $userResult = pg_query($connection, $userQuery);

        if ($userResult && pg_num_rows($userResult) > 0) {
            $userRow = pg_fetch_assoc($userResult);
            $row['gamertag'] = $userRow['gamertag'];
            $row['logo'] = 'http://localhost:8000/PGSQL/Account/Account_Image/'. $userRow['id'] .'/logo_'. $userRow['id'] . '.jpg';
        } else {
            $row['gamertag'] = 'N/A'; // Valeur par défaut si le gamertag n'est pas trouvé
        }

        $rank[] = $row;
    }

    // Envoie la réponse JSON
    echo json_encode($rank);
} else {
    echo 'Erreur lors de la récupération des données : ' . pg_last_error($connection);
}

pg_close($connection);

?> 
