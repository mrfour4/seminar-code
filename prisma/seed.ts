import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    await prisma.todo.createMany({
        data: [
            { text: "Build UI for dashboard" },
            { text: "Fix bug in login page" },
            { text: "Write unit tests for task module" },
        ],
    });

    console.log("✅ Seed data inserted");
}

main()
    .catch((e) => {
        console.error("❌ Seed failed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
