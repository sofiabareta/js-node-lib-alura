// CJS
// const chalk = require('chalk')

// ESM / ES6 Modules
import chalk from 'chalk';
import fs from 'fs'

function extraiLinks(texto) {
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const capturas = [...texto.matchAll(regex)];
    const resultados = capturas.map(captura => ({[captura[1]]: captura[2]}))
    return resultados.length !== 0 ? resultados : "não há links no arquivo";
  }

function trataErro(erro) {
    throw new Error(chalk.red(erro))
}

// then --> + funcional
// async/await --> escrever código como se escreve síncrono

async function pegaArquivo(caminhoDoArquivo) {
    try {
        const encoding = 'utf-8'
        const texto = await fs.promises.readFile(caminhoDoArquivo, encoding)

       return extraiLinks(texto)
    } catch(erro) {
        trataErro(erro)
    } 
    // finally {
    //     console.log('rodou')
    // }
}

// function pegaArquivo(caminhoDoArquivo) {
//     const encoding = 'utf-8'
//     fs.promises
//         .readFile(caminhoDoArquivo, encoding)
//         .then(texto => console.log(chalk.green(texto)))
//         .catch(trataErro)
// }

export default pegaArquivo;

// /\(https?:\/\/[^\s?#].[^\s]*\)