import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Application from '@/models/Application';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const { serviceId, data, documents } = await req.json();

        if (!serviceId || !data) {
            return NextResponse.json(
                { message: 'Missing required fields' },
                { status: 400 }
            );
        }

        await dbConnect();

        const newApplication = await Application.create({
            userId: (session.user as any).id,
            serviceId,
            data,
            documents: documents || [],
            timeline: [
                {
                    status: 'pending',
                    updatedBy: (session.user as any).id,
                    comment: 'Application submitted',
                },
            ],
        });

        return NextResponse.json(
            { message: 'Application submitted', application: newApplication },
            { status: 201 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { message: 'Error submitting application', error: error.message },
            { status: 500 }
        );
    }
}

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();

        let query = {};
        const role = (session.user as any).role;

        if (role === 'citizen') {
            query = { userId: (session.user as any).id };
        } else {
            // Staff and Officer can see all (or filtered by assignment, but for now all)
            // Could add query params for filtering
        }

        const applications = await Application.find(query)
            .populate('serviceId', 'name')
            .populate('userId', 'name email')
            .sort({ createdAt: -1 });

        return NextResponse.json({ applications }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { message: 'Error fetching applications', error: error.message },
            { status: 500 }
        );
    }
}
