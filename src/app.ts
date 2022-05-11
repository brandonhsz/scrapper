import express from "express"
import { Routes } from "./routes/index.routes";

export class App {
    private app!: express.Application;
    private static instance : App
    private routes : any
    private constructor(){
        this.initConfig()
        this.globalRoutes()
    }

    public static getInstance() {
        if(!App.instance) {
            App.instance = new App();
        }
        return App.instance
    }

    private initConfig() {
        this.app = express()
        this.routes = Routes.getInstance()
    }

    public initServer() {
        this.app.listen(8080, () => {
            console.clear()
            console.log("Server up")
        })
    }

    private globalRoutes() {
        this.app.use("/", this.routes.routing())
    }
}