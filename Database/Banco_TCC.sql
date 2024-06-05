create database hands_db;

use hands_db;

#registro de cadastro
create table tb_usuario (
id_usuario INT primary key auto_increment,
nm_usuario VARCHAR (100) not null,
nm_sobrenome VARCHAR (100) not null,
ds_email VARCHAR(100) not null UNIQUE,
nr_senha VARCHAR(100),
dt_nascimento DATE,
nr_idade INT,
nm_nivel ENUM('Basico', 'Intermediario', 'Avancado'),
sg_sexo ENUM ('M', 'F'),
sessionTime time,
nm_estado ENUM("SP", "RJ")
);
          
create table tb_profissional (
id_profissional INT primary key auto_increment,
nm_prof VARCHAR (100) not null,
nm_sobrenome VARCHAR (100) not null,
cd_rg CHAR (12) not null UNIQUE,
ds_email VARCHAR(100) not null UNIQUE,
nr_senha VARCHAR(255) not null,
dt_nascimento DATE,
nm_nivel ENUM ("Profissional"),
sessionTime time,
sg_sexo ENUM ('M', 'F')
);

CREATE TABLE tb_categoria (
    id_categoria INT PRIMARY KEY AUTO_INCREMENT,
    nm_categoria VARCHAR(100) NOT NULL
);


CREATE TABLE tb_aula (
    id_aula INT PRIMARY KEY AUTO_INCREMENT,
    ds_titulo VARCHAR(100) NOT NULL,
    ds_descricao TEXT,
    ds_conteudo TEXT,
    id_categoria INT,
    id_profissional INT,
    dt_publicacao DATE,
    #preco DECIMAL(10, 2), -- Preço da aula
     FOREIGN KEY (id_profissional) REFERENCES tb_profissional(id_profissional),
     FOREIGN KEY (id_categoria) REFERENCES tb_categoria(id_categoria)
);

CREATE TABLE tb_aula_privada (
id_aula INT PRIMARY KEY, 
FOREIGN KEY (id_aula) REFERENCES tb_aula(id_aula)
);

-- Tabela para gerenciar as tarefas dos usuários
CREATE TABLE tb_tarefa (
    id_tarefa INT PRIMARY KEY AUTO_INCREMENT,
    id_aula INT,
    id_usuario INT,
    ds_descricao TEXT,
    status ENUM('pendente', 'completo'),
    dt_prazo DATE,
    FOREIGN KEY (id_aula) REFERENCES tb_aula(id_aula),
    FOREIGN KEY (id_usuario) REFERENCES tb_usuario(id_usuario)
);

CREATE TABLE tb_avaliacao (
    id_avaliacao INT PRIMARY KEY AUTO_INCREMENT,
    id_aula INT,
    id_usuario INT,
    nr_avaliacao INT,
    ds_descricao TEXT,
    dt_avaliacao DATE,
    FOREIGN KEY (id_aula) REFERENCES tb_aula(id_aula),
    FOREIGN KEY (id_usuario) REFERENCES tb_usuario(id_usuario)
);

-- Tabela para gerenciar as assinaturas premium dos usuários
/* CREATE TABLE tb_premium (
    id_assinatura INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT,
    dt_inicio DATE,
    dt_fim DATE,
    status ENUM('ativo', 'cancelado'),
    FOREIGN KEY (id_usuario) REFERENCES tb_usuario(id_usuario)
); */

INSERT INTO tb_usuario (nm_usuario, nm_sobrenome, ds_email, nr_senha, dt_nascimento, nr_idade, sg_sexo)
	VALUES('Luan', 'Henrique', 'luanhenrique123@gmail.com', 'luan123', '2004-06-06', 19, 'M'),
                  ('Gabriel Logan', 'Sanches', 'gabriel.sanches31@etec.sp.gov.br', 'senha', '2006-06-15', 10, 'M'),
                  ('Pyetra', 'Quintiana', 'pyetra.quintiana@etec.sp.gov.br', 'amosapos', '2007-04-13', 10, 'F'),
                  ('Maria', 'Santos',  'maria.santos2815@etec.sp.gov.br', 'rock4life', '2004-01-25', 10, 'F'),
                  ('Victor', 'Silva', 'victor.silva974@etec.sp.gov.br', 'amoaBR', '2005-01-29', 10, 'M');

INSERT INTO tb_profissional (nm_prof, nm_sobrenome, cd_rg, ds_email, nr_senha, dt_nascimento, sg_sexo)
    VALUES('Aline', 'Caruso', '12.345.678-9', 'aline.caruso1@hotmail.com', 'amodaraula', '1988-10-04', 'F'),
                  ('Fernando', 'Costa', '75.284.912-0', 'fernandocostaprofessor@hotmail.com', 'vaiporco', '1965-03-25', 'M'),
                  ('Ingrid', 'Souza', '98.765.143-2', 'ingridsouzaprof1213@gmail.com', 'belinha2304', '1999-12-13', 'F'),
                  ('Marcos', 'Alves', '24.681.357-9', 'profmarcosalves84@gmail.com', 'mjf0784', '1984-10-04', 'M'),
                  ('Henrique', 'Santos', '11.223.344-5', 'professorhenriquesantos2000@gmail.com', 'mvsgnts1754', '2000-05-17', 'M'),
                  ('Anderson', 'Silva', '55.555.555-5', 'professorandersonsilva94@gmail.com', 'coringaominhavida', '1994-01-04', 'M'),
                  ('Paola', 'Arantes', '98.765.432-0', 'profpaola0204@gmail.com', 'pnatugj38', '1990-02-04', 'F'); 
          
insert into tb_categoria(nm_categoria)values
('Alfabeto'),
('Números'),
('Animais'),
('Frutas'),
('Dia a dia');


INSERT INTO tb_aula (ds_titulo, ds_descricao, ds_conteudo, id_categoria, id_profissional, dt_publicacao)
VALUES ('Ensino De Libras', 'Aprendendo o Alfabeto', 'Alfabeto do A - Z de maneira clara.', 1, 1, '2024-03-20');


/* INSERT INTO tb_premium (id_usuario, dt_inicio, dt_fim, status)
    VALUES  (1, '2024-01-01', '2025-01-01', 'ativo'),
                    (2, '2024-01-01', '2025-02-01', 'ativo'),
                    (3, '2024-01-01', '2025-03-01', 'ativo'),
                    (4, '2024-01-01', '2025-01-01', 'cancelado'),
                    (5, '2024-01-01', '2025-02-01', 'cancelado'); */

select * from tb_usuario;	


select * from tb_profissional;

select tb_usuario.nm_usuario As "nome do usuario",
tb_usuario.dt_nascimento AS "Data de Nascimento do Usuario",
FLOOR(DATEDIFF(CURDATE(), dt_nascimento) /365) AS "Idade do Usuario"
	From tb_usuario;
    

	
