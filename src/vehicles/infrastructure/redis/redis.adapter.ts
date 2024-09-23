import { createClient, RedisClientType } from 'redis';
import { RedisPort } from './redis.port.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RedisAdapter implements RedisPort {
  private client: RedisClientType;

  constructor() {
  
    this.client = createClient({
      socket: {
        host: '3.142.221.120',
        port: 6379,
      },
    });

    this.client.on('error', (err) => {
      console.error('Redis error', err);
    });


    this.client.connect().catch((err) => {
      console.error('Redis connection error:', err);
    });
  }


  async get(key: string): Promise<any> {
    try {
      const data = await this.client.get(key);
      return data ? JSON.parse(data) : null;
    } catch (err) {
      console.error('Error getting key from Redis:', err);
      throw err;
    }
  }


  async set(key: string, value: any): Promise<void> {
    try {
      await this.client.set(key, JSON.stringify(value));
    } catch (err) {
      console.error('Error setting key in Redis:', err);
      throw err;
    }
  }
}
