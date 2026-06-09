import './App.css'
import {
  Wifi, Bot, Code2, Database, Globe, CheckCircle2,
  ArrowRight, Zap, Shield, TrendingUp, Users, BookOpen,
  Terminal, Package, ChevronDown, Star, Clock, DollarSign,
  Smartphone, BarChart3, MessageSquare, Wrench, Play, Mail
} from 'lucide-react'
import { useState } from 'react'

// ── Data ─────────────────────────────────────────────────────────────────────

const PAINS = [
  {
    icon: <Clock className="w-6 h-6 text-red-400" />,
    title: "Atendimento manual que não escala",
    desc: "Sua equipe responde as mesmas perguntas repetidamente — boleto, senha Wi-Fi, status da conexão. Tempo jogado fora.",
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-orange-400" />,
    title: "Todo provedor vende a mesma coisa",
    desc: "Internet virou commodity. Quem sobrevive é quem cria serviços extras. Mas você não tem time nem orçamento para desenvolver.",
  },
  {
    icon: <DollarSign className="w-6 h-6 text-yellow-400" />,
    title: "Dev caro ou sistema engessado",
    desc: "Contratar desenvolvedor está fora do orçamento. Os sistemas do mercado custam caro e não fazem exatamente o que você precisa.",
  },
]

const TOOLS = [
  { name: 'Claude Code', role: 'IA que escreve e executa código', cost: '~$20/mês', required: true, icon: <Bot className="w-5 h-5" /> },
  { name: 'EvoNexus', role: 'Sistema operacional de agentes de IA', cost: 'Gratuito', required: false, icon: <Zap className="w-5 h-5" /> },
  { name: 'GitHub', role: 'Versionamento do código', cost: 'Gratuito', required: false, icon: <Code2 className="w-5 h-5" /> },
  { name: 'Supabase', role: 'Banco de dados + Auth + API', cost: 'Gratuito', required: false, icon: <Database className="w-5 h-5" /> },
  { name: 'Vercel', role: 'Deploy em 1 clique', cost: 'Gratuito', required: false, icon: <Globe className="w-5 h-5" /> },
]

const MODULES = [
  {
    num: '00',
    emoji: '🆓',
    title: 'Setup e Primeiros Passos',
    tag: 'GRATUITO',
    tagColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30',
    desc: 'Configure o ambiente completo em 2 horas e rode seu primeiro agente de IA. Sem enrolação.',
    items: ['Instalar Claude Code', 'Criar conta GitHub + Supabase + Vercel', 'Configurar EvoNexus no servidor', 'Primeiro agente rodando'],
  },
  {
    num: '01',
    emoji: '🧠',
    title: 'Fundamentos de Agentes de IA',
    tag: 'ESSENCIAL',
    tagColor: 'text-teal-400 bg-teal-400/10 border-teal-400/30',
    desc: 'Entenda a lógica de agentes, skills e rotinas. Crie seu primeiro agente personalizado para o provedor.',
    items: ['Como o Claude Code pensa', 'Criando agentes customizados', 'Skills e automações', 'Memória persistente'],
  },
  {
    num: '02',
    emoji: '🌐',
    title: 'Portal do Cliente',
    tag: 'PROJETO REAL',
    tagColor: 'text-blue-400 bg-blue-400/10 border-blue-400/30',
    desc: 'Crie e publique um portal completo: login, painel do cliente, 2ª via de boleto, suporte.',
    items: ['React + Supabase do zero', 'Autenticação de clientes', '2ª via de boleto integrada', 'Deploy com domínio próprio'],
  },
  {
    num: '03',
    emoji: '📱',
    title: 'WhatsApp Bot para Atendimento',
    tag: 'PROJETO REAL',
    tagColor: 'text-blue-400 bg-blue-400/10 border-blue-400/30',
    desc: 'Bot que responde boleto, status de conexão e abre chamados — sem contratar atendente.',
    items: ['Integração Evolution API', 'Bot de boleto e suporte', 'Escalada para humano', 'Notificações proativas'],
  },
  {
    num: '04',
    emoji: '🔧',
    title: 'Gestão de Instalações',
    tag: 'PROJETO REAL',
    tagColor: 'text-blue-400 bg-blue-400/10 border-blue-400/30',
    desc: 'App interno para ordens de serviço, técnicos em campo e dashboard em tempo real.',
    items: ['CRUD de ordens de serviço', 'App mobile para técnicos', 'Notificações automáticas', 'Relatório diário por IA'],
  },
  {
    num: '05',
    emoji: '💰',
    title: 'Serviços Agregados',
    tag: 'RECEITA EXTRA',
    tagColor: 'text-purple-400 bg-purple-400/10 border-purple-400/30',
    desc: 'Crie serviços pagos para seus clientes: controle parental, benefícios, apps de valor.',
    items: ['App de controle parental', 'Benefícios para clientes', 'Pagamento recorrente', 'Como precificar'],
  },
  {
    num: '06',
    emoji: '⚙️',
    title: 'Automações e Rotinas',
    tag: 'PILOTO AUTOMÁTICO',
    tagColor: 'text-orange-400 bg-orange-400/10 border-orange-400/30',
    desc: 'Relatório de inadimplência, alertas de link caído, briefing diário. Tudo automático.',
    items: ['Relatório de inadimplência', 'Monitoramento de links', 'Morning briefing por IA', 'ISP no piloto automático'],
  },
]

