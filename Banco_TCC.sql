
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

INSERT INTO tb_usuario (nm_nome, nm_sobrenome, email, senha, dt_nascimento)
	VALUES('Luan', 'Henrique', 'luanhenrique123@gmail.com', 'luan123', '2004-06-06'),
		  ('Gabriel Logan', 'Sanches', 'gabriel.sanches31@etec.sp.gov.br', 'senha', '2006-06-15'),
		  ('Pyetra', 'Quintiana', 'pyetra.quintiana@etec.sp.gov.br', 'amosapos', '2007-04-13'),
          ('Maria', 'Santos',  'maria.santos2815@etec.sp.gov.br', 'rock4life', '2004-01-25'),
          ('Victor', 'Silva', 'victor.silva974@etec.sp.gov.br', 'amoaR', '2005-01-29');
          
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
    nm_nome VARCHAR(100) NOT NULL
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

/*
CREATE TABLE tb_videos
CREATE TABLE tb_aulas_premium
CREATE TABLE tb_tarefas_premium
CREATE tb_video_premium */

select * from tb_usuario;

select * from tb_profissional;

