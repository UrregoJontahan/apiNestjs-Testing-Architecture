export class VehicleNotFoundException extends Error {
    constructor (public readonly plate:string){
        super(`vehicle not found ${plate}`)
    }
}