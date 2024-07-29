import { IConfigurationInfo } from "./configuration-info";

export interface ITicket {
servicePrefix: string;
  ticket_id: number,
  ticket_status: string,
  ticket_color_service: string,
  ticket_created_date: string,
  ticket_name_service: string,
  ticket_nb_persons_waiting: number,
  ticket_number: number,
  ticket_patient_real_id: string,
  ticket_prefix_service: string,
  ticket_schedule_activity_date: string,
  ticket_time_waiting: number,
  ticket_volume_service: number,
  ticket_waiting_mode_service: string,
  configuration_info: IConfigurationInfo
  ticket_room_name: string,
  redirection_link: string,
  ticket_validation_date: string
}
