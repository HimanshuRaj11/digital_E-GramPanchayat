import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IService extends Document {
    name: string;
    description: string;
    category: string;
    requiredDocuments: string[];
    fees: number;
    processingTime: string; // e.g., "7 days"
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const ServiceSchema: Schema<IService> = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        category: { type: String, required: true },
        requiredDocuments: [{ type: String }],
        fees: { type: Number, default: 0 },
        processingTime: { type: String },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

const Service: Model<IService> =
    mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema);

export default Service;
