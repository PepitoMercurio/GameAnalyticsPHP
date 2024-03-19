<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: X-Requested-With, Origin, Content-Type, X-CSRF-Token, Accept');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: GET');
require '../../vendor/autoload.php';
require '../connection.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

function SelectBestScore($id_user) {
    global $connection;
    
    // Utilisez la syntaxe correcte pour la requête préparée avec un paramètre
    $query = "SELECT MAX(score) best_score FROM score WHERE id_user = $1";

    // Exécutez la requête avec les paramètres
    $result = pg_prepare($connection, "", $query);
    
    if ($result) {
        // Utilisez pg_execute avec l'index du paramètre au lieu de pg_execute avec le nom de la requête
        $result = pg_execute($connection, "", array($id_user));
        
        // Vérifiez si une ligne correspondante est retournée
        if ($result && pg_num_rows($result) > 0) {
            $row = pg_fetch_assoc($result);
            $best_score = $row['best_score'];

            // Retournez les données de l'score sous forme de tableau associatif
            return $row;
        } else {
            // Aucun enregistrement trouvé avec cet id
            return null;
        }
    } else {
        // Erreur lors de la préparation de la requête
        return null;
    }
}

$id_user = $_POST['id_user'];

try {
    $data = SelectBestScore($id_user);
    
    // Renvoyez les données utilisateur sous forme de réponse JSON
    $response = array(
        'id_user' => $id_user,
        'best_score' => $data
    );

    header('Content-Type: application/json');
    echo json_encode($response);
} catch (Exception $e) {
    // Le token est invalide ou a expiré
    header('HTTP/1.0 401 Unauthorized');
    echo 'Invalid token';
}
?>