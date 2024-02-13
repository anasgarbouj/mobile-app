import { PopupService } from "../services/popup.service";

export class TicketServiceInfoMapper {

  constructor(private popUpService: PopupService) { }

  mapSuccessInfo(info: string) {
    switch (info) {
      case "SCHEDULE_ACTIVITY_ALREADY_TREATED":
        // TODO: TRANSALTE MESSAGE
        this.popUpService.openPopup("SCHEDULE_ACTIVITY_ALREADY_TREATED");
        break;
      case "CREATE_TICKET_SCHEDULE_ACTIVITY_SUCCESS":
        console.log(info);
        break;
      case "CREATE_TICKET_WITH_SERVICE_SUCCESS":
        console.log(info);
        break;
      default:
        console.log("Unknown error happened");
        break;
    }
  }
}
