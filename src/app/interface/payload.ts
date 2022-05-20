import { NetworkDetails } from "./network-details";
import { Sensor } from "./sensor";

export interface Payload {
    id: String,
    timestamp: String,
    sensor: Sensor,
    networkDetails: NetworkDetails,
    objects: Array<Object>,
    
}
