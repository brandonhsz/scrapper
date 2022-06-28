import { Schema, model } from "mongoose";

export const TicketSchema = new Schema({
  TicketNumber: String,
  TicketTime: String,
  TicketSubjet: String,
  TicketAuthor: String,
  TicketBranch: String,
})
