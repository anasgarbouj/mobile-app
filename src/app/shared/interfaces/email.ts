import { ILocation } from "./location"

export interface IEmail {
  email : string,
  ticket_id : number,
  kioskId : number | null,
  current_position : ILocation | null
}
