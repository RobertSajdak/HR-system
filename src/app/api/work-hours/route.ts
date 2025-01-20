import { NextResponse } from 'next/server';

let workHoursData = [{ id: 1, employee: 'Jan Kowalski', hours: 8, date: '2025-01-18' }];

export async function GET() {
	return NextResponse.json(workHoursData);
}

export async function POST(request: Request) {
	const newEntry = await request.json();
	workHoursData.push({ id: Date.now(), ...newEntry });
	return NextResponse.json({ success: true, data: newEntry });
}

export async function PUT(request: Request) {
	const updatedEntry = await request.json();
	workHoursData = workHoursData.map(entry =>
		entry.id === updatedEntry.id ? updatedEntry : entry
	);
	return NextResponse.json({ success: true });
}

export async function DELETE(request: Request) {
	const { id } = await request.json();
	workHoursData = workHoursData.filter(entry => entry.id !== id);
	return NextResponse.json({ success: true });
}
