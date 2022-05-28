import e from "express";
import { scrapper } from "../Services/Scrapper.service";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000")


export class Scrapper {

    public static async scrap(req: e.Request, res: e.Response) {

        try {
            const elements: any[] = await scrapper({
                name: "bhernandez",
                pass: "brandonhs"
            })
            console.clear()
            elements.map((element: string) => {

                if (element.toLowerCase().includes("escorza")) {
                    socket.emit("scrapper", element)
                    console.table(element)
                }

            })
            if (elements[elements.length - 1].toLowerCase().includes("escorza")) {

                console.log("No Hay Tickets")
            }

            res.json({ message: "sended" })
        } catch (e) {
            console.log(e)
            res.json({ messagge: "error" })
        }

    }


}