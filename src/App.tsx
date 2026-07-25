import './App.css'
import {
  Bot, Code2, Database, Globe, CheckCircle2,
  ArrowRight, Zap, Shield, TrendingUp, BookOpen,
  Terminal, ChevronDown, Star, Clock, DollarSign,
  Play, Wifi, Briefcase, GraduationCap,
  Building2, Cpu, Layers, Settings, BellRing,
  Sparkles, Server, Lock, Package, Users,
  BarChart3, MessageSquare, HardDrive, Monitor,
  ChevronRight,
} from 'lucide-react'
import { useState } from 'react'

// ── Data ─────────────────────────────────────────────────────────────────────

const PERSONAS = [
  {
    icon: <Briefcase className="w-6 h-6 text-teal-400" />,
    type: 'Empreendedor',
    headline: 'Seu negócio no piloto automático',
    desc: 'Instale o KemOS na sua VPS, conecte seus processos e deixe o sistema de IA cuidar do operacional enquanto você foca no crescimento.',
    bullets: ['Briefing matinal automático', 'Cobrança e follow-up sem você', 'Relatórios prontos todo dia'],
    color: 'border-teal-500/30 bg-teal-500/5',
    accent: 'text-teal-400',
  },
  {
    icon: <Code2 className="w-6 h-6 text-purple-400" />,
    type: 'Dev / Freelancer',
    headline: 'Cobre R$2.500 por setup',
    desc: 'Aprenda a instalar, configure para um cliente, entregue em 2 dias. Produto pronto, margem alta, suporte mensal recorrente.',
    bullets: ['Setup em 2 dias úteis', 'R$2.000–3.500 por cliente', 'Suporte mensal: +R$500/mês'],
    color: 'border-purple-500/30 bg-purple-500/5',
    accent: 'text-purple-400',
  },
  {
    icon: <Building2 className="w-6 h-6 text-orange-400" />,
    type: 'Agência de IA',
    headline: 'Escale com white-label',
    desc: 'Crie sua própria marca sobre o sistema, venda para clientes com domínio deles, gerencie via painel central. A Kem Soluções fez exatamente isso.',
    bullets: ['Sua marca, sua precificação', 'Domínio próprio por cliente', 'Painel de gestão centralizado'],
    color: 'border-orange-500/30 bg-orange-500/5',
    accent: 'text-orange-400',
  },
]

