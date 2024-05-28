<?php

include 'connection.php';

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $ds_email = $_GET['ds_email'] ?? '';
    $nr_senha = $_GET['nr_senha'] ?? '';

    if ($ds_email && $nr_senha) {
        // Consulta SQL para verificar o usuário com o email e senha fornecidos
        $sql = "SELECT * FROM tb_usuario WHERE ds_email='$ds_email'";
        $result = $conn->query($sql);

        if ($result && $result->num_rows > 0) {
            $row = $result->fetch_assoc();
            if (password_verify($nr_senha, $row['nr_senha'])) {
                // Autenticação bem-sucedida
                header('Location: /HANDS/www/views/index.html');
                exit();
            } else {
                $mensagem_erro = "Senha incorreta.";
            }
        } else {
            $mensagem_erro = "Usuário não encontrado.";
        }
    } else {
        $mensagem_erro = "Por favor, forneça todos os campos necessários.";
    }
} else {
    $mensagem_erro = "Método de requisição inválido.";
}

$conn->close();
?>
