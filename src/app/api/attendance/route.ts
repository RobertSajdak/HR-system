import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { workHours } = await req.json();

    // Symulacja zapisu danych (np. do bazy danych)
    console.log("Zapisane godziny pracy:", workHours);

    // Odpowiedź potwierdzająca zapis
    return NextResponse.json({ message: "Data saved successfully" }, { status: 200 });
}
