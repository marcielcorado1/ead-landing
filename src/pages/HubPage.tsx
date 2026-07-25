import { useState } from 'react'
import {
  ArrowRight, CheckCircle2, ChevronDown, X,
  Sparkles, Zap, Shield, TrendingDown,
  Users, Briefcase, Wifi, Calculator, ShoppingBag,
  Phone, Star, Lock, BarChart3, Bot,
  RefreshCw, CreditCard, Globe,
} from 'lucide-react'

// ── Constantes ────────────────────────────────────────────────────────────────

const HUB_PRICE = 97
const INDIVIDUAL_COSTS = [
  { name: 'ChatGPT Plus',      provider: 'OpenAI',     price: 100 },
  { name: 'Claude Pro',        provider: 'Anthropic',  price: 100 },
  { name: 'Gemini Advanced',   provider: 'Google',     price: 100 },
  { name: 'X Premium+',        provider: 'xAI / Grok', price: 150 },
  { name: 'DeepSeek (API)',    provider: 'DeepSeek',   price:  80 },
]
const TOTAL_INDIVIDUAL = INDIVIDUAL_COSTS.reduce((s, c) => s + c.price, 0)
const ECONOMY = TOTAL_INDIVIDUAL - HUB_PRICE
const ECONOMY_PCT = Math.round((ECONOMY / TOTAL_INDIVIDUAL) * 100)

const WA_SUPORTE = `https://wa.me/5561985750506?text=${encodeURIComponent('Olá! Quero saber mais sobre o HUB de IA.')}`

// ── Dados ─────────────────────────────────────────────────────────────────────

const MODELS = [
  {
    name: 'ChatGPT / GPT-4o',
    provider: 'OpenAI',
    dot: 'bg-emerald-500',
    ring: 'ring-emerald-500/30',
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    best: 'Tarefas do dia a dia, código e escrita rápida',
    desc: 'O mais popular do mundo. Raciocínio ágil, criação de conteúdo e respostas naturais para qualquer situação. Excelente ponto de partida para qualquer tarefa.',
  },
  {
    name: 'Claude Sonnet',
    provider: 'Anthropic',
    dot: 'bg-amber-500',
    ring: 'ring-amber-500/30',
    badge: 'bg-amber-50 text-amber-700 border-amber-200',
    best: 'Textos longos, análise de documentos e redação',
    desc: 'Destaque em leitura e síntese de documentos extensos. Melhor escolha para revisões, relatórios detalhados e redação profissional com tom refinado.',
  },
  {
    name: 'Gemini Pro',
    provider: 'Google',
    dot: 'bg-blue-500',
    ring: 'ring-blue-500/30',
    badge: 'bg-blue-50 text-blue-700 border-blue-200',
    best: 'Pesquisa com dados recentes e análise de imagens',
    desc: 'IA multimodal do Google com acesso a informações atualizadas. Ideal para pesquisas que cruzam texto, imagem e dados em tempo real.',
  },
  {
    name: 'Grok',
    provider: 'xAI',
    dot: 'bg-slate-700',
    ring: 'ring-slate-500/30',
    badge: 'bg-slate-100 text-slate-700 border-slate-300',
    best: 'Informação em tempo real e respostas diretas',
    desc: 'Acesso à web em tempo real, raciocínio avançado e respostas diretas sem filtro excessivo. Forte para contextos que exigem atualidade e objetividade.',
  },
  {
    name: 'DeepSeek V3',
    provider: 'DeepSeek',
    dot: 'bg-cyan-500',
    ring: 'ring-cyan-500/30',
    badge: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    best: 'Raciocínio lógico, matemática e tarefas técnicas',
    desc: 'Alto desempenho em problemas estruturados, matemática e análises técnicas. Contexto longo e respostas precisas para tarefas que exigem rigor.',
  },
  {
    name: '+ Novos modelos',
    provider: 'Em breve',
    dot: 'bg-purple-400',
    ring: 'ring-purple-500/30',
    badge: 'bg-purple-50 text-purple-700 border-purple-200',
    best: 'Incluídos automaticamente, sem custo extra',
    desc: 'Quando o mercado lança algo relevante, adicionamos ao hub. Você não precisa fazer nada — o acesso chega junto com a sua assinatura.',
  },
]

