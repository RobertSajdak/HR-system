import { NextResponse } from 'next/server';

// Prosty obiekt symulujący bazę danych dla notatek
// W środowisku produkcyjnym należy użyć prawdziwej bazy danych!
const notesData: Record<string, string> = {};

// Obsługa zapisu i aktualizacji notatek
export async function PUT(req: Request) {
	try {
		const { date, note } = await req.json();

		if (!date || typeof note !== 'string') {
			return NextResponse.json(
				{ error: "Invalid data. 'date' and 'note' are required." },
				{ status: 400 }
			);
		}

		// Aktualizacja danych
		notesData[date] = note;

		return NextResponse.json(
			{ status: 'success', message: 'Note data updated successfully.' },
			{ status: 200 }
		);
	} catch (error) {
		console.error('Error handling PUT request for notes:', error);
		return NextResponse.json({ error: 'Failed to update note data.' }, { status: 500 });
	}
}

// Obsługa pobierania notatek
export async function GET() {
	try {
		return NextResponse.json(notesData, { status: 200 });
	} catch (error) {
		console.error('Error handling GET request for notes:', error);
		return NextResponse.json({ error: 'Failed to retrieve note data.' }, { status: 500 });
	}
}
