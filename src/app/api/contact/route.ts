import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, company, projectType } = body;

    const data = await resend.emails.send({
      from: 'Optimus DRP <onboarding@resend.dev>', // No plano gratuito, use o domínio padrão do Resend
      to: ['optimusdrp@gmail.com'], // Seu e-mail onde deseja receber os leads
      subject: `Novo Contato via Site: ${name} (${company})`,
      html: `
        <h2>Novo Lead Capturado</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>E-mail:</strong> ${email}</p>
        <p><strong>Empresa:</strong> ${company}</p>
        <p><strong>Tipo de Projeto:</strong> ${projectType}</p>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    return NextResponse.json({ error: 'Erro interno ao enviar e-mail.' }, { status: 500 });
  }
}