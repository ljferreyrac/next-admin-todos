import { getUserSessionServer } from '@/auth/actions/auth-actions';
import prisma from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'
import * as yup from 'yup';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const take = Number(searchParams.get('take') ?? '10');
    const skip = Number(searchParams.get('skip') ?? '0');
    if( isNaN(take) ) return NextResponse.json({ message: 'Take must be a number' }, {status: 400})
    if( isNaN(skip) ) return NextResponse.json({ message: 'Skip must be a number' }, {status: 400})
    const todos = await prisma.todo.findMany({take,skip});

    return NextResponse.json(todos);
}

const postSchema = yup.object({
    description: yup.string().required(),
    complete: yup.boolean().optional().default(false)
})

export async function POST(request: NextRequest) {
    
    const user = await getUserSessionServer();

    if( !user ) {
        return NextResponse.json('Unauthorized', {status: 401});
    }
    
    try {
        const { description, complete } = await postSchema.validate(await request.json());
        const todo = await prisma.todo.create({data: { description, complete, userId: user.id }})
        return NextResponse.json(todo);
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) { 
    const user = await getUserSessionServer();

    if( !user ) {
        return NextResponse.json('Unauthorized', {status: 401});
    }

    try {
        const deletedTodos = await prisma.todo.deleteMany({
            where: {
                complete: true,
                userId: user.id
            }
        })
        return NextResponse.json(deletedTodos);
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}