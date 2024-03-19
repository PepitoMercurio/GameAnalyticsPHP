<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
require '../connection.php';

function sendToFriend($id, $id_friend) {
    global $connection;

    // Créez la requête de suppression avec un paramètre
    $query = "";

    // Préparez la requête
    $stmt = pg_prepare($connection, "delete_query", $query);

    if ($stmt) {
        // Exécutez la requête avec le paramètre
        $result = pg_execute($connection, "delete_query", array($id));

        if ($result) {
            // Vérifiez si une ligne a été supprimée
            if (pg_affected_rows($result) > 0) {
                // L'utilisateur a été supprimé avec succès
                return true;
            } else {
                // Aucune suppression n'a été effectuée car aucun utilisateur avec cet ID n'a été trouvé
                return false;
            }
        } else {
            // Erreur lors de l'exécution de la requête
            return false;
        }
    } else {
        // Erreur lors de la préparation de la requête
        return false;
    }
}

// Vérifiez si l'ID de l'utilisateur est présent dans la requête GET
if (isset($_POST['id'])) {
    $id = $_POST['id'];

    // Supprimez l'utilisateur en utilisant la fonction deleteUser
    $deletionResult = sendToFriend($id);

    // Fermez la connexion à la base de données
    pg_close($connection);

    // Vérifiez le résultat de la suppression de l'utilisateur
    if ($deletionResult) {
        // L'utilisateur a été supprimé avec succès
        $response = array('success' => true, 'message' => 'Utilisateur supprimé avec succès');
    } else {
        // Aucun utilisateur trouvé avec cet ID, renvoie un message d'erreur
        $response = array('success' => false, 'message' => 'Aucun utilisateur trouvé avec cet ID');
    }

    // Envoyez la réponse JSON
    header('Content-Type: application/json');
    echo json_encode($response);
} else {
    echo json_encode(array('success' => false, 'message' => 'ID d\'utilisateur manquant'));
}
?>