const AULAS = [
  {
    num: 'CC',
    title: 'Seu ambiente de IA pronto',
    desc: 'Instale e configure a CLI de IA que comanda toda a infraestrutura. Primeiro comando à VPS ainda nesta aula.',
    tags: ['IA', 'CLI', 'Autenticação'],
    icon: <Terminal className="w-5 h-5 text-teal-400" />,
  },
  {
    num: '0',
    title: 'Workspace e .env único',
    desc: 'Configure seu ambiente de desenvolvimento central. A cada aula você adiciona uma credencial ao mesmo arquivo — e a IA age com ela.',
    tags: ['IDE', '.env_local', 'SSH'],
    icon: <Settings className="w-5 h-5 text-teal-400" />,
  },
  {
    num: '1',
    title: 'VPS 100% gratuita',
    desc: 'A IA cria usuário, configura SSH e abre portas. Você só copia o IP. Infraestrutura de R$0/mês para sempre.',
    tags: ['VPS', 'SSH', 'Free Tier'],
    icon: <Server className="w-5 h-5 text-blue-400" />,
  },
  {
    num: '2',
    title: 'Domínio + SSL automático',
    desc: 'Configure os registros DNS dos subdomínios. A IA valida propagação e configura SSL automático via Coolify.',
    tags: ['DNS', 'SSL', 'Subdomínios'],
    icon: <Globe className="w-5 h-5 text-emerald-400" />,
  },
  {
    num: '3',
    title: 'Docker — sem precisar saber Docker',
    desc: 'A IA instala e configura via SSH. Você valida com um hello-world. Nenhum comando Docker para decorar.',
    tags: ['Docker', 'SSH', 'Containers'],
    icon: <Package className="w-5 h-5 text-blue-400" />,
  },
  {
    num: '4',
    title: 'Painel de deploy visual',
    desc: 'Instale o Coolify — painel web para gerenciar todos os seus serviços com UI, logs e SSL automático.',
    tags: ['Coolify', 'Deploy', 'UI'],
    icon: <Monitor className="w-5 h-5 text-purple-400" />,
  },
  {
    num: '5',
    title: 'Deploy do KemOS — sistema completo',
    desc: 'A IA usa a API do Coolify para fazer o deploy do KemOS inteiro na sua VPS — todos os agentes, automações e o dashboard em um único comando.',
    tags: ['KemOS', 'Deploy', 'API'],
    icon: <Bot className="w-5 h-5 text-teal-400" />,
  },
  {
    num: '5.1',
    title: 'Ativação e primeiro chat',
    desc: 'Injete suas credenciais externas (GitHub, Telegram, Vercel) e abra o chat com o Oracle — seu agente de onboarding.',
    tags: ['GitHub', 'Telegram', 'Oracle'],
    icon: <MessageSquare className="w-5 h-5 text-emerald-400" />,
  },
  {
    num: '6',
    title: 'Banco de dados próprio',
    desc: 'Deploy do Supabase via Coolify. Auth, banco relacional e storage — tudo no seu servidor, zero custo.',
    tags: ['Supabase', 'PostgreSQL', 'Auth'],
    icon: <Database className="w-5 h-5 text-blue-400" />,
  },
  {
    num: '7',
    title: 'E-mails transacionais',
    desc: 'Configure SMTP com Resend. Seus agentes enviam e-mails com o seu domínio a partir desta aula.',
    tags: ['Resend', 'SMTP', 'Domínio'],
    icon: <Zap className="w-5 h-5 text-yellow-400" />,
  },
  {
    num: '8',
    title: 'Backup automático diário',
    desc: 'Script de backup roda às 2h toda madrugada em armazenamento em nuvem gratuito. Você dorme, os dados ficam seguros.',
    tags: ['Backup', 'Cron', 'Object Storage'],
    icon: <HardDrive className="w-5 h-5 text-orange-400" />,
  },
  {
    num: '9',
    title: 'Monitoramento 24/7',
    desc: 'Instale o Beszel para acompanhar CPU, memória, disco e uptime de todos os serviços em um painel único.',
    tags: ['Beszel', 'Uptime', 'Alertas'],
    icon: <BarChart3 className="w-5 h-5 text-teal-400" />,
  },
]

const REVENUE_PATHS = [
  {
    icon: '⚡',
    path: 'Setup como serviço',
    value: 'R$2.000–3.500',
    period: 'por instalação',
    desc: 'Instale para outros, entregue em 2 dias, inclua suporte mensal de R$500.',
    color: 'text-teal-400',
    bg: 'bg-teal-500/10 border-teal-500/20',
  },
  {
    icon: '🛒',
    path: 'Apps no marketplace',
    value: 'R$15–60k',
    period: 'por mês',
    desc: 'Venda licenças dos apps que você constrói — rifas, gamificação, financeiro, nicho específico.',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10 border-orange-500/20',
  },
  {
    icon: '🔄',
    path: 'SaaS com MRR',
    value: 'R$50–200k',
    period: 'MRR',
    desc: 'Ofereça o sistema como SaaS recorrente. Starter / Pro / Enterprise com suporte e updates.',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10 border-purple-500/20',
  },
  {
    icon: '🏢',
    path: 'Agência de IA',
    value: 'R$50–300k',
    period: 'por mês',
    desc: 'Implemente sob medida para empresas. Ticket alto, projetos custom, retainer mensal.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10 border-blue-500/20',
  },
  {
    icon: '👥',
    path: 'Comunidade premium',
    value: 'R$10–50k',
    period: 'MRR',
    desc: 'Membros pagam por acesso a canais exclusivos, mentorias e early access de novos agentes.',
    color: 'text-pink-400',
    bg: 'bg-pink-500/10 border-pink-500/20',
  },
  {
    icon: '🤝',
    path: 'Programa de afiliados',
    value: '+30–50%',
    period: 'nas vendas',
    desc: 'Alunos e parceiros indicam e recebem 30% nos cursos, 20% no SaaS recorrente.',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10 border-amber-500/20',
  },
  {
    icon: '🤖',
    path: 'Marketplace de agentes',
    value: 'R$20–100k',
    period: 'por mês',
    desc: 'Venda agentes e skills personalizados para nichos. Plataforma aberta, você fica com 70%.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
  },
]

