const asyncRedis = require('async-redis');

export class Redis {
  private client: any;
  private static redisInstance: Redis = null;
  private REDIS_HOST: string = process.env.REDIS_HOST || '0.0.0.0';
  private REDIS_PORT: string = process.env.REDIS_PORT || '6379';

  private constructor() {
    try {
      this.client = asyncRedis.createClient({
        host: this.REDIS_HOST,
        port: this.REDIS_PORT,
      });
      this.client.on('error', function () {
        // redis connection error. without this event error interrupt app
      });
    } catch (error) {
      console.error('REDIS ERROR', error);
      throw error;
    }
  }

  public async set<T = string>(key: string, value: T, duration?: number) {
    try {
      this.client.set(key, value);
      if (duration) {
        this.client.expire(key, duration);
      }
    } catch (error) {
      console.error('REDIS ERROR', error);
      throw error;
    }
  }

  public async get(field: string) {
    try {
      return await this.client.get(field);
    } catch (error) {
      console.error('REDIS ERROR', error);
      throw error;
    }
  }


  public static getInstance(): Redis {
    if (this.redisInstance == null) {
      this.redisInstance = new Redis();
    }
    return this.redisInstance;
  }
}
