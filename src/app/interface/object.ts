import { Location } from "./location";

export interface Object {
    id: number,
    type: String,
    description: String,
    confidence: number,
    location: Location

}
