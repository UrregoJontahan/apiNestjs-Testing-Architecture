// src/vehicles/infrastructure/repositories/DynamoVehicleRepository.ts

import { Injectable, Logger } from '@nestjs/common';
import { DynamoDBDocumentClient, GetCommand, PutCommand, ScanCommand, DeleteCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { VehicleRepository } from '../../domain/vehicle.repository';
import { Vehicle, PrimitiveVehicle } from '../../domain/vehicle';
import { dynamoDbDocumentClient } from './../config/dynamodb.config'; // Importar el cliente de DynamoDB configurado

@Injectable()
export class DynamoVehicleRepository implements VehicleRepository {
  private readonly logger = new Logger(DynamoVehicleRepository.name);

  // Declarar el cliente de DynamoDB como propiedad de la clase
  private readonly dynamoDbClient: DynamoDBDocumentClient;

  // Asignar el cliente desde la configuración importada
  constructor() {
    this.dynamoDbClient = dynamoDbDocumentClient;
  }

  // Implementación del método create
  async create(vehicle: Vehicle): Promise<void> {
    const vehicleData: PrimitiveVehicle = vehicle.toValue(); // Convertir a objeto plano
    const params = {
      TableName: process.env.DYNAMODB_TABLE, // Leer el nombre de la tabla desde la variable de entorno
      Item: {
        vehicleId: vehicleData.vehicleId ?? '', // Usar el ID del vehículo
        brand: vehicleData.brand,
        model: vehicleData.model,
        year: vehicleData.year.toString(),
        km: vehicleData.km.toString(),
        plate: vehicleData.plate,
        color: vehicleData.color,
      },
    };
    await this.dynamoDbClient.send(new PutCommand(params));
    this.logger.log(`Vehicle created with ID: ${vehicleData.vehicleId}`);
  }

  // Implementación del método findById
  async findById(vehicleId: string): Promise<Vehicle | null> {
    const params = {
      TableName: process.env.DYNAMODB_TABLE, // Leer el nombre de la tabla desde la variable de entorno
      Key: { vehicleId },
    };

    const result = await this.dynamoDbClient.send(new GetCommand(params));
    if (!result.Item) return null;

    return new Vehicle(result.Item as PrimitiveVehicle);
  }

  // Implementación del método findAll
  async findAll(): Promise<Vehicle[]> {
    const params = { TableName: process.env.DYNAMODB_TABLE };
    const result = await this.dynamoDbClient.send(new ScanCommand(params));
    return (result.Items || []).map(item => new Vehicle(item as PrimitiveVehicle));
  }

  // Implementación del método delete
  async delete(vehicleId: string): Promise<void> {
    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Key: { vehicleId },
    };
    await this.dynamoDbClient.send(new DeleteCommand(params));
  }

  // Implementación del método getByPlate
  async getByPlate(plate: string): Promise<Vehicle | null> {
    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      IndexName: 'PlateIndex', // Asegúrate de tener un índice global para 'plate'
      KeyConditionExpression: 'plate = :plate',
      ExpressionAttributeValues: {
        ':plate': plate,
      },
    };

    const result = await this.dynamoDbClient.send(new QueryCommand(params));
    if (!result.Items || result.Items.length === 0) return null;

    return new Vehicle(result.Items[0] as PrimitiveVehicle);
  }
}
