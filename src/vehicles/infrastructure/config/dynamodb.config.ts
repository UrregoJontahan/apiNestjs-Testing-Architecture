// src/vehicles/infrastructure/config/dynamodb.config.ts

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import * as dotenv from 'dotenv';

// Cargar las variables de entorno del archivo .env
dotenv.config();

// Crear el cliente DynamoDB usando las variables de entorno. Si no se usan credenciales estáticas,
// no se debe configurar `credentials` para que el cliente utilice el rol IAM de la instancia EC2.
export const dynamoDbClient = new DynamoDBClient({
  region: process.env.AWS_REGION, // Lee la región desde el archivo .env
  // Elimina `credentials` para usar el rol IAM asignado a la instancia EC2
});

// Crear el cliente DynamoDB Document para trabajar con DynamoDB de manera más sencilla
export const dynamoDbDocumentClient = DynamoDBDocumentClient.from(dynamoDbClient);
