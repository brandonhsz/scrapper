import express from "express"
import cors from "cors";
import mongoose from "mongoose";

import { Crons } from "./cron/scrapTickets.cron";
import { Routes } from "./routes/index.routes";

export class App {

    private app!: express.Application;
    private static instance: App
    private routes: any
    public socket!: any

    private constructor() {
        console.clear()
        this.initConfig()
        this.initDB()
        this.globalRoutes()
    }

    public static getInstance() {
        if (!App.instance) {
            App.instance = new App();
        }
        return App.instance
    }

    private async initDB() {
        try {
            await mongoose.connect("mongodb://mongo:Mz8SfuU2Q61xAkOrhBbU@containers-us-west-72.railway.app:7502")
        } catch (e) {
            console.log("Error al conectar a la base de datos")
        } finally {
            console.log("Base de datos conectada")
        }

    }

    private initConfig() {
        this.app = express()
        this.routes = Routes.getInstance()
        this.app.use(cors())
        this.InitCrons()
    }

    public initServer() {
        this.app.listen(8080, () => {
            console.log("Server up")
        })
    }

    private globalRoutes() {
        this.app.use("/", this.routes.routing())
    }


    private InitCrons() {
        Crons()
    }
}