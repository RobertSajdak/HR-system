import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        workHours: {
            "2024-12-01": 8,
            "2024-12-02": 6,
            "2024-12-03": 0,
        },
    });
}