const FOR_WHO = [
  {
    icon: <Calculator className="w-5 h-5 text-purple-500" />,
    bg: 'border-purple-100 bg-purple-50/40',
    title: 'Profissionais e Freelancers',
    items: ['Use a IA certa para cada tipo de entrega', 'Pare de pagar 3 assinaturas separadas', 'R$97 em vez de R$530+/mês'],
  },
  {
    icon: <Briefcase className="w-5 h-5 text-indigo-500" />,
    bg: 'border-indigo-100 bg-indigo-50/40',
    title: 'Agências e Consultorias',
    items: ['Equipe inteira com acesso unificado', 'IA certa para copy, análise e pesquisa', 'Uma fatura, múltiplos usuários'],
  },
  {
    icon: <Users className="w-5 h-5 text-blue-500" />,
    bg: 'border-blue-100 bg-blue-50/40',
    title: 'Times e Escritórios',
    items: ['Sem gerenciar 5 assinaturas diferentes', 'Controle centralizado de acesso', 'Custo previsível todo mês'],
  },
  {
    icon: <ShoppingBag className="w-5 h-5 text-rose-500" />,
    bg: 'border-rose-100 bg-rose-50/40',
    title: 'E-commerce e Varejo',
    items: ['Copy com uma IA, revisão com outra', 'Análise de dados e atendimento integrado', 'Cada tarefa com o modelo ideal'],
  },
  {
    icon: <Wifi className="w-5 h-5 text-teal-500" />,
    bg: 'border-teal-100 bg-teal-50/40',
    title: 'Provedores de Internet',
    items: ['Ofereça acesso às IAs para seus clientes', 'Diferencial de retenção e fidelização', 'Painel de revendedor self-service'],
  },
  {
    icon: <Globe className="w-5 h-5 text-orange-500" />,
    bg: 'border-orange-100 bg-orange-50/40',
    title: 'Revendedores (B2B2C)',
    items: ['Distribua o HUB com a sua marca', 'Gestão de clientes independentes', 'R$1/cliente ativo/mês (mín. 20)'],
  },
]

const INCLUDES = [
  { icon: <Bot className="w-4 h-4 text-purple-500" />,       text: '5 modelos de IA no mesmo login' },
  { icon: <Zap className="w-4 h-4 text-yellow-500" />,       text: 'Acesso em menos de 5 minutos' },
  { icon: <CreditCard className="w-4 h-4 text-green-500" />, text: 'Pagamento em real — sem câmbio, sem IOF' },
  { icon: <RefreshCw className="w-4 h-4 text-blue-500" />,   text: 'Novos modelos incluídos automaticamente' },
  { icon: <Shield className="w-4 h-4 text-teal-500" />,      text: 'Dados preservados por 30 dias se cancelar' },
  { icon: <Users className="w-4 h-4 text-indigo-500" />,     text: 'Plano revendedor com painel de gestão' },
  { icon: <Lock className="w-4 h-4 text-slate-500" />,       text: 'Sem fidelidade e sem multa de cancelamento' },
  { icon: <Star className="w-4 h-4 text-amber-500" />,       text: 'Suporte em português via WhatsApp' },
]

