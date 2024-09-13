import { Injectable } from '@nestjs/common';
import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';

@Injectable()
export class SQSService {
  private sqsClient: SQSClient;
  private queueUrl: string = 'https://sqs.us-east-1.amazonaws.com/376129868845/my-queue-app';

  constructor() {
    this.sqsClient = new SQSClient({
      region: 'sa-east-1',
    });
  }

  async sendMessage(messageBody: string): Promise<void> {
    const command = new SendMessageCommand({
      QueueUrl: this.queueUrl,
      MessageBody: messageBody,
    });

    try {
      await this.sqsClient.send(command);
      console.log('Message sent successfully.');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }
}
