import { Injectable } from '@nestjs/common';
import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';

@Injectable()
export class SQSService {
  private sqsClient: SQSClient;
  private queueUrl: string = 'https://sqs.us-east-2.amazonaws.com/376129868845/test-queue';

  constructor() {
    this.sqsClient = new SQSClient({
      region: 'us-east-1',
    });
  }

  async sendMessage(messageBody: string) {

    try {
      const command = new SendMessageCommand({
        QueueUrl: this.queueUrl,
        MessageBody: messageBody,
      });

      const response = await this.sqsClient.send(command);
      console.log('*********Message sent successfully.*************', response);
      return response
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }
}
