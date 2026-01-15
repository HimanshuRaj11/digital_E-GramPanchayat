import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IApplication extends Document {
    userId: mongoose.Types.ObjectId;
    serviceId: mongoose.Types.ObjectId;
    status: 'pending' | 'in-review' | 'approved' | 'rejected' | 'completed';
    data: Record<string, any>; // Dynamic form data
    documents: { name: string; url: string }[];
    timeline: {
        status: string;
        updatedBy: mongoose.Types.ObjectId;
        date: Date;
        comment?: string;
    }[];
    createdAt: Date;
    updatedAt: Date;
}

const ApplicationSchema: Schema<IApplication> = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        serviceId: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
        status: {
            type: String,
            enum: ['pending', 'in-review', 'approved', 'rejected', 'completed'],
            default: 'pending',
        },
        data: { type: Map, of: Schema.Types.Mixed },
        documents: [
            {
                name: String,
                url: String,
            },
        ],
        timeline: [
            {
                status: String,
                updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
                date: { type: Date, default: Date.now },
                comment: String,
            },
        ],
    },
    { timestamps: true }
);

const Application: Model<IApplication> =
    mongoose.models.Application ||
    mongoose.model<IApplication>('Application', ApplicationSchema);

export default Application;