const PROOF_APPS = [
  {
    name: 'FinControl / KemOS',
    desc: 'SaaS financeiro multi-tenant com módulos, Academy e white-label. Em produção com clientes reais.',
    tech: 'Next.js · Supabase · TanStack',
    badge: 'Em produção',
    badgeColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30',
    icon: <DollarSign className="w-5 h-5 text-emerald-400" />,
  },
  {
    name: 'Rifas App',
    desc: 'Plataforma de rifas online com Pix via Asaas, sorteio automático e gestão de campanhas.',
    tech: 'Next.js · Supabase · Asaas',
    badge: 'Em produção',
    badgeColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30',
    icon: <Star className="w-5 h-5 text-yellow-400" />,
  },
  {
    name: 'Kickup',
    desc: 'App de gamificação infantil para futebol — XP, missões, modo pai vs filho, treinos táticos.',
    tech: 'Next.js · Supabase',
    badge: 'MVP 2 em andamento',
    badgeColor: 'text-blue-400 bg-blue-400/10 border-blue-400/30',
    icon: <TrendingUp className="w-5 h-5 text-blue-400" />,
  },
  {
    name: 'Futsal Sorteio',
    desc: 'Sistema de sorteio de times com tiebreaker, votação e winner-stays. Construído em dias.',
    tech: 'Next.js · Supabase',
    badge: 'Em produção',
    badgeColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30',
    icon: <Users className="w-5 h-5 text-orange-400" />,
  },
]

const INCLUDES = [
  '12 aulas de infraestrutura (Pré-Fase completa)',
  'Sistema KemOS completo instalado na sua VPS',
  '175+ automações prontas para usar',
  'Heartbeats — agentes que acordam e agem sozinhos',
  'VPS 100% gratuita para sempre',
  'Banco de dados e autenticação próprios',
  'Backup automático diário configurado',
  'Monitoramento 24/7 com alertas',
  'Acesso ao roadmap completo de monetização (7 frentes)',
  'Atualizações do conteúdo conforme o sistema evolui',
  'Comunidade de alunos no Discord',
]

const FAQS = [
  {
    q: 'Preciso saber programar ou ter experiência com servidor?',
    a: 'Não. Cada aula tem um padrão: você faz as etapas manuais (criar conta, copiar chave, clicar em um botão) e a IA de desenvolvimento executa o resto via SSH. Não tem nenhum comando para memorizar — a IA escreve e roda tudo.',
  },
  {
    q: 'Quanto custa manter o sistema rodando?',
    a: 'A VPS que usamos tem um free tier permanente — máquina robusta com 4 vCPUs e 24GB RAM, zero reais por mês para sempre. O banco de dados, o painel de deploy e o sistema de monitoramento também são gratuitos. O único custo é a assinatura da IA — R$110/mês. Total: R$110/mês para ter tudo rodando.',
  },
  {
    q: 'Quanto tempo leva para ter tudo instalado?',
    a: 'O Pré-Fase tem 12 aulas. Com dedicação de 2-3 horas por dia, você tem a infraestrutura completa em 4-5 dias. A maioria das aulas tem mais tempo de "esperar a IA fazer" do que de ação manual da sua parte.',
  },
  {
    q: 'Posso instalar para clientes e cobrar por isso?',
    a: 'Sim. Este é um dos principais casos de uso do treinamento. Você instala na VPS do cliente, configura os agentes para o negócio dele e cobra o setup (R$2.000–3.500) mais suporte mensal (R$300–500). O roadmap completo de monetização está incluso no treinamento.',
  },
  {
    q: 'Qual é o sistema que vou instalar? Posso ver antes?',
    a: 'O sistema que você instala é o KemOS — desenvolvido e mantido pela Kem Soluções. Ele tem agentes de negócio (financeiro, marketing, vendas, suporte, jurídico, produto, RH e mais) e agentes de engenharia de software, além de mais de 175 automações prontas e um sistema de heartbeats que faz os agentes agirem de forma proativa. A Kem Soluções usa em produção no próprio provedor de internet há mais de 1 ano.',
  },
  {
    q: 'E se eu travar em alguma aula?',
    a: 'Cada aula tem suporte via comunidade no Discord e sessões de dúvidas ao vivo. Se o problema for técnico na VPS, há um protocolo de diagnóstico que a IA de desenvolvimento roda para identificar o erro — você não vai ficar preso.',
  },
  {
    q: 'O conteúdo vai ficar desatualizado?',
    a: 'Não. O KemOS está em evolução contínua — quando evolui, o conteúdo de aula evolui junto. Todos os alunos têm acesso às atualizações sem custo adicional.',
  },
]

