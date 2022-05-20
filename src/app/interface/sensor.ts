import { Location } from "./location";

export interface Sensor {
    id: String,
    type: String,
    description: String,
    image: String,
    videoPath: String,
    location: Location
}
