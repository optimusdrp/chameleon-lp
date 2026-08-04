import { NextResponse } from 'next/server';
import { z } from 'zod';
import { whatsAppService } from '@/services/whatsappService';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const leadSchema = z.object({
  name: z.string().min(2, 'Nome do lead muito curto'),
  email: z.string().email('E-mail corporativo inválido'),
  company: z.string().min(1, 'Nome da empresa é obrigatório'),
  projectType: z.string().min(1, 'Tipo de projeto obrigatório'),
  phone: z.string().min(10, 'Número de telefone inválido'),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validation = leadSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Dados de validação incorretos', details: validation.error.format() },
        { status: 400 }
      );
    }

    const { name, email, company, projectType, phone } = validation.data;

    await whatsAppService.sendLeadNotification(phone, name, company, projectType);

    return NextResponse.json({
      success: true,
      message: 'Lead processado e notificação enviada no WhatsApp com sucesso!',
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('[Workflow API Error]:', error);
    return NextResponse.json(
      { error: error.message || 'Erro interno ao processar automação de WhatsApp.' },
      { status: 500 }
    );
  }
}