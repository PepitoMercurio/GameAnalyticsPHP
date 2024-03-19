<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
require '../connection.php';
require '../../vendor/autoload.php';
use \Firebase\JWT\JWT;

function insertSecretKey($secretKey, $email) {
    global $connection;

    $query = "UPDATE utilisateur SET secret_key = $1 WHERE email = $2";


    $stmt = pg_prepare($connection, "insert_query", $query);
    
    if ($stmt) {
        $result = pg_execute($connection, "insert_query", array($secretKey, $email));
        
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

function verifyCredentials($email, $password,$key) {
    global $connection;
    $algorithm = 'HS256';
    // Créez la requête de recherche avec des paramètres
    $query = "SELECT * FROM utilisateur WHERE email = $1";

    // Préparez la requête
    $stmt = pg_prepare($connection, "search_query", $query);

    if ($stmt) {
        // Exécutez la requête avec les paramètres
        $result = pg_execute($connection, "search_query", array($email));
        if ($result) {
            // Vérifiez si une ligne correspondante est retournée
            if (pg_num_rows($result) > 0) {
                $row = pg_fetch_assoc($result);
                $hashedPassword = $row['password'];
                // Vérifiez le mot de passe hashé
                if (password_verify($password, $hashedPassword)) {
                    // Les identifiants sont valides
                    // Générez le JWT
                    $token_payload = array(
                        'id' => $row['id'],
                        'email' => $row['email'],
                        
                    );
                    // créer et encoder la 
                    $jwt = JWT::encode($token_payload, $key, $algorithm);

                    // Retournez le JWT et le statut de réussite
                     $insertion = insertSecretKey($key, $email);
                    return array(
                        'success' => true,
                        'token' => $jwt,
                        'id' => $row['id']
                    );
                } else {
                    // Les identifiants sont invalides
                    return array('success' => false);
                }
            } else {
                // Aucun utilisateur trouvé avec cet email
                return array('success' => false);
            }
        } else {
            return array('success' => false, 'message' => 'Error executing query: ' . pg_last_error($connection));
        }
    } else {
        return array('success' => false, 'message' => 'Error preparing query: ' . pg_last_error($connection));
    }
}
// Vérifiez si l'email et le mot de passe sont présents dans la requête POST
if (isset($_POST['email'], $_POST['password'])) {
    $email = $_POST['email'];
    $password = $_POST['password'];
    // Génère une clé secrète aléatoire de 32 octets
    $randomBytes = random_bytes(32);
    $secretKey = bin2hex($randomBytes);

    // Vérifiez les identifiants en utilisant la fonction
    $verificationResult = verifyCredentials($email, $password, $secretKey);

    // Fermez la connexion à la base de données
    pg_close($connection);

    // Vérifiez le résultat de la vérification des identifiants insertSecretKey
    if ($verificationResult['success']) {
    

        $response = array(
            'success' => true,
            'token' => $verificationResult['token'],
            'id' => $verificationResult['id']
        );
        

       
    } else {
        // Identifiants invalides, renvoie le statut de réussite seulement
        $response = array('success' => false);
    }

    // Envoyez la réponse JSON
    header('Content-Type: application/json');
    echo json_encode($response);
} else {
    echo json_encode(array('success' => false, 'message' => 'Invalid data'));
}
?>
