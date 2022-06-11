import e from "express";
import { scrapper } from "../Services/Scrapper.service";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000")


export class Scrapper {
    private static elementsToSend: any[] = [{ message: "escorza" }]

    public static async scrap(req: e.Request, res: e.Response) {

        try {
            const elements: any[] = await scrapper({
                name: "bhernandez",
                pass: "brandonhs"
            })
            console.clear()
            elements.map((element: string) => {
                if (!element) return
                else {
                    console.log("entre")
                    if (element.toLowerCase().includes("escorza")) {
                        socket.emit("scrapper", element)
                        this.elementsToSend.push(element)
                        console.table(element)
                    }
                    res.json({
                        message: "OK",
                        data: this.elementsToSend
                    })
                }
            })
            res.json({ message: "No hay tickets" })
        } catch (e) {
            console.log(e)
            res.json({ messagge: "error" })
        }

    }


}