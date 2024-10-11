// src/shared/dynamodb.module.ts

import { Module } from '@nestjs/common';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { dynamoDbDocumentClient } from '../vehicles/infrastructure/config/dynamodb.config'; // Cliente DynamoDB configurado

@Module({
  providers: [
    {
      provide: 'DYNAMODB_CLIENT',
      useValue: dynamoDbDocumentClient, // Usar el cliente DynamoDB configurado
    },
  ],
  exports: ['DYNAMODB_CLIENT'], // Exportar el cliente para ser usado en otros módulos
})
export class DynamoDBModule {}