const FAQS = [
  {
    q: 'O que é exatamente o HUB de IA?',
    a: 'É uma plataforma que reúne as principais IAs do mercado — ChatGPT (OpenAI), Claude (Anthropic), Gemini (Google), Grok (xAI) e DeepSeek — em um único login, uma única assinatura, sem câmbio. Você escolhe qual usar a cada momento dependendo do que precisa.',
  },
  {
    q: 'Por que não assinar cada IA diretamente?',
    a: `Porque assinar as cinco individualmente custa mais de R$${TOTAL_INDIVIDUAL}/mês — mais câmbio e IOF sobre quatro delas. Com o HUB de IA você paga R$${HUB_PRICE}/mês em real, sem taxas de câmbio, e acessa tudo pelo mesmo lugar. A diferença é de R$${ECONOMY} por mês.`,
  },
  {
    q: 'Qual IA devo usar para cada situação?',
    a: 'ChatGPT para tarefas do dia a dia e código; Claude para textos longos e análise de documentos; Gemini para pesquisas com dados recentes ou imagens; Grok para informação em tempo real; DeepSeek para raciocínio lógico e matemática. Você experimenta e decide o que funciona melhor para cada tipo de trabalho.',
  },
  {
    q: 'Preciso de conhecimento técnico para usar?',
    a: 'Nenhum. A interface é simples: você entra no hub, escolhe a IA do momento e começa a conversar em português. Não tem configuração de API, não tem chave de acesso para gerenciar, não tem nada complexo.',
  },
  {
    q: 'Como funciona o plano Revendedor?',
    a: 'Você assina o plano Revendedor e recebe um painel para convidar seus próprios clientes. Cada cliente tem login independente. Você paga R$1 por cliente ativo por mês, com mínimo de 20. Se tiver 35 clientes em um mês, paga R$35. Cobrança no fechamento mensal pelo count real.',
  },
  {
    q: 'Posso começar no plano Solo e migrar para Revendedor depois?',
    a: 'Sim. Você começa usando para o seu negócio e migra quando quiser oferecer para seus clientes. O histórico e as configurações ficam preservados.',
  },
  {
    q: 'Quanto tempo para ter acesso após a compra?',
    a: 'Menos de 5 minutos. Você recebe um link por email e WhatsApp logo após a confirmação do pagamento. Clique, defina sua senha e já está usando. Sem aprovação manual.',
  },
  {
    q: 'Posso cancelar quando quiser?',
    a: 'Sim, sem fidelidade e sem multa. Se cancelar, seus dados ficam preservados por 30 dias para eventual reativação.',
  },
]

