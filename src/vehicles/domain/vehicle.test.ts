import { Vehicle } from "./vehicle";

describe("Vehicle", ()=> {
    const vehicleData = {
        brand:"toyota",
        model:"corrolla",
        year:2021,
        km:0,
        plate:"ABC123",
        color:"negro"
      } 

   describe("create", ()=> {
    it("should create a new car if the data is correct ",()=> {
        const vehicle = Vehicle.create(vehicleData)

        expect(vehicle.toValue()).toEqual(vehicleData)
    })

    describe("should throw a error if the data is invalid", ()=> {
        const createVehicleWithInvalidField = ( invalidData: Partial<typeof vehicleData>, expectedErrorMessage: string ) => {
            expect(()=>Vehicle.create({...vehicleData, ...invalidData})).toThrowError(expectedErrorMessage)
        }

        it("should throw a error if the brand is empty", ()=> {
            createVehicleWithInvalidField({brand: ""}, "La marca es obligatoria")
        })

        it("should throw a error if the model is empty", ()=> {
            createVehicleWithInvalidField({model: ""}, "El modelo es obligatorio")
        })

        it("should throw a error if the year is minor or to equal to 1949 ", ()=> {
            createVehicleWithInvalidField({ year: 0}, 'El año debe ser un número válido y mayor a 1949')
        })

        it("should throw a error if the Km is a negative number", ()=> {
            createVehicleWithInvalidField({km: -1}, 'El kilometraje debe ser un número positivo')
        })

        it("should throw a error if the plate is empty", ()=> {
            createVehicleWithInvalidField({plate: ""}, 'La placa es obligatoria')
        })

        it("should throw a error if the color is empty", ()=> {
            createVehicleWithInvalidField({color: ""}, 'El color es obligatorio')
        })
    })

    describe("toValue", ()=> {
        it("should return the vehicle attributes", ()=> {
            const vehicle = Vehicle.create(vehicleData)

            expect(vehicle.toValue()).toEqual(vehicleData)
        })
    })

   })
})