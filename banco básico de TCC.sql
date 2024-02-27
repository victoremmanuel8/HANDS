
create database hands_db;

use hands_db;

#registro de cadastro
create table tb_usuario (

id_usuario INT primary key auto_increment,
nm_nome VARCHAR (100) not null,
nm_sobrenome VARCHAR (100) not null,
email VARCHAR(100) not null UNIQUE,
cd_rg VARCHAR(13) not null UNIQUE,
senha VARCHAR(255),
tp_usuario ENUM ('aluno', 'professor'),
dt_nascimento DATE
);

INSERT INTO tb_usuario (nm_nome, nm_sobrenome, cd_rg, email, senha, tp_usuario, dt_nascimento)
	VALUES('Luan', 'Henrique', '21.908.098-12', 'luanhenrique123@gmail.com', 'luan123', 'aluno', '2004-06-06');

create table tb_profissional (

id_profissional INT primary key auto_increment,
nm_prof VARCHAR (100) not null,
nm_sobrenome VARCHAR (100) not null,
cd_rg VARCHAR (100) not null UNIQUE,
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

select * from tb_usuario;

