import e from "express";
import { scrapper } from "../Services/Scrapper.service";
import { io } from "socket.io-client";
import { expoService } from "../Services/expo.service";

const socket = io("http://localhost:3000")
export interface ITicket {
    TicketNumber: string,
    TicketTime: string,
    TicketSubjet: string,
    TicketAuthor: string,
    TicketBranch: string,
}

export class Scrapper {
    public static async scrap(req: e.Request, res: e.Response) {
        const elementsEscorza: ITicket[] = []
        const elementsRevo: ITicket[] = []
        const elementsTlajo: ITicket[] = []
        try {
            const elements: any[] = await scrapper({
                name: "bhernandez",
                pass: "brandonhs"
            })
            console.log(elements)
            elements.map((element: ITicket) => {
                if (!element) return
                else {
                    if (element.TicketBranch === "Escorza") {
                        elementsEscorza.push(element)
                    }
                }
            })
            expoService({

                escorza: elementsEscorza,
                revo: elementsRevo,
                tlajo: elementsTlajo

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