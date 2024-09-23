import { Injectable } from "@nestjs/common";
import * as redis from "redis";

@Injectable()
export class ElasticCacheAdapter {
    private client;

    constructor(){
        this.client = redis.createClient({
            url: "redis-cache-paucki.serverless.use2.cache.amazonaws.com:6379"
        });

        this.client.on("error", (err) => {
            console.error("elastic error", err)
        })
    }

    async get(key:string): Promise<any> {
        return new Promise((resolve , reject) => {
            this.client.get(key, (err, data) => {
                if(err){
                    return reject(err)
                }

                resolve(data ? JSON.parse(data) : null)
            })
        })
    }

    async set(key:string, value:any): Promise<void> {
        return new Promise ((resolve, reject) => {
            this.client.set(key, JSON.stringify(value), (err) => {
                if(err) {
                    reject(err)
                }
                resolve()
            })
        })
    }
}
