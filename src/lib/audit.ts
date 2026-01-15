import Log from '@/models/Log';
import dbConnect from '@/lib/db';

export async function logAction(
    action: string,
    details: any,
    userId?: string,
    ipAddress?: string
) {
    try {
        await dbConnect();
        await Log.create({
            action,
            details,
            userId,
            ipAddress,
        });
    } catch (error) {
        console.error('Failed to create audit log:', error);
    }
}
