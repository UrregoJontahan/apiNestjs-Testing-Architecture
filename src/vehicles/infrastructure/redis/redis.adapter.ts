import { Injectable } from "@nestjs/common";
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class ElasticCacheAdapter {
    private client: RedisClientType;

    constructor() {
        console.log("Iniciando ElasticCacheAdapter");

        // Obtener la URL de conexión desde las variables de entorno
        const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";

        this.client = createClient({
            url: redisUrl,
            socket: {
                connectTimeout: 10000,
            },
        });

        // Conectar a Redis
        this.client.connect().then(() => {
            console.log(`Conectado a Redis en: ${redisUrl}`);
        }).catch(err => {
            console.error("Error al conectar a Redis:", err);
        });

        this.client.on("error", (err) => {
            console.error("Redis error:", err);
        });
    }

    async get(key: string): Promise<any> {
        try {
            const data = await this.client.get(key);
            return data ? JSON.parse(data) : null;
        } catch (err) {
            console.error("Error obteniendo valor de Redis:", err);
            throw err;
        }
    }

    async set(key: string, value: any): Promise<void> {
        try {
            await this.client.set(key, JSON.stringify(value), { EX: 20 * 60 * 60 });
        } catch (err) {
            console.error("Error guardando valor en Redis:", err);
            throw err;
        }
    }
}
