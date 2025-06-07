import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function TestPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold">Test Page Remove</h1>
            <p className="my-4">This is a test page.</p>
            <Button asChild>
                <Link href="/">Go to Home</Link>
            </Button>
        </div>
    );
}