// ── Components ────────────────────────────────────────────────────────────────

function Badge({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${className}`}>
      {children}
    </span>
  )
}

function Section({ children, className = '', id = '' }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`px-4 sm:px-6 lg:px-8 py-20 lg:py-28 max-w-6xl mx-auto ${className}`}>
      {children}
    </section>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center mb-4">
      <span className="text-xs font-bold tracking-widest text-teal-400 uppercase border border-teal-400/30 bg-teal-400/10 px-4 py-1.5 rounded-full">
        {children}
      </span>
    </div>
  )
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-white/10 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors gap-4"
      >
        <span className="font-semibold text-slate-100">{q}</span>
        <ChevronDown className={`w-5 h-5 text-teal-400 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-6 pb-6 text-slate-400 leading-relaxed border-t border-white/10 pt-4">
          {a}
        </div>
      )}
    </div>
  )
}

// ── Main App ──────────────────────────────────────────────────────────────────

const WA_LINK = 'https://wa.me/5518997681155?text=Ol%C3%A1%2C+quero+saber+mais+sobre+o+treinamento+KemOS'

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 font-sans overflow-x-hidden">

      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-lg flex items-center justify-center">
              <Cpu className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white">Kem<span className="text-teal-400">OS</span></span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-slate-400">
            <a href="#treinamento" className="hover:text-white transition-colors">Treinamento</a>
            <a href="#aulas" className="hover:text-white transition-colors">Aulas</a>
            <a href="#monetizar" className="hover:text-white transition-colors">Monetizar</a>
            <a href="/sistemas" className="hover:text-white transition-colors">Sistemas</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            <a href="/provedor" className="hover:text-teal-400 transition-colors text-teal-400/70">Para Provedores</a>
          </div>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-4 py-2 rounded-xl hover:from-teal-400 hover:to-emerald-400 transition-all"
          >
            Quero o Treinamento →
          </a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[700px] bg-teal-500/6 rounded-full blur-3xl" />
          <div className="absolute top-60 right-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-3xl" />
        </div>

        <Section className="text-center pt-24 pb-16 relative">
          <div className="mb-6">
            <Badge className="text-teal-400 bg-teal-400/10 border-teal-400/30">
              <Sparkles className="w-3 h-3" />
              KemOS · VPS gratuita · 12 aulas
            </Badge>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6">
            Seu sistema operacional de IA<br />
            instalado e rodando <span className="text-gradient">em 12 aulas.</span><br />
            <span className="text-slate-400 text-3xl sm:text-4xl lg:text-5xl font-bold">
              Automatize. Construa. Venda.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            O treinamento KemOS ensina você a montar e rodar uma infraestrutura própria de IA com{' '}
            <strong className="text-white">dezenas de agentes especializados e mais de 175 automações</strong>{' '}
            — tudo em infraestrutura gratuita —{' '}
            e a gerar receita de 7 formas diferentes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white font-bold px-8 py-4 rounded-2xl text-lg transition-all shadow-lg shadow-teal-500/20"
            >
              Quero o Treinamento
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#aulas"
              className="w-full sm:w-auto flex items-center justify-center gap-2 border border-white/20 text-slate-300 hover:text-white hover:border-white/40 px-8 py-4 rounded-2xl text-lg transition-all"
            >
              <Play className="w-4 h-4" /> Ver as aulas
            </a>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
            {[
              { val: '30+', label: 'Agentes especializados', color: 'text-teal-400' },
              { val: '175+', label: 'Automações prontas', color: 'text-purple-400' },
              { val: 'R$0', label: 'VPS 100% gratuita', color: 'text-emerald-400' },
              { val: '12', label: 'Aulas do Pré-Fase', color: 'text-orange-400' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className={`text-3xl font-black ${s.color}`}>{s.val}</div>
                <div className="text-slate-500 text-xs mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* Terminal */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-20">
          <div className="glass rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
            <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-2 text-xs text-slate-500 font-mono">kemos — terminal</span>
            </div>
            <div className="p-6 font-mono text-sm space-y-2">
              <div className="text-slate-500">$ <span className="text-white">claude "crie uma régua de cobrança que envia WhatsApp automático para clientes inadimplentes"</span></div>
              <div className="text-teal-400">● Flux: lendo inadimplentes no ERP...</div>
              <div className="text-teal-400">● Segmentando: 1-7 dias / 8-15 / 16-30 / 30+</div>
              <div className="text-teal-400">● Configurando mensagens personalizadas por grupo...</div>
              <div className="text-teal-400">● Integrando canal de WhatsApp...</div>
              <div className="text-emerald-400">✓ Rotina ativa: roda todo dia às 08h00</div>
              <div className="text-emerald-400">✓ Hoje: 47 notificados. 12 já pagaram (R$8.400)</div>
              <div className="text-slate-500 mt-2">$ <span className="text-white animate-pulse">_</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Para quem é ── */}
      <div id="treinamento" className="bg-gradient-to-b from-transparent via-slate-900/30 to-transparent">
        <Section>
          <SectionLabel>Para quem é</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-black text-white text-center mb-4">
            Três perfis, um sistema
          </h2>
          <p className="text-slate-400 text-center max-w-2xl mx-auto mb-12">
            Seja para automatizar seu próprio negócio, vender setup para clientes ou escalar como agência de IA —
            o mesmo treinamento abre os três caminhos.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {PERSONAS.map((p, i) => (
              <div key={i} className={`glass rounded-2xl p-7 border transition-colors hover:bg-white/10 ${p.color}`}>
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4">
                  {p.icon}
                </div>
                <div className={`text-xs font-bold uppercase tracking-widest mb-2 ${p.accent}`}>{p.type}</div>
                <h3 className="font-black text-white text-lg mb-3">{p.headline}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">{p.desc}</p>
                <ul className="space-y-2">
                  {p.bullets.map((b, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-slate-300">
                      <CheckCircle2 className={`w-3.5 h-3.5 flex-shrink-0 ${p.accent}`} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* ── O sistema que você instala ── */}
      <Section>
        <SectionLabel>O Sistema</SectionLabel>
        <h2 className="text-3xl sm:text-4xl font-black text-white text-center mb-4">
          O que roda na sua VPS depois do treinamento
        </h2>
        <p className="text-slate-400 text-center max-w-2xl mx-auto mb-12">
          O KemOS não é um app. É uma infraestrutura completa de agentes de IA —
          cada um com domínio específico, memória e contexto do negócio.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {[
            {
              icon: <Bot className="w-5 h-5 text-teal-400" />,
              title: 'Agentes especializados por domínio',
              desc: 'Negócio (financeiro, marketing, vendas, suporte, jurídico, produto, RH, dados, CS) + engenharia (arquiteto, executor, revisor, testador, debugger e mais) — cada um com contexto e memória do seu negócio.',
            },
            {
              icon: <Layers className="w-5 h-5 text-purple-400" />,
              title: 'Mais de 175 automações prontas',
              desc: 'De relatório financeiro a SEO, de compliance jurídico a análise de dados — você ativa a automação, a IA executa. Sem escrever um prompt.',
            },
            {
              icon: <BellRing className="w-5 h-5 text-orange-400" />,
              title: 'Heartbeats — agentes proativos',
              desc: 'Configure quando e por que um agente acorda. Ele verifica o estado do negócio, decide se há trabalho e executa — consumindo tokens só quando necessário.',
            },
            {
              icon: <Settings className="w-5 h-5 text-blue-400" />,
              title: 'Rotinas no horário certo',
              desc: 'Briefing às 7h. Cobrança às 8h. Relatório às 18h. Fechamento no dia 1. Configure uma vez — roda para sempre, sem você lembrar.',
            },
          ].map((f, i) => (
            <div key={i} className="glass rounded-2xl p-6 hover:bg-white/10 transition-colors flex gap-5">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                {f.icon}
              </div>
              <div>
                <h3 className="font-bold text-white mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Dia a dia automatizado */}
        <div className="glass rounded-3xl p-8 border border-teal-500/20 bg-teal-500/5">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 flex items-center justify-center">
              <Clock className="w-5 h-5 text-teal-400" />
            </div>
            <div>
              <div className="text-xs font-bold text-teal-400 uppercase tracking-wider">Exemplo de rotina diária</div>
              <h3 className="font-bold text-white text-lg">O que acontece enquanto você dorme</h3>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { time: '07:00', icon: '☀️', event: 'Briefing matinal automático', sub: 'Agenda, finanças e prioridades do dia' },
              { time: '07:15', icon: '📬', event: 'Triagem de e-mails', sub: 'Só o que importa chega até você' },
              { time: '08:00', icon: '💰', event: 'Régua de cobrança ativa', sub: 'Inadimplentes no WhatsApp' },
              { time: '18:00', icon: '📊', event: 'Relatório de performance', sub: 'Vendas, leads, chamados do dia' },
              { time: '20:00', icon: '🌐', event: 'Análise de redes sociais', sub: 'Engajamento e oportunidades' },
              { time: '02:00', icon: '💾', event: 'Backup automático', sub: 'Todos os dados seguros no storage' },
            ].map((item, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-4 border border-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono text-teal-400 font-bold">{item.time}</span>
                  <span className="text-base">{item.icon}</span>
                </div>
                <div className="text-sm font-semibold text-white mb-0.5">{item.event}</div>
                <div className="text-xs text-slate-500">{item.sub}</div>
              </div>
            ))}
          </div>
          <p className="text-slate-500 text-sm mt-4 text-center italic">
            Nenhuma dessas rotinas exige ação sua depois de configurada.
          </p>
        </div>
      </Section>

      {/* ── Currículo ── */}
      <div id="aulas" className="bg-gradient-to-b from-slate-900/40 to-transparent">
        <Section>
          <SectionLabel>Currículo</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-black text-white text-center mb-4">
            12 aulas — da máquina zerada ao sistema rodando
          </h2>
          <p className="text-slate-400 text-center max-w-2xl mx-auto mb-12">
            Cada aula segue o mesmo padrão: <strong className="text-white">você faz o mínimo manual</strong>{' '}
            (criar conta, copiar credencial) e a IA executa o resto via terminal.
            Sem comandos para decorar.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {AULAS.map((aula, i) => (
              <div key={i} className="glass rounded-2xl p-5 hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center flex-shrink-0">
                    {aula.icon}
                  </div>
                  <span className="text-xs font-bold text-teal-400 bg-teal-400/10 border border-teal-400/20 rounded-full px-2 py-0.5">
                    Aula {aula.num}
                  </span>
                </div>
                <h3 className="font-bold text-white text-sm mb-2">{aula.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">{aula.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {aula.tags.map((tag, j) => (
                    <span key={j} className="text-[10px] font-semibold text-slate-500 bg-white/5 border border-white/10 rounded-full px-2 py-0.5">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 p-6 glass rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-teal-500/20 flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-6 h-6 text-teal-400" />
              </div>
              <div>
                <div className="font-bold text-white">Ao final do Pré-Fase</div>
                <div className="text-sm text-slate-400">KemOS rodando · VPS segura · backup ativo · monitoramento 24/7</div>
              </div>
            </div>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 flex items-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold px-6 py-3 rounded-xl transition-all text-sm hover:from-teal-400 hover:to-emerald-400"
            >
              Quero esse resultado <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </Section>
      </div>

      {/* ── Monetização ── */}
      <Section id="monetizar">
        <SectionLabel>Monetização</SectionLabel>
        <h2 className="text-3xl sm:text-4xl font-black text-white text-center mb-4">
          7 formas de gerar receita com o que você instalar
        </h2>
        <p className="text-slate-400 text-center max-w-2xl mx-auto mb-12">
          O treinamento entrega o sistema. O roadmap incluso ensina a transformar isso em negócio —
          do primeiro setup vendido até o marketplace de agentes.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
          {REVENUE_PATHS.slice(0, 4).map((r, i) => (
            <div key={i} className={`glass rounded-2xl p-5 border hover:bg-white/10 transition-colors ${r.bg}`}>
              <div className="text-2xl mb-3">{r.icon}</div>
              <div className={`text-xs font-bold uppercase tracking-wider mb-2 ${r.color}`}>{r.path}</div>
              <div className={`text-2xl font-black mb-0.5 ${r.color}`}>{r.value}</div>
              <div className="text-xs text-slate-500 mb-3">{r.period}</div>
              <p className="text-xs text-slate-400 leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {REVENUE_PATHS.slice(4).map((r, i) => (
            <div key={i} className={`glass rounded-2xl p-5 border hover:bg-white/10 transition-colors ${r.bg}`}>
              <div className="text-2xl mb-3">{r.icon}</div>
              <div className={`text-xs font-bold uppercase tracking-wider mb-2 ${r.color}`}>{r.path}</div>
              <div className={`text-2xl font-black mb-0.5 ${r.color}`}>{r.value}</div>
              <div className="text-xs text-slate-500 mb-3">{r.period}</div>
              <p className="text-xs text-slate-400 leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 glass rounded-2xl p-6 border border-teal-500/20 bg-teal-500/5 text-center">
          <div className="text-slate-400 text-sm mb-1">Potencial combinado do ecossistema completo</div>
          <div className="text-3xl font-black text-teal-400">R$175k – R$860k/mês</div>
          <div className="text-slate-500 text-xs mt-1">Baseado no roadmap completo de 7 fases · não é promessa de resultado individual</div>
        </div>
      </Section>

      {/* ── Prova — Apps construídos ── */}
      <div className="bg-gradient-to-b from-transparent via-slate-900/30 to-transparent">
        <Section>
          <SectionLabel>Prova Real</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-black text-white text-center mb-4">
            Apps construídos com o mesmo sistema
          </h2>
          <p className="text-slate-400 text-center max-w-2xl mx-auto mb-12">
            Não é teoria. Todos esses sistemas foram construídos usando o KemOS — do código à publicação.
          </p>
          <div className="grid sm:grid-cols-2 gap-5">
            {PROOF_APPS.map((app, i) => (
              <div key={i} className="glass rounded-2xl p-6 hover:bg-white/10 transition-colors">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                      {app.icon}
                    </div>
                    <h3 className="font-bold text-white">{app.name}</h3>
                  </div>
                  <Badge className={`flex-shrink-0 text-[10px] ${app.badgeColor}`}>
                    {app.badge}
                  </Badge>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed mb-3">{app.desc}</p>
                <div className="text-xs text-slate-600 font-mono">{app.tech}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-5 glass rounded-2xl text-center">
            <p className="text-slate-400 text-sm">
              Quer usar esses sistemas sem construir do zero?{' '}
              <a href="/sistemas" className="text-teal-400 hover:text-teal-300 font-semibold transition-colors">
                Acesse a Central de Sistemas →
              </a>
            </p>
          </div>
        </Section>
      </div>

      {/* ── Quem ensina ── */}
      <Section>
        <div className="glass rounded-3xl p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <Badge className="text-teal-400 bg-teal-400/10 border-teal-400/30 mb-5">
                <Shield className="w-3 h-3" /> Quem está por trás
              </Badge>
              <h2 className="text-3xl font-black text-white mb-4 leading-tight">
                Aprenda com quem usa o sistema no próprio negócio — não com quem teorizou sobre IA
              </h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                Sou <strong className="text-white">Marciel Corado</strong>, dono da{' '}
                <strong className="text-white">Kem Soluções</strong> — provedor de fibra óptica há mais de 17 anos.
                Usei o KemOS para resolver problemas reais: cobrança automática, portal do cliente,
                atendimento no WhatsApp, gestão interna.
              </p>
              <p className="text-slate-400 leading-relaxed mb-4">
                Cada aula que existe no treinamento eu precisei, construí e testei no meu negócio antes de ensinar.
                Não tem teoria aqui — tem processo documentado que funciona em produção.
              </p>
              <p className="text-slate-400 leading-relaxed">
                A meta é simples: em 4-5 dias você tem a mesma infraestrutura que uso hoje —
                e o roadmap para transformar isso em receita.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { icon: <Wifi className="w-5 h-5 text-teal-400" />, label: 'Dono de ISP há mais de 17 anos', sub: 'Kem Soluções — fibra óptica para residências e empresas' },
                { icon: <Terminal className="w-5 h-5 text-teal-400" />, label: 'Usa o KemOS em produção', sub: 'Automações rodando no provedor real há mais de 1 ano' },
                { icon: <Code2 className="w-5 h-5 text-teal-400" />, label: '4 apps em produção', sub: 'FinControl, Rifas App, Kickup, Futsal — todos com o mesmo sistema' },
                { icon: <BookOpen className="w-5 h-5 text-teal-400" />, label: 'Conteúdo sempre atualizado', sub: 'Quando o sistema evolui, as aulas evoluem junto. Sem custo extra.' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/5">
                  <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm">{item.label}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ── O que está incluso ── */}
      <Section>
        <div className="glass rounded-3xl p-8 lg:p-12 border border-teal-500/20 bg-teal-500/5">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <SectionLabel>O que você recebe</SectionLabel>
              <h2 className="text-3xl font-black text-white mt-4 mb-6">
                Tudo que você precisa para instalar, rodar e monetizar
              </h2>
              <p className="text-slate-400 leading-relaxed mb-8">
                O treinamento não é só aula. É a infraestrutura completa, o suporte para travar zero
                e o roadmap para transformar o que você instalar em receita recorrente.
              </p>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white font-bold px-8 py-4 rounded-2xl transition-all shadow-lg shadow-teal-500/20"
              >
                Quero o Treinamento
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
            <div>
              <ul className="space-y-3">
                {INCLUDES.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* ── ISP CTA ── */}
      <Section>
        <div className="glass rounded-3xl p-8 lg:p-10 border border-teal-500/20 bg-teal-500/5 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 rounded-2xl bg-teal-500/20 flex items-center justify-center flex-shrink-0">
              <Wifi className="w-7 h-7 text-teal-400" />
            </div>
            <div>
              <div className="text-xs font-bold text-teal-400 uppercase tracking-wider mb-1">Para Provedores de Internet</div>
              <h3 className="font-black text-white text-xl mb-2">Tem um ISP? Existe um módulo feito especificamente para você.</h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xl">
                Portal do cliente, WhatsApp bot de cobrança autônoma, integração com SGP, gestão de instalações, SVAs —
                tudo construído módulo a módulo pelo dono de um provedor de 17 anos.
              </p>
            </div>
          </div>
          <a
            href="/provedor"
            className="flex-shrink-0 flex items-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white font-bold px-7 py-4 rounded-2xl transition-all text-sm whitespace-nowrap"
          >
            Ver o módulo para ISPs <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </Section>

      {/* ── FAQ ── */}
      <Section id="faq">
        <SectionLabel>Dúvidas</SectionLabel>
        <h2 className="text-3xl sm:text-4xl font-black text-white text-center mb-12">
          Perguntas frequentes
        </h2>
        <div className="max-w-3xl mx-auto space-y-3">
          {FAQS.map((faq, i) => (
            <FAQItem key={i} {...faq} />
          ))}
        </div>
      </Section>

      {/* ── CTA Final ── */}
      <Section>
        <div className="relative glass rounded-3xl p-8 lg:p-16 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-emerald-500/5 pointer-events-none" />
          <div className="relative">
            <Badge className="text-teal-400 bg-teal-400/10 border-teal-400/30 mb-6">
              <Zap className="w-3 h-3" /> Comece agora
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
              Em 4 dias você tem<br />
              <span className="text-gradient">seu sistema de IA rodando.</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto mb-10">
              VPS gratuita. Sistema instalado. Pronto para automatizar seu negócio ou vender para o próximo cliente.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white font-bold px-10 py-5 rounded-2xl text-lg transition-all shadow-lg shadow-teal-500/20"
              >
                Quero o Treinamento KemOS
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="/sistemas"
                className="w-full sm:w-auto flex items-center justify-center gap-2 border border-white/20 text-slate-300 hover:text-white hover:border-white/40 px-10 py-5 rounded-2xl text-lg transition-all"
              >
                <Globe className="w-4 h-4" /> Ver os sistemas
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2"><Lock className="w-4 h-4 text-teal-400" /> Sua VPS, seu controle</div>
              <div className="flex items-center gap-2"><Server className="w-4 h-4 text-teal-400" /> Infraestrutura gratuita</div>
              <div className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-teal-400" /> Roadmap de monetização incluso</div>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-lg flex items-center justify-center">
              <Cpu className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-slate-400">Kem<span className="text-teal-400">OS</span></span>
          </div>
          <div className="flex items-center gap-6 text-xs text-slate-600">
            <a href="/sistemas" className="hover:text-slate-400 transition-colors">Central de Sistemas</a>
            <a href="/provedor" className="hover:text-slate-400 transition-colors">Módulo ISP</a>
            <a href="/sva" className="hover:text-slate-400 transition-colors">SVAs</a>
            <a href="/privacidade" className="hover:text-slate-400 transition-colors">Privacidade</a>
          </div>
          <p className="text-sm text-slate-600">
            © 2026 Kem Soluções. Construído com KemOS.
          </p>
        </div>
      </footer>

    </div>
  )
}
