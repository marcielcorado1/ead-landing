import './App.css'
import {
  Bot, Code2, Database, Globe, CheckCircle2,
  ArrowRight, Zap, Shield, TrendingUp, BookOpen,
  Terminal, ChevronDown, Star, Clock, DollarSign,
  Play, Mail,
  Wifi, Briefcase, ShoppingCart, HeartPulse, GraduationCap,
  Building2, Cpu, Layers, Settings, BellRing, TargetIcon,
  Sparkles
} from 'lucide-react'
import { useState } from 'react'

// ── Data ─────────────────────────────────────────────────────────────────────

const PAINS = [
  {
    icon: <Clock className="w-6 h-6 text-red-400" />,
    title: "Você paga pessoas para fazer o que uma IA pode fazer sozinha",
    desc: "Cobranças, follow-ups, relatórios, triagem de e-mail, agendamentos, atualizações de planilha. Tarefas repetidas que sugam horas toda semana — e que o KemOS executa sozinho, sem falhar, sem dormir.",
  },
  {
    icon: <DollarSign className="w-6 h-6 text-yellow-400" />,
    title: "Dev caro, SaaS engessado, planilha que não escala",
    desc: "Contratar desenvolvedor está fora do orçamento. Os sistemas prontos não fazem exatamente o que você precisa. E você acaba improvisando com planilhas que um dia vão quebrar.",
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-orange-400" />,
    title: "Você trabalha no negócio em vez de trabalhar no negócio",
    desc: "No final do dia você operou — respondeu e-mail, fez cobrança, gerou relatório, atualizou dashboard. O que você quer é crescer. O KemOS assume o operacional.",
  },
]

const AGENTS = [
  { emoji: '💰', name: 'Flux', role: 'Finanças', desc: 'Fluxo de caixa, Stripe, ERP, fechamento mensal — tudo automático', color: 'text-emerald-400 bg-emerald-400/10' },
  { emoji: '📣', name: 'Mako', role: 'Marketing', desc: 'Campanhas, SEO, sequências de e-mail, análise de performance', color: 'text-pink-400 bg-pink-400/10' },
  { emoji: '📋', name: 'Atlas', role: 'Projetos', desc: 'Status, milestones, blockers — seu PM sempre acordado', color: 'text-blue-400 bg-blue-400/10' },
  { emoji: '🤝', name: 'Nex', role: 'Vendas', desc: 'Pipeline, qualificação de leads, follow-up, propostas', color: 'text-orange-400 bg-orange-400/10' },
  { emoji: '💬', name: 'Zara', role: 'Suporte', desc: 'Triagem de tickets, respostas, base de conhecimento, escalonamento', color: 'text-violet-400 bg-violet-400/10' },
  { emoji: '📊', name: 'Nova', role: 'Produto', desc: 'Specs, métricas, roadmap, pesquisa de usuário sintetizada', color: 'text-sky-400 bg-sky-400/10' },
  { emoji: '⚖️', name: 'Lex', role: 'Jurídico', desc: 'Revisão de contratos, compliance, LGPD, triagem de NDAs', color: 'text-amber-400 bg-amber-400/10' },
  { emoji: '🌐', name: 'Pixel', role: 'Social', desc: 'Conteúdo, calendário, relatório de plataformas, estratégia', color: 'text-rose-400 bg-rose-400/10' },
]

