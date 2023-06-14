var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
        SELECT * FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(nome, email, senha, artista,pintura) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO usuario (nomeCompleto, email, senha, fk_artistaPrefer,fk_pinturaPrefer) VALUES ('${nome}', '${email}', '${senha}', '${artista}', '${pintura}');
`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarGrafico() {
    var instrucao = `
    SELECT COUNT(usuario.fk_artistaPrefer) as voto, artistaPrefer.nomeArtista AS artista
        FROM usuario JOIN artistaPrefer ON  artistaPrefer.idArtista = usuario.fk_artistaPrefer group by usuario.fk_artistaPrefer;`
    return database.executar(instrucao);
 }
 
 function listarGrafico2() {
     var instrucao = `
     SELECT COUNT(usuario.fk_pinturaPrefer) AS voto, pinturaPrefer.nomePintura AS pintura
        FROM usuario
        JOIN pinturaPrefer ON pinturaPrefer.idPintura = usuario.fk_pinturaPrefer
        GROUP BY usuario.fk_pinturaPrefer, pinturaPrefer.nomePintura;`
     return database.executar(instrucao);
  }


module.exports = {
    autenticar,
    cadastrar,
    listarGrafico,
    listarGrafico2
};