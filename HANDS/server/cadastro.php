<?php
include 'connection.php';
include '../validations/authcadastro.php'; 

header("Access-Control-Allow-Origin: *"); 

?>


<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <!-- <meta http-equiv="Content-Security-Policy" content="default-src 'self' data: https://ssl.gstatic.com 'unsafe-eval'; style-src 'self' 'unsafe-inline'; media-src *; img-src 'self' data: content:;"> -->
        <meta name="format-detection" content="telephone=no">
        <meta name="msapplication-tap-highlight" content="no">
        <meta name="viewport" content="initial-scale=1, width=device-width, viewport-fit=cover">
        <meta name="color-scheme" content="light dark">
        <!-- <script src="https://www.google.com/recaptcha/api.js" async defer></script> -->
        <link rel="stylesheet" href="../css/cadastro.css">
        <script>
            //script para masked
            window.onload = function() {
                var cpfField = document.getElementById('cpf');
                VMasker(cpfField).maskPattern("999.999.999-99");
            }
        </script>
        <title>HANDS</title>
    </head>
    <body>
    <?php
    if (isset($mensagem_erro)) {
        echo "<p style='color: red;'>$mensagem_erro</p>";
    }
    ?>
        <!-- <div class="area-cadastro">
            <h3 class="titulo-1">Seja bem-vindo</h3>
            <h4 class="titulo-2">Crie uma conta</h4>
            <div class="progresso"></div>
            <div class="campos">
                <form action="../routes/auth.js/cadastro" method="POST">
                    <input type="text" name="nome" id="nome" placeholder="Nome" required>
                    <input type="text" name="sobrenome" id="sobrenome" placeholder="Sobrenome" required>
                    <input class="date" type="date" name="dt_nascimento" id="dt_nascimento" placeholder="Data de nascimento" required>
                    <input type="email" name="email" id="email" placeholder="E-mail" required>
                    <input type="password" name="senha" id="senha" placeholder="Senha" required>
                    <input type="password" name="ConfirmarSenha" id="ConfirmarSenha" placeholder="Confirmação de senha" required>
                    <input type="submit" id="submit" class="btn-primary" value="Sign in"/>
                </div>
            </form>
            <footer>
                <p class="titulo-3">Já possuí uma conta? <a href="./login"><span class="login">Log in</span></a></p>
                <p class="titulo-3">Já possuí uma conta? <a href="./index.html"><span class="login">index</span></a></p>
                <br>
                <div class="ou">
                    <div class="linha"></div>
                      <p class="titulo-4">ou</p>
                    <div class="linha"></div>
                </div>
                <div class="redes">
                </div>
                <p class="titulo-5">Conecte-se com</p>
        </div> -->
        
        <div class="area-cadastro">
            <div id="step0">
               <a href="index.html">
                <svg class="hands" width="182" height="47" viewBox="0 0 182 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M19.9937 1.05214C19.3976 1.79571 18.8045 4.2849 17.8389 10.0912C17.1064 14.4981 16.3709 18.3196 16.205 18.5835C15.5478 19.6267 15.254 17.195 15.2249 10.4769C15.1975 4.07048 15.1266 3.45238 14.341 2.75496C13.1706 1.71514 10.9098 1.83389 9.96009 2.98491C9.30755 3.77548 9.20834 4.85517 9.20834 11.168C9.20834 15.3407 9.0343 18.5458 8.79954 18.688C8.14314 19.0862 7.23061 17.2974 5.97855 13.1561C4.59991 8.59653 3.4509 7.19079 1.61942 7.82274C-0.469063 8.54365 -0.509687 9.78951 1.33676 16.5047C2.49646 20.7219 3.17081 22.5175 3.54199 22.3778C4.29416 22.0945 4.26124 21.8734 2.5311 15.6168C1.19608 10.7903 1.06565 9.9347 1.58692 9.42318C2.63843 8.39133 3.46886 9.60236 4.92618 14.2933C5.67922 16.7166 6.5956 19.03 6.96249 19.4337C7.82329 20.3804 8.89148 20.3678 9.78348 19.4005C10.3839 18.7497 10.4912 17.5471 10.4912 11.4793C10.4912 3.78262 10.6605 3.17039 12.7127 3.45573C13.6923 3.59211 13.6996 3.64078 13.9121 11.356C14.0297 15.6256 14.2816 19.3552 14.4719 19.6435C14.9996 20.4437 16.8195 20.2704 17.3083 19.3741C17.5464 18.9373 18.3551 14.9651 19.1051 10.5469C19.8547 6.12873 20.7065 2.19434 20.9973 1.8041C21.7811 0.752102 23.9192 1.56198 24.08 2.97107C24.145 3.54385 23.5258 7.59531 22.7035 11.9745C21.3497 19.1853 21.2689 20.0266 21.8466 20.8915C22.6308 22.066 23.9894 22.1273 24.6941 21.019C24.984 20.5642 26.1882 17.4161 27.3705 14.0235C28.647 10.361 29.8242 7.6721 30.2685 7.4048C31.3401 6.75942 32.4908 7.58817 32.6093 9.09042C32.7311 10.6367 27.6091 24.3626 26.706 24.9098C26.2074 25.2119 25.149 24.8921 22.6749 23.6924C18.7596 21.7936 15.1659 21.3984 9.68641 22.264C4.73119 23.0471 3.3115 23.729 2.82188 25.5619C1.57623 30.2239 1.92559 39.5424 3.45475 42.4445C4.48103 44.3916 5.85924 44.9618 12.0948 46.0193C24.3297 48.0935 24.9357 47.7914 32.428 35.8762C33.7437 33.7835 36.0811 30.6917 37.6222 29.0049C39.1633 27.3184 40.4244 25.7079 40.4244 25.4263C40.4244 24.3248 38.8632 23.525 36.7131 23.525C34.2825 23.525 32.6422 24.4973 29.3063 27.9151C26.8386 30.4433 25.5386 31.1063 23.6417 30.8042C19.4558 30.1378 13.018 32.5083 11.5743 35.2476C10.256 37.7498 10.0666 38.5429 10.7294 38.7921C11.1446 38.9487 11.5628 38.5164 12.0079 37.4699C13.5102 33.9421 16.5736 32.3891 22.4204 32.1906C26.7928 32.0421 26.8197 32.0295 31.5599 27.7695C34.6443 24.9979 35.0193 24.7839 36.7982 24.7839C39.044 24.7839 39.2711 25.389 37.5974 26.9139C35.7574 28.5903 33.0206 32.272 29.9803 37.1627C25.7084 44.0336 23.6507 45.8498 20.172 45.8196C19.1983 45.8112 15.7257 45.3282 12.4544 44.7462C5.71257 43.5465 4.94372 43.1101 4.02562 39.9654C3.39745 37.8127 3.3564 28.9512 3.96362 26.475C4.28732 25.1544 4.55758 24.9438 6.87141 24.2086C8.70931 23.6245 10.7366 23.3861 14.1259 23.3563L18.8297 23.3152L22.5342 25.133C27.9106 27.7708 27.6429 28.0192 31.8113 16.5173C33.355 12.2577 34.3155 8.99013 34.1551 8.54449C33.3281 6.25084 30.8419 5.22318 29.1161 6.46149C28.6598 6.78879 27.4081 9.70433 26.1078 13.4683C24.024 19.5004 22.8831 21.5591 22.8989 19.2587C22.9023 18.7203 23.4796 15.164 24.1814 11.356C24.8831 7.54789 25.4574 3.82584 25.4574 3.08478C25.4582 0.28842 21.7204 -1.10221 19.9937 1.05214ZM167.385 5.90759C162.313 6.74641 159.607 9.46598 159.607 13.7247C159.607 17.9768 162.28 20.6754 170.781 25.0075C172.509 25.8883 174.794 27.383 175.86 28.3293C177.559 29.8395 177.821 30.3057 177.999 32.1378C178.166 33.8595 178.031 34.4365 177.232 35.4301C173.914 39.5554 166.064 38.1212 162.729 32.7806C162.144 31.8445 161.567 31.0791 161.446 31.0803C161.325 31.0816 160.671 31.5184 159.993 32.0509C158.871 32.9321 158.808 33.1125 159.306 34.0424C161.468 38.0821 165.748 40.6939 170.786 41.0476C174.588 41.3145 177.412 40.4274 179.509 38.3087C182.342 35.4482 182.754 32.2351 180.768 28.5051C179.367 25.8741 177.276 24.2023 171.652 21.2171C164.55 17.4476 162.793 15.668 163.341 12.799C164.1 8.8269 169.984 7.74553 177.081 10.2738L179.828 11.2519V9.43199V7.61167L177.583 6.9558C175.509 6.35029 173.978 6.07753 170.634 5.71959C169.928 5.64406 168.466 5.72883 167.385 5.90759ZM47.6939 23.5502V41.1999L49.2974 41.0694L50.901 40.9394L51.1148 34.4919L51.3286 28.0443L59.0257 23.9119C63.2591 21.6392 66.864 19.7727 67.0363 19.7639C67.2086 19.7555 67.401 24.5166 67.4639 30.3439L67.5781 40.9394H69.0747H70.5714L70.683 23.4201L70.7946 5.90087H69.0794H67.3643V10.8885V15.8761L59.4174 20.1202C55.0463 22.4546 51.3902 24.3643 51.2927 24.3643C51.1948 24.3643 51.1148 20.21 51.1148 15.1326V5.90087H49.4044H47.6939V23.5502ZM84.061 7.89408C83.819 8.75976 81.6296 16.4544 79.196 24.9937L74.7719 40.5197L76.458 40.6511C77.385 40.7232 78.2347 40.6926 78.3463 40.5835C78.602 40.3322 81.4491 30.7274 84.9286 18.3779C86.4086 13.1238 87.759 8.96957 87.9297 9.14623C88.0998 9.32289 89.3806 13.5275 90.7754 18.4895L93.3116 27.5114L89.6564 27.7212C86.2012 27.9197 85.9849 27.9885 85.7052 28.9801C85.1181 31.0619 85.0834 31.0434 89.8894 31.1689L94.4547 31.288L95.7273 36.0088L97.0003 40.7295H98.8591C99.882 40.7295 100.718 40.5361 100.718 40.2999C100.718 40.0636 98.6017 32.4034 96.0146 23.2774C93.4275 14.1515 91.3108 6.60248 91.3108 6.50261C91.3108 6.40232 89.7787 6.32049 87.9066 6.32049H84.5019L84.061 7.89408ZM104.567 23.525V40.7295H106.428H108.29L108.537 36.848C109.163 27.0217 114.737 15.8749 120.813 12.3001C122.087 11.5502 123.283 10.9363 123.47 10.9363C123.657 10.9363 123.81 17.6398 123.81 25.8329V40.7295H125.734H127.658V23.468V6.20635L125.721 6.46694C120.242 7.2038 113.405 12.8788 110.178 19.3682L108.424 22.8956L108.419 14.608L108.416 6.32049H106.491H104.567V23.525ZM132.362 23.4797V40.7295H134.286H136.211V24.9454V9.16134L138.669 9.45088C143.513 10.0211 147.14 12.4151 149.123 16.349C149.978 18.0464 150.096 18.9134 150.096 23.525C150.096 28.1681 149.982 28.9969 149.102 30.7442C147.619 33.69 144.876 35.9626 141.786 36.8056C139.263 37.4938 139.204 37.5433 139.204 38.9646V40.419L141.067 40.213C142.092 40.0997 143.996 39.5277 145.299 38.9424C151.39 36.206 154.582 29.8924 154.049 21.6367C153.739 16.832 152.455 13.8011 149.501 10.9028C146.17 7.63433 143.478 6.65367 137.173 6.41323L132.362 6.22985V23.4797Z" fill="#a5a5a5a5"/>
                </svg>
               </a>
                <div class="balao">
                    <div class="conversa">
                        <div class="texto" id="texto1"></div>
                        <div class="texto" id="texto2"></div>
                    </div>
                    <script>
                        // Função para exibir o botão após 105ms
                        function exibirBotao() {
                            const botao = document.getElementById('btn-cadastro');
                            botao.style.transition = '.5s ease'; // Exibir o botão
                            botao.style.display = 'block'; // Exibir o botão
                        }
                
                        // Agendar a chamada da função após 105ms
                        setTimeout(exibirBotao, 500);
                    </script>
                    <button id="btn-cadastro" onclick="startRegistration()">Vamos lá!</button>
                    <p class="titulo-2">Já possuí uma conta? <a href="./login.html"><span class="login">Log in</span></a></p>
                </div>
                <img class="liz" src="../res/lis-oi-redi.png" alt="imagem da personagem principal do sistema dando oi">
            </div>
            <div id="step1" class="hidden">
                <button class="voltar" onclick="previousStep(1)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="#000" class="bi bi-arrow-left" viewBox="0 0 16 16">
                        <path fill="#000" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
                      </svg>
                </button>
                <header>
                    <svg class="hands" width="182" height="47" viewBox="0 0 182 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M19.9937 1.05214C19.3976 1.79571 18.8045 4.2849 17.8389 10.0912C17.1064 14.4981 16.3709 18.3196 16.205 18.5835C15.5478 19.6267 15.254 17.195 15.2249 10.4769C15.1975 4.07048 15.1266 3.45238 14.341 2.75496C13.1706 1.71514 10.9098 1.83389 9.96009 2.98491C9.30755 3.77548 9.20834 4.85517 9.20834 11.168C9.20834 15.3407 9.0343 18.5458 8.79954 18.688C8.14314 19.0862 7.23061 17.2974 5.97855 13.1561C4.59991 8.59653 3.4509 7.19079 1.61942 7.82274C-0.469063 8.54365 -0.509687 9.78951 1.33676 16.5047C2.49646 20.7219 3.17081 22.5175 3.54199 22.3778C4.29416 22.0945 4.26124 21.8734 2.5311 15.6168C1.19608 10.7903 1.06565 9.9347 1.58692 9.42318C2.63843 8.39133 3.46886 9.60236 4.92618 14.2933C5.67922 16.7166 6.5956 19.03 6.96249 19.4337C7.82329 20.3804 8.89148 20.3678 9.78348 19.4005C10.3839 18.7497 10.4912 17.5471 10.4912 11.4793C10.4912 3.78262 10.6605 3.17039 12.7127 3.45573C13.6923 3.59211 13.6996 3.64078 13.9121 11.356C14.0297 15.6256 14.2816 19.3552 14.4719 19.6435C14.9996 20.4437 16.8195 20.2704 17.3083 19.3741C17.5464 18.9373 18.3551 14.9651 19.1051 10.5469C19.8547 6.12873 20.7065 2.19434 20.9973 1.8041C21.7811 0.752102 23.9192 1.56198 24.08 2.97107C24.145 3.54385 23.5258 7.59531 22.7035 11.9745C21.3497 19.1853 21.2689 20.0266 21.8466 20.8915C22.6308 22.066 23.9894 22.1273 24.6941 21.019C24.984 20.5642 26.1882 17.4161 27.3705 14.0235C28.647 10.361 29.8242 7.6721 30.2685 7.4048C31.3401 6.75942 32.4908 7.58817 32.6093 9.09042C32.7311 10.6367 27.6091 24.3626 26.706 24.9098C26.2074 25.2119 25.149 24.8921 22.6749 23.6924C18.7596 21.7936 15.1659 21.3984 9.68641 22.264C4.73119 23.0471 3.3115 23.729 2.82188 25.5619C1.57623 30.2239 1.92559 39.5424 3.45475 42.4445C4.48103 44.3916 5.85924 44.9618 12.0948 46.0193C24.3297 48.0935 24.9357 47.7914 32.428 35.8762C33.7437 33.7835 36.0811 30.6917 37.6222 29.0049C39.1633 27.3184 40.4244 25.7079 40.4244 25.4263C40.4244 24.3248 38.8632 23.525 36.7131 23.525C34.2825 23.525 32.6422 24.4973 29.3063 27.9151C26.8386 30.4433 25.5386 31.1063 23.6417 30.8042C19.4558 30.1378 13.018 32.5083 11.5743 35.2476C10.256 37.7498 10.0666 38.5429 10.7294 38.7921C11.1446 38.9487 11.5628 38.5164 12.0079 37.4699C13.5102 33.9421 16.5736 32.3891 22.4204 32.1906C26.7928 32.0421 26.8197 32.0295 31.5599 27.7695C34.6443 24.9979 35.0193 24.7839 36.7982 24.7839C39.044 24.7839 39.2711 25.389 37.5974 26.9139C35.7574 28.5903 33.0206 32.272 29.9803 37.1627C25.7084 44.0336 23.6507 45.8498 20.172 45.8196C19.1983 45.8112 15.7257 45.3282 12.4544 44.7462C5.71257 43.5465 4.94372 43.1101 4.02562 39.9654C3.39745 37.8127 3.3564 28.9512 3.96362 26.475C4.28732 25.1544 4.55758 24.9438 6.87141 24.2086C8.70931 23.6245 10.7366 23.3861 14.1259 23.3563L18.8297 23.3152L22.5342 25.133C27.9106 27.7708 27.6429 28.0192 31.8113 16.5173C33.355 12.2577 34.3155 8.99013 34.1551 8.54449C33.3281 6.25084 30.8419 5.22318 29.1161 6.46149C28.6598 6.78879 27.4081 9.70433 26.1078 13.4683C24.024 19.5004 22.8831 21.5591 22.8989 19.2587C22.9023 18.7203 23.4796 15.164 24.1814 11.356C24.8831 7.54789 25.4574 3.82584 25.4574 3.08478C25.4582 0.28842 21.7204 -1.10221 19.9937 1.05214ZM167.385 5.90759C162.313 6.74641 159.607 9.46598 159.607 13.7247C159.607 17.9768 162.28 20.6754 170.781 25.0075C172.509 25.8883 174.794 27.383 175.86 28.3293C177.559 29.8395 177.821 30.3057 177.999 32.1378C178.166 33.8595 178.031 34.4365 177.232 35.4301C173.914 39.5554 166.064 38.1212 162.729 32.7806C162.144 31.8445 161.567 31.0791 161.446 31.0803C161.325 31.0816 160.671 31.5184 159.993 32.0509C158.871 32.9321 158.808 33.1125 159.306 34.0424C161.468 38.0821 165.748 40.6939 170.786 41.0476C174.588 41.3145 177.412 40.4274 179.509 38.3087C182.342 35.4482 182.754 32.2351 180.768 28.5051C179.367 25.8741 177.276 24.2023 171.652 21.2171C164.55 17.4476 162.793 15.668 163.341 12.799C164.1 8.8269 169.984 7.74553 177.081 10.2738L179.828 11.2519V9.43199V7.61167L177.583 6.9558C175.509 6.35029 173.978 6.07753 170.634 5.71959C169.928 5.64406 168.466 5.72883 167.385 5.90759ZM47.6939 23.5502V41.1999L49.2974 41.0694L50.901 40.9394L51.1148 34.4919L51.3286 28.0443L59.0257 23.9119C63.2591 21.6392 66.864 19.7727 67.0363 19.7639C67.2086 19.7555 67.401 24.5166 67.4639 30.3439L67.5781 40.9394H69.0747H70.5714L70.683 23.4201L70.7946 5.90087H69.0794H67.3643V10.8885V15.8761L59.4174 20.1202C55.0463 22.4546 51.3902 24.3643 51.2927 24.3643C51.1948 24.3643 51.1148 20.21 51.1148 15.1326V5.90087H49.4044H47.6939V23.5502ZM84.061 7.89408C83.819 8.75976 81.6296 16.4544 79.196 24.9937L74.7719 40.5197L76.458 40.6511C77.385 40.7232 78.2347 40.6926 78.3463 40.5835C78.602 40.3322 81.4491 30.7274 84.9286 18.3779C86.4086 13.1238 87.759 8.96957 87.9297 9.14623C88.0998 9.32289 89.3806 13.5275 90.7754 18.4895L93.3116 27.5114L89.6564 27.7212C86.2012 27.9197 85.9849 27.9885 85.7052 28.9801C85.1181 31.0619 85.0834 31.0434 89.8894 31.1689L94.4547 31.288L95.7273 36.0088L97.0003 40.7295H98.8591C99.882 40.7295 100.718 40.5361 100.718 40.2999C100.718 40.0636 98.6017 32.4034 96.0146 23.2774C93.4275 14.1515 91.3108 6.60248 91.3108 6.50261C91.3108 6.40232 89.7787 6.32049 87.9066 6.32049H84.5019L84.061 7.89408ZM104.567 23.525V40.7295H106.428H108.29L108.537 36.848C109.163 27.0217 114.737 15.8749 120.813 12.3001C122.087 11.5502 123.283 10.9363 123.47 10.9363C123.657 10.9363 123.81 17.6398 123.81 25.8329V40.7295H125.734H127.658V23.468V6.20635L125.721 6.46694C120.242 7.2038 113.405 12.8788 110.178 19.3682L108.424 22.8956L108.419 14.608L108.416 6.32049H106.491H104.567V23.525ZM132.362 23.4797V40.7295H134.286H136.211V24.9454V9.16134L138.669 9.45088C143.513 10.0211 147.14 12.4151 149.123 16.349C149.978 18.0464 150.096 18.9134 150.096 23.525C150.096 28.1681 149.982 28.9969 149.102 30.7442C147.619 33.69 144.876 35.9626 141.786 36.8056C139.263 37.4938 139.204 37.5433 139.204 38.9646V40.419L141.067 40.213C142.092 40.0997 143.996 39.5277 145.299 38.9424C151.39 36.206 154.582 29.8924 154.049 21.6367C153.739 16.832 152.455 13.8011 149.501 10.9028C146.17 7.63433 143.478 6.65367 137.173 6.41323L132.362 6.22985V23.4797Z" fill="#a5a5a5a5"/>
                    </svg>
                </header>
                <div class="cadastro-mobile">
                    <form action="https://192.168.1.5/HANDS/server/cadastro.php" method="post">
                            <div class="passo1">
                            <p class="titulo-1">Primeiro <span class="cor">passo</span></p> <br>
                            <input class="input" type="text" name="nm_nome" id="name" placeholder="Nome" required> 
                            <input class="input" type="text" name="nm_sobrenome" id="sobrenome" placeholder="Sobrenome" required>
                            <div class="back">
                                <svg width="434" height="361" viewBox="0 0 434 361" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="50" cy="50" r="50" fill="#16F1FF"/>
                                <ellipse cx="49.5" cy="328" rx="39.5" ry="33" fill="#16B0FF"/>
                                <ellipse cx="283.5" cy="83" rx="39.5" ry="33" fill="#16B0FF"/>
                                <ellipse cx="352" cy="215.5" rx="82" ry="79.5" fill="#16B0FF"/>
                                <ellipse cx="377.5" cy="33" rx="39.5" ry="33" fill="#16B0FF"/>
                                <ellipse cx="99.5" cy="288" rx="39.5" ry="33" fill="#16F1FF"/>
                                </svg>
                            </div>
                            </div>
                            <div class="passo2">
                            <p class="titulo-1">Segundo <span class="cor">passo</span></p><br>
                            <label class="nascimento" for="nascimento">Data de nascimento:</label>
                            <input class="input" type="date" name="dt_nascimento" id="dt_nascimento" placeholder="Data de nascimento" value="{{formData.dt_nascimento}}" required maxlength="10" min="1930-01-01" max="2024-04-29"> 
                            <!-- {{!-- <label for="email">Email:</label> --}} -->
                            <input class="input" type="email" name="ds_email" id="email" placeholder="E-mail" required>
                            <div class="back">
                                <svg width="434" height="361" viewBox="0 0 434 361" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="50" cy="50" r="50" fill="#FF0052"/>
                                <ellipse cx="49.5" cy="328" rx="39.5" ry="33" fill="#FF6D9C"/>
                                <ellipse cx="283.5" cy="83" rx="39.5" ry="33" fill="#FF6D9C"/>
                                <ellipse cx="352" cy="215.5" rx="82" ry="79.5" fill="#FF6D9C"/>
                                <ellipse cx="377.5" cy="33" rx="39.5" ry="33" fill="#FF6D9C"/>
                                <ellipse cx="99.5" cy="288" rx="39.5" ry="33" fill="#FF6D9C"/>
                                </svg>
                            </div>
                            </div>
                        <div class="passo3">
                        <p class="titulo-1">Terceiro <span class="cor">passo</span></p><br>
                        <div id="progress-bar">
                            <div id="progress"></div>
                        </div>
                        <div id="confetti"></div>
                        <input class="input" type="password" name="nr_senha" id="senha" placeholder="Senha" onkeyup="updateProgressBar()" required>
                        <!-- {{!-- <label for="confirmarSenha">Confirmar Senha:</label> --}} -->
                        <input class="input" type="password" name="Confir_Senha" id="confirmarSenha" placeholder="Confirmação de senha" required>
                        <div class="back">
                            <svg width="981" height="402" viewBox="0 0 981 402" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="597" cy="157" r="50" fill="#00B496"/>
                            <ellipse cx="830.5" cy="190" rx="39.5" ry="33" fill="#02F2CA"/>
                            <ellipse cx="899" cy="322.5" rx="82" ry="79.5" fill="#02F2CA"/>
                            <ellipse cx="269.5" cy="217.5" rx="68.5" ry="70.5" fill="#00FFD5"/>
                            <ellipse cx="924.5" cy="140" rx="39.5" ry="33" fill="#02F2CA"/>
                            <ellipse cx="891.5" cy="74" rx="39.5" ry="33" fill="#00B496"/>
                            <circle cx="50" cy="50" r="50" fill="#00B496"/>
                            <ellipse cx="49.5" cy="328" rx="39.5" ry="33" fill="#02F2CA"/>
                            <ellipse cx="283.5" cy="83" rx="39.5" ry="33" fill="#02F2CA"/>
                            <ellipse cx="481" cy="294.5" rx="82" ry="79.5" fill="#02F2CA"/>
                            <ellipse cx="377.5" cy="33" rx="39.5" ry="33" fill="#02F2CA"/>
                            <ellipse cx="99.5" cy="288" rx="39.5" ry="33" fill="#00B496"/>
                            </svg>
                        </div>
                        <!-- {{!-- script da barra de progresso --}} -->
                        <script> 
                            function updateProgressBar() {
                            var senha = document.getElementById("senha").value;
                            var progress = 0;

                            // Verifica o comprimento da senha
                            if (senha.length >= 8) {
                                progress = 25;
                                
                                // Verifica se contém somente números ou somente letras
                                if (/^\d+$/.test(senha) || /^[a-zA-Z]+$/.test(senha)) {
                                // Permanece em 25% caso seja somente números ou somente letras
                                } else {
                                progress = 50;
                                }
                                
                                // Verifica se contém número, letra e uma letra maiúscula
                                if (/\d/.test(senha) && /[a-z]/.test(senha) && /[A-Z]/.test(senha)) {
                                progress = 75;
                                }
                                
                                // Verifica se contém número, letra, letra maiúscula e caractere especial
                                if (/\d/.test(senha) && /[a-z]/.test(senha) && /[A-Z]/.test(senha) && /\W|_/.test(senha)) {
                                progress = 100;
                                }
                            }

                            document.getElementById("progress").style.width = progress + "%";
                            updateProgressBarColor(progress);
                            }

                            function updateProgressBarColor(progress) {
                            var progressBar = document.getElementById("progress");
                            
                            if (progress === 25) {
                                progressBar.style.backgroundColor = "#be1515ef"; // Vermelho
                            } else if (progress === 50) {
                                progressBar.style.backgroundColor = "#eeea14ef"; // Amarelo
                            } else if (progress === 75) {
                                progressBar.style.backgroundColor = "#16569ec9"; // Azul
                            } else if (progress === 100) {
                                progressBar.style.backgroundColor = "#169e93c9"; // Verde
                            }
                            }
                        </script>
                        </div>
                        <!-- {{!-- <label for="senha">Senha:</label> --}} -->
                        <!-- {{!-- <input type="hidden" name="step" id="step"value="1"> --}} -->
                        <svg width="212" height="163" viewBox="0 0 212 163" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.37693 5C5.37693 22.2195 2.11692 43.1925 14.7716 56.9444C40.6414 85.0574 74.6118 97.1617 110.765 107.708C138.604 115.829 207 117.235 207 158" stroke="url(#paint0_linear_253_305)" stroke-width="10" stroke-linecap="round" stroke-dasharray="20 20"/>
                        <defs>
                        <linearGradient id="paint0_linear_253_305" x1="106" y1="5" x2="106" y2="158" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#02F2CA"/>
                        <stop offset="1" stop-color="#FFB905"/>
                        </linearGradient>
                        </defs>
                        </svg>
                        <div class="row">
                            <div class="passo4">
                        <p class="titulo-1">Quarto <span class="cor">passo</span></p><br>
                        <div class="row1">
                                <input class="check" type="checkbox" id="termos_uso" name="termos_uso" required>
                            <label for="termos">Eu concordo com os termos de uso </label> <br>
                        </div> 
                        <a class="termos" href="/termos-uso">termos de uso</a>
                        <br>
                        <div class="row">
                            <div class="g-recaptcha" data-sitekey="6LcW8X4pAAAAAKHfmywUcAyarIYi5RwVY7DVPP20" data-callback="onSubmit">
                        </div>
                        </div>
                        <br><br>
                        <input class="button" type="submit" id="submit"  value="Cadastre-se"/> <br><br><br>
                        <div class="back">
                            <svg width="982" height="347" viewBox="0 0 982 347" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="708" cy="281" r="50" fill="#FFB905"/>
                            <ellipse cx="942.5" cy="314" rx="39.5" ry="33" fill="#FFB905"/>
                            <circle cx="50" cy="281" r="50" fill="#FFB905"/>
                            <ellipse cx="374.5" cy="305" rx="39.5" ry="33" fill="#FC9404"/>
                            <circle cx="615" cy="83" r="50" fill="#FFB905"/>
                            <ellipse cx="848.5" cy="116" rx="39.5" ry="33" fill="#FFBB5D"/>
                            <ellipse cx="307.5" cy="152" rx="88.5" ry="79" fill="#FFB905"/>
                            <ellipse cx="942.5" cy="66" rx="39.5" ry="33" fill="#FFBB5D"/>
                            <ellipse cx="924.5" cy="42" rx="39.5" ry="33" fill="#FFB905"/>
                            <circle cx="68" cy="50" r="50" fill="#FFB905"/>
                            <ellipse cx="356.5" cy="33" rx="39.5" ry="33" fill="#FC9404"/>
                            </svg>
                        </div>
                        </div>
                        </div>
                    </form>
            </div>
            <div>
                <script>
                    function escreverTexto(texto, elemento, velocidade = 20, callback) {
                        let i = 0;
                        const intervalo = setInterval(function() {
                            elemento.textContent += texto.charAt(i);
                            i++;
                            if (i > texto.length) {
                                clearInterval(intervalo);
                                callback();
                            }
                        }, velocidade);
                    }
            
                    const textos = [
                        "Olá, meu nome é Liz 🥰",
                        "Está pronto para começar?",
                        "coloque seus dados de forma correta, assim conseguiremos cadastrar você dentro do nosso sistema 😀"
                    ];
            
                    const elementos = document.querySelectorAll('.texto');
            
                    function exibirTexto(index) {
                        if (index < textos.length) {
                            escreverTexto(textos[index], elementos[index], 100, () => {
                                exibirTexto(index + 1);
                            });
                        }
                    }
            
                    exibirTexto(0);
                </script>
                <script>
                    function startRegistration() {
                document.getElementById('step0').classList.add('hidden');
                document.getElementById('step1').classList.remove('hidden');
            }
    
            function previousStep(step) {
                document.getElementById('step' + step).classList.add('hidden');
                document.getElementById('step' + (step - 1)).classList.remove('hidden');
            }
    
            function nextStep(step) {
                if (step === 1) {
                    checkStep1();
                } else if (step === 2) {
                    checkStep2();
                } else if (step === 3) {
                    checkStep3();
                }
            }
    
            function checkStep1() {
                var nome = document.getElementById('nome').value.trim();
                var sobrenome = document.getElementById('sobrenome').value.trim();
                var email = document.getElementById('email').value.trim();
    
                if (nome !== '' && sobrenome !== '' && email !== '') {
                    document.getElementById('step1').classList.add('hidden');
                    document.getElementById('step2').classList.remove('hidden');
                }
            }
    
            function checkStep2() {
            var senha = document.getElementById('senha').value.trim();
            var confirmarSenha = document.getElementById('confirmarSenha').value.trim();
            var balaoErro = document.getElementById('balaoErro');
    
            if (senha !== '' && confirmarSenha !== '' && senha === confirmarSenha) {
                document.getElementById('step2').classList.add('hidden');
                document.getElementById('step3').classList.remove('hidden');
            } else {
                balaoErro.textContent = 'As senhas não são compatíveis. Por favor, verifique e tente novamente. 😔';
                const balao = document.getElementById('balaoErro');
                balao.style.display = 'block'; 
            }
        }
    
            function checkStep3() {
                var termos = document.getElementById('termos').checked;
    
                if (termos) {
                    // Aqui você pode adicionar a lógica para enviar o formulário
                    alert('Formulário enviado com sucesso!');
                }
            }
                </script>
            </div>
        </div>
        <script src="../js/troca-pag.js"></script>
        <script src="cordova.js"></script>
        <script src="../js/index.js"></script>
        <script src="../js/carrossel.js"></script>
    </body>
</html>