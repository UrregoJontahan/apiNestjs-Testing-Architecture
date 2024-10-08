import { Injectable } from "@nestjs/common";
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class ElasticCacheAdapter {
    private client: RedisClientType;

    constructor() {
        console.log("Iniciando ElasticCacheAdapter");

        this.client = createClient({
            url: "redis://redis-cache-paucki.serverless.use2.cache.amazonaws.com:6379",
            socket: {
                connectTimeout: 10000,
            },

        });

        this.client.connect().then(() => {
            console.log("Conectado a ElastiCache");
        }).catch(err => {
            console.error("Error al conectar a ElastiCache:", err);
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
