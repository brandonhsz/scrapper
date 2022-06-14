import e from "express";
import { scrapper } from "../Services/Scrapper.service";
import { io } from "socket.io-client";
import { expoService } from "../Services/expo.service";

const socket = io("http://localhost:3000")


export class Scrapper {
    public static async scrap(req: e.Request, res: e.Response) {
        const elementsEscorza: string[] = []
        const elementsRevo: string[] = []
        const elementsTlajo: string[] = []
        try {
            const elements: any[] = await scrapper({
                name: "bhernandez",
                pass: "brandonhs"
            })
            console.clear()
            elements.map((element: string) => {
                if (!element) return
                else {
                    if (element.toLowerCase().includes("escorza")) {
                        elementsEscorza.push(element)
                    }
                    else if (element.toLowerCase().includes("revolucion")) {
                        elementsRevo.push(element)
                    }
                    else if (element.toLowerCase().includes("tlajomulco")) {
                        elementsTlajo.push(element)
                    }

                }
            })
            expoService({
                data: {
                    escorza: elementsEscorza,
                    revo: elementsRevo,
                    tlajo: elementsTlajo
                }
            })
            res.json({
                data: {
                    escorza: elementsEscorza,
                    revo: elementsRevo,
                    tlajo: elementsTlajo
                }
            })
        } catch (e) {
            console.log(e)
            res.json({ messagge: "error" })
        }

    }


}