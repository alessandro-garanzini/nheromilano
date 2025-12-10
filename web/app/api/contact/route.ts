import { NextRequest, NextResponse } from 'next/server';
import { createDirectus, rest, createItem } from '@directus/sdk';
import type { DirectusSchema } from '@/types/directus';

const directus = createDirectus<DirectusSchema>(process.env.NEXT_PUBLIC_DIRECTUS_URL!)
  .with(rest());

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Nome, email e messaggio sono obbligatori' },
        { status: 400 }
      );
    }

    // Create submission in Directus
    await directus.request(
      createItem('contact_submissions', {
        name,
        email,
        phone: phone || null,
        message,
        status: 'new'
      })
    );

    return NextResponse.json(
      { success: true, message: 'Messaggio inviato con successo' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error creating contact submission:', error);
    return NextResponse.json(
      { error: 'Errore nell\'invio del messaggio' },
      { status: 500 }
    );
  }
}
