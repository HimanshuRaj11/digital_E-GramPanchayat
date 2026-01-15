import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ILog extends Document {
    action: string;
    userId?: mongoose.Types.ObjectId;
    details: any;
    ipAddress?: string;
    createdAt: Date;
}

const LogSchema: Schema<ILog> = new Schema(
    {
        action: { type: String, required: true },
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        details: { type: Schema.Types.Mixed },
        ipAddress: { type: String },
    },
    { timestamps: true }
);

const Log: Model<ILog> =
    mongoose.models.Log || mongoose.model<ILog>('Log', LogSchema);

export default Log;
