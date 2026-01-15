import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Service from '@/models/Service';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(req: Request) {
    try {
        await dbConnect();
        const services = await Service.find({ isActive: true });
        return NextResponse.json({ services }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { message: 'Error fetching services', error: error.message },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (
            !session ||
            (session.user as any).role === 'citizen' ||
            !(session.user as any).role
        ) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const {
            name,
            description,
            category,
            requiredDocuments,
            fees,
            processingTime,
        } = await req.json();

        if (!name || !description || !category) {
            return NextResponse.json(
                { message: 'Missing required fields' },
                { status: 400 }
            );
        }

        await dbConnect();

        const newService = await Service.create({
            name,
            description,
            category,
            requiredDocuments,
            fees,
            processingTime,
        });

        return NextResponse.json(
            { message: 'Service created', service: newService },
            { status: 201 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { message: 'Error creating service', error: error.message },
            { status: 500 }
        );
    }
}
