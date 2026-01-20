import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Application from '@/models/Application';
import Service from '@/models/Service'; // Required for population
import User from '@/models/User';       // Required for population
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { serviceId, data, documents } = body;

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
        console.error('POST Application Error:', error);
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

        // Ensure models are registered
        // Mongoose sometimes loses track of models in Hot Reload or Serverless environments
        // Importing them at the top usually helps, but sometimes we need to reference them
        const _m1 = Service;
        const _m2 = User;

        let query = {};
        const role = (session.user as any).role;

        if (role === 'citizen') {
            query = { userId: (session.user as any).id };
        }

        const applications = await Application.find(query)
            .populate('serviceId', 'name')
            .populate('userId', 'name email')
            .sort({ createdAt: -1 });

        return NextResponse.json({ applications }, { status: 200 });
    } catch (error: any) {
        console.error('GET Application Error:', error);
        return NextResponse.json(
            { message: 'Error fetching applications', error: error.message },
            { status: 500 }
        );
    }
}
