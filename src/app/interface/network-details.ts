import { JetsonInfo } from "./jetson-info";

export interface NetworkDetails {
    status: String,
    batteryvoltage: String,
    jetsonstats: JetsonInfo,
    
}
