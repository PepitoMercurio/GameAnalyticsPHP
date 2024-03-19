<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$host = '172.104.240.106';
$port = '5432';
$dbname = 'zindar';
$username = 'zindar';
$password = '@Ryan20072003@';

$connection = pg_connect("host=$host port=$port dbname=$dbname user=$username password=$password");
if($connection){
}
?>
