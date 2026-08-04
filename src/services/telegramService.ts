import axios from 'axios';

class TelegramService {
  public async sendLeadNotification(name: string, email: string, company: string, projectType: string, phone: string) {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    let chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token) {
      throw new Error('A variável TELEGRAM_BOT_TOKEN não está configurada no arquivo .env.');
    }

    // Mensagem interna enviada para o administrador/equipe
    const message = `🚀 *Novo Lead Capturado - Optimus DRP*\n\n` +
      `👤 *Nome:* ${name}\n` +
      `📧 *E-mail:* ${email}\n` +
      `🏢 *Empresa:* ${company}\n` +
      `📱 *Telefone do Lead:* ${phone}\n` +
      `💡 *Projeto:* ${projectType}\n\n` +
      `_Pipeline executado via Workflow Builder._`;

    if (!chatId || chatId.length < 5) {
      try {
        const updatesResponse = await axios.get(`https://api.telegram.org/bot${token}/getUpdates`);
        const results = updatesResponse.data?.result || [];
        if (results.length > 0) {
          const lastInteraction = results[results.length - 1];
          chatId = lastInteraction.message?.chat?.id?.toString() || 
                   lastInteraction.edited_message?.chat?.id?.toString();
        }
      } catch (err) {
        console.warn('Falha ao tentar autodetectar o chat ID.');
      }
    }

    if (!chatId) {
      throw new Error('Chat ID administrativo não configurado. Envie uma mensagem para o bot no Telegram.');
    }

    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    try {
      const response = await axios.post(url, {
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
      });

      return response.data;
    } catch (error: any) {
      const description = error.response?.data?.description || error.message;
      throw new Error(description);
    }
  }
}

export const telegramService = new TelegramService();