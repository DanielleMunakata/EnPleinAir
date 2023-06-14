CREATE DATABASE EnPleinAir;
USE EnPleinAir;

create table artistaPrefer (
idArtista int primary key,
nomeArtista varchar(100)
);

insert into artistaPrefer values (1,'Claude Monet'),
(2,'Georges Seurat'),
(3,'Camille Pissarro'),
(4,'Édouard Manet'),
(5,'Vincent Van Gogh'),
(6,'Pierre-Auguste Renoir'),
(7,'Paul Cézanne');


create table pinturaPrefer (
idPintura int,
nomePintura varchar(100),
fk_artista int, 
primary key(idPintura,fk_artista),
foreign key(fk_artista) references artistaPrefer(idArtista)
);

insert into pinturaPrefer values (1,'Caminhada no Penhasco',1),
(2,'A Noite Estrelada',5),
(3,'Impressão Pôr do Sol',1),
(4,'Ponte Sobre Uma Lagoa de Lírios da Agua',1),
(5,'Campo de Trigo com Ciprestes',5),
(6,'Guardanapos de Mesa e Fruta',7),
(7,'Monte Santa Vitória',7),
(8,'Mulher com Sombrinha no Jardim',6),
(9,'Mulher com Sombrinha',6),
(10,'Tarde de Verão',5),
(11,'O Jardim em Sainte-Adresse',1),
(12,'Primavera',4),
(13,'A Leitura',4),
(14,'Tempo de Inverno',3),
(15,'Uma Rua em Pointoise',3),
(16,'Torre Eiffel',2),
(17,'Tarde de Domingo na Ilha de Grand Jatte',2);
    

CREATE TABLE usuario (
  id INT auto_increment,
  nomeCompleto VARCHAR(80),
  email VARCHAR(100), 
  senha CHAR(8), 
  dtNasc DATE,
  genero CHAR(1),
  fk_artistaPrefer INT,
  primary key(id,fk_artistaPrefer),
  fk_pinturaPrefer INT,
  newsletter CHAR(1),
  fk_login INT
); 
-- colocar check constraint no genero e na newsletter 

insert into usuario (id,email,senha,fk_artistaPrefer,fk_pinturaPrefer) 
values (1,'exemplo@gmail.com','123',1,1); 

alter table usuario add foreign key (fk_artistaPrefer) references artistaPrefer(idArtista);
alter table usuario add foreign key (fk_pinturaPrefer) references pinturaPrefer(idPintura);

create table login (
id INT,
email varchar(100),
senha char(8),
fk_usuario INT,
primary key(id,fk_artistaPrefer),
FOREIGN KEY (fk_usuario)
REFERENCES usuario(id),
fk_artistaPrefer INT
);

insert into login values 
(1,'exemplo@gmail.com','123',1,1);

INSERT INTO usuario (nomeCompleto, email, senha, fk_artistaPrefer,fk_pinturaPrefer) VALUES ('Maria', 'maria@gmAil', '12345678', '1', '1');

select * from usuario;
alter table usuario add foreign key (fk_login) references login(id);

SELECT DISTINCT 1 AS resultado
FROM login
WHERE email = 'exemplo@gmail.com' AND senha = '123';