import { NextRequest, NextResponse } from 'next/server';
import { createDirectus, rest, createItem } from '@directus/sdk';
import type { DirectusSchema } from '@/types/directus';

const directus = createDirectus<DirectusSchema>(process.env.NEXT_PUBLIC_DIRECTUS_URL!)
  .with(rest());

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      name, 
      company, 
      email, 
      phone, 
      event_type, 
      event_date, 
      guests_number, 
      notes 
    } = body;

    // Validation
    if (!name || !company || !email || !event_type) {
      return NextResponse.json(
        { error: 'Nome, azienda, email e tipo di evento sono obbligatori' },
        { status: 400 }
      );
    }

    // Create submission in Directus
    await directus.request(
      createItem('business_quote_submissions', {
        name,
        company,
        email,
        phone: phone || null,
        event_type,
        event_date: event_date || null,
        guests_number: guests_number || null,
        notes: notes || null,
        status: 'new'
      })
    );

    return NextResponse.json(
      { success: true, message: 'Richiesta inviata con successo' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error creating business quote submission:', error);
    return NextResponse.json(
      { error: 'Errore nell\'invio della richiesta' },
      { status: 500 }
    );
  }
}
