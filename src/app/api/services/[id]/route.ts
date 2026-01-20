import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Service from '@/models/Service';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await dbConnect();
        const service = await Service.findById(id);
        if (!service) {
            return NextResponse.json(
                { message: 'Service not found' },
                { status: 404 }
            );
        }
        return NextResponse.json(service, { status: 200 }); // Return direct object
    } catch (error: any) {
        console.error('GET Service Error:', error);
        return NextResponse.json(
            { message: 'Error fetching service', error: error.message },
            { status: 500 }
        );
    }
}

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
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

        const service = await Service.findByIdAndUpdate(id, updates, {
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
        console.error('PUT Service Error:', error);
        return NextResponse.json(
            { message: 'Error updating service', error: error.message },
            { status: 500 }
        );
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const session = await getServerSession(authOptions);

        if (
            !session ||
            (session.user as any).role === 'citizen' ||
            !(session.user as any).role
        ) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();
        const service = await Service.findByIdAndDelete(id);

        if (!service) {
            return NextResponse.json(
                { message: 'Service not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: 'Service deleted' }, { status: 200 });
    } catch (error: any) {
        console.error('DELETE Service Error:', error);
        return NextResponse.json(
            { message: 'Error deleting service', error: error.message },
            { status: 500 }
        );
    }
}
