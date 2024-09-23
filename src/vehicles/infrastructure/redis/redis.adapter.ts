import { Injectable } from "@nestjs/common";
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class ElasticCacheAdapter {
    private client: RedisClientType;

    constructor() {
        this.client = createClient({
            url: "redis://redis-cache-paucki.serverless.use2.cache.amazonaws.com:6379"
        });

        this.client.connect().catch(err => {
            console.error("Error connecting to ElastiCache:", err);
        });

        this.client.on("error", (err) => {
            console.error("ElastiCache error:", err);
        });
    }

    async get(key: string): Promise<any> {
        try {
            const data = await this.client.get(key);
            return data ? JSON.parse(data) : null;
        } catch (err) {
            console.error("Error getting value from ElastiCache:", err);
            throw err;
        }
    }

    async set(key: string, value: any): Promise<void> {
        try {
            await this.client.set(key, JSON.stringify(value));
        } catch (err) {
            console.error("Error setting value in ElastiCache:", err);
            throw err;
        }
    }
}
