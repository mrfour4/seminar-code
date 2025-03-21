import { db } from "@/lib/prisma";

export default async function HomePage() {
    const data = await db.task.findMany();
    return (
        <div>
            <h1 className="text-4xl font-bold">Tasks</h1>
            <ul className="list-disc pl-8">
                {data.map((task) => (
                    <li key={task.id}>{task.title}</li>
                ))}
            </ul>
        </div>
    );
}