const PLANS = [
  {
    name: 'Mini-Curso Gratuito',
    price: 'R$ 0',
    period: '',
    highlight: false,
    cta: 'Começar Grátis',
    ctaStyle: 'border border-teal-500 text-teal-400 hover:bg-teal-500/10',
    items: [
      'Módulo 0 completo (setup)',
      'App funcionando em 7 dias',
      'Acesso à comunidade básica',
      'Requer Claude Code (~$20/mês)',
    ],
  },
  {
    name: 'Trilha Provedor',
    price: 'R$ 97',
    period: '/mês',
    highlight: true,
    cta: 'Entrar na Lista de Espera',
    ctaStyle: 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white hover:from-teal-400 hover:to-emerald-400',
    badge: 'MAIS POPULAR',
    items: [
      'Todos os 7 módulos',
      'Novos módulos todo mês',
      'Comunidade fechada de ISPs',
      'Suporte por WhatsApp',
      'Calls mensais ao vivo',
    ],
  },
  {
    name: 'Curso Essencial',
    price: 'R$ 297',
    period: ' único',
    highlight: false,
    cta: 'Entrar na Lista de Espera',
    ctaStyle: 'border border-slate-500 text-slate-300 hover:bg-slate-500/10',
    items: [
      'Módulos 0 a 6 completos',
      'Acesso vitalício',
      'Atualizações incluídas',
      'Comunidade básica',
    ],
  },
]

