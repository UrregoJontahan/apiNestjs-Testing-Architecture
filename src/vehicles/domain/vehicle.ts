export interface PrimitiveVehicle {
    brand:string,
    model:string,
    year:number,
    km:number,
    plate:string,
    color:string
}

export class Vehicle {
    private static existingPlates: Set<string> = new Set();

    constructor( private attributes: PrimitiveVehicle){}

    static create(createVehicle:{
        brand:string,
        model:string,
        year:number,
        km:number,
        plate:string,
        color:string,
    }): Vehicle {

        if (!createVehicle.brand || createVehicle.brand.trim() === '') {
            throw new Error('La marca es obligatoria');
        }
        if (!createVehicle.model || createVehicle.model.trim() === '') {
            throw new Error('El modelo es obligatorio');
        }
        if (typeof createVehicle.year !== 'number' || createVehicle.year <= 1949) {
            throw new Error('El año debe ser un número válido y mayor a 1949');
        }
        if (typeof createVehicle.km !== 'number' || createVehicle.km < 0) {
            throw new Error('El kilometraje debe ser un número positivo');
        }

        if (!createVehicle.plate || createVehicle.plate.trim() === '') {
        throw new Error('La placa es obligatoria');
        }

        if (!createVehicle.color || createVehicle.color.trim() === '') {
            throw new Error('El color es obligatorio');
        }

        Vehicle.existingPlates.add(createVehicle.plate);

        return new Vehicle({
            brand: createVehicle.brand,
            model:createVehicle.model,
            year: createVehicle.year,
            km: createVehicle.km,
            plate: createVehicle.plate,
            color: createVehicle.color
        })
    }

    toValue():PrimitiveVehicle{
        return {
            brand:this.attributes.brand,
            model:this.attributes.model,
            year:this.attributes.year,
            km:this.attributes.km,
            plate:this.attributes.plate,
            color:this.attributes.color,
        }
    }
}