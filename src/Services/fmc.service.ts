import { initializeApp } from 'firebase-admin/app';
import admin from 'firebase-admin';
import serviceAccount from '../../notifications-cf0cd-firebase-adminsdk-k7y4n-d417d355d3.json'


import Tickets from "../schemas/Tickets.schema";
import { ITicket } from '../interfaces/Ticket.interface';

interface IData {
  escorza: ITicket[];
  revo: ITicket[];
  tlajo: ITicket[];
}

let mensajes = 0;
const voidMessage = {
  data: {
    escorza: [],
    revo: [],
    tlajo: [],
  },
};

export const initFmcService = () => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as any),
  });
}

export const notificationFMCService = async (data: any, topic: string) => {
  console.log("funciona");

  if (
    (data.escorza.length > 0 || data.revo.length > 0 || data.tlajo.length > 0,
      mensajes !== data.escorza.length + data.revo.length + data.tlajo.length)
  ) {
    const TicketsToSend = new Tickets({
      escorza: data.escorza,
      revo: data.revo,
      tlajo: data.tlajo,
    });
    await Tickets.remove({});
    await TicketsToSend.save();

    const message = {
      notification: {
        title: "Tickets",
        body: `${data.escorza.length} tickets de escorza\n ${data.revo.length} tickets de revolución\n ${data.tlajo.length} tickets de tlajomulco`,
      },
      // data: {
      //   tittle: "Nuevos Tickets",
      //   body: data
      // },
      topic: topic,
      // android: {
      //   priority: "high",
      // }
    };

    admin.messaging().send(message)
      .then(() => console.log("mensaje enviado"))
      .catch((err) => console.log("error enviando mensaje"));

    mensajes = data.escorza.length + data.revo.length + data.tlajo.length;
  }
};
