export function imageSelect(info: string = ""): string {
    switch (info) {
        case "FAR_KIOSK_GROUP":
            return "assets/images/geolocation.svg"
        default:
            return "assets/images/error.svg"
    }
}