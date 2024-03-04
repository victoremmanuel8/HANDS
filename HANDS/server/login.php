<?php

include 'connection.php';
//conexão funcionando
header("Access-Control-Allow-Origin: *"); 

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    // Atribuir os valores dos parâmetros GET a variáveis
    $email = $_GET['email'] ?? '';
    $senha = $_GET['senha'] ?? '';

    if ($email && $senha) {
        $sql = "SELECT * FROM tb_usuario WHERE email='$email' AND senha='$senha'";
        $result = $conn->query($sql);

        if ($result && $result->num_rows > 0) {
            echo "Acessado!";
            // Redirecionar o usuário para a página inicial
            header('Location: /HANDS/HANDS/HANDS/www/index.html');
            exit(); 
        } else {
            echo "Erro ao acessar: " . $conn->error;
        }
    } else {
        echo "Por favor, forneça todos os campos necessários.";
    }
} else {
    echo "Método de requisição inválido.";
}

$conn->close();

?>