// ── Componentes ────────────────────────────────────────────────────────────────

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-slate-100 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors gap-4"
      >
        <span className="font-semibold text-slate-800 text-sm leading-snug">{q}</span>
        <ChevronDown className={`w-5 h-5 text-purple-500 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-5 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">
          {a}
        </div>
      )}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function HubPage() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a href="/hub" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-black text-slate-900">HUB <span className="text-purple-600">de IA</span></span>
          </a>

          <div className="hidden md:flex items-center gap-6 text-sm text-slate-600">
            <a href="#modelos"    className="hover:text-purple-600 transition-colors">Modelos</a>
            <a href="#economia"   className="hover:text-purple-600 transition-colors">Economia</a>
            <a href="#para-quem"  className="hover:text-purple-600 transition-colors">Para quem</a>
            <a href="#planos"     className="hover:text-purple-600 transition-colors">Planos</a>
            <a href="#faq"        className="hover:text-purple-600 transition-colors">FAQ</a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://fincontrol-smoky.vercel.app/auth/login"
              className="hidden md:block text-sm text-slate-600 hover:text-purple-600 font-medium transition-colors"
            >
              Entrar
            </a>
            <a
              href="#planos"
              className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold px-4 py-2 rounded-xl transition-colors text-sm shadow-md shadow-purple-500/20"
            >
              Assinar agora <ArrowRight className="w-4 h-4" />
            </a>
            <button className="md:hidden text-slate-600" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-3">
            {[['#modelos','Modelos'],['#economia','Economia'],['#para-quem','Para quem'],['#planos','Planos'],['#faq','FAQ']].map(([href, label]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)} className="block text-sm text-slate-700 hover:text-purple-600 font-medium py-1">{label}</a>
            ))}
            <a href="https://fincontrol-smoky.vercel.app/auth/login" className="block text-sm text-purple-600 font-semibold py-1">Entrar na conta →</a>
          </div>
        )}
      </nav>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-purple-50/80 via-white to-white">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-purple-400/8 rounded-full blur-3xl" />
          <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-indigo-400/6 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-16 text-center relative">
          <div className="mb-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-700 border border-purple-200 uppercase tracking-widest">
              <Sparkles className="w-3 h-3" />
              Acesse 5 IAs por menos do que paga em 1
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-slate-900 leading-[1.05] tracking-tight mb-6">
            Chega de pagar em dólar.<br />
            Chega de 5 assinaturas.<br />
            <span className="bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent">
              Tudo por R${HUB_PRICE}/mês.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto mb-8 leading-relaxed">
            ChatGPT, Claude, Gemini, Grok e DeepSeek em um único hub —
            em <strong className="text-slate-800">reais</strong>, com um único login,
            por <strong className="text-slate-800">81% menos</strong> do que custaria assinar separado.
          </p>

          {/* Brand pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {[
              { name: 'ChatGPT',  color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
              { name: 'Claude',   color: 'bg-amber-100   text-amber-800   border-amber-200'   },
              { name: 'Gemini',   color: 'bg-blue-100    text-blue-800    border-blue-200'    },
              { name: 'Grok',     color: 'bg-slate-100   text-slate-800   border-slate-300'   },
              { name: 'DeepSeek', color: 'bg-cyan-100    text-cyan-800    border-cyan-200'    },
              { name: '+ mais',   color: 'bg-purple-100  text-purple-800  border-purple-200'  },
            ].map(m => (
              <span key={m.name} className={`px-3 py-1.5 rounded-full text-xs font-bold border ${m.color}`}>
                {m.name}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <a
              href="#planos"
              className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-black px-8 py-4 rounded-xl transition-colors text-base w-full sm:w-auto justify-center shadow-lg shadow-purple-500/25"
            >
              Assinar por R${HUB_PRICE}/mês <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#modelos"
              className="inline-flex items-center gap-2 border-2 border-slate-200 text-slate-700 hover:border-purple-300 hover:text-purple-700 font-semibold px-8 py-4 rounded-xl transition-colors text-base w-full sm:w-auto justify-center"
            >
              Ver os 5 modelos disponíveis
            </a>
          </div>

          {/* Stats bar */}
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14">
            {[
              { val: '5',       label: 'IAs no mesmo hub',   color: 'text-purple-600' },
              { val: '1 login', label: 'Para acessar tudo',  color: 'text-indigo-600' },
              { val: 'R$97',    label: 'Por mês, em reais',  color: 'text-green-600'  },
              { val: '< 5min',  label: 'Para ter acesso',    color: 'text-orange-500' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className={`text-2xl font-black ${s.color}`}>{s.val}</div>
                <div className="text-slate-400 text-xs mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Problema ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-12">
          <span className="text-xs font-bold tracking-widest text-purple-600 uppercase border border-purple-200 bg-purple-50 px-4 py-1.5 rounded-full inline-block mb-4">
            O Problema
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
            Usar as melhores IAs ficou caro e bagunçado
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Não é falta de opção. É excesso de fragmentação — e você paga o preço todo mês.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              emoji: '💸',
              bg: 'bg-red-50',
              title: `R$${TOTAL_INDIVIDUAL}+/mês assinar tudo separado`,
              desc: `ChatGPT Plus, Claude Pro, Gemini Advanced, X Premium+ e DeepSeek via API somam mais de R$${TOTAL_INDIVIDUAL} por mês — fora câmbio e IOF sobre a maioria deles. Todo mês, todo ano.`,
            },
            {
              emoji: '🔀',
              bg: 'bg-orange-50',
              title: '5 abas, 5 logins, 5 contextos diferentes',
              desc: 'Você começa no ChatGPT, precisa revisar no Claude, verifica dados no Gemini. Três plataformas abertas ao mesmo tempo, cada uma pedindo login diferente. Produtividade desperdiçada.',
            },
            {
              emoji: '💱',
              bg: 'bg-yellow-50',
              title: 'Câmbio e IOF em cima de tudo',
              desc: 'Quatro das cinco principais IAs cobram em dólar. Quando o dólar sobe, sua conta sobe junto. Sem aviso, sem controle. Fatura imprevisível todo mês.',
            },
          ].map((p, i) => (
            <div key={i} className="border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className={`w-14 h-14 ${p.bg} rounded-2xl flex items-center justify-center mb-5 text-2xl`}>
                {p.emoji}
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">{p.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Como funciona ── */}
      <section className="bg-slate-50/70 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-bold tracking-widest text-purple-600 uppercase border border-purple-200 bg-purple-50 px-4 py-1.5 rounded-full inline-block mb-4">
              Como Funciona
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
              Três passos. Menos de 5 minutos.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01', emoji: '📋',
                title: 'Escolha seu plano',
                desc: 'Solo se você vai usar para si mesmo. Revendedor se quer oferecer para seus clientes. Assinatura em reais, sem câmbio.',
              },
              {
                step: '02', emoji: '🔑',
                title: 'Receba o acesso',
                desc: 'Link por email e WhatsApp em menos de 5 minutos. Clique, defina sua senha e entre. Sem aprovação manual, sem configuração técnica.',
              },
              {
                step: '03', emoji: '🧠',
                title: 'Use a IA certa para cada tarefa',
                desc: 'No hub você vê os 5 modelos disponíveis e escolhe o melhor para o que precisa agora. Troque a qualquer momento, sem trocar de plataforma.',
              },
            ].map((s, i) => (
              <div key={i} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm relative">
                {i < 2 && (
                  <div className="hidden md:block absolute top-8 right-0 translate-x-1/2 text-slate-300 text-xl z-10">→</div>
                )}
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-5xl font-black text-purple-100 select-none leading-none">{s.step}</span>
                  <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">
                    {s.emoji}
                  </div>
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Modelos ── */}
      <section id="modelos" className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-14">
          <span className="text-xs font-bold tracking-widest text-purple-600 uppercase border border-purple-200 bg-purple-50 px-4 py-1.5 rounded-full inline-block mb-4">
            Os Modelos
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
            Cada IA tem um ponto forte. Agora você tem todas.
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Não fique preso em um único modelo. Use o melhor para cada contexto —
            sem pagar por cinco assinaturas separadas.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {MODELS.map((m, i) => (
            <div key={i} className={`border border-slate-100 rounded-2xl p-6 ring-2 ${m.ring} hover:shadow-md transition-shadow`}>
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full flex-shrink-0 ${m.dot}`} />
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{m.provider}</p>
                    <h3 className="font-bold text-slate-900 text-base leading-tight">{m.name}</h3>
                  </div>
                </div>
              </div>
              <p className="text-[11px] font-bold text-purple-600 bg-purple-50 border border-purple-100 rounded-lg px-2.5 py-1.5 mb-3 leading-snug">
                ✦ Melhor para: {m.best}
              </p>
              <p className="text-slate-500 text-sm leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Comparativo de preço ── */}
      <section id="economia" className="bg-slate-900 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-900/60 text-purple-300 border border-purple-700 uppercase tracking-widest mb-4">
              <TrendingDown className="w-3 h-3" />
              Economia real
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Economize{' '}
              <span className="text-purple-400">R${ECONOMY.toLocaleString('pt-BR')}/mês</span>
              {' '}todos os meses
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Compare o que você pagaria assinando cada IA separada com o que paga no HUB.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 items-start mb-8">
            {/* Sem hub */}
            <div className="rounded-2xl border border-red-500/30 bg-red-950/20 p-6">
              <p className="text-xs font-bold text-red-400 uppercase tracking-wider mb-5">Sem o HUB de IA</p>
              <div className="space-y-3 mb-5">
                {INDIVIDUAL_COSTS.map((c, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div>
                      <span className="text-slate-300 text-sm">{c.name}</span>
                      <span className="text-slate-600 text-xs ml-2">({c.provider})</span>
                    </div>
                    <span className="text-slate-300 text-sm font-semibold">R${c.price}/mês</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-red-500/20 pt-4 flex items-center justify-between">
                <span className="text-red-400 font-bold">Total mensal</span>
                <span className="text-red-400 font-black text-2xl">R${TOTAL_INDIVIDUAL}<span className="text-sm font-semibold">/mês</span></span>
              </div>
              <p className="text-xs text-slate-600 mt-2">= R${(TOTAL_INDIVIDUAL * 12).toLocaleString('pt-BR')}/ano · mais câmbio e IOF</p>
            </div>

            {/* Com hub */}
            <div className="rounded-2xl border-2 border-purple-500 bg-purple-950/30 p-6 relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-[10px] font-black px-3 py-1 rounded-full whitespace-nowrap">
                RECOMENDADO
              </span>
              <p className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-5">Com HUB de IA</p>
              <div className="space-y-3 mb-5">
                {INDIVIDUAL_COSTS.map((c, i) => (
                  <div key={i} className="flex items-center justify-between opacity-50">
                    <span className="text-slate-500 text-sm line-through">{c.name}</span>
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  </div>
                ))}
              </div>
              <div className="border-t border-purple-500/30 pt-4 flex items-center justify-between">
                <span className="text-purple-300 font-bold">HUB de IA Solo</span>
                <span className="text-white font-black text-2xl">R${HUB_PRICE}<span className="text-sm font-semibold text-slate-400">/mês</span></span>
              </div>
              <p className="text-xs text-slate-500 mt-2">= R${(HUB_PRICE * 12).toLocaleString('pt-BR')}/ano · em reais · sem câmbio</p>
            </div>
          </div>

          {/* Destaque da economia */}
          <div className="rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 p-7 text-center">
            <p className="text-purple-200 text-sm mb-1">Sua economia mensal com o HUB de IA</p>
            <p className="text-white font-black text-4xl mb-1">R${ECONOMY.toLocaleString('pt-BR')}/mês</p>
            <p className="text-purple-200 text-sm">
              = R${(ECONOMY * 12).toLocaleString('pt-BR')}/ano · {ECONOMY_PCT}% mais barato que assinar separado
            </p>
            <a href="#planos" className="inline-flex items-center gap-2 mt-5 bg-white text-purple-700 hover:bg-purple-50 font-black px-6 py-3 rounded-xl transition-colors">
              Quero economizar agora <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── Para quem é ── */}
      <section id="para-quem" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-bold tracking-widest text-purple-600 uppercase border border-purple-200 bg-purple-50 px-4 py-1.5 rounded-full inline-block mb-4">
              Para quem é
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
              Se você usa IA no trabalho, o HUB é para você
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Qualquer pessoa que use pelo menos duas IAs diferentes — ou pague mais de R$100/mês em assinaturas — sai no lucro.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FOR_WHO.map((fw, i) => (
              <div key={i} className={`rounded-2xl border p-6 hover:shadow-sm transition-shadow ${fw.bg}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-sm">
                    {fw.icon}
                  </div>
                  <h3 className="font-bold text-slate-800 text-sm">{fw.title}</h3>
                </div>
                <ul className="space-y-2">
                  {fw.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── O que está incluso ── */}
      <section className="bg-slate-50/70 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-widest text-purple-600 uppercase border border-purple-200 bg-purple-50 px-4 py-1.5 rounded-full inline-block mb-4">
              O que está incluso
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              Tudo que você precisa em um lugar só
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {INCLUDES.map((item, i) => (
              <div key={i} className="bg-white border border-slate-100 rounded-2xl p-5 flex items-start gap-3 shadow-sm">
                <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0">
                  {item.icon}
                </div>
                <p className="text-sm text-slate-700 font-medium leading-snug">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Planos ── */}
      <section id="planos" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-bold tracking-widest text-purple-600 uppercase border border-purple-200 bg-purple-50 px-4 py-1.5 rounded-full inline-block mb-4">
              Planos
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
              Dois planos. Uma escolha simples.
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Solo se é para o seu uso. Revendedor se quer distribuir para seus clientes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">

            {/* Solo */}
            <div className="rounded-2xl border-2 border-slate-200 bg-white p-8 flex flex-col shadow-sm">
              <span className="text-[10px] font-bold border rounded-full px-2.5 py-1 bg-slate-50 text-slate-600 border-slate-200 w-fit mb-5">
                Para o seu uso
              </span>
              <h3 className="font-black text-slate-900 text-2xl mb-2">HUB de IA Solo</h3>
              <p className="text-slate-500 text-sm mb-6 leading-snug">
                Acesso a todas as IAs disponíveis com um único login. Ideal para profissionais, freelancers e equipes.
              </p>
              <div className="mb-2">
                <span className="text-5xl font-black text-slate-900">R${HUB_PRICE}</span>
                <span className="text-slate-400 text-sm">/mês</span>
              </div>
              <p className="text-xs text-green-600 font-semibold mb-6">
                Vs R${TOTAL_INDIVIDUAL}+/mês assinando separado — {ECONOMY_PCT}% mais barato
              </p>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  'ChatGPT / GPT-4o (OpenAI)',
                  'Claude Sonnet (Anthropic)',
                  'Gemini Pro (Google)',
                  'Grok (xAI)',
                  'DeepSeek V3',
                  'Novos modelos automaticamente',
                  'Pagamento em reais — sem câmbio',
                  '1 login para acessar tudo',
                  'Suporte em português',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className="w-full text-center font-bold text-sm py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white transition-colors"
              >
                Assinar HUB de IA Solo
              </a>
            </div>

            {/* Revendedor */}
            <div className="rounded-2xl border-2 border-purple-500 bg-white p-8 flex flex-col relative shadow-xl shadow-purple-500/10">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-[10px] font-black px-3 py-1 rounded-full whitespace-nowrap">
                MAIOR POTENCIAL
              </span>
              <span className="text-[10px] font-bold border rounded-full px-2.5 py-1 bg-purple-50 text-purple-600 border-purple-200 w-fit mb-5">
                Para revender para clientes
              </span>
              <h3 className="font-black text-slate-900 text-2xl mb-2">HUB de IA Revendedor</h3>
              <p className="text-slate-500 text-sm mb-6 leading-snug">
                Para provedores e empresas que querem oferecer acesso às IAs como serviço para seus próprios clientes.
              </p>
              <div className="mb-1">
                <span className="text-5xl font-black text-slate-900">R$1</span>
                <span className="text-slate-400 text-sm">/cliente/mês</span>
              </div>
              <p className="text-xs text-purple-600 font-semibold mb-6">
                Mínimo 20 clientes · a partir de R$20/mês
              </p>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  'Tudo do plano Solo (para você)',
                  'Painel de revendedor self-service',
                  'Convide clientes por email ou CSV',
                  'Cada cliente com login independente',
                  'Cobrança pelo uso real no fechamento',
                  'R$1/cliente ativo (mínimo 20 = R$20/mês)',
                  'Suporte prioritário',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className="w-full text-center font-bold text-sm py-3.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white transition-colors"
              >
                Assinar HUB de IA Revendedor
              </a>
            </div>
          </div>

          {/* Exemplo revendedor */}
          <div className="mt-8 max-w-3xl mx-auto bg-purple-50 border border-purple-100 rounded-2xl p-6">
            <p className="text-sm font-bold text-slate-800 mb-4">Como funciona a cobrança do Revendedor na prática:</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { label: 'Você tem 10 clientes', val: 'Paga R$20,00', note: 'mínimo garantido', color: 'bg-orange-50 text-orange-700 border-orange-200' },
                { label: 'Você tem 35 clientes', val: 'Paga R$35,00', note: 'exato pelo uso', color: 'bg-green-50 text-green-700 border-green-200' },
                { label: 'Você tem 80 clientes', val: 'Paga R$80,00', note: 'escala linear', color: 'bg-blue-50 text-blue-700 border-blue-200' },
                { label: 'Você tem 200 clientes', val: 'Paga R$200,00', note: 'margem alta', color: 'bg-purple-50 text-purple-700 border-purple-200' },
              ].map((row, i) => (
                <div key={i} className={`flex items-center justify-between px-4 py-3 rounded-xl border ${row.color}`}>
                  <span className="text-sm font-medium">{row.label}</span>
                  <div className="text-right">
                    <span className="text-sm font-black block">{row.val}</span>
                    <span className="text-[10px] opacity-70">{row.note}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-center text-xs text-slate-400 mt-6">
            Acesso imediato após a compra · Sem fidelidade · Cancele quando quiser
          </p>
        </div>
      </section>

      {/* ── Quem criou ── */}
      <section className="bg-slate-50/70 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <span className="text-xs font-bold tracking-widest text-purple-600 uppercase border border-purple-200 bg-purple-50 px-4 py-1.5 rounded-full inline-flex items-center gap-1.5 mb-5">
                  <Shield className="w-3 h-3" /> Quem está por trás
                </span>
                <h2 className="text-3xl font-black text-slate-900 mb-4 leading-tight">
                  Criado por quem usava três IAs separadas — e cansou de pagar caro por isso
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Sou <strong className="text-slate-900">Marciel Corado</strong>, dono da{' '}
                  <strong className="text-slate-900">Kem Soluções</strong> — provedor de fibra óptica há mais de 17 anos.
                  Usava ChatGPT, Claude e Gemini no dia a dia — três logins, três cobranças em dólar, três contextos separados.
                  O HUB de IA nasceu da minha própria necessidade.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Tudo testado primeiro no meu próprio negócio, antes de oferecer para qualquer pessoa.
                </p>
              </div>
              <div className="space-y-3">
                {[
                  { icon: <Wifi className="w-5 h-5 text-purple-500" />, label: 'Dono de ISP há mais de 17 anos', sub: 'Kem Soluções — fibra óptica para residências e empresas' },
                  { icon: <BarChart3 className="w-5 h-5 text-purple-500" />, label: 'Usuário das 5 principais IAs no dia a dia', sub: 'Testou cada modelo para descobrir quando usar qual' },
                  { icon: <RefreshCw className="w-5 h-5 text-purple-500" />, label: 'Novos modelos adicionados sem custo extra', sub: 'Quando o mercado lança algo relevante, você recebe junto' },
                  { icon: <Star className="w-5 h-5 text-purple-500" />, label: 'Suporte em português, não em inglês', sub: 'Atendimento direto via WhatsApp, sem chatbot' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-slate-50">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 text-sm">{item.label}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{item.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-12">
          <span className="text-xs font-bold tracking-widest text-purple-600 uppercase border border-purple-200 bg-purple-50 px-4 py-1.5 rounded-full inline-block mb-4">
            Dúvidas
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">Perguntas frequentes</h2>
        </div>
        <div className="space-y-3">
          {FAQS.map((faq, i) => <FAQItem key={i} {...faq} />)}
        </div>
      </section>

      {/* ── CTA Final ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="relative rounded-3xl bg-gradient-to-br from-purple-600 to-indigo-700 p-8 lg:p-16 text-center overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          </div>
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
              Pare de pagar R${TOTAL_INDIVIDUAL}+/mês.<br className="hidden sm:block" />
              Comece a pagar R${HUB_PRICE}/mês.
            </h2>
            <p className="text-purple-100 text-lg max-w-xl mx-auto mb-10">
              ChatGPT, Claude, Gemini, Grok e DeepSeek num único hub.
              Em reais. Sem câmbio. Acesso em menos de 5 minutos.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#planos"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-purple-700 hover:bg-purple-50 font-black px-8 py-4 rounded-2xl text-lg transition-colors shadow-lg"
              >
                Assinar por R${HUB_PRICE}/mês <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href={WA_SUPORTE}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 border-2 border-white/40 text-white hover:border-white/70 font-semibold px-8 py-4 rounded-2xl text-base transition-colors"
              >
                <Phone className="w-4 h-4" /> Falar com suporte
              </a>
            </div>
            <p className="text-purple-200 text-xs mt-6">
              Sem fidelidade · Cancele quando quiser · Acesso imediato após a compra
            </p>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-100 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-black text-slate-800">HUB <span className="text-purple-600">de IA</span></span>
          </div>
          <div className="flex items-center gap-6 text-xs text-slate-400">
            <a href="/privacidade" className="hover:text-slate-600 transition-colors">Privacidade</a>
            <a href="https://nexcore.kemsolucoes.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 transition-colors">KemOS Academy</a>
            <a href="/fincontrol" className="hover:text-slate-600 transition-colors">FinControl</a>
            <a href={WA_SUPORTE} target="_blank" rel="noopener noreferrer" className="hover:text-purple-600 transition-colors">Suporte</a>
          </div>
          <p className="text-xs text-slate-400">© 2026 Kem Soluções. Todos os direitos reservados.</p>
        </div>
      </footer>

    </div>
  )
}
