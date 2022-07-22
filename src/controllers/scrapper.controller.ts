import e from "express";

import { scrapper } from "../Services/Scrapper.service";

import { ITicket } from "../interfaces/Ticket.interface";
import { notificationFMCService } from "../Services/fmc.service";
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
            elements.map((element: ITicket) => {
                if (!element) return
                else {
                    if (element.TicketBranch === "Escorza") {
                        elementsEscorza.push(element)
                    }
                    else if (element.TicketBranch === "Revolución") {
                        elementsRevo.push(element)
                    }

                    else if (element.TicketBranch === "Tlajomulco") {
                        elementsTlajo.push(element)
                    }
                }
            })

            const dataToSend: any = {
                escorza: elementsEscorza,
                revo: elementsRevo,
                tlajo: elementsTlajo
            }

            if (req.url.includes("/scrapMorning")) notificationFMCService(dataToSend, "morningTurn")
            else if (req.url.includes("/scrapAfternoon")) notificationFMCService(dataToSend, "afternoonTurn")
            else notificationFMCService(dataToSend, "morningTurn")

            res.json({
                data: dataToSend,
            })
        } catch (e) {
            console.log(e)
            res.json({ messagge: "error" })
        }

    }


}