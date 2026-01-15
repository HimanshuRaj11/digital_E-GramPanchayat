import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Service from '@/models/Service';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        await dbConnect();
        const service = await Service.findById(params.id);
        if (!service) {
            return NextResponse.json(
                { message: 'Service not found' },
                { status: 404 }
            );
        }
        return NextResponse.json({ service }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { message: 'Error fetching service', error: error.message },
            { status: 500 }
        );
    }
}

export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);

        if (
            !session ||
            (session.user as any).role === 'citizen' ||
            !(session.user as any).role
        ) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const updates = await req.json();
        await dbConnect();

        const service = await Service.findByIdAndUpdate(params.id, updates, {
            new: true,
        });

        if (!service) {
            return NextResponse.json(
                { message: 'Service not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: 'Service updated', service },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { message: 'Error updating service', error: error.message },
            { status: 500 }
        );
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);

        if (
            !session ||
            (session.user as any).role === 'citizen' ||
            !(session.user as any).role
        ) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();
        const service = await Service.findByIdAndDelete(params.id);

        if (!service) {
            return NextResponse.json(
                { message: 'Service not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: 'Service deleted' }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { message: 'Error deleting service', error: error.message },
            { status: 500 }
        );
    }
}
