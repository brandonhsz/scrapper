import e from "express";
import { scrapper } from "../Services/Scrapper.service";

export class Scrapper {
    public static async scrap(req: e.Request, res: e.Response) {
        
        try{
            const elements: any[] = await scrapper({
                name : "bhernandez",
                pass : "brandon1234"
            })
            
            elements.map((element: string) => {
                
                if(element.toLowerCase().includes("escorza")) {
                    console.log(element)
                }else {
                    console.log("No hay tickets para Escorza")
                }
            })

            res.json({message : "sended"})
        }catch(e) {
            console.log(e)
            res.json({messagge : e})
        }
        
    }
}