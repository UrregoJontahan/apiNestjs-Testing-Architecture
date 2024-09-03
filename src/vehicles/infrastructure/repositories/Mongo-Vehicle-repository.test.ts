import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoVehicleRepository } from './MongoVehicleRepository';
import { VehicleDocument } from '../schema/vehicle.schema';
import { Vehicle } from '../../domain/vehicle';

describe('MongoVehicleRepository', () => {
  let repository: MongoVehicleRepository;
  let model: Model<VehicleDocument>;

  beforeEach(async () => {
    const mockModel = {
      create: jest.fn(),
      findOne: jest.fn(),
      find: jest.fn(),
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        MongoVehicleRepository,
        {
          provide: getModelToken('Vehicle'),
          useValue: mockModel,
        },
      ],
    }).compile();

    repository = moduleRef.get<MongoVehicleRepository>(MongoVehicleRepository);
    model = moduleRef.get<Model<VehicleDocument>>(getModelToken('Vehicle'));
  });

  it('should create and retrieve a vehicle', async () => {
    const vehicle = Vehicle.create({
      brand: 'Toyota',
      model: 'Corolla',
      year: 2021,
      km: 15000,
      plate: 'ABC123',
      color: 'Red',
    });

    jest.spyOn(model, 'create').mockResolvedValue(vehicle.toValue() as any);

    jest.spyOn(model, 'findOne').mockReturnValue({
      exec: jest.fn().mockResolvedValue({
        ...vehicle.toValue(),
        toObject: jest.fn().mockReturnValue(vehicle.toValue()),
      }),
    } as any);

    await repository.create(vehicle);
    const retrievedVehicle = await repository.getByPlate('ABC123');

    expect(retrievedVehicle).toEqual(vehicle);
  });
});
