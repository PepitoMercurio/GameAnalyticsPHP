<?php
require '../connection.php';

function deleteUser($id) {
    global $connection;

    $query = "DELETE FROM utilisateur WHERE id = $1";

    $stmt = pg_prepare($connection, "delete_query", $query);

    if ($stmt) {
        $result = pg_execute($connection, "delete_query", array($id));

        if ($result) {
            if (pg_affected_rows($result) > 0) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } else {
        return false;
    }
}

if (isset($_GET['id'])) {
    $id = $_GET['id'];

    $deletionResult = deleteUser($id);

    pg_close($connection);

    if ($deletionResult) {
        $response = array('success' => true, 'message' => 'Utilisateur supprimé avec succès');
    } else {
        $response = array('success' => false, 'message' => 'Aucun utilisateur trouvé avec cet ID');
    }

    header('Content-Type: application/json');
    echo json_encode($response);
} else {
    echo json_encode(array('success' => false, 'message' => 'ID d\'utilisateur manquant'));
}
?>
