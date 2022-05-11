import e from "express";

export class IndexController {

    public static Index(req: e.Request, res : e.Response) {
        res.json({message : "ok"})
    }

}