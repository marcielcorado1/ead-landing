import { useState } from 'react'
import {
  Bot, Database, Globe, Code2, CheckCircle2, ArrowRight,
  Zap, Shield, DollarSign, Play, Mail, Star,
  TrendingUp, Users, Clock, ChevronDown, Lock, Cpu,
  LayoutGrid, Package, Terminal, Sparkles,
  Coins, Gift, MessageCircle,
} from 'lucide-react'

// ─────────────────────────────────────────────────────────────────────────────
// NEXCORE — Nome proprietário do sistema (EvoNexus rebrandeado)
// 38+ agentes | 193+ skills | stack: Supabase + GitHub + Vercel + Claude Code Pro
// ─────────────────────────────────────────────────────────────────────────────

// 5 exemplos realistas — o aluno vai aprender a criar apps assim (e muitos outros)
const NETFLIX_MODULES = [
  { icon: <Coins className="w-4 h-4" />, name: 'Clube de Pontos', route: '/pontos', desc: 'Fidelidade por pontualidade de pagamento', color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20' },
  { icon: <Users className="w-4 h-4" />, name: 'Indique e Ganhe', route: '/indique', desc: 'Afiliados e indicações remuneradas', color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' },
  { icon: <MessageCircle className="w-4 h-4" />, name: 'IA do Cliente', route: '/ia', desc: 'Assistente exclusivo da operadora', color: 'text-violet-400 bg-violet-400/10 border-violet-400/20' },
  { icon: <Shield className="w-4 h-4" />, name: 'Controle Parental', route: '/parental', desc: 'Filtro de conteúdo para a família', color: 'text-blue-400 bg-blue-400/10 border-blue-400/20' },
  { icon: <Gift className="w-4 h-4" />, name: 'Clube de Descontos', route: '/descontos', desc: 'Parcerias com comércio local', color: 'text-pink-400 bg-pink-400/10 border-pink-400/20' },
]

const STACK = [
  {
    name: 'NEXCORE',
    sub: 'Seu sistema operacional de IA',
    cost: 'Incluído no curso',
    badge: 'O SISTEMA',
    badgeColor: 'bg-violet-500',
    icon: <Cpu className="w-5 h-5 text-violet-400" />,
    color: 'border-violet-500/40 bg-violet-500/5',
    highlight: true,
  },
  {
    name: 'Claude Code Pro',
    sub: 'A IA que cria os apps por você',
    cost: '~$20/mês',
    badge: 'ÚNICO CUSTO',
    badgeColor: 'bg-orange-500',
    icon: <Sparkles className="w-5 h-5 text-orange-400" />,
    color: 'border-orange-500/30 bg-orange-500/5',
    highlight: true,
  },
  {
    name: 'Supabase',
    sub: 'Banco de dados + Auth',
    cost: 'Gratuito',
    icon: <Database className="w-5 h-5 text-emerald-400" />,
    color: '',
    highlight: false,
  },
  {
    name: 'GitHub',
    sub: 'Versionamento do código',
    cost: 'Gratuito',
    icon: <Code2 className="w-5 h-5 text-slate-400" />,
    color: '',
    highlight: false,
  },
  {
    name: 'Vercel',
    sub: 'Publicação em 1 clique',
    cost: 'Gratuito',
    icon: <Globe className="w-5 h-5 text-slate-400" />,
    color: '',
    highlight: false,
  },
]

const STEPS = [
  {
    num: '01',
    title: 'Aula: Instalando o NEXCORE',
    desc: 'Passo a passo em vídeo: como instalar e configurar o NEXCORE no seu VPS (R$30–50/mês). Em menos de 2 horas o sistema está rodando e pronto para criar apps.',
    time: '2 horas',
    emoji: '⚡',
  },
  {
    num: '02',
    title: 'Aula: Conhecendo os Agentes e Skills',
    desc: 'Você aprende como os 38 agentes e 193+ skills funcionam. Configura o sistema com os dados do seu provedor. A partir daqui, você manda — a IA executa.',
    time: '1 hora',
    emoji: '🤖',
  },
  {
    num: '03',
    title: 'Aula Prática: Criando seu Primeiro App',
    desc: 'Você cria do zero o Hub central (login, perfil, menu) e o primeiro módulo — Clube de Pontos ou o que preferir. O Claude Code Pro escreve o código. Você aprova e publica.',
    time: '3–7 horas',
    emoji: '🚀',
  },
  {
    num: '04',
    title: 'Publicando e Cobrando pelo SVA',
    desc: 'Deploy em Vercel com seu domínio. Clientes acessam pelo celular como um app. Você começa a cobrar pelo SVA e, com o que aprendeu, cria novos módulos no seu ritmo.',
    time: '1 hora',
    emoji: '💰',
  },
]

const FAQS = [
  {
    q: 'O que exatamente eu recebo ao comprar o curso?',
    a: 'Aulas em vídeo ensinando a instalar o NEXCORE, configurar os agentes de IA e criar seus próprios apps SVA do zero. Não são apps prontos — você aprende a criá-los com IA, do jeito que quiser.',
  },
  {
    q: 'Preciso saber programar?',
    a: 'Não. O Claude Code Pro escreve todo o código por você. Você descreve o que quer — a IA constrói. Você aprende a operar o sistema. Em poucas horas, seu primeiro app está no ar.',
  },
  {
    q: 'Quanto tempo leva para criar meu primeiro app?',
    a: 'Após instalar o NEXCORE (2 horas), você cria o primeiro app em 3 a 7 horas de trabalho prático seguindo as aulas. Cada app seguinte fica mais rápido, porque você já conhece o fluxo.',
  },
  {
    q: 'Preciso ter servidor próprio?',
    a: 'Um VPS simples de R$30–50/mês já roda o NEXCORE perfeitamente. O curso indica opções nacionais e internacionais e ensina a configurar tudo passo a passo.',
  },
  {
    q: 'Qual o custo mensal para manter o sistema rodando?',
    a: 'VPS (~R$40/mês) + Claude Code Pro (~$20/mês ≈ R$110). Supabase, GitHub e Vercel são gratuitos. Total: menos de R$160/mês para criar e manter apps ilimitados.',
  },
  {
    q: 'Quanto posso cobrar de SVA para os meus clientes?',
    a: 'Você define o preço. Referências: Clube de Pontos R$5–10/mês, Controle Parental R$15–30/mês, IA do Cliente R$14,90/mês. Com 200 clientes em um app de R$9,90 = R$1.980/mês extras.',
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-white/10 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors gap-4"
      >
        <span className="font-semibold text-slate-100 text-sm">{q}</span>
        <ChevronDown className={`w-4 h-4 text-violet-400 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-5 pb-5 text-slate-400 text-sm leading-relaxed border-t border-white/10 pt-4">{a}</div>
      )}
    </div>
  )
}

export default function SVAPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-[#07080f] text-slate-100 font-sans overflow-x-hidden">

      {/* Subtle grid background */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '60px 60px' }} />

      {/* ── Navbar ── */}
      <nav className="relative z-50 border-b border-white/5 bg-[#07080f]/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Cpu className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-black text-white tracking-tight">NEX<span className="text-violet-400">CORE</span></span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-xs text-slate-500 border border-white/10 px-3 py-1 rounded-full">
              38 agentes · 193+ skills
            </span>
            <a href="#lista-espera"
              className="text-xs font-bold bg-violet-600 hover:bg-violet-500 text-white px-4 py-2 rounded-xl transition-colors">
              Quero Acesso →
            </a>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-violet-600/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-20 pb-12 text-center">

          <div className="inline-flex items-center gap-2 text-xs font-bold text-violet-300 bg-violet-500/10 border border-violet-500/20 px-4 py-2 rounded-full mb-8">
            <Lock className="w-3 h-3" /> Exclusivo para Provedores de Internet
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">
            Aprenda a criar o <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">Netflix de Benefícios</span><br />
            do seu provedor e gere<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">receita extra todo mês</span>
          </h1>

          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-4 leading-relaxed">
            Curso prático: você instala o <strong className="text-white">NEXCORE</strong>, aprende a usar IA para criar apps de valor agregado
            e começa a cobrar SVA dos seus clientes — sem saber programar, sem contratar desenvolvedor.
          </p>
          <p className="text-sm text-slate-500 max-w-xl mx-auto mb-3">
            Stack 100% gratuita (Supabase · GitHub · Vercel) + Claude Code Pro (~$20/mês). Só isso.
          </p>
          <p className="text-xs text-violet-400/80 font-semibold max-w-xl mx-auto mb-10 bg-violet-500/10 border border-violet-500/20 px-4 py-2 rounded-full">
            📚 Você compra o curso — não um sistema pronto. Você vai criar seus próprios apps.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14">
            <a href="#lista-espera"
              className="group w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-bold px-8 py-4 rounded-2xl text-base transition-all shadow-lg shadow-violet-500/20">
              Quero Instalar o NEXCORE
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#como-funciona"
              className="w-full sm:w-auto flex items-center justify-center gap-2 border border-white/15 text-slate-400 hover:text-white hover:border-white/30 px-8 py-4 rounded-2xl text-base transition-all">
              <Play className="w-3.5 h-3.5" /> Como funciona
            </a>
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto">
            {[
              { val: '38', label: 'Agentes de IA' },
              { val: '193+', label: 'Skills prontas' },
              { val: '~$20', label: 'Único custo/mês' },
            ].map((s, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl py-4 px-3">
                <div className="text-2xl font-black text-white">{s.val}</div>
                <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Netflix de Benefícios ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-violet-400 tracking-widest uppercase">O que você vai aprender a criar</span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mt-3 mb-4">
            Exemplos de apps que você<br />pode oferecer aos seus clientes
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm leading-relaxed">
            No curso você aprende a montar um <strong className="text-white">Super App Hub</strong> com login único e módulos independentes.
            Os exemplos abaixo são ideias do que é possível criar — cada app leva poucas horas com o NEXCORE e IA.
            <strong className="text-white"> Você decide quais fazer.</strong>
          </p>
          {/* Aviso explícito */}
          <div className="mt-5 inline-flex items-start gap-3 bg-amber-500/10 border border-amber-500/25 rounded-2xl px-5 py-3 text-left max-w-xl mx-auto">
            <span className="text-amber-400 text-lg flex-shrink-0">⚠️</span>
            <p className="text-xs text-amber-200/80 leading-relaxed">
              <strong className="text-amber-300">Atenção:</strong> esses apps são sugestões de ideias — não são entregues prontos.
              O curso ensina você a instalar o NEXCORE e criar os apps que quiser,
              com IA, em poucas horas. Cada app é seu, do jeito que você preferir.
            </p>
          </div>
        </div>

        {/* Hub visual */}
        <div className="relative">
          {/* Hub central */}
          <div className="relative mx-auto max-w-3xl">
            {/* Login → Hub flow */}
            <div className="flex flex-col items-center gap-2 mb-6">
              <div className="bg-violet-500/20 border border-violet-500/40 text-violet-300 text-xs font-bold px-4 py-2 rounded-xl">
                🔑 Login Único — app.suainternet.com.br
              </div>
              <div className="w-px h-4 bg-violet-500/40" />
              <div className="bg-gradient-to-br from-violet-900/60 to-purple-900/40 border border-violet-500/30 rounded-2xl px-8 py-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <div className="w-5 h-5 bg-gradient-to-br from-violet-500 to-purple-600 rounded flex items-center justify-center">
                    <Cpu className="w-2.5 h-2.5 text-white" />
                  </div>
                  <span className="font-black text-white text-sm">Portal do Cliente</span>
                </div>
                <span className="text-[10px] text-slate-500">Perfil · Pontuação · Menu de Apps</span>
              </div>
              <div className="w-px h-4 bg-violet-500/40" />
              <div className="text-xs text-violet-400 font-bold tracking-widest">↓ Módulos independentes (PWAs)</div>
            </div>

            {/* Modules grid — 5 exemplos */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
              {NETFLIX_MODULES.map((mod, i) => (
                <div key={i}
                  className={`flex flex-col items-start gap-2 p-3 rounded-xl border bg-white/3 hover:bg-white/8 transition-all cursor-default`}>
                  <div className={`w-8 h-8 rounded-lg border flex items-center justify-center flex-shrink-0 ${mod.color}`}>
                    {mod.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-white text-xs leading-tight">{mod.name}</div>
                    <div className="text-[10px] text-slate-600 mt-0.5 leading-tight">{mod.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Hint de possibilidades */}
            <div className="mt-4 flex items-center justify-center gap-2">
              <div className="flex-1 h-px bg-white/5" />
              <span className="text-[11px] text-violet-400/60 px-3 font-semibold">
                ✦ exemplos — no curso você cria os apps que quiser para o seu provedor
              </span>
              <div className="flex-1 h-px bg-white/5" />
            </div>
          </div>
        </div>

        {/* Architecture explanation */}
        <div className="mt-10 grid md:grid-cols-2 gap-5">
          <div className="bg-white/3 border border-white/10 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-violet-500/20 rounded-lg flex items-center justify-center">
                <LayoutGrid className="w-3.5 h-3.5 text-violet-400" />
              </div>
              <span className="font-bold text-white text-sm">Super App Hub</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed mb-3">
              O hub é o app central: login, perfil do cliente, pontuação acumulada e o menu de todos os serviços.
              Funciona como a Netflix — o cliente faz login uma vez e acessa tudo.
            </p>
            <div className="bg-slate-900 rounded-xl p-3 font-mono text-[10px] text-slate-500">
              <span className="text-violet-400">app</span>.suainternet.com.br<br />
              <span className="text-slate-600">↳ login · perfil · menu</span>
            </div>
          </div>
          <div className="bg-white/3 border border-white/10 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-teal-500/20 rounded-lg flex items-center justify-center">
                <Package className="w-3.5 h-3.5 text-teal-400" />
              </div>
              <span className="font-bold text-white text-sm">PWAs Independentes</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed mb-3">
              Cada módulo é um PWA separado — você pode lançar, atualizar ou tirar do ar um módulo
              sem afetar os outros. Começa com 1 e vai adicionando no seu ritmo.
            </p>
            <div className="bg-slate-900 rounded-xl p-3 font-mono text-[10px] text-slate-500 space-y-0.5">
              <div><span className="text-teal-400">app</span>.suainternet.com.br<span className="text-yellow-400">/pontos</span></div>
              <div><span className="text-teal-400">app</span>.suainternet.com.br<span className="text-emerald-400">/indique</span></div>
              <div><span className="text-teal-400">app</span>.suainternet.com.br<span className="text-orange-400">/futebol</span></div>
              <div className="text-slate-700">... e mais {NETFLIX_MODULES.length - 3} módulos</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── O que é SVA ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-gradient-to-br from-violet-950/50 to-slate-900/50 border border-violet-500/20 rounded-3xl p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-xs font-bold text-violet-400 tracking-widest uppercase">O Que é SVA?</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-3 mb-5 leading-tight">
                Serviço de Valor Agregado —<br />a maior oportunidade do setor
              </h2>
              <p className="text-slate-400 leading-relaxed mb-4 text-sm">
                <strong className="text-white">SVA</strong> é qualquer serviço digital que você oferece junto com a internet — e cobra separado.
                Clube de pontos, controle parental, app de vagas, marketplace local.
              </p>
              <p className="text-slate-400 leading-relaxed text-sm">
                Provedores que vendem SVA têm <strong className="text-white">ticket médio 35% maior</strong> e
                <strong className="text-white"> churn 40% menor</strong>. O problema: contratar dev para criar
                esses apps custava caro demais. Até agora.
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
                Exemplos de apps e receita potencial (200 clientes)
              </div>
              <p className="text-[10px] text-slate-700 mb-3">* apps que você aprende a criar no curso</p>
              {[
                { name: 'Clube de Pontos', price: 'R$ 9,90/mês', revenue: 'R$ 1.980', color: 'text-yellow-400' },
                { name: 'Indique e Ganhe', price: 'R$ 9,90/mês', revenue: 'R$ 1.980', color: 'text-emerald-400' },
                { name: 'IA do Cliente', price: 'R$ 14,90/mês', revenue: 'R$ 2.980', color: 'text-violet-400' },
                { name: 'Controle Parental', price: 'R$ 19,90/mês', revenue: 'R$ 3.980', color: 'text-blue-400' },
                { name: 'Clube de Descontos', price: 'R$ 9,90/mês', revenue: 'R$ 1.980', color: 'text-pink-400' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                  <div className={`text-sm font-semibold ${item.color}`}>{item.name}</div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-slate-600">{item.price}</span>
                    <span className="font-bold text-white">{item.revenue}<span className="text-slate-600 font-normal">/mês</span></span>
                  </div>
                </div>
              ))}
              <div className="flex items-center justify-between p-3 rounded-xl bg-teal-500/10 border border-teal-500/20 mt-2">
                <span className="text-sm font-bold text-white">5 apps criados por você</span>
                <span className="font-black text-teal-400 text-sm">R$ 12.900/mês</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── O que é o NEXCORE ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-violet-400 tracking-widest uppercase">O Sistema</span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mt-3 mb-4">
            NEXCORE: a ferramenta que você<br />vai aprender a usar no curso
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm leading-relaxed">
            O curso ensina você a instalar e operar o NEXCORE no seu servidor.
            Com 38 agentes especializados e IA, você descreve o app que quer criar
            para seus clientes — e o sistema constrói. <strong className="text-white">Em poucas horas, seu app está no ar.</strong>
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {[
            { icon: <Bot className="w-5 h-5 text-violet-400" />, title: '38 Agentes Especializados', desc: 'Cada agente tem uma função: criador de código, revisor, deploy, banco de dados, segurança...' },
            { icon: <Zap className="w-5 h-5 text-teal-400" />, title: '193+ Skills Prontas', desc: 'Skills são tarefas pré-programadas. Seu agente já sabe criar app, conectar banco, publicar na web.' },
            { icon: <Terminal className="w-5 h-5 text-blue-400" />, title: 'Dashboard Web Completo', desc: 'Painel visual para gerenciar tudo: agentes, relatórios, rotinas automáticas, integrações.' },
            { icon: <Cpu className="w-5 h-5 text-purple-400" />, title: 'Roda no Seu Servidor', desc: 'Instalado no seu VPS. Você tem controle total. Seus dados não saem da sua infraestrutura.' },
            { icon: <Shield className="w-5 h-5 text-emerald-400" />, title: 'Stack 100% Gratuita', desc: 'Supabase, GitHub e Vercel têm tiers gratuitos robustos. Você começa sem gastar nada além do Claude Code Pro.' },
            { icon: <TrendingUp className="w-5 h-5 text-orange-400" />, title: 'Escala com Você', desc: 'Começou com 1 módulo? O NEXCORE cria o segundo, o terceiro. Cada app novo fica mais rápido de fazer.' },
          ].map((item, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/8 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="font-bold text-white text-sm mb-2">{item.title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Stack ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-teal-400 tracking-widest uppercase">Stack</span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-3 mb-3">
            Tudo gratuito. Um único custo.
          </h2>
          <p className="text-slate-500 text-sm max-w-lg mx-auto">
            Você investe apenas no Claude Code Pro — a IA que constrói os apps. O resto é zero.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          {STACK.map((tool, i) => (
            <div key={i} className={`relative border rounded-2xl p-4 flex flex-col gap-3 ${tool.highlight ? tool.color : 'border-white/10 bg-white/3'}`}>
              {tool.badge && (
                <span className={`absolute -top-2 right-3 text-[9px] font-black ${tool.badgeColor} text-white px-2 py-0.5 rounded-full`}>
                  {tool.badge}
                </span>
              )}
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${tool.highlight ? 'bg-white/10' : 'bg-white/5'}`}>
                {tool.icon}
              </div>
              <div>
                <div className="font-bold text-white text-xs">{tool.name}</div>
                <div className="text-[10px] text-slate-500 mt-0.5 leading-relaxed">{tool.sub}</div>
              </div>
              <div className={`text-xs font-bold mt-auto ${tool.highlight ? 'text-orange-400' : 'text-emerald-400'}`}>
                {tool.cost}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-5 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl text-center">
          <p className="text-sm text-slate-300">
            💡 <strong className="text-white">Custo total mensal:</strong>{' '}
            VPS (~R$40) + Claude Code Pro (~R$110) ={' '}
            <span className="text-emerald-400 font-bold">menos de R$160/mês</span> para criar e manter apps ilimitados.
          </p>
        </div>
      </div>

      {/* ── Como Funciona ── */}
      <div id="como-funciona" className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-violet-400 tracking-widest uppercase">O Curso — Passo a Passo</span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-3 mb-3">
            Do zero ao seu primeiro app<br />em poucos dias
          </h2>
          <p className="text-slate-500 text-sm max-w-lg mx-auto">
            Aulas práticas em vídeo. Sem programação. Você aprende a instalar, configurar e criar
            apps reais para cobrar dos seus clientes — com IA fazendo o trabalho pesado.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-8 top-10 bottom-10 w-px bg-gradient-to-b from-violet-500/50 via-teal-500/30 to-transparent hidden lg:block" />
          <div className="space-y-4">
            {STEPS.map((step, i) => (
              <div key={i} className="relative flex gap-5 lg:gap-8">
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600/20 to-purple-600/10 border border-violet-500/30 flex flex-col items-center justify-center z-10">
                  <span className="text-2xl leading-none">{step.emoji}</span>
                  <span className="text-[9px] font-mono text-violet-400 mt-0.5">{step.num}</span>
                </div>
                <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/8 transition-colors">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-bold text-white text-sm">{step.title}</h3>
                    <span className="flex-shrink-0 text-[10px] font-bold text-teal-400 bg-teal-400/10 border border-teal-400/20 px-2 py-0.5 rounded-full">
                      {step.time}
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Cálculo de ROI ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="bg-gradient-to-br from-teal-950/60 to-emerald-950/30 border border-teal-500/20 rounded-3xl p-8 lg:p-12">
          <div className="text-center mb-8">
            <span className="text-xs font-bold text-teal-400 tracking-widest uppercase">Potencial de Receita</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-3">
              O que você pode faturar<br />depois de criar seus apps
            </h2>
            <p className="text-slate-500 text-sm mt-2 max-w-lg mx-auto">
              Simulação — provedor de 1.000 clientes, 20% de adesão por módulo criado (200 clientes)
            </p>
          </div>
          <div className="grid sm:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'App 1 criado no curso', val: 'R$ 1.980', sub: 'ex: Clube de Pontos', color: 'text-yellow-400' },
              { label: 'App 2 (você cria depois)', val: '+ R$ 2.980', sub: 'ex: IA do Cliente', color: 'text-violet-400' },
              { label: 'App 3 (você cria depois)', val: '+ R$ 1.980', sub: 'ex: Indique e Ganhe', color: 'text-emerald-400' },
              { label: 'Total com 3 apps', val: 'R$ 6.940', sub: 'receita extra/mês', color: 'text-teal-400' },
            ].map((item, i) => (
              <div key={i} className="bg-white/5 rounded-2xl p-5 text-center border border-white/10">
                <div className="text-xs text-slate-500 mb-2">{item.label}</div>
                <div className={`text-2xl font-black ${item.color}`}>{item.val}</div>
                <div className="text-xs text-slate-600 mt-1">{item.sub}</div>
              </div>
            ))}
          </div>
          <div className="text-center text-sm text-slate-400">
            Custo operacional: <strong className="text-white">R$160/mês</strong> (VPS + Claude Code Pro) →
            Lucro líquido com 3 apps: <strong className="text-teal-400 text-lg">R$6.780/mês</strong>
          </div>
          <p className="text-center text-xs text-slate-600 mt-3 max-w-lg mx-auto">
            * Simulação. Os apps são criados por você após o curso — o resultado depende do seu provedor,
            preço cobrado e adesão dos clientes. Os números acima são estimativas para ilustrar o potencial.
          </p>
        </div>
      </div>

      {/* ── Para quem é ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-6">
            <div className="text-sm font-bold text-emerald-400 mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Para quem É
            </div>
            <div className="space-y-3">
              {[
                'Dono de provedor de internet (qualquer tamanho)',
                'Quer aprender a criar SVAs e aumentar receita sem dev',
                'Quer oferecer apps exclusivos para os clientes do provedor',
                'Quer autonomia — criar novos apps sem depender de terceiros',
                'Disposto a aprender e investir ~R$160/mês para operar',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6">
            <div className="text-sm font-bold text-red-400 mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4" /> Para quem NÃO É
            </div>
            <div className="space-y-3">
              {[
                'Quem espera receber apps prontos para usar',
                'Quem não quer aprender a instalar e operar o NEXCORE',
                'Quem não quer pagar Claude Code Pro (~$20/mês)',
                'Empresas fora do setor de provedores de internet',
                'Quem busca "plug and play" sem nenhum esforço',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-slate-400">
                  <div className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-400 font-bold text-xs flex items-center justify-center">✕</div>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── FAQ ── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-violet-400 tracking-widest uppercase">Dúvidas</span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-3">Perguntas frequentes</h2>
        </div>
        <div className="space-y-3">
          {FAQS.map((faq, i) => <FAQItem key={i} {...faq} />)}
        </div>
      </div>

      {/* ── Lista de Espera ── */}
      <div id="lista-espera" className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="relative bg-gradient-to-br from-violet-900/40 via-purple-900/20 to-slate-900/40 border border-violet-500/30 rounded-3xl p-8 lg:p-16 text-center overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-violet-500/10 rounded-full blur-3xl" />
          </div>
          <div className="relative">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-violet-300 bg-violet-500/10 border border-violet-500/20 px-4 py-2 rounded-full mb-6">
              <Star className="w-3 h-3" /> Vagas limitadas para o acesso inicial
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 leading-tight">
              Aprenda a criar seus próprios apps<br />e gere receita com SVA
            </h2>
            <p className="text-slate-400 max-w-lg mx-auto mb-8 text-sm leading-relaxed">
              Entre na lista de espera do curso. Os primeiros <strong className="text-white">30 alunos</strong> recebem
              acesso com <strong className="text-violet-300">50% de desconto</strong> e suporte direto na instalação do NEXCORE.
            </p>

            {submitted ? (
              <div className="inline-flex items-center gap-3 bg-violet-500/20 border border-violet-500/40 text-violet-300 px-8 py-4 rounded-2xl font-semibold">
                <CheckCircle2 className="w-5 h-5" />
                Você está na lista! Avisaremos assim que abrir as vagas.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@seuprovedor.com.br"
                  required
                  className="flex-1 bg-white/10 border border-white/20 text-white placeholder-slate-600 px-5 py-4 rounded-2xl focus:outline-none focus:border-violet-500 transition-colors text-sm"
                />
                <button type="submit"
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-bold px-6 py-4 rounded-2xl transition-all text-sm whitespace-nowrap">
                  <Mail className="w-4 h-4" /> Quero Acesso
                </button>
              </form>
            )}

            <div className="flex flex-wrap items-center justify-center gap-5 mt-8 text-xs text-slate-600">
              <div className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-violet-400" /> Sem spam</div>
              <div className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-violet-400" /> Vagas limitadas</div>
              <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-violet-400" /> Suporte na instalação</div>
              <div className="flex items-center gap-1.5"><DollarSign className="w-3.5 h-3.5 text-violet-400" /> 50% off para os primeiros 30</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-violet-500 to-purple-600 rounded-md flex items-center justify-center">
              <Cpu className="w-3 h-3 text-white" />
            </div>
            <span className="font-black text-slate-500 text-sm">NEX<span className="text-violet-400">CORE</span></span>
          </div>
          <p className="text-xs text-slate-700">© 2026 Kem Soluções · Para provedores de internet</p>
          <p className="text-xs text-slate-800">Criado com o próprio NEXCORE.</p>
        </div>
      </footer>

    </div>
  )
}
