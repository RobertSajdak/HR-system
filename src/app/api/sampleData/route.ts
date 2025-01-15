import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        workHours: {
            "2024-12-01": 0,
            "2024-12-02": 0,
            "2024-12-03": 0,
            "2024-12-04": 0,
            "2024-12-05": 0,
            "2024-12-06": 0,
            "2024-12-07": 0,
        },
    });
}
