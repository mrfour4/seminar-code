import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    await prisma.task.createMany({
        data: [
            { title: "Build UI for dashboard" },
            { title: "Fix bug in login page" },
            { title: "Write unit tests for task module" },
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
