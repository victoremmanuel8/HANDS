<?php
include 'connection.php';
header("Access-Control-Allow-Origin: *"); 

// Verificar se os dados foram enviados via POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Atribuir os valores dos parâmetros POST a variáveis
    $nome = mysqli_real_escape_string($conn, $_POST['nm_nome'] ?? '');
    $sobrenome = mysqli_real_escape_string($conn, $_POST['nm_sobrenome'] ?? '');
    $email = mysqli_real_escape_string($conn, $_POST['ds_email'] ?? '');
    $senha = mysqli_real_escape_string($conn, $_POST['nr_senha'] ?? '');
    $dt_nascimento = mysqli_real_escape_string($conn, $_POST['dt_nascimento'] ?? '');

    if ($nome && $sobrenome && $email && $senha && $dt_nascimento) {

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $mensagem_erro = "Email inválido.";
            
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
            $mensagem_erro = "Erro ao inserir registro: " . $conn->error;
        }
    } else {
        $mensagem_erro = "Por favor, forneça todos os campos necessários.";
    }
} else {
    $mensagem_erro = "Método de requisição inválido.";
  }
}
?>
