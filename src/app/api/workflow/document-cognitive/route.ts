import { NextResponse } from 'next/server';
import { z } from 'zod';
import { documentCognitiveService } from '@/services/documentCognitiveService';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const documentSchema = z.object({
  documentName: z.string().min(1, 'Nome do documento é obrigatório'),
  contentSnippet: z.string().min(3, 'Conteúdo ou texto descritivo muito curto'),
  documentType: z.string().min(1, 'Tipo de documento obrigatório'),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validation = documentSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Dados de documento inválidos', details: validation.error.format() },
        { status: 400 }
      );
    }

    const { documentName, contentSnippet, documentType } = validation.data;

    const analysisResult = await documentCognitiveService.analyzeDocument({
      name: documentName,
      contentSnippet,
      type: documentType,
    });

    return NextResponse.json({
      success: true,
      message: 'Processamento cognitivo concluído com sucesso!',
      data: analysisResult,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('[Cognitive Document API Error]:', error);
    return NextResponse.json(
      { error: error.message || 'Erro interno no processamento cognitivo.' },
      { status: 500 }
    );
  }
}