export const dynamic = 'force-dynamic'
export const revalidate = 0

import prisma from "@/lib/prisma";
import { NewTodo, TodoGrid } from "@/todos";

export default async function ServerTodosPage() {

    const todos = await prisma.todo.findMany({
        orderBy: { description: 'asc' }
    })

    return (
        <>
            <span className="text-3xl">Server Actions</span>
            <div className="w-full px-3 mx-5 mb-5">
                <NewTodo />
            </div>
            <TodoGrid todos={todos} />
        </>
    );
}