export default class Vehicle{
    type: string

    constructor(type: string){
        this.type = type
    }

    getVehicleType(): string {
        return this.type;
    }
}