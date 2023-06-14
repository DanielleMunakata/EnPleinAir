var database = require("../database/config");

function buscarUltimasMedidas(idAquario, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT COUNT(usuario.fk_artistaPrefer) as voto, artistaPrefer.nomeArtista AS artista
        FROM usuario JOIN artistaPrefer ON  artistaPrefer.idArtista = usuario.fk_artistaPrefer group by usuario.fk_artistaPrefer;`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT COUNT(usuario.fk_artistaPrefer) as voto, artistaPrefer.nomeArtista AS artista
        FROM usuario JOIN artistaPrefer ON  artistaPrefer.idArtista = usuario.fk_artistaPrefer group by usuario.fk_artistaPrefer;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function buscarMedidasEmTempoReal(idAquario) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top 1
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,  
                        CONVERT(varchar, momento, 108) as momento_grafico, 
                        fk_aquario 
                        from medida where fk_aquario = ${idAquario} 
                    order by id desc`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select 
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,
                        DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico, 
                        fk_aquario 
                        from medida where fk_aquario = ${idAquario} 
                    order by id desc limit 1`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function pintura(idAquario, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT COUNT(usuario.fk_pinturaPrefer) AS voto, pinturaPrefer.nomePintura AS pintura
        FROM usuario
        JOIN pinturaPrefer ON pinturaPrefer.idPintura = usuario.fk_pinturaPrefer
        GROUP BY usuario.fk_pinturaPrefer, pinturaPrefer.nomePintura;
        ;`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT COUNT(usuario.fk_pinturaPrefer) AS voto, pinturaPrefer.nomePintura AS pintura
        FROM usuario
        JOIN pinturaPrefer ON pinturaPrefer.idPintura = usuario.fk_pinturaPrefer
        GROUP BY usuario.fk_pinturaPrefer, pinturaPrefer.nomePintura;`;

    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    pintura
}