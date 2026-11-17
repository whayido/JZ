import { NextResponse } from 'next/server';
import { pool } from 'app/lib/db.ts';

export async function GET() {
  try {
    const [rows] = await pool.execute('SELECT 1 AS ok');
    return NextResponse.json({ 
      success: true, 
      message: 'Подключение к базе данных успешно',
      data: rows 
    });
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      message: 'Ошибка подключения к базе данных',
      error: error.message 
    }, { status: 500 });
  }
}