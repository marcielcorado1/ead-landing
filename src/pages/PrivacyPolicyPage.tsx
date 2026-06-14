import type { ReactNode } from 'react'

export default function PrivacyPolicyPage() {
  const updated = '12 de junho de 2025'
  const company = 'Kem Soluções Ltda'
  const email = 'vivanetelecom@gmail.com'
  const site = 'https://ead.kemsolucoes.com.br'

  return (
    <div style={{ backgroundColor: '#0a0f1e', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Header */}
      <header style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <a href="/" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>← Voltar</a>
        <span style={{ color: '#334155' }}>|</span>
        <span style={{ color: '#64748b', fontSize: '14px' }}>Kem Soluções</span>
      </header>

      {/* Content */}
      <main style={{ maxWidth: '760px', margin: '0 auto', padding: '48px 24px 80px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#f1f5f9', marginBottom: '8px' }}>
          Política de Privacidade
        </h1>
        <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '40px' }}>
          Última atualização: {updated}
        </p>

        <Section title="1. Quem somos">
          <p>
            Esta Política de Privacidade se aplica aos serviços oferecidos por <strong>{company}</strong>,
            incluindo o site <a href={site} style={{ color: '#818cf8' }}>{site}</a> e suas plataformas associadas
            (coletivamente, "Serviços"). Ao usar nossos Serviços, você concorda com a coleta e uso de
            informações conforme descrito nesta política.
          </p>
          <p>
            Para contato: <a href={`mailto:${email}`} style={{ color: '#818cf8' }}>{email}</a>
          </p>
        </Section>

        <Section title="2. Informações que coletamos">
          <p>Coletamos informações das seguintes formas:</p>
          <ul>
            <li><strong>Informações fornecidas por você:</strong> nome, endereço de e-mail e outros dados que você fornece ao se cadastrar, preencher formulários ou entrar em contato conosco.</li>
            <li><strong>Informações de uso:</strong> páginas visitadas, tempo de permanência, cliques e interações com nosso conteúdo, coletadas por meio de cookies e tecnologias similares.</li>
            <li><strong>Informações de dispositivo:</strong> tipo de dispositivo, sistema operacional, navegador, endereço IP e identificadores únicos de dispositivo.</li>
            <li><strong>Informações de redes sociais:</strong> quando você conecta uma conta de rede social (como Instagram ou Facebook) aos nossos Serviços, coletamos as informações que você autoriza expressamente, como identificador de conta, nome de usuário e métricas de desempenho da conta.</li>
          </ul>
        </Section>

        <Section title="3. Como usamos suas informações">
          <p>Utilizamos as informações coletadas para:</p>
          <ul>
            <li>Fornecer, operar e melhorar nossos Serviços;</li>
            <li>Personalizar sua experiência e oferecer conteúdo relevante;</li>
            <li>Enviar comunicações sobre atualizações, novidades e ofertas (você pode cancelar a qualquer momento);</li>
            <li>Responder a solicitações de suporte e atendimento ao cliente;</li>
            <li>Analisar o uso dos Serviços para fins estatísticos e de melhoria contínua;</li>
            <li>Cumprir obrigações legais e regulatórias;</li>
            <li>Detectar e prevenir fraudes ou atividades não autorizadas.</li>
          </ul>
        </Section>

        <Section title="4. Integração com a Meta (Facebook e Instagram)">
          <p>
            Nossos Serviços podem se integrar com a plataforma da Meta Platforms Inc. (Facebook e Instagram).
            Quando você conecta sua conta da Meta, podemos acessar as seguintes informações, <strong>somente com sua
            autorização expressa</strong>:
          </p>
          <ul>
            <li>Informações básicas do perfil do Instagram (nome de usuário, ID da conta);</li>
            <li>Métricas e insights de desempenho de publicações e da conta;</li>
            <li>Lista de Páginas do Facebook que você gerencia;</li>
            <li>Métricas de engajamento de Páginas.</li>
          </ul>
          <p>
            Essas informações são usadas exclusivamente para exibir análises dentro da nossa plataforma.
            Não vendemos, compartilhamos nem usamos esses dados para fins publicitários de terceiros.
            Você pode revogar o acesso a qualquer momento pelas configurações da sua conta Meta em{' '}
            <a href="https://www.facebook.com/settings?tab=applications" style={{ color: '#818cf8' }} target="_blank" rel="noopener noreferrer">
              facebook.com/settings
            </a>.
          </p>
        </Section>

        <Section title="5. Compartilhamento de informações">
          <p>
            Não vendemos suas informações pessoais. Podemos compartilhar informações apenas nas seguintes situações:
          </p>
          <ul>
            <li><strong>Prestadores de serviço:</strong> empresas que nos auxiliam na operação dos Serviços (hospedagem, análise, e-mail) e que estão contratualmente obrigadas a proteger suas informações;</li>
            <li><strong>Requisito legal:</strong> quando exigido por lei, ordem judicial ou autoridade governamental competente;</li>
            <li><strong>Proteção de direitos:</strong> quando necessário para proteger direitos, propriedade ou segurança nossa, de nossos usuários ou de terceiros;</li>
            <li><strong>Com seu consentimento:</strong> em qualquer outra situação, somente com sua autorização prévia e expressa.</li>
          </ul>
        </Section>

        <Section title="6. Cookies e tecnologias de rastreamento">
          <p>
            Usamos cookies e tecnologias similares para melhorar sua experiência. Você pode configurar seu
            navegador para recusar cookies, mas isso pode afetar o funcionamento de algumas funcionalidades.
          </p>
          <ul>
            <li><strong>Cookies essenciais:</strong> necessários para o funcionamento básico do site;</li>
            <li><strong>Cookies analíticos:</strong> nos ajudam a entender como o site é usado;</li>
            <li><strong>Cookies de preferência:</strong> lembram suas configurações e preferências.</li>
          </ul>
        </Section>

        <Section title="7. Retenção de dados">
          <p>
            Mantemos suas informações pelo tempo necessário para fornecer os Serviços e cumprir nossas
            obrigações legais. Dados de contas inativas são excluídos após 24 meses. Dados de análise
            anonimizados podem ser retidos por mais tempo para fins estatísticos.
          </p>
        </Section>

        <Section title="8. Seus direitos (LGPD)">
          <p>
            Nos termos da Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você tem direito a:
          </p>
          <ul>
            <li>Confirmar a existência de tratamento de seus dados pessoais;</li>
            <li>Acessar seus dados pessoais;</li>
            <li>Corrigir dados incompletos, inexatos ou desatualizados;</li>
            <li>Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários;</li>
            <li>Solicitar a portabilidade dos dados;</li>
            <li>Revogar o consentimento a qualquer momento;</li>
            <li>Opor-se ao tratamento de dados.</li>
          </ul>
          <p>
            Para exercer qualquer desses direitos, entre em contato pelo e-mail{' '}
            <a href={`mailto:${email}`} style={{ color: '#818cf8' }}>{email}</a>.
            Respondemos a solicitações em até 15 dias úteis.
          </p>
        </Section>

        <Section title="9. Segurança">
          <p>
            Adotamos medidas técnicas e organizacionais adequadas para proteger suas informações contra
            acesso não autorizado, perda ou divulgação. No entanto, nenhum sistema é 100% seguro.
            Em caso de incidente de segurança que afete seus dados, notificaremos você conforme exigido
            pela legislação aplicável.
          </p>
        </Section>

        <Section title="10. Links para terceiros">
          <p>
            Nossos Serviços podem conter links para sites de terceiros. Esta política não se aplica a
            esses sites. Recomendamos que você leia as políticas de privacidade de cada site que visitar.
          </p>
        </Section>

        <Section title="11. Alterações nesta política">
          <p>
            Podemos atualizar esta política periodicamente. Quando fizermos alterações relevantes,
            notificaremos você por e-mail ou por um aviso em destaque nos nossos Serviços. O uso
            continuado dos Serviços após a notificação constitui aceitação da política revisada.
          </p>
        </Section>

        <Section title="12. Contato">
          <p>
            Para dúvidas, solicitações ou reclamações relacionadas a esta Política de Privacidade:
          </p>
          <div style={{ background: 'rgba(129,140,248,0.08)', border: '1px solid rgba(129,140,248,0.2)', borderRadius: '12px', padding: '20px', marginTop: '12px' }}>
            <p style={{ margin: 0 }}><strong>{company}</strong></p>
            <p style={{ margin: '4px 0 0' }}>
              E-mail: <a href={`mailto:${email}`} style={{ color: '#818cf8' }}>{email}</a>
            </p>
            <p style={{ margin: '4px 0 0' }}>
              Site: <a href={site} style={{ color: '#818cf8' }}>{site}</a>
            </p>
          </div>
        </Section>

        <p style={{ marginTop: '48px', color: '#475569', fontSize: '13px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '24px' }}>
          © {new Date().getFullYear()} {company}. Todos os direitos reservados.
        </p>
      </main>
    </div>
  )
}

// ── Helper ────────────────────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section style={{ marginBottom: '36px' }}>
      <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#c7d2fe', marginBottom: '12px', paddingBottom: '8px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        {title}
      </h2>
      <div style={{ color: '#94a3b8', lineHeight: '1.75', fontSize: '15px' }}>
        {children}
      </div>
    </section>
  )
}
