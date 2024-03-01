import AppDataSource from "./data-source"

AppDataSource.initialize().then(async () => {
    console.log("Banco de dados iniciado!")
}).catch(error => console.log(error))
