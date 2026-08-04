import { Client, LocalAuth } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';
import path from 'path';
import fs from 'fs';

class WhatsAppService {
  private client: Client | null = null;
  private isReady: boolean = false;
  private isInitializing: boolean = false;
  private pendingMessage: { phone: string; message: string; resolve: Function; reject: Function } | null = null;

  constructor() {
    this.createClient();
  }

  private createClient() {
    this.client = new Client({
      authStrategy: new LocalAuth({ clientId: 'optimus-lead-automation' }),
      puppeteer: {
        executablePath: this.getChromeExecutablePath(),
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--disable-gpu',
          '--disable-crash-reporter',
          '--disable-extensions',
        ],
        headless: true,
      },
    });

    this.setupListeners();
  }

  private getChromeExecutablePath(): string | undefined {
    const possiblePaths = [
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
      process.env.LOCALAPPDATA ? path.join(process.env.LOCALAPPDATA, 'Google\\Chrome\\Application\\chrome.exe') : '',
    ];

    for (const p of possiblePaths) {
      if (p && fs.existsSync(p)) {
        return p;
      }
    }
    return undefined;
  }

  private setupListeners() {
    if (!this.client) return;

    this.client.on('qr', (qr) => {
      console.log('\n==================================================');
      console.log('[Optimus Automação] ESCANEIE O QR CODE ABAIXO NO SEU CELULAR:');
      console.log('==================================================\n');
      try {
        qrcode.generate(qr, { small: true });
      } catch (error) {
        console.error('Erro ao gerar QR Code no terminal:', error);
      }
    });

    this.client.on('ready', async () => {
      this.isReady = true;
      this.isInitializing = false;
      console.log('[Optimus Automação] Cliente WhatsApp conectado e operacional!');

      if (this.pendingMessage) {
        try {
          const { phone, message, resolve } = this.pendingMessage;
          
          // Tratativa defensiva contra o erro de LID: cria/busca o contato antes de enviar
          let chatId = phone;
          try {
            const contactId = await this.client!.getNumberId(phone);
            if (contactId && contactId._serialized) {
              chatId = contactId._serialized;
            }
          } catch (e) {
            console.warn('[Optimus Automação] Não foi possível mapear o número via getNumberId, usando formato padrão.');
          }

          const response = await this.client!.sendMessage(chatId, message);
          this.pendingMessage = null;
          resolve(response);
        } catch (error) {
          if (this.pendingMessage) {
            this.pendingMessage.reject(error);
            this.pendingMessage = null;
          }
        }
      }
    });

    this.client.on('auth_failure', (msg) => {
      console.error('[Optimus Automação] Falha na autenticação da sessão:', msg);
      this.isReady = false;
      this.isInitializing = false;
      if (this.pendingMessage) {
        this.pendingMessage.reject(new Error('Falha na autenticação do WhatsApp.'));
        this.pendingMessage = null;
      }
    });

    this.client.on('disconnected', async (reason) => {
      console.warn('[Optimus Automação] Sessão encerrada/desconectada:', reason);
      this.isReady = false;
      this.isInitializing = false;
      try {
        await this.client?.destroy();
      } catch (e) {
        // Ignora erros ao destruir instância travada
      }
      this.client = null;
      setTimeout(() => this.createClient(), 1000);
    });
  }

  public async initializeClient() {
    if (this.isReady || this.isInitializing) return;
    this.isInitializing = true;
    try {
      if (!this.client) {
        this.createClient();
      }
      await this.client?.initialize();
    } catch (error) {
      console.error('[Optimus Automação] Erro ao inicializar cliente:', error);
      this.isInitializing = false;
    }
  }

  public async sendLeadNotification(phone: string, leadName: string, company: string, projectType: string) {
    const cleanPhone = phone.replace(/\D/g, '');
    const formattedPhone = cleanPhone.includes('@c.us') ? cleanPhone : `${cleanPhone}@c.us`;

    const message = `🚀 *Novo Lead Capturado - Optimus DRP*\n\n` +
      `👤 *Nome:* ${leadName}\n` +
      `🏢 *Empresa:* ${company}\n` +
      `💡 *Projeto:* ${projectType}\n\n` +
      `_Fluxo de automação disparado com sucesso via Workflow Builder._`;

    if (!this.isReady) {
      if (!this.isInitializing) {
        this.initializeClient();
      }

      console.log('[Optimus Automação] Aguardando autenticação do usuário no QR Code...');

      return new Promise((resolve, reject) => {
        this.pendingMessage = { phone: formattedPhone, message, resolve, reject };

        let attempts = 0;
        const interval = setInterval(async () => {
          attempts++;
          if (this.isReady) {
            clearInterval(interval);
          } else if (attempts >= 45) {
            clearInterval(interval);
            if (this.pendingMessage) {
              this.pendingMessage = null;
              reject(new Error('Tempo limite esgotado. Escaneie o QR Code no terminal e tente disparar novamente.'));
            }
          }
        }, 2000);
      });
    }

    // Tratativa defensiva para o envio imediato caso já esteja conectado
    let chatId = formattedPhone;
    try {
      const contactId = await this.client!.getNumberId(formattedPhone);
      if (contactId && contactId._serialized) {
        chatId = contactId._serialized;
      }
    } catch (e) {
      console.warn('[Optimus Automação] Aviso ao resolver ID do contato:', e);
    }

    const response = await this.client!.sendMessage(chatId, message);
    return response;
  }
}

export const whatsAppService = new WhatsAppService();