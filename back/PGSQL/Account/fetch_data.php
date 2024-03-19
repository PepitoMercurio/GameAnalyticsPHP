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

function SelectDataUser($id_user) {
    global $connection;
    
    // Utilisez la syntaxe correcte pour la requête préparée avec un paramètre
    $query = "SELECT * FROM utilisateur WHERE id = $1";

    // Exécutez la requête avec les paramètres
    $result = pg_prepare($connection, "", $query);
    
    if ($result) {
        // Utilisez pg_execute avec l'index du paramètre au lieu de pg_execute avec le nom de la requête
        $result = pg_execute($connection, "", array($id_user));
        
        // Vérifiez si une ligne correspondante est retournée
        if ($result && pg_num_rows($result) > 0) {
            $row = pg_fetch_assoc($result);
            $nom = $row['nom'];
            $prenom = $row['prenom'];
            $email = $row['email'];
            $gamertag = $row['gamertag'];
            $is_admin = $row['is_admin'];
            $logo = $row['logo'];
            $banner = $row['banner'];
            

            // Créez un tableau pour stocker les liens des images
            $imageLinks = array();

            // Vérifiez si les données de l'image ne sont pas vides
            if (!empty($logo)) {
                $unes_logo = pg_unescape_bytea($logo);
                $folder_path = "./Account_Image/$id_user/";
                $logo_file_name = $folder_path . "logo_$id_user.jpg";
            
                // Vérifier si le dossier existe
                if (!file_exists($folder_path)) {
                    // Créer le dossier uniquement s'il n'existe pas déjà
                    mkdir($folder_path, 0777, true);
                }
            
                // Écrire les données binaires dans un fichier (en écrasant le fichier existant)
                file_put_contents($logo_file_name, $unes_logo) or die("Impossible d'écrire les données de l'image\n");

                // Ajoutez le lien du logo au tableau des liens d'image
                $imageLinks['logo'] = "https://localhost:8000/$logo_file_name"; // Remplacez "https://example.com" par l'URL de votre serveur
            }
            
            // Effectuer des opérations similaires pour la bannière
            if (!empty($banner)) {
                $unes_banner = pg_unescape_bytea($banner);
                $folder_path = "./Account_Image/$id_user/";
                $banner_file_name = $folder_path . "banner_$id_user.jpg";
            
                // Vérifier si le dossier existe
                if (!file_exists($folder_path)) {
                    // Créer le dossier uniquement s'il n'existe pas déjà
                    mkdir($folder_path, 0777, true);
                }
            
                // Écrire les données binaires dans un fichier (en écrasant le fichier existant)
                file_put_contents($banner_file_name, $unes_banner) or die("Impossible d'écrire les données de l'image\n");

                // Ajoutez le lien de la bannière au tableau des liens d'image
                $imageLinks['banner'] = "https://localhost:8000/$banner_file_name"; // Remplacez "https://example.com" par l'URL de votre serveur
            }

            // Ajoutez les liens d'image au tableau de données utilisateur
            $row['image_links'] = $imageLinks;

            // Retournez les données de l'utilisateur sous forme de tableau associatif
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

$jwt = $_POST['token']; 
$id_user = $_POST['id'];


try {
    $data = SelectDataUser($id_user);
    
    // Renvoyez les données utilisateur sous forme de réponse JSON
    $response = array(
        'id' => $id_user,
        'user' => $data
    );

    header('Content-Type: application/json');
    echo json_encode($response);
} catch (Exception $e) {
    // Le token est invalide ou a expiré
    header('HTTP/1.0 401 Unauthorized');
    echo 'Invalid token';
}
?>
