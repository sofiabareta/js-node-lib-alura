import getFile from "./index.js";
import fs from 'fs';
import chalk from "chalk";
import validatedList from "./http-validation.js";

const path = process.argv;

async function printList(valid, result, identifier = '') {
    if (valid) {
        console.log(chalk.yellow('Valid list'), chalk.black.bgGreen(identifier), await validatedList(result))
    } else {
        console.log(chalk.yellow('Links list'), chalk.black.bgGreen(identifier), result)
    }

}

async function formatText(args) {
    const path = args[2]
    const valid = args[3] === '--valida'
    
    try {
        fs.lstatSync(path)
        
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log('File or directory not existent')
            return
        }
    }
    
    if (fs.lstatSync(path).isFile()) {
        const result = await getFile(path)
        printList(valid, result)

    } else if (fs.lstatSync(path).isDirectory()) {
        const files = await fs.promises.readdir(path)
        files.forEach(async (fileName) => {
            const list = await getFile(`${path}/${fileName}`)
            printList(valid, list, fileName)
        })

    }
}

formatText(path)