const USE_CASES = [
  {
    sector: 'Provedor de Internet',
    icon: <Wifi className="w-5 h-5 text-teal-400" />,
    color: 'border-teal-500/30 bg-teal-500/5',
    items: ['Cobrança autônoma no WhatsApp', 'Monitor de ONUs offline', 'Portal do cliente com 2ª via'],
    link: '/provedor',
    linkLabel: 'Ver curso específico para ISPs →',
  },
  {
    sector: 'E-commerce / Varejo',
    icon: <ShoppingCart className="w-5 h-5 text-rose-400" />,
    color: 'border-rose-500/20 bg-rose-500/5',
    items: ['Follow-up de carrinho abandonado', 'Relatório de vendas diário por IA', 'Conciliação financeira automática'],
    link: null, linkLabel: null,
  },
  {
    sector: 'Clínicas / Saúde',
    icon: <HeartPulse className="w-5 h-5 text-pink-400" />,
    color: 'border-pink-500/20 bg-pink-500/5',
    items: ['Lembrete de consultas no WhatsApp', 'Triagem de sintomas via bot', 'Relatório mensal de atendimentos'],
    link: null, linkLabel: null,
  },
  {
    sector: 'Educação / EAD',
    icon: <GraduationCap className="w-5 h-5 text-yellow-400" />,
    color: 'border-yellow-500/20 bg-yellow-500/5',
    items: ['Engajamento automático de alunos', 'Relatório de progresso por turma', 'Suporte 24h via IA'],
    link: null, linkLabel: null,
  },
  {
    sector: 'Agências / Consultoria',
    icon: <Briefcase className="w-5 h-5 text-sky-400" />,
    color: 'border-sky-500/20 bg-sky-500/5',
    items: ['Briefing de cliente automatizado', 'Relatório de resultado por cliente', 'Gestão de projetos e tarefas'],
    link: null, linkLabel: null,
  },
  {
    sector: 'Imobiliárias / Condomínios',
    icon: <Building2 className="w-5 h-5 text-orange-400" />,
    color: 'border-orange-500/20 bg-orange-500/5',
    items: ['Cobrança de condomínio automática', 'Gestão de chamados de manutenção', 'Follow-up de leads imobiliários'],
    link: null, linkLabel: null,
  },
]

const FEATURES = [
  {
    icon: <BellRing className="w-5 h-5 text-teal-400" />,
    title: 'Heartbeats — Agentes que acordam sozinhos',
    desc: 'Defina quando e por que um agente deve agir. Ele verifica o estado, decide se há trabalho, executa — e só consome tokens quando necessário.',
  },
  {
    icon: <TargetIcon className="w-5 h-5 text-purple-400" />,
    title: 'Goal Cascade — Metas que se conectam',
    desc: 'De missão a tarefa: tudo rastreado. Agentes recebem contexto de qual objetivo estão servindo — sem você precisar repetir toda vez.',
  },
  {
    icon: <Layers className="w-5 h-5 text-blue-400" />,
    title: '175+ Skills prontas para usar',
    desc: 'Finanças, marketing, RH, jurídico, social, produto, engenharia. Skills especializadas que você ativa — sem escrever um prompt sequer.',
  },
  {
    icon: <Settings className="w-5 h-5 text-orange-400" />,
    title: 'Rotinas automáticas no horário certo',
    desc: 'Briefing matinal às 7h. Fechamento financeiro no dia 1. Relatório de inadimplência toda sexta. Configure uma vez, roda para sempre.',
  },
]

const TOOLS = [
  { name: 'IA (Claude Code)', role: 'Motor que executa tudo', cost: '~$20/mês', required: true, icon: <Bot className="w-5 h-5" /> },
  { name: 'KemOS', role: 'OS de agentes de IA', cost: 'Gratuito', required: false, icon: <Zap className="w-5 h-5" /> },
  { name: 'GitHub', role: 'Versionamento', cost: 'Gratuito', required: false, icon: <Code2 className="w-5 h-5" /> },
  { name: 'Supabase', role: 'Banco de dados + Auth', cost: 'Gratuito', required: false, icon: <Database className="w-5 h-5" /> },
  { name: 'Vercel', role: 'Deploy em 1 clique', cost: 'Gratuito', required: false, icon: <Globe className="w-5 h-5" /> },
]

