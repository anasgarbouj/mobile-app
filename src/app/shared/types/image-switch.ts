export function errorImageSelect(info: string = ""): string {
    switch (info) {
        case "FAR_KIOSK_GROUP":
            return "assets/images/geolocation.svg"
        default:
            return "assets/images/error.svg"
    }
}

export function successImageSelect(info: string = ""): string {
    switch (info) {
        case "TICKET_EMAIL_SENT":
            return "assets/images/email_sent.svg"
        default:
            return ""
    }
}
