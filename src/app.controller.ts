import { Controller, Post, Body } from "@nestjs/common";
import { SQSService } from "./sqs.services";

@Controller("message")

export class AppController {
    constructor ( private readonly sqsServices: SQSService) {}

    @Post()
    async sendMessage(@Body("message") message: string): Promise <void> {
        await this.sqsServices.sendMessage(message)
    }
}