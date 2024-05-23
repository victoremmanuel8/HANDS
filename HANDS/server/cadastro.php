<?php
include 'connection.php';

// Verificar se os dados foram enviados via POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Atribuir os valores dos parâmetros POST a variáveis
    $nome = mysqli_real_escape_string($conn, $_POST['nome'] ?? '');
    $sobrenome = mysqli_real_escape_string($conn, $_POST['sobrenome'] ?? '');
    $email = mysqli_real_escape_string($conn, $_POST['email'] ?? '');
    $senha = mysqli_real_escape_string($conn, $_POST['senha'] ?? '');
    $dt_nascimento = mysqli_real_escape_string($conn, $_POST['dt_nascimento'] ?? '');

    if ($nome && $sobrenome && $email && $senha && $dt_nascimento) {
        // Criptografar a senha
        $senhaHash = password_hash($senha, PASSWORD_DEFAULT);

        $sql = "INSERT INTO tb_usuario(nm_usuario, nm_sobrenome, ds_email, nr_senha, dt_nascimento) VALUES (?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sssss", $nome, $sobrenome, $email, $senhaHash, $dt_nascimento);

        if ($stmt->execute()) {
            $stmt->close();
            $conn->close();
            header('Location: /HANDS/www/views/index.html');
            exit(); // Importante sair após o redirecionamento
        } else {
            echo "Erro ao inserir registro: " . $conn->error;
        }
    } else {
        echo "Por favor, forneça todos os campos necessários.";
    }
} else {
    echo "Método de requisição inválido.";
}
?>
