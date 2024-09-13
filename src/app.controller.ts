import { Controller, Post, Body } from "@nestjs/common";
import { SQSService } from "./sqs.services";

@Controller("message")
export class AppController {
    constructor ( private readonly sqsServices: SQSService) {}

    @Post()
    async sendMessage(@Body("message") message: string) {
        await this.sqsServices.sendMessage(message)
        return { status: "message send"}
    }
}