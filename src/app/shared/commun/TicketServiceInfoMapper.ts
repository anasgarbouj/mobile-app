import { PopupService } from "../services/popup.service";
import { PopupValidDataTypes } from "../types/PopupValidDataTypes";

export class TicketServiceInfoMapper {

  constructor(private popUpService: PopupService) { }

  mapErrorInfo(info: string) {
    switch (info) {
      //404
      case "SCHEDULE_ACTIVITY_IN_WRONG_KIOSK_GROUP":
        this.popUpService.openPopup(PopupValidDataTypes.AppointmentInWrongKiosk);
        break;
      case "SERVICE_NOT_FOUND":
        this.popUpService.openPopup(PopupValidDataTypes.ServiceNotFound);
        break;
      case "KIOSK_GROUP_NOT_FOUND":
        this.popUpService.openPopup(PopupValidDataTypes.KioskGroupNotFound);
        break;
      case "SCHEDULE_ACTIVITY_NOT_FOUND":
        this.popUpService.openPopup(PopupValidDataTypes.AppointmentNotFound);
        break;

      //400
      case "CREATE_TICKET_INVALID_ENTRIES":
        this.popUpService.openPopup(PopupValidDataTypes.WrongID);
        break;

      case "QUEUE_NOT_FOUND_OR_NOT_IN_TIME_RANGE":
        console.log("CASE", info);
        break;
      case "CREATE_TICKET_ERROR":
        console.log("CASE", info);
        break;
      default:
        console.log("Unknown error happened");
        break;

    }
  }

  mapSuccessInfo(info: string) {
    switch (info) {
      case "SCHEDULE_ACTIVITY_ALREADY_TREATED":
        this.popUpService.openPopup(PopupValidDataTypes.AppointmentAlreadyTreated);
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
