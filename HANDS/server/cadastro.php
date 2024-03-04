<?php
include 'connection.php';

//conexão funcionando
header("Access-Control-Allow-Origin: *"); 

// Verificar se os dados foram enviados via GET
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    // Atribuir os valores dos parâmetros GET a variáveis
    $nome = $_GET['nome'] ?? ''; //evitar injeção Mysql
    $sobrenome = $_GET['sobrenome'] ?? '';
    $email = $_GET['email'] ?? '';
    $cpf = $_GET['cpf'] ?? '';
    $senha = $_GET['senha'] ?? '';
    $dt_nascimento = $_GET['dt_nascimento'] ?? '';

    if ($nome && $sobrenome && $email && $cpf && $senha && $dt_nascimento) {
        $sql = "INSERT INTO tb_usuario(nm_nome, nm_sobrenome, email, cd_cpf, senha, dt_nascimento) VALUES ('$nome', '$sobrenome', '$email', '$cpf', '$senha', '$dt_nascimento')";

        if ($conn->query($sql) === TRUE) {
            echo "Novo registro criado com sucesso";
            header('Location: /HANDS/HANDS/www/index.html');
        } else {
            echo "Erro ao inserir registro: " . $conn->error;
        }
    } else {
        echo "Por favor, forneça todos os campos necessários.";
    }
} else {
    echo "Método de requisição inválido.";
}

$conn->close();
?>
