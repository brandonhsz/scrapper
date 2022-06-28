import { Schema, model } from "mongoose";
import { TicketSchema } from "./Ticket.schema";

const TicketsSchema = new Schema({
  escorza: {
    type: [TicketSchema],
    required: true,
  },
  revo: {
    type: [TicketSchema],
    required: true,
  },
  tlajo: {
    type: [TicketSchema],
    required: true,
  }
})


export default model("Tickets", TicketsSchema);