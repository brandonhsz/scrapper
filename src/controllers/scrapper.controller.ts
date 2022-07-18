import e from "express";

import { scrapper } from "../Services/Scrapper.service";
import { expoService } from "../Services/expo.service";

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

            // expoService({

            //     escorza: elementsEscorza,
            //     revo: elementsRevo,
            //     tlajo: elementsTlajo

            // })

            notificationFMCService({
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