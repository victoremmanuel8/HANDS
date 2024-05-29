<?php
include 'connection.php';
include '../validations/authlogin.php'; 

header("Access-Control-Allow-Origin: *"); 

?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <link rel="stylesheet" href="../www/css/cadastr.css">
</head>
<body>
    <?php
    if (isset($mensagem_erro)) {
        echo "<p style='color: red;'>$mensagem_erro</p>";
    }
    ?>
            <form action="http://192.168.1.5/HANDS/server/login.php" method="get">
                <input class="input" type="email" name="ds_email" id="ds_email" placeholder="E-mail" required>   
                <input class="input" type="password" name="nr_senha" id="nr_senha" placeholder="Senha" required>
                <input class="button" type="submit" id="submit" class="btn-primary" value="Login"/>
            </form>
            <br>
        <p class="titulo-3">Não tem uma conta? <a href="cadastro.html"><span class="cadastro">Sign in</span></a></p>
            </div>
</body>
</html>
