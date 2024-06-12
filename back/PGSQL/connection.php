<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

//host & password ont été enlevé pour un affichage public du repo
$host = null;
$port = '5432';
$dbname = 'zindar';
$username = 'zindar';
$password = null;

$connection = pg_connect("host=$host port=$port dbname=$dbname user=$username password=$password");
if($connection){
}
?>
