<?php
$server = "localhost";
$user = "root";
$password = "root";
$database = "hands_db";
$port = 3307;

// Criar conexão
$conn = new mysqli($server, $user, $password, $database, $port);

// Verificar conexão
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}
?>
