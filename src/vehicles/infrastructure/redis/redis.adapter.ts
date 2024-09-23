import * as redis from 'redis';
import { RedisPort } from './redis.port.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RedisAdapter implements RedisPort {
  private client;

  constructor() {
    this.client = redis.createClient({
      socket: {
        host: '3.142.221.120',
        port: 6379,
      },
    });

    this.client.on('error', (err) => {
      console.log('Redis error', err);
    });

    this.client.connect().catch(console.error);
  }

  async get(key: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data ? JSON.parse(data) : null);
      });
    });
  }

  async set(key: string, value: any): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.set(key, JSON.stringify(value), (err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  }
}
