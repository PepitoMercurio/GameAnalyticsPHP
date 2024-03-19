<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
require '../connection.php';

function CheckIfEmailExists($email_input, $DB_Connection) {
    $email = pg_escape_string($email_input);
    $query = "SELECT email FROM utilisateur WHERE email = '$email'";
    $result = pg_query($DB_Connection, $query);
    $exists = pg_num_rows($result) > 0;
    pg_close($DB_Connection);
    return $exists;
}

$email = $_POST['email'];
$emailExists = CheckIfEmailExists($email, $connection);

$response = [
    $emailExists ? true: false
];

header('Content-Type: application/json');
echo json_encode($response);
?>
