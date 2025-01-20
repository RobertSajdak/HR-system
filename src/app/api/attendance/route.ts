import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { workHours } = await req.json();
        console.log("Received data:", workHours);
        // Można dodać logikę zapisu danych (np. symulacja zapisu)
        return NextResponse.json({ status: "success" }, { status: 200 });
    } catch {
        // Błąd nie jest używany, więc po prostu ignoruję go.
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
}