const FAQS = [
  {
    q: 'Preciso saber programar para usar o KemOS?',
    a: 'Não. A IA escreve e executa o código. Você descreve o que quer, ela faz. Pessoas sem nenhuma experiência técnica criaram e publicaram apps reais em menos de uma semana.',
  },
  {
    q: 'Qual o custo real para começar?',
    a: 'A única assinatura paga é a IA que opera o KemOS — cerca de $20/mês (≈ R$110/mês). GitHub, Supabase e Vercel são gratuitos no tier inicial. O KemOS em si é gratuito. Você publica apps reais gastando menos de R$110/mês.',
  },
  {
    q: 'Para qualquer tipo de negócio?',
    a: 'Sim. Provedores de internet, e-commerces, clínicas, imobiliárias, agências, construtoras. Se há tarefa repetitiva, relatório manual ou processo sem automação — o KemOS resolve.',
  },
  {
    q: 'Em quanto tempo vejo resultado?',
    a: 'A primeira automação roda no mesmo dia do setup. Apps publicados em dias. Automações complexas em 1-2 semanas. Resultado concreto, não promessa.',
  },
  {
    q: 'E se o KemOS mudar?',
    a: 'O KemOS é mantido por quem o usa no dia a dia. Quando evolui, o conteúdo evolui junto. Alunos têm acesso a todas as atualizações.',
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

export default function App() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

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
            <a href="#como-funciona" className="hover:text-white transition-colors">Como funciona</a>
            <a href="#casos" className="hover:text-white transition-colors">Casos de uso</a>
            <a href="#agentes" className="hover:text-white transition-colors">Agentes</a>
            <a href="/sistemas" className="hover:text-white transition-colors">Sistemas</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            <a href="/provedor" className="hover:text-teal-400 transition-colors text-teal-400/70">Para Provedores</a>
          </div>
          <a
            href="#lista-espera"
            className="text-sm font-semibold bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-4 py-2 rounded-xl hover:from-teal-400 hover:to-emerald-400 transition-all"
          >
            Começar Grátis →
          </a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-teal-500/8 rounded-full blur-3xl" />
          <div className="absolute top-40 right-1/4 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-3xl" />
        </div>

        <Section className="text-center pt-24 pb-16 relative">
          <div className="mb-6">
            <Badge className="text-teal-400 bg-teal-400/10 border-teal-400/30">
              <Sparkles className="w-3 h-3" />
              38 agentes · 175+ skills · qualquer negócio
            </Badge>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6">
            Seu negócio no<br />
            piloto automático.<br />
            <span className="text-gradient">Com IA. De verdade.</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            O <strong className="text-white">KemOS</strong> é um sistema operacional de agentes de IA que automatiza o que você faz manualmente todo dia —
            cobrança, marketing, suporte, relatórios, vendas, operações.{' '}
            <strong className="text-white">Sem programador. Com ~$20/mês.</strong>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <a
              href="#lista-espera"
              className="group w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white font-bold px-8 py-4 rounded-2xl text-lg transition-all shadow-lg shadow-teal-500/20"
            >
              Quero automatizar meu negócio
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#como-funciona"
              className="w-full sm:w-auto flex items-center justify-center gap-2 border border-white/20 text-slate-300 hover:text-white hover:border-white/40 px-8 py-4 rounded-2xl text-lg transition-all"
            >
              <Play className="w-4 h-4" /> Ver como funciona
            </a>
          </div>

          {/* Stats bar */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
            {[
              { val: '38', label: 'Agentes especializados', color: 'text-teal-400' },
              { val: '175+', label: 'Skills prontas', color: 'text-purple-400' },
              { val: '~$20', label: 'Por mês, tudo incluso', color: 'text-emerald-400' },
              { val: '24/7', label: 'Operando enquanto você dorme', color: 'text-orange-400' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className={`text-2xl font-black ${s.color}`}>{s.val}</div>
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
              <span className="ml-2 text-xs text-slate-500 font-mono">nexcore — terminal</span>
            </div>
            <div className="p-6 font-mono text-sm space-y-2">
              <div className="text-slate-500">$ <span className="text-white">claude "crie uma régua de cobrança que envia WhatsApp automático para clientes inadimplentes"</span></div>
              <div className="text-teal-400">● Lendo lista de inadimplentes do ERP...</div>
              <div className="text-teal-400">● Segmentando por dias de atraso (1-7, 8-15, 16-30, 30+)...</div>
              <div className="text-teal-400">● Configurando mensagens personalizadas por grupo...</div>
              <div className="text-teal-400">● Integrando WhatsApp (Evolution API)...</div>
              <div className="text-emerald-400">✓ Rotina criada: roda todo dia às 08h00</div>
              <div className="text-emerald-400">✓ Hoje: 47 inadimplentes notificados. 12 já pagaram.</div>
              <div className="text-emerald-400">✓ Estimativa de recuperação: R$ 8.400,00</div>
              <div className="text-slate-500 mt-2">$ <span className="text-white animate-pulse">_</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Dores ── */}
      <Section>
        <SectionLabel>O Problema</SectionLabel>
        <h2 className="text-3xl sm:text-4xl font-black text-white text-center mb-4">
          Você toca o negócio — ou o negócio te consome?
        </h2>
        <p className="text-slate-400 text-center max-w-2xl mx-auto mb-12">
          A maioria dos donos de negócio está presa no operacional. Não é preguiça. É falta da ferramenta certa.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {PAINS.map((pain, i) => (
            <div key={i} className="glass rounded-2xl p-6 hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4">
                {pain.icon}
              </div>
              <h3 className="font-bold text-white text-lg mb-2">{pain.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{pain.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Como funciona ── */}
      <div id="como-funciona" className="bg-gradient-to-b from-teal-950/20 to-transparent">
        <Section>
          <SectionLabel>Como Funciona</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-black text-white text-center mb-4">
            Um OS de IA que gerencia seu negócio
          </h2>
          <p className="text-slate-400 text-center max-w-2xl mx-auto mb-16">
            O KemOS não é um chatbot. É um sistema operacional de agentes especializados que trabalham com contexto real do seu negócio.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {FEATURES.map((f, i) => (
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

          {/* Exemplo de automação */}
          <div className="glass rounded-3xl p-8 border border-teal-500/20 bg-teal-500/5">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 flex items-center justify-center">
                <BellRing className="w-5 h-5 text-teal-400" />
              </div>
              <div>
                <div className="text-xs font-bold text-teal-400 uppercase tracking-wider">Exemplo real</div>
                <h3 className="font-bold text-white text-lg">O dia a dia no piloto automático</h3>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { time: '07:00', icon: '☀️', event: 'Briefing matinal gerado pela IA', sub: 'Agenda, tarefas, finanças do dia' },
                { time: '07:15', icon: '📬', event: 'Triagem de e-mails priorizada', sub: 'Só o que importa chega até você' },
                { time: '08:00', icon: '💰', event: 'Régua de cobrança rodando', sub: 'Inadimplentes notificados no WhatsApp' },
                { time: '18:00', icon: '📊', event: 'Relatório de performance do dia', sub: 'Vendas, leads, chamados resolvidos' },
                { time: '20:00', icon: '🌐', event: 'Análise de redes sociais', sub: 'Engajamento, alcance, oportunidades' },
                { time: '21:00', icon: '📝', event: 'Fechamento e próximos passos', sub: 'O que ficou aberto, prioridades amanhã' },
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
              Tudo isso sem você fazer nada. Configure uma vez — roda todos os dias.
            </p>
          </div>
        </Section>
      </div>

      {/* ── Agentes ── */}
      <Section id="agentes">
        <SectionLabel>Os Agentes</SectionLabel>
        <h2 className="text-3xl sm:text-4xl font-black text-white text-center mb-4">
          38 especialistas de IA trabalhando para você
        </h2>
        <p className="text-slate-400 text-center max-w-2xl mx-auto mb-12">
          Cada agente tem um domínio específico, memória própria e contexto do seu negócio. Não é um chatbot genérico — é uma equipe virtual treinada.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {AGENTS.map((agent, i) => (
            <div key={i} className="glass rounded-2xl p-5 hover:bg-white/10 transition-colors">
              <div className={`w-10 h-10 rounded-xl ${agent.color} flex items-center justify-center text-lg mb-3`}>
                {agent.emoji}
              </div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5">{agent.role}</div>
              <div className="font-bold text-white text-base mb-2">{agent.name}</div>
              <p className="text-xs text-slate-400 leading-relaxed">{agent.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-slate-500 text-sm">
            + 30 agentes de engenharia (arquiteto, executor, revisor, testador, debugger, segurança e mais)
          </p>
        </div>
      </Section>

      {/* ── Casos de uso ── */}
      <Section id="casos">
        <SectionLabel>Casos de Uso</SectionLabel>
        <h2 className="text-3xl sm:text-4xl font-black text-white text-center mb-4">
          Para qualquer negócio que tem processos repetitivos
        </h2>
        <p className="text-slate-400 text-center max-w-2xl mx-auto mb-12">
          Se existe tarefa manual que ocorre toda semana — o KemOS pode automatizar.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {USE_CASES.map((uc, i) => (
            <div key={i} className={`glass rounded-2xl p-6 border transition-colors hover:bg-white/10 ${uc.color}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center">
                  {uc.icon}
                </div>
                <h3 className="font-bold text-white text-base">{uc.sector}</h3>
              </div>
              <ul className="space-y-2 mb-4">
                {uc.items.map((item, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-slate-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              {uc.link && (
                <a
                  href={uc.link}
                  className="text-xs font-semibold text-teal-400 hover:text-teal-300 transition-colors flex items-center gap-1"
                >
                  {uc.linkLabel}
                </a>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* ── Stack ── */}
      <Section id="stack">
        <SectionLabel>A Stack</SectionLabel>
        <h2 className="text-3xl sm:text-4xl font-black text-white text-center mb-4">
          Gratuito para começar. Escala sem trocar de stack.
        </h2>
        <p className="text-slate-400 text-center max-w-2xl mx-auto mb-12">
          Toda a infraestrutura é open-source ou gratuita no tier inicial. Você só paga a IA — o motor que opera tudo.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {TOOLS.map((tool, i) => (
            <div
              key={i}
              className={`relative glass rounded-2xl p-5 flex flex-col gap-3 hover:bg-white/10 transition-colors ${tool.required ? 'border-teal-500/40 bg-teal-500/5' : ''}`}
            >
              {tool.required && (
                <span className="absolute -top-2 right-3 text-[10px] font-bold bg-teal-500 text-white px-2 py-0.5 rounded-full">
                  OBRIGATÓRIO
                </span>
              )}
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tool.required ? 'bg-teal-500/20 text-teal-400' : 'bg-white/10 text-slate-300'}`}>
                {tool.icon}
              </div>
              <div>
                <div className="font-bold text-white text-sm">{tool.name}</div>
                <div className="text-xs text-slate-500 mt-0.5">{tool.role}</div>
              </div>
              <div className={`text-xs font-semibold mt-auto ${tool.required ? 'text-teal-400' : 'text-emerald-400'}`}>
                {tool.cost}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 p-6 glass rounded-2xl text-center">
          <p className="text-slate-300">
            💡 <strong className="text-white">Custo total:</strong>{' '}
            <span className="text-teal-400 font-bold">~$20/mês</span> — a assinatura da IA.
            O resto é <span className="text-emerald-400 font-bold">gratuito</span> até você escalar.
          </p>
        </div>
      </Section>

      {/* ── Quem criou ── */}
      <div className="bg-gradient-to-b from-transparent via-slate-900/50 to-transparent">
        <Section>
          <div className="glass rounded-3xl p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <Badge className="text-teal-400 bg-teal-400/10 border-teal-400/30 mb-5">
                  <Shield className="w-3 h-3" /> Quem está por trás
                </Badge>
                <h2 className="text-3xl font-black text-white mb-4 leading-tight">
                  Criado por quem usa no próprio negócio — não por quem teoriza sobre IA
                </h2>
                <p className="text-slate-400 leading-relaxed mb-4">
                  Sou <strong className="text-white">Marciel Corado</strong>, dono da <strong className="text-white">Kem Soluções</strong> — provedor de fibra óptica há mais de 17 anos.
                  Usei o KemOS para resolver problemas reais: cobrança automática, portal do cliente, atendimento no WhatsApp, gestão interna.
                </p>
                <p className="text-slate-400 leading-relaxed mb-4">
                  Não aprendi em livro. Cada automação que o KemOS tem, eu precisei, construí e testei no meu negócio antes de ensinar.
                </p>
                <p className="text-slate-400 leading-relaxed">
                  Agora ensino qualquer dono de negócio a fazer o mesmo — independente de saber programar, de ter equipe técnica, de ter orçamento.
                </p>
              </div>
              <div className="space-y-4">
                {[
                  { icon: <Wifi className="w-5 h-5 text-teal-400" />, label: 'Dono de ISP há mais de 17 anos', sub: 'Kem Soluções — fibra óptica para residências e empresas' },
                  { icon: <Terminal className="w-5 h-5 text-teal-400" />, label: 'Usuário ativo do KemOS', sub: 'Usa nas automações do provedor em produção hoje' },
                  { icon: <Code2 className="w-5 h-5 text-teal-400" />, label: '3 apps em produção', sub: 'Recompensa Pro, Fut Sorteio, Assessor Digital' },
                  { icon: <BookOpen className="w-5 h-5 text-teal-400" />, label: 'Conteúdo sempre atualizado', sub: 'Quando o KemOS evolui, o conteúdo evolui junto' },
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
      </div>

      {/* ── Central de Sistemas CTA ── */}
      <Section>
        <div className="glass rounded-3xl p-8 lg:p-10 border border-emerald-500/20 bg-emerald-500/5 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
              <Layers className="w-7 h-7 text-emerald-400" />
            </div>
            <div>
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">Central de Sistemas</div>
              <h3 className="font-black text-white text-xl mb-2">Prefere usar em vez de construir? Assine um sistema pronto.</h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xl">
                Rifas, gamificação infantil, gestão financeira, sorteio de times, plataforma de afiliados, CRM de captação de atletas — sistemas já construídos e em produção, prontos para assinar hoje.
              </p>
            </div>
          </div>
          <a
            href="/sistemas"
            className="flex-shrink-0 flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold px-7 py-4 rounded-2xl transition-all text-sm whitespace-nowrap"
          >
            Ver a Central de Sistemas <ArrowRight className="w-4 h-4" />
          </a>
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
              <h3 className="font-black text-white text-xl mb-2">Tem um ISP? Existe um curso feito especificamente para você.</h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xl">
                Portal do cliente, WhatsApp bot de cobrança autônoma, integração com SGP, gestão de instalações, SVAs — tudo construído do zero, módulo a módulo, pelo dono de um provedor.
              </p>
            </div>
          </div>
          <a
            href="/provedor"
            className="flex-shrink-0 flex items-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white font-bold px-7 py-4 rounded-2xl transition-all text-sm whitespace-nowrap"
          >
            Ver o curso para ISPs <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </Section>

      {/* ── FAQ ── */}
      <Section id="faq">
        <SectionLabel>Dúvidas</SectionLabel>
        <h2 className="text-3xl sm:text-4xl font-black text-white text-center mb-12">
          Perguntas e respostas
        </h2>
        <div className="max-w-3xl mx-auto space-y-3">
          {FAQS.map((faq, i) => (
            <FAQItem key={i} {...faq} />
          ))}
        </div>
      </Section>

      {/* ── Lista de Espera ── */}
      <Section id="lista-espera">
        <div className="relative glass rounded-3xl p-8 lg:p-16 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-emerald-500/5 pointer-events-none" />
          <div className="relative">
            <Badge className="text-teal-400 bg-teal-400/10 border-teal-400/30 mb-6">
              <Star className="w-3 h-3" /> Acesso antecipado
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
              Comece a automatizar<br />seu negócio agora
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto mb-10">
              Entre na lista e receba <strong className="text-white">acesso antecipado</strong> com desconto exclusivo.
              O primeiro módulo é sempre gratuito.
            </p>

            {submitted ? (
              <div className="inline-flex items-center gap-3 bg-teal-500/20 border border-teal-500/40 text-teal-300 px-8 py-4 rounded-2xl text-lg font-semibold">
                <CheckCircle2 className="w-6 h-6" />
                Perfeito! Você está na lista. Avisaremos no lançamento.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com.br"
                  required
                  className="flex-1 bg-white/10 border border-white/20 text-white placeholder-slate-500 px-5 py-4 rounded-2xl focus:outline-none focus:border-teal-500 transition-colors"
                />
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white font-bold px-6 py-4 rounded-2xl transition-all whitespace-nowrap"
                >
                  <Mail className="w-4 h-4" /> Entrar na Lista
                </button>
              </form>
            )}

            <p className="text-slate-600 text-xs mt-4">Sem spam. Sem compromisso. Cancela quando quiser.</p>

            <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-slate-500">
              <div className="flex items-center gap-2"><Shield className="w-4 h-4 text-teal-400" /> Sem compromisso</div>
              <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-teal-400" /> Acesso antecipado</div>
              <div className="flex items-center gap-2"><DollarSign className="w-4 h-4 text-teal-400" /> Desconto exclusivo</div>
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
            <a href="/provedor" className="hover:text-slate-400 transition-colors">Curso para ISPs</a>
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
