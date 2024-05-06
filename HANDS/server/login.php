<?php

include 'connection.php';

header("Access-Control-Allow-Origin: *"); 

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    // Atribuir os valores dos parâmetros GET a variáveis
    $ds_email = $_GET['ds_email'] ?? '';
    $nr_senha = $_GET['nr_senha'] ?? '';

    if ($ds_email && $nr_senha) {
        // Criptografar a senha fornecida pelo usuário
        $nr_senha_hash = password_hash($nr_senha, PASSWORD_DEFAULT);

        // Consulta SQL para verificar o usuário com o email e senha fornecidos
        $sql = "SELECT * FROM tb_usuario WHERE ds_email='$ds_email'";
        $result = $conn->query($sql);

        if ($result && $result->num_rows > 0) {
            // Verificar se a senha criptografada corresponde à senha armazenada no banco de dados
            $row = $result->fetch_assoc();
            if (password_verify($nr_senha, $row['nr_senha'])) {
                echo "Acessado!";
                // Redirecionar o usuário para a página inicial
                header('Location: /HANDS/HANDS/HANDS/www/index.html');
                exit(); 
            } else {
                echo "Senha incorreta.";
            }
        } else {
            echo "Usuário não encontrado.";
        }
    } else {
        echo "Por favor, forneça todos os campos necessários.";
    }
} else {
    echo "Método de requisição inválido.";
}

$conn->close();


?>