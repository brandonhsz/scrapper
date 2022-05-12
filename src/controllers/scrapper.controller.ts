import e from "express";
import { scrapper } from "../Services/Scrapper.service";

export class Scrapper {
    public static async scrap(req: e.Request, res: e.Response) {
        
        try{
            const elements: any[] = await scrapper({
                name : "bhernandez",
                pass : "brandon1234"
            })
            console.clear()
            elements.map((element: string) => {
                
                if(element.toLowerCase().includes("escorza")) {
                    console.table(element)
                }
                
            })
            if(elements[elements.length - 1].toLowerCase().includes("escorza")) {
                console.log("No Hay Tickets")
            }

            res.json({message : "sended"})
        }catch(e) {
            console.log(e)
            res.json({messagge : e})
        }
        
    }
}