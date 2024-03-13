export function errorImageSelect(info: string = ""): string {
    switch (info) {
        case "TICKET_EXPIRED":
            return "assets/images/trash.svg"
        case "FAR_KIOSK_GROUP":
            return "assets/images/geolocation.svg"
        case "TICKET_EMAIL_NOT_SENT":
        case "TICKET_EMAIL_ERROR":
        case "VIRTUAL_TICKET_PATIENT_LOGIN_EMAIL_NOT_SENT":
        case "VIRTUAL_TICKET_PATIENT_EMAIL_ERROR":
            return "assets/images/email_error.svg"
        default:
            return "assets/images/error.svg"
    }
}

export function successImageSelect(info: string = ""): string {
    switch (info) {
        case "TICKET_EMAIL_SENT":
        case "CREATE_TICKET_WITH_SERVICE_SUCCESS":
        case "CREATE_TICKET_SCHEDULE_ACTIVITY_SUCCESS":
        case "VIRTUAL_TICKET_PATIENT_LOGIN_EMAIL_SENT":
            return "assets/images/email_sent.svg"
        default:
            return ""
    }
}
