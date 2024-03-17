import { Mongoose, ConnectOptions } from 'mongoose';
import * as mongoose from 'mongoose';
mongoose.set('strictQuery', false);

enum MongoDbConnectionStatusEnum {
    Connected,
    Disconnected,
}

export class Mongo {
    uri: string;
    db: Mongoose;
    options: ConnectOptions;
    status: MongoDbConnectionStatusEnum;

    buildUri(uri: string): Mongo {
        this.uri = uri;
        return this;
    }

    buildOptions(options: ConnectOptions): Mongo {
        this.options = options;
        return this;
    }

    async connect(): Promise<void> {
        this.db = await mongoose.connect(this.uri, this.options);
        console.log('MongoDB successfully connected');
        this.status = MongoDbConnectionStatusEnum.Connected;
    }

    async disconnect(): Promise<void> {
        try {
            this.status = MongoDbConnectionStatusEnum.Disconnected;
            await this.db.disconnect();
        } catch (error) {
            throw error;
        }
    }
}
