import { NetworkDetails } from "./network-details";
import { Object } from "./object";
import { Sensor } from "./sensor";

export interface Payload {
    id: String,
    timestamp: String,
    comm:String,
    sensor: Sensor,
    networkdetails: NetworkDetails,
    objects: Array<Object>,
    
}
