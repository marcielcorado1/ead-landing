export default function PrivacidadePage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 py-20">
        <a href="/" className="text-green-600 text-sm font-semibold hover:underline mb-8 inline-block">← Voltar</a>
        <h1 className="text-3xl font-black text-slate-900 mb-2">Política de Privacidade</h1>
        <p className="text-sm text-slate-400 mb-10">Última atualização: julho de 2026</p>

        <div className="space-y-8 text-slate-600 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-slate-800 mb-3">1. Quem somos</h2>
            <p>
              A <strong>Kem Soluções</strong> é responsável pelo FinControl e pelos produtos desenvolvidos sob a marca NexCore.
              Esta política descreve como coletamos, usamos e protegemos seus dados.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-800 mb-3">2. Dados coletados</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Nome e e-mail (cadastro e acesso)</li>
              <li>Dados financeiros inseridos pelo próprio usuário na plataforma</li>
              <li>Dados de uso e navegação (cookies técnicos)</li>
              <li>Número de WhatsApp (para envio de credenciais de acesso, quando aplicável)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-800 mb-3">3. Finalidade</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Prestação do serviço contratado</li>
              <li>Envio de credenciais e comunicações de conta</li>
              <li>Melhorias de produto e suporte técnico</li>
              <li>Cobrança e controle de assinatura</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-800 mb-3">4. Compartilhamento</h2>
            <p>
              Não vendemos seus dados. Compartilhamos apenas com provedores essenciais ao serviço:
              plataforma de pagamentos (Kiwify / Asaas), infraestrutura de banco de dados (Supabase)
              e serviços de comunicação (WhatsApp via Evolution API). Todos operam em conformidade com a LGPD.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-800 mb-3">5. Retenção</h2>
            <p>
              Dados de conta são retidos enquanto a assinatura estiver ativa e por até 90 dias após o cancelamento.
              Dados financeiros inseridos pelo usuário podem ser exportados e excluídos mediante solicitação.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-800 mb-3">6. Seus direitos (LGPD)</h2>
            <p>
              Você pode solicitar: acesso, correção, portabilidade, exclusão ou revogação de consentimento dos seus dados.
              Entre em contato via <a href="mailto:vivanetelecom@gmail.com" className="text-green-600 hover:underline">vivanetelecom@gmail.com</a>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-800 mb-3">7. Segurança</h2>
            <p>
              Utilizamos Row Level Security (RLS) no banco de dados, HTTPS em todas as comunicações
              e nunca armazenamos senhas em texto puro. Credenciais são entregues via link seguro de redefinição.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-800 mb-3">8. Contato</h2>
            <p>
              Dúvidas sobre privacidade: <a href="mailto:vivanetelecom@gmail.com" className="text-green-600 hover:underline">vivanetelecom@gmail.com</a>
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
