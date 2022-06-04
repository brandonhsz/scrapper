import { Client } from "whatsapp-web.js";
import qrcode from "qrcode-terminal"

export class Whatsapp {
  private client = new Client({})

  constructor() {
    console.log("wp")
  }

  public conections() {
    this.client.on("qr", (qr) => {
      qrcode.generate(qr, { small: true })
    })

    this.client.on("ready", () => {
      console.log("client is ready!")
    })

    this.client.initialize()
  }
}

const wp = new Whatsapp()
wp.conections();