import e from "express";
import { Scrapper } from "../controllers/scrapper.controller";

export class Routes {

    private static instance: Routes

    private router!: e.Router

    private constructor() { }

    public static getInstance() {
        if (!Routes.instance) {
            Routes.instance = new Routes()
        }
        return Routes.instance
    }

    public routing(): e.Router {
        this.router = e.Router()

        this.router.get("/scrapMorning", Scrapper.scrap)
        this.router.get("/scrapAfternoon", Scrapper.scrap)

        return this.router
    }
}