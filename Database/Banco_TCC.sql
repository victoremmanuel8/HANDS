
create database hands_db;

use hands_db;

#registro de cadastro
create table tb_usuario (
id_usuario INT primary key auto_increment,
nm_nome VARCHAR (100) not null,
nm_sobrenome VARCHAR (100) not null,
email VARCHAR(100) not null UNIQUE,
senha VARCHAR(255),
/*tp_usuario ENUM ('aluno', 'professor'), */
dt_nascimento DATE
);
          
create table tb_profissional (
id_profissional INT primary key auto_increment,
nm_prof VARCHAR (100) not null,
nm_sobrenome VARCHAR (100) not null,
cd_rg CHAR (12) not null UNIQUE,
email VARCHAR(100) not null UNIQUE,
senha VARCHAR(255) not null,
dt_nascimento DATE
);


CREATE TABLE tb_categoria (
    id_categoria INT PRIMARY KEY AUTO_INCREMENT,
    nm_categoria VARCHAR(100) NOT NULL
);


CREATE TABLE tb_aula (
    id_aula INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(100) NOT NULL,
    descricao TEXT,
    conteudo TEXT,
    id_categoria INT,
    id_profissional INT,
    data_publicacao DATE,
    #preco DECIMAL(10, 2), -- Preço da aula
    publica BOOLEAN DEFAULT true, -- Indica se a aula é pública (gratuita)
     FOREIGN KEY (id_profissional) REFERENCES tb_profissional(id_profissional),
     FOREIGN KEY (id_categoria) REFERENCES tb_categoria(id_categoria)
);

-- Tabela para gerenciar as tarefas dos usuários
CREATE TABLE tb_tarefa (
    id_tarefa INT PRIMARY KEY AUTO_INCREMENT,
    id_aula INT,
    id_usuario INT,
    descricao TEXT,
    status ENUM('pendente', 'completo'),
    dt_prazo DATE,
    FOREIGN KEY (id_aula) REFERENCES tb_aula(id_aula),
    FOREIGN KEY (id_usuario) REFERENCES tb_usuario(id_usuario)
);

CREATE TABLE tb_avaliacao (
    id_avaliacao INT PRIMARY KEY AUTO_INCREMENT,
    id_aula INT,
    id_aluno INT,
    nr_avaliacao INT,
    descricao TEXT,
    dt_avaliacao DATE,
    FOREIGN KEY (id_aula) REFERENCES tb_aula(id_aula),
    FOREIGN KEY (id_aluno) REFERENCES tb_usuario(id_usuario)
);


-- Tabela para gerenciar as aulas assistidas pelos usuários
CREATE TABLE tb_aula_assistida (
    id_aula_assistida INT PRIMARY KEY AUTO_INCREMENT,
    id_aula INT,
    id_usuario INT,
    dt_assistida DATE,
    FOREIGN KEY (id_aula) REFERENCES tb_aula(id_aula),
    FOREIGN KEY (id_usuario) REFERENCES tb_usuario(id_usuario)
    );
    
    -- Tabela para gerenciar as assinaturas premium dos usuários
CREATE TABLE tb_premium (
    id_assinatura INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT,
    dt_inicio DATE,
    dt_fim DATE,
    status ENUM('ativo', 'cancelado'),
    FOREIGN KEY (id_usuario) REFERENCES tb_usuario(id_usuario)
);

INSERT INTO tb_usuario (nm_nome, nm_sobrenome, email, senha, dt_nascimento)
	VALUES('Luan', 'Henrique', 'luanhenrique123@gmail.com', 'luan123', '2004-06-06'),
                  ('Gabriel Logan', 'Sanches', 'gabriel.sanches31@etec.sp.gov.br', 'senha', '2006-06-15'),
                  ('Pyetra', 'Quintiana', 'pyetra.quintiana@etec.sp.gov.br', 'amosapos', '2007-04-13'),
                  ('Maria', 'Santos',  'maria.santos2815@etec.sp.gov.br', 'rock4life', '2004-01-25'),
                  ('Victor', 'Silva', 'victor.silva974@etec.sp.gov.br', 'amoaR', '2005-01-29');

INSERT INTO tb_profissional (nm_prof, nm_sobrenome, cd_rg, email, senha, dt_nascimento)
    VALUES('Aline', 'Caruso', '12.345.678-9', 'aline.caruso1@hotmail.com', 'amodaraula', '1988-10-04'),
                  ('Fernando', 'Costa', '75.284.912-0', 'fernandocostaprofessor@hotmail.com', 'vaiporco', '1965-03-25'),
                  ('Ingrid', 'Souza', '98.765.143-2', 'ingridsouzaprof1213@gmail.com', 'belinha2304', '1999-12-13'),
                  ('Marcos', 'Alves', '24.681.357-9', 'profmarcosalves84@gmail.com', 'mjf0784', '1984-10-04'),
                  ('Henrique', 'Santos', '11.223.344-5', 'professorhenriquesantos2000@gmail.com', 'mvsgnts1754', '2000-05-17'),
                  ('Anderson', 'Silva', '55.555.555-5', 'professorandersonsilva94@gmail.com', 'coringaominhavida', '1994-01-04'),
                  ('Paola', 'Arantes', '98.765.432-0', 'profpaola0204@gmail.com', 'pnatugj38', '1990-02-04');
                  
insert into tb_categoria(nm_categoria)values
('Alfabeto');


INSERT INTO tb_aula (titulo, descricao, conteudo, id_categoria, id_profissional, data_publicacao, publica)
VALUES ('Ensino De Libras', 'Aprendendo o Alfabeto', 'Alfabeto do A - Z de maneira clara.', 1, 1, '2024-03-20', true);



INSERT INTO tb_premium (id_usuario, dt_inicio, dt_fim, status)
    VALUES  (1, '2024-01-01', '2025-01-01', 'ativo'),
                    (2, '2024-01-01', '2025-02-01', 'ativo'),
                    (3, '2024-01-01', '2025-03-01', 'ativo'),
                    (4, '2024-01-01', '2025-01-01', 'cancelado'),
                    (5, '2024-01-01', '2025-02-01', 'cancelado');

/*
CREATE TABLE tb_videos
CREATE TABLE tb_aulas_premium
CREATE TABLE tb_tarefas_premium
CREATE tb_video_premium */

select * from tb_usuario;

select * from tb_profissional;