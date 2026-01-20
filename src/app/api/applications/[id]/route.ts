import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Application from '@/models/Application';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const { status, comment } = await req.json();
        const role = (session.user as any).role;

        // Role-based validation
        if (role === 'citizen') {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
        }

        await dbConnect();

        const application = await Application.findById(id);
        if (!application) {
            return NextResponse.json(
                { message: 'Application not found' },
                { status: 404 }
            );
        }

        application.status = status;
        application.timeline.push({
            status,
            updatedBy: (session.user as any).id,
            date: new Date(),
            comment,
        });

        await application.save();

        return NextResponse.json(
            { message: 'Application updated', application },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('PUT Application Error:', error);
        return NextResponse.json(
            { message: 'Error updating application', error: error.message },
            { status: 500 }
        );
    }
}
