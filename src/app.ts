import express from "express"
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
        this.globalRoutes()
    }

    public static getInstance() {
        if (!App.instance) {
            App.instance = new App();
        }
        return App.instance
    }

    private initConfig() {
        this.app = express()
        this.routes = Routes.getInstance()

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