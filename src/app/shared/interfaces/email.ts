import { ILocation } from "./location"

export interface IEmail {
  email : string,
  ticket_id : number,
  kiosk_group_id : number | null,
  current_position : ILocation | null
}
