import { NextResponse } from 'next/server';
import { z } from 'zod';
import { telegramService } from '@/services/telegramService';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const leadSchema = z.object({
  name: z.string().min(2, 'Nome muito curto'),
  email: z.string().email('E-mail inválido'),
  company: z.string().min(1, 'Empresa obrigatória'),
  projectType: z.string().min(1, 'Tipo de projeto obrigatório'),
  phone: z.string().min(8, 'Telefone inválido'),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validation = leadSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: validation.error.format() },
        { status: 400 }
      );
    }

    const { name, email, company, projectType, phone } = validation.data;

    // Dispara a notificação administrativa interna para a equipe
    await telegramService.sendLeadNotification(name, email, company, projectType, phone);

    const botUsername = 'Optimus_test_bot';
    
    // Geramos um link limpo e direto para o bot do Telegram
    const directTelegramLink = `https://t.me/${botUsername}`;

    return NextResponse.json({
      success: true,
      message: 'Notificação enviada para a equipe e link gerado com sucesso!',
      telegramLink: directTelegramLink,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('[Workflow Telegram API Error]:', error);
    return NextResponse.json(
      { error: error.message || 'Erro interno ao processar o Telegram.' },
      { status: 500 }
    );
  }
}