const FAQS = [
  {
    q: 'Preciso saber programar para fazer o curso?',
    a: 'Não. O Claude Code escreve o código por você. Você precisa entender lógica básica, mas não precisa memorizar nenhuma sintaxe. Provedores sem nenhuma experiência técnica concluíram o Módulo 0 em menos de 3 horas.',
  },
  {
    q: 'Qual o custo total para começar?',
    a: 'Apenas a assinatura do Claude Code (~$20/mês ≈ R$110/mês). GitHub, Supabase e Vercel são gratuitos no tier inicial. O mini-curso é gratuito. Você pode construir e publicar apps reais gastando menos de R$110/mês.',
  },
  {
    q: 'Para qual tamanho de provedor é indicado?',
    a: 'Ideal para ISPs entre 100 e 5.000 clientes. Se você ainda está começando, vai acelerar muito. Se já é grande, vai economizar muito em desenvolvimento e automações internas.',
  },
  {
    q: 'Em quanto tempo vejo resultado?',
    a: 'No Módulo 0 (gratuito) você já tem um app publicado em 7 dias. No Módulo 2 você já tem um portal do cliente funcional. Resultados concretos em semanas, não meses.',
  },
  {
    q: 'O conteúdo fica desatualizado quando o EvoNexus mudar?',
    a: 'Não. Sou dono de ISP e uso EvoNexus no dia a dia. Quando a ferramenta evolui, eu evoluo junto e atualizo o conteúdo. Os alunos da Trilha Provedor têm acesso a todas as atualizações.',
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
              <Wifi className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white">ISP<span className="text-gradient">.AI</span></span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-slate-400">
            <a href="#modulos" className="hover:text-white transition-colors">Módulos</a>
            <a href="#stack" className="hover:text-white transition-colors">Stack</a>
            <a href="#precos" className="hover:text-white transition-colors">Preços</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </div>
          <a
            href="#lista-espera"
            className="text-sm font-semibold bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-4 py-2 rounded-xl hover:from-teal-400 hover:to-emerald-400 transition-all"
          >
            Entrar na Lista →
          </a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <div className="relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-teal-500/10 rounded-full blur-3xl" />
          <div className="absolute top-20 left-1/4 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-3xl" />
        </div>

        <Section className="text-center pt-24 pb-16 relative">
          <div className="animate-fade-up">
            <Badge className="text-teal-400 bg-teal-400/10 border-teal-400/30 mb-6">
              <Wifi className="w-3 h-3" />
              Para Provedores de Internet
            </Badge>
          </div>

          <h1 className="animate-fade-up text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6">
            Crie apps e automações<br />
            para o seu provedor<br />
            <span className="text-gradient">sem programador.</span>
          </h1>

          <p className="animate-fade-up text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Aprenda a usar <strong className="text-white">Claude Code + EvoNexus</strong> para construir portal do cliente,
            bot de WhatsApp, gestão de OS e muito mais — com ferramentas <strong className="text-white">gratuitas</strong>.
            Único investimento: ~$20/mês.
          </p>

          <div className="animate-fade-up flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a
              href="#lista-espera"
              className="group w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white font-bold px-8 py-4 rounded-2xl text-lg transition-all shadow-lg shadow-teal-500/20"
            >
              Quero Aprender Grátis
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#modulos"
              className="w-full sm:w-auto flex items-center justify-center gap-2 border border-white/20 text-slate-300 hover:text-white hover:border-white/40 px-8 py-4 rounded-2xl text-lg transition-all"
            >
              <Play className="w-4 h-4" /> Ver os Módulos
            </a>
          </div>

          {/* Social proof bar */}
          <div className="animate-fade-up flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
            {[
              { icon: <Users className="w-4 h-4 text-teal-400" />, text: 'Para ISPs de 100 a 5.000 clientes' },
              { icon: <Clock className="w-4 h-4 text-teal-400" />, text: 'App publicado em 7 dias' },
              { icon: <DollarSign className="w-4 h-4 text-teal-400" />, text: 'Começa de graça' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                {item.icon}
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* Terminal preview */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-20">
          <div className="glass rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
            <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-2 text-xs text-slate-500 font-mono">claude — terminal</span>
            </div>
            <div className="p-6 font-mono text-sm space-y-2">
              <div className="text-slate-500">$ <span className="text-white">claude "crie um portal do cliente para meu provedor com login, boleto e suporte"</span></div>
              <div className="text-teal-400">● Analisando requisitos...</div>
              <div className="text-teal-400">● Criando estrutura React + Supabase...</div>
              <div className="text-teal-400">● Implementando autenticação...</div>
              <div className="text-teal-400">● Integrando gateway de boleto...</div>
              <div className="text-emerald-400">✓ Portal criado em src/components/ClientPortal.tsx</div>
              <div className="text-emerald-400">✓ 3 rotas criadas: /login /painel /suporte</div>
              <div className="text-emerald-400">✓ Pronto para deploy no Vercel</div>
              <div className="text-slate-500 mt-2">$ <span className="text-white animate-pulse">_</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Dores ── */}
      <Section>
        <SectionLabel>O Problema</SectionLabel>
        <h2 className="text-3xl sm:text-4xl font-black text-white text-center mb-4">
          Você reconhece alguma dessas situações?
        </h2>
        <p className="text-slate-400 text-center max-w-2xl mx-auto mb-12">
          A maioria dos provedores trava nos mesmos problemas. Não é falta de esforço — é falta de ferramenta certa.
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

      {/* ── Solução ── */}
      <div className="bg-gradient-to-b from-teal-950/30 to-transparent">
        <Section>
          <SectionLabel>A Solução</SectionLabel>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-6 leading-tight">
                Aprenda a criar suas próprias soluções com <span className="text-gradient">Inteligência Artificial</span>
              </h2>
              <p className="text-slate-400 leading-relaxed mb-6">
                Em vez de contratar dev ou pagar por sistemas caros, você aprende a usar o <strong className="text-white">Claude Code + EvoNexus</strong> para construir exatamente o que o seu provedor precisa.
              </p>
              <p className="text-slate-400 leading-relaxed mb-8">
                Módulo a módulo, você cria projetos reais: portal do cliente, bot de WhatsApp, gestão de OSes, relatórios automáticos. Tudo publicado, tudo funcionando.
              </p>
              <div className="space-y-3">
                {[
                  'Sem precisar saber programar',
                  'Ferramentas gratuitas (exceto Claude Code)',
                  'Resultados em dias, não meses',
                  'Conteúdo criado por dono de ISP',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-teal-400 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-teal-500/20 rounded-lg flex items-center justify-center">
                  <Wrench className="w-4 h-4 text-teal-400" />
                </div>
                <span className="font-bold text-white">O que você vai construir</span>
              </div>
              <div className="space-y-3">
                {[
                  { icon: <Globe className="w-4 h-4 text-blue-400" />, label: 'Portal do Cliente', sub: 'Login, boleto, suporte' },
                  { icon: <MessageSquare className="w-4 h-4 text-green-400" />, label: 'Bot WhatsApp', sub: 'Atendimento 24h automático' },
                  { icon: <Package className="w-4 h-4 text-purple-400" />, label: 'Gestão de OSes', sub: 'Equipe técnica organizada' },
                  { icon: <Smartphone className="w-4 h-4 text-orange-400" />, label: 'App para Clientes', sub: 'Serviços extras com receita' },
                  { icon: <BarChart3 className="w-4 h-4 text-teal-400" />, label: 'Relatórios Automáticos', sub: 'IA gera, você decide' },
                  { icon: <Bot className="w-4 h-4 text-pink-400" />, label: 'Agentes de IA', sub: 'Trabalham enquanto você dorme' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{item.label}</div>
                      <div className="text-xs text-slate-500">{item.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>
      </div>

      {/* ── Stack ── */}
      <Section id="stack">
        <SectionLabel>A Stack</SectionLabel>
        <h2 className="text-3xl sm:text-4xl font-black text-white text-center mb-4">
          Ferramentas gratuitas. Um único investimento.
        </h2>
        <p className="text-slate-400 text-center max-w-2xl mx-auto mb-12">
          Toda a stack ensinada no curso é gratuita ou tem tier gratuito. A única assinatura obrigatória é o Claude Code — a IA que faz o trabalho pesado por você.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
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
            💡 <strong className="text-white">Custo total para começar:</strong>{' '}
            <span className="text-teal-400 font-bold">~$20/mês</span> (só Claude Code).
            GitHub, Supabase e Vercel são <span className="text-emerald-400 font-bold">gratuitos</span> até você escalar.
          </p>
        </div>
      </Section>

      {/* ── Módulos ── */}
      <Section id="modulos">
        <SectionLabel>O Conteúdo</SectionLabel>
        <h2 className="text-3xl sm:text-4xl font-black text-white text-center mb-4">
          7 módulos. Do setup ao piloto automático.
        </h2>
        <p className="text-slate-400 text-center max-w-2xl mx-auto mb-12">
          Cada módulo entrega um projeto real funcionando. Você não aprende teoria — você lança produto.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          {MODULES.map((mod, i) => (
            <div key={i} className={`glass rounded-2xl p-6 hover:bg-white/10 transition-colors ${i === 0 ? 'md:col-span-2 border-teal-500/30 bg-teal-500/5' : ''}`}>
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{mod.emoji}</span>
                  <div>
                    <div className="text-xs font-mono text-slate-500 mb-0.5">MÓDULO {mod.num}</div>
                    <h3 className="font-bold text-white text-lg leading-tight">{mod.title}</h3>
                  </div>
                </div>
                <Badge className={`${mod.tagColor} flex-shrink-0`}>{mod.tag}</Badge>
              </div>
              <p className="text-slate-400 text-sm mb-4 leading-relaxed">{mod.desc}</p>
              <div className="grid grid-cols-2 gap-2">
                {mod.items.map((item, j) => (
                  <div key={j} className="flex items-center gap-2 text-xs text-slate-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Quem sou ── */}
      <div className="bg-gradient-to-b from-transparent via-slate-900/50 to-transparent">
        <Section>
          <div className="glass rounded-3xl p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <Badge className="text-teal-400 bg-teal-400/10 border-teal-400/30 mb-4">
                  <Shield className="w-3 h-3" /> Quem criou esse curso
                </Badge>
                <h2 className="text-3xl font-black text-white mb-4">
                  Criado por quem vive o mesmo problema que você
                </h2>
                <p className="text-slate-400 leading-relaxed mb-4">
                  Sou <strong className="text-white">Marciel Corado</strong>, dono da <strong className="text-white">Kem Soluções</strong> — um provedor de acesso à internet que fornece fibra óptica para residências, empresas e governo.
                </p>
                <p className="text-slate-400 leading-relaxed mb-4">
                  Usei EvoNexus + Claude Code para resolver os mesmos problemas que você enfrenta. Criei o portal do cliente, automatizei o atendimento no WhatsApp, e construí um sistema de gestão interno — gastando menos de $20/mês.
                </p>
                <p className="text-slate-400 leading-relaxed">
                  Agora transformei tudo isso em curso para que qualquer dono de ISP consiga fazer o mesmo, independente de saber programar.
                </p>
              </div>
              <div className="space-y-4">
                {[
                  { icon: <Wifi className="w-5 h-5 text-teal-400" />, label: 'Dono de ISP há mais de 5 anos', sub: 'Kem Soluções — fibra óptica' },
                  { icon: <Terminal className="w-5 h-5 text-teal-400" />, label: 'Usuário ativo do EvoNexus', sub: 'Usa no provedor e em apps em produção' },
                  { icon: <Code2 className="w-5 h-5 text-teal-400" />, label: '3 apps em produção', sub: 'Recompensa, Futsal Sorteio, Vida2026' },
                  { icon: <BookOpen className="w-5 h-5 text-teal-400" />, label: 'Conteúdo sempre atualizado', sub: 'Aprende e atualiza o curso junto' },
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

      {/* ── Preços ── */}
      <Section id="precos">
        <SectionLabel>Planos</SectionLabel>
        <h2 className="text-3xl sm:text-4xl font-black text-white text-center mb-4">
          Comece grátis. Escale quando quiser.
        </h2>
        <p className="text-slate-400 text-center max-w-2xl mx-auto mb-12">
          O Módulo 0 é gratuito para sempre. Você só investe no curso se quiser ir mais fundo.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {PLANS.map((plan, i) => (
            <div
              key={i}
              className={`relative glass rounded-2xl p-6 flex flex-col ${
                plan.highlight ? 'border-teal-500/50 shadow-xl shadow-teal-500/10 bg-teal-500/5 scale-105' : ''
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                  {plan.badge}
                </div>
              )}
              <div className="mb-6">
                <div className="font-bold text-white text-lg mb-2">{plan.name}</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-white">{plan.price}</span>
                  <span className="text-slate-400 text-sm">{plan.period}</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#lista-espera"
                className={`w-full text-center py-3 rounded-xl font-semibold text-sm transition-all ${plan.ctaStyle}`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </Section>

      {/* ── FAQ ── */}
      <Section id="faq">
        <SectionLabel>Dúvidas Frequentes</SectionLabel>
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
              <Star className="w-3 h-3" /> Lista de Espera Aberta
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
              Seja o primeiro a saber<br />quando lançar
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto mb-10">
              Entre na lista de espera e garanta <strong className="text-white">acesso antecipado</strong> com desconto exclusivo para os primeiros 50 provedores.
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

            <p className="text-slate-600 text-xs mt-4">Sem spam. Cancelamento a qualquer momento.</p>

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
              <Wifi className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-slate-400">ISP<span className="text-teal-400">.AI</span></span>
          </div>
          <p className="text-sm text-slate-600">
            © 2026 Kem Soluções. Criado com Claude Code + EvoNexus.
          </p>
          <div className="text-xs text-slate-700">
            Construído exatamente como ensinamos no curso.
          </div>
        </div>
      </footer>

    </div>
  )
}
