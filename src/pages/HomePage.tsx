import { useState } from 'react'
import {
  ArrowRight, CheckCircle2, ChevronDown, X,
  BarChart3, Sparkles, Users, ShieldCheck,
  Wifi, Briefcase, Calculator, ShoppingBag,
  BookOpen, Star, Phone, TrendingDown, Zap,
} from 'lucide-react'

// ── Dados ─────────────────────────────────────────────────────────────────────

const LLMS = [
  {
    provider: 'OpenAI',
    model: 'ChatGPT / GPT-4o',
    dot: 'bg-emerald-500',
    desc: 'O modelo mais popular do mundo. Raciocínio avançado, criação de conteúdo, análise de código e conversas naturais para qualquer contexto.',
    tag: 'IA Generativa',
    tagColor: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    individualPrice: 'R$ 100/mês no ChatGPT Plus',
  },
  {
    provider: 'Anthropic',
    model: 'Claude Sonnet',
    dot: 'bg-amber-500',
    desc: 'Preferido para textos longos, análise de documentos complexos e raciocínio cuidadoso. Excelente em resumos, revisões e redação profissional.',
    tag: 'IA Generativa',
    tagColor: 'bg-amber-50 text-amber-700 border-amber-100',
    individualPrice: 'R$ 100/mês no Claude Pro',
  },
  {
    provider: 'Google',
    model: 'Gemini Pro',
    dot: 'bg-blue-500',
    desc: 'IA multimodal do Google. Ideal para pesquisas com informação recente, análise de imagens e tarefas que cruzam texto com dados visuais.',
    tag: 'IA Generativa',
    tagColor: 'bg-blue-50 text-blue-700 border-blue-100',
    individualPrice: 'R$ 100/mês no Gemini Advanced',
  },
  {
    provider: 'xAI',
    model: 'Grok',
    dot: 'bg-slate-800',
    desc: 'A IA do Elon Musk. Acesso a informações em tempo real, raciocínio avançado e respostas diretas sem filtro excessivo.',
    tag: 'IA Generativa',
    tagColor: 'bg-slate-100 text-slate-700 border-slate-200',
    individualPrice: 'R$ 150/mês no X Premium+',
  },
  {
    provider: 'DeepSeek',
    model: 'DeepSeek V3',
    dot: 'bg-cyan-500',
    desc: 'Alto desempenho em raciocínio lógico, matemática e tarefas técnicas. Respostas precisas, contexto longo e análises detalhadas.',
    tag: 'IA Generativa',
    tagColor: 'bg-cyan-50 text-cyan-700 border-cyan-100',
    individualPrice: 'Disponível apenas via API',
  },
  {
    provider: '+ Novos',
    model: 'Mais modelos em breve',
    dot: 'bg-purple-400',
    desc: 'Novos modelos são adicionados conforme o mercado evolui. Você recebe automaticamente — sem pagar a mais, sem nova configuração.',
    tag: 'Em breve',
    tagColor: 'bg-purple-50 text-purple-700 border-purple-100',
    individualPrice: 'Incluído na assinatura',
  },
]

const INDIVIDUAL_COSTS = [
  { provider: 'ChatGPT Plus (OpenAI)',    price: 100 },
  { provider: 'Claude Pro (Anthropic)',   price: 100 },
  { provider: 'Gemini Advanced (Google)', price: 100 },
  { provider: 'Grok (X Premium+)',        price: 150 },
  { provider: 'DeepSeek (API paga)',      price:  80 },
]
const INDIVIDUAL_TOTAL = INDIVIDUAL_COSTS.reduce((s, c) => s + c.price, 0)
const HUB_PRICE = 97

const USE_CASES = [
  {
    icon: <Wifi className="w-5 h-5 text-blue-500" />,
    sector: 'Provedores de Internet (ISP)',
    color: 'border-blue-100 bg-blue-50/30',
    items: ['Ofereça acesso às IAs para seus clientes', 'Diferencial de retenção e upsell', 'Painel de revendedor self-service'],
  },
  {
    icon: <Briefcase className="w-5 h-5 text-purple-500" />,
    sector: 'Agências e Consultorias',
    color: 'border-purple-100 bg-purple-50/30',
    items: ['Acesse a melhor IA para cada tarefa do cliente', 'Entregue resultados com a IA certa para cada contexto', 'Ofereça o HUB como serviço agregado'],
  },
  {
    icon: <Calculator className="w-5 h-5 text-green-500" />,
    sector: 'Profissionais e Freelancers',
    color: 'border-green-100 bg-green-50/30',
    items: ['Escolha a IA ideal para cada tipo de trabalho', 'Sem ficar preso em um único ecossistema', 'Pague R$97 em vez de R$500+ por mês'],
  },
  {
    icon: <Calculator className="w-5 h-5 text-orange-500" />,
    sector: 'Escritórios e Equipes',
    color: 'border-orange-100 bg-orange-50/30',
    items: ['Toda a equipe acessa o mesmo hub unificado', 'Sem gerenciar 5 assinaturas diferentes', 'Controle centralizado e custo previsível'],
  },
  {
    icon: <ShoppingBag className="w-5 h-5 text-rose-500" />,
    sector: 'E-commerce e Varejo',
    color: 'border-rose-100 bg-rose-50/30',
    items: ['Copy com ChatGPT, revisão com Claude', 'Análise de dados com Gemini', 'Cada tarefa com a IA mais indicada'],
  },
  {
    icon: <Users className="w-5 h-5 text-teal-500" />,
    sector: 'Revendedores (B2B2C)',
    color: 'border-teal-100 bg-teal-50/30',
    items: ['Distribua acesso ao HUB para seus clientes', 'Painel de gestão de sub-tenants', 'R$ 1,00 por cliente ativo/mês (mínimo 20)'],
  },
]

const PLAN_RESELLER = {
  name: 'HUB de IA Revendedor',
  badge: 'Maior potencial',
  desc: 'Para provedores e empresas que querem oferecer acesso às melhores IAs como serviço para seus clientes.',
  modules: [
    'Tudo do plano Solo (para você)',
    'Painel de revendedor self-service',
    'Convide clientes por email ou CSV',
    'Cada cliente tem login e acesso independente',
    'Cobrança pelo uso real no fechamento do mês',
    'R$ 1,00 por cliente ativo (mínimo 20 = R$ 20/mês)',
    'Suporte prioritário',
  ],
  kiwifyLink: '#',
}

const FAQS = [
  {
    q: 'O que é exatamente o HUB de IA?',
    a: 'É uma plataforma que centraliza o acesso às principais LLMs do mercado — Claude (Anthropic), ChatGPT (OpenAI), Gemini (Google), Grok (xAI) e DeepSeek — em um único lugar, com um único login e uma única assinatura. Você escolhe qual IA usar a cada conversa, dependendo do que precisa.',
  },
  {
    q: 'Por que usar o HUB em vez de assinar cada IA separadamente?',
    a: `Assinar todas as principais IAs individualmente custa mais de R$${INDIVIDUAL_TOTAL}/mês. Com o HUB de IA você acessa todas por R$${HUB_PRICE}/mês — pagando cerca de 20% do que custaria separado. Além disso, você elimina o trabalho de gerenciar 5 assinaturas, 5 logins e 5 janelas abertas ao mesmo tempo.`,
  },
  {
    q: 'Preciso entender de tecnologia para usar?',
    a: 'Não. A interface é simples: você abre o HUB, escolhe a IA que quer usar naquele momento e começa a conversar em português. Não tem configuração técnica, não tem API key para gerenciar, não tem nada complexo.',
  },
  {
    q: 'Qual IA devo usar para cada coisa?',
    a: 'No geral: ChatGPT para tarefas cotidianas e código; Claude para textos longos, análise de documentos e redação; Gemini para pesquisa com dados recentes ou análise de imagens; Grok para informação em tempo real; DeepSeek para raciocínio lógico e matemática. Mas você experimenta e decide o que funciona melhor para o seu caso.',
  },
  {
    q: 'Como funciona o plano Revendedor?',
    a: 'Você assina o plano Revendedor e ganha acesso a um painel onde pode convidar seus próprios clientes. Cada cliente tem login independente e acessa o HUB pelo próprio painel. Você paga R$ 1,00 por cliente ativo por mês, com mínimo de 20. Se tiver 35 clientes em outubro, paga R$ 35,00 no fechamento do mês.',
  },
  {
    q: 'Posso começar solo e depois virar revendedor?',
    a: 'Sim. Você pode começar com o plano Solo para usar no seu negócio e migrar para o plano Revendedor quando quiser começar a oferecer para seus clientes. Sem perda de histórico.',
  },
  {
    q: 'Quanto tempo leva para ter acesso após a compra?',
    a: 'Menos de 5 minutos. Você recebe um link para criar sua senha por email e WhatsApp. Clique, defina a senha e já está usando. Sem aprovação manual.',
  },
  {
    q: 'Posso cancelar quando quiser?',
    a: 'Sim. Sem fidelidade, sem multa. Se cancelar, seus dados ficam preservados por 30 dias para eventual reativação.',
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

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-white" />
            </div>
            <span className="font-black text-slate-900">Fin<span className="text-green-500">Control</span></span>
          </a>

          <div className="hidden md:flex items-center gap-6 text-sm text-slate-600">
            <a href="#modelos"    className="hover:text-purple-600 transition-colors">Modelos</a>
            <a href="#economia"   className="hover:text-purple-600 transition-colors">Economia</a>
            <a href="#para-quem"  className="hover:text-purple-600 transition-colors">Para quem é</a>
            <a href="#revendedor" className="hover:text-purple-600 transition-colors">Revendedores</a>
            <a href="#planos"     className="hover:text-purple-600 transition-colors">Planos</a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://fincontrol-smoky.vercel.app/auth/login"
              className="hidden md:block text-sm text-slate-600 hover:text-purple-600 font-medium transition-colors"
            >
              Entrar
            </a>
            <a href="#planos" className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold px-4 py-2 rounded-xl transition-colors text-sm">
              Assinar agora <ArrowRight className="w-4 h-4" />
            </a>
            <button className="md:hidden text-slate-600" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-3">
            {[['#modelos','Modelos'],['#economia','Economia'],['#para-quem','Para quem é'],['#revendedor','Revendedores'],['#planos','Planos']].map(([href, label]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)} className="block text-sm text-slate-700 hover:text-purple-600 font-medium py-1">{label}</a>
            ))}
            <a href="https://fincontrol-smoky.vercel.app/auth/login" className="block text-sm text-purple-600 font-semibold py-1">Entrar na conta →</a>
          </div>
        )}
      </nav>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-purple-50/70 to-white">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-purple-400/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-16 text-center relative">
          <div className="mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-600 border border-purple-100 uppercase tracking-widest">
              <Sparkles className="w-3 h-3" />
              HUB de IA • Um único plano para todas as IAs
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-slate-900 leading-[1.05] tracking-tight mb-6">
            Claude. Gemini. ChatGPT.<br />
            Grok. DeepSeek.<br />
            <span className="bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent">Um único plano.</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto mb-6 leading-relaxed">
            Pare de gerenciar 5 assinaturas e 5 logins. Com o HUB de IA você acessa
            <strong className="text-slate-800"> todas as principais LLMs do mercado</strong> em um único lugar —
            pagando cerca de <strong className="text-slate-800">20% do que custaria separado.</strong>
          </p>

          {/* LLM brand pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {[
              { name: 'ChatGPT', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
              { name: 'Claude',  color: 'bg-amber-100 text-amber-800 border-amber-200' },
              { name: 'Gemini',  color: 'bg-blue-100 text-blue-800 border-blue-200' },
              { name: 'Grok',    color: 'bg-slate-100 text-slate-800 border-slate-200' },
              { name: 'DeepSeek',color: 'bg-cyan-100 text-cyan-800 border-cyan-200' },
              { name: '+ mais',  color: 'bg-purple-100 text-purple-800 border-purple-200' },
            ].map((llm) => (
              <span key={llm.name} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${llm.color}`}>
                {llm.name}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <a href="#planos" className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold px-8 py-4 rounded-xl transition-colors text-base w-full sm:w-auto justify-center shadow-lg shadow-purple-500/20">
              Assinar por R$ 97/mês <ArrowRight className="w-5 h-5" />
            </a>
            <a href="#modelos" className="btn-outline text-base px-8 py-4 w-full sm:w-auto justify-center">
              Ver os modelos disponíveis
            </a>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            {[
              { val: '5',        label: 'LLMs no mesmo hub',      color: 'text-purple-500' },
              { val: '1 login',  label: 'Para acessar tudo',      color: 'text-blue-500'   },
              { val: 'R$97',     label: 'Plano Solo/mês',         color: 'text-green-500'  },
              { val: '< 5min',   label: 'Para ter acesso',        color: 'text-orange-500' },
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
          <span className="section-label mb-4 inline-block">O Problema</span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
            5 IAs. 5 assinaturas. 5 logins. 5 janelas abertas.
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            As melhores IAs do mercado existem. O problema é que usar todas elas custa caro e é uma bagunça de gerenciar.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              emoji: '💸',
              bg: 'bg-red-50',
              title: `R$ ${INDIVIDUAL_TOTAL}+/mês em assinaturas separadas`,
              desc: `ChatGPT Plus, Claude Pro, Gemini Advanced, X Premium+... cada uma cobra por volta de R$100 a R$150. Assinar todas sai mais de R$${INDIVIDUAL_TOTAL} por mês — todo mês, todo ano.`,
            },
            {
              emoji: '🔀',
              bg: 'bg-orange-50',
              title: 'Troca de aba, troca de conta, troca de contexto',
              desc: 'Você começa uma tarefa no ChatGPT, precisa revisar no Claude, verifica uma informação no Gemini. Três abas abertas, três logins, três interfaces diferentes. Produtividade zero.',
            },
            {
              emoji: '🔒',
              bg: 'bg-yellow-50',
              title: 'Preso no ecossistema errado na hora errada',
              desc: 'Cada IA tem pontos fortes diferentes. Mas quando você assina só uma, fica usando ela para tudo — mesmo quando outra resolveria melhor e mais rápido.',
            },
          ].map((pain, i) => (
            <div key={i} className="card p-6">
              <div className={`w-14 h-14 rounded-2xl ${pain.bg} flex items-center justify-center mb-5 text-2xl`}>
                {pain.emoji}
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">{pain.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{pain.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Como Funciona ── */}
      <section className="bg-slate-50/60 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="section-label mb-4 inline-block">Como Funciona</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
              Um único hub. Todas as IAs. Menos de 5 minutos para começar.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                emoji: '📋',
                title: 'Assine o plano',
                desc: 'Solo (para você) ou Revendedor (para oferecer para seus clientes). Compra em segundos, acesso em menos de 5 minutos.',
              },
              {
                step: '02',
                emoji: '🔑',
                title: 'Receba o acesso',
                desc: 'Link de acesso chega por email e WhatsApp. Clique, defina sua senha e já está dentro. Sem aprovação manual, sem configuração técnica.',
              },
              {
                step: '03',
                emoji: '🧠',
                title: 'Escolha a IA certa para cada tarefa',
                desc: 'No HUB você vê todas as IAs disponíveis e seleciona a melhor para o que precisa agora. ChatGPT, Claude, Gemini, Grok, DeepSeek — tudo em um lugar.',
              },
            ].map((s, i) => (
              <div key={i} className="card p-6 relative">
                {i < 2 && (
                  <div className="hidden md:block absolute top-8 left-full h-px bg-gradient-to-r from-purple-200 to-transparent z-0" style={{ width: '50%', left: '75%' }} />
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

      {/* ── Modelos Disponíveis ── */}
      <section id="modelos" className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-14">
          <span className="section-label mb-4 inline-block">Modelos Disponíveis</span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
            Acesse +5 das melhores IAs do mercado
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Sem créditos, sem travas, sem ficar preso em um único modelo. Você escolhe a IA certa para cada trabalho.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {LLMS.map((llm, i) => (
            <div key={i} className="card p-6 relative">
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full flex-shrink-0 ${llm.dot}`} />
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{llm.provider}</p>
                    <h3 className="font-bold text-slate-900 text-base leading-tight">{llm.model}</h3>
                  </div>
                </div>
                <span className={`text-[10px] font-bold border rounded-full px-2.5 py-1 whitespace-nowrap flex-shrink-0 ${llm.tagColor}`}>
                  {llm.tag}
                </span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed mb-4">{llm.desc}</p>
              <p className="text-[11px] text-slate-400 border-t border-slate-50 pt-3">
                {i < 5 && <span className="line-through text-red-400 mr-1">{llm.individualPrice}</span>}
                {i === 5 && <span className="text-green-600 font-semibold">{llm.individualPrice}</span>}
                {i < 5 && <span className="text-green-600 font-semibold">→ incluso no HUB de IA</span>}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Economia ── */}
      <section id="economia" className="bg-slate-900 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-900/50 text-purple-300 border border-purple-700 uppercase tracking-widest mb-4">
              <TrendingDown className="w-3 h-3" />
              Economize agora
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Economize mais de{' '}
              <span className="text-purple-400">R$ {(INDIVIDUAL_TOTAL - HUB_PRICE).toLocaleString('pt-BR')}/mês</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Compare o custo de assinar cada IA individualmente com o custo do HUB de IA.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 items-start">
            {/* Sem HUB */}
            <div className="rounded-2xl border border-red-500/30 bg-red-950/20 p-6">
              <p className="text-xs font-bold text-red-400 uppercase tracking-wider mb-4">Sem HUB de IA</p>
              <div className="space-y-3 mb-5">
                {INDIVIDUAL_COSTS.map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-slate-400 text-sm">{item.provider}</span>
                    <span className="text-slate-300 text-sm font-semibold">R$ {item.price}/mês</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-red-500/20 pt-4 flex items-center justify-between">
                <span className="text-red-400 font-bold">Total mensal</span>
                <span className="text-red-400 font-black text-2xl">R$ {INDIVIDUAL_TOTAL}<span className="text-sm font-semibold text-red-500">/mês</span></span>
              </div>
              <p className="text-[11px] text-slate-600 mt-2">= R$ {(INDIVIDUAL_TOTAL * 12).toLocaleString('pt-BR')}/ano</p>
            </div>

            {/* Com HUB */}
            <div className="rounded-2xl border-2 border-purple-500 bg-purple-950/30 p-6 relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-500 text-white text-[10px] font-black px-3 py-1 rounded-full whitespace-nowrap">
                RECOMENDADO
              </span>
              <p className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-4">Com HUB de IA</p>
              <div className="space-y-3 mb-5">
                {INDIVIDUAL_COSTS.map((item, i) => (
                  <div key={i} className="flex items-center justify-between opacity-60">
                    <span className="text-slate-500 text-sm line-through">{item.provider}</span>
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  </div>
                ))}
              </div>
              <div className="border-t border-purple-500/30 pt-4 flex items-center justify-between">
                <span className="text-purple-300 font-bold">HUB de IA Solo</span>
                <span className="text-white font-black text-2xl">R$ {HUB_PRICE}<span className="text-sm font-semibold text-slate-400">/mês</span></span>
              </div>
              <p className="text-[11px] text-slate-500 mt-2">= R$ {(HUB_PRICE * 12).toLocaleString('pt-BR')}/ano · acesso às 5 IAs</p>
            </div>
          </div>

          {/* Economia highlight */}
          <div className="mt-8 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-center">
            <p className="text-purple-200 text-sm mb-1">Sua economia com o HUB de IA</p>
            <p className="text-white font-black text-4xl mb-1">
              R$ {(INDIVIDUAL_TOTAL - HUB_PRICE).toLocaleString('pt-BR')}/mês
            </p>
            <p className="text-purple-200 text-sm">
              = R$ {((INDIVIDUAL_TOTAL - HUB_PRICE) * 12).toLocaleString('pt-BR')}/ano · {Math.round(((INDIVIDUAL_TOTAL - HUB_PRICE) / INDIVIDUAL_TOTAL) * 100)}% de desconto comparado ao custo individual
            </p>
            <a href="#planos" className="inline-flex items-center gap-2 mt-5 bg-white text-purple-700 hover:bg-purple-50 font-black px-6 py-3 rounded-xl transition-colors">
              Assinar agora <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── Para quem é ── */}
      <section id="para-quem" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="section-label mb-4 inline-block">Para quem é</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
              Para quem usa IA no trabalho todo dia
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Se você usa pelo menos duas IAs diferentes ou gasta mais de R$100/mês em assinaturas — o HUB de IA é para você.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {USE_CASES.map((uc, i) => (
              <div key={i} className={`rounded-2xl border p-6 hover:shadow-sm transition-shadow ${uc.color}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-sm">
                    {uc.icon}
                  </div>
                  <h3 className="font-bold text-slate-800 text-sm">{uc.sector}</h3>
                </div>
                <ul className="space-y-2">
                  {uc.items.map((item, j) => (
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

      {/* ── Revendedor ── */}
      <section id="revendedor" className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="rounded-3xl border-2 border-purple-100 bg-gradient-to-br from-purple-50 to-white p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-600 border border-purple-100 uppercase tracking-widest mb-5">
                <Wifi className="w-3 h-3" />
                Para Provedores e Revendedores
              </span>
              <h2 className="text-3xl font-black text-slate-900 mb-4 leading-tight">
                Tem clientes? Distribua acesso às melhores IAs para eles.
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Provedores de internet, agências e empresas que querem oferecer
                acesso ao HUB de IA como serviço agregado para seus clientes.
                Diferencie seu produto sem desenvolver nada do zero.
              </p>
              <div className="space-y-3 mb-8">
                {PLAN_RESELLER.modules.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-slate-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <a href={PLAN_RESELLER.kiwifyLink} className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold px-6 py-3 rounded-xl transition-colors">
                Assinar Revendedor <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <div className="text-center mb-6">
                <p className="text-sm text-slate-500 mb-1">Plano Revendedor HUB de IA</p>
                <p className="text-4xl font-black text-slate-900">
                  R$ <span className="text-purple-600">1</span>
                  <span className="text-xl font-semibold text-slate-500">/cliente/mês</span>
                </p>
                <p className="text-xs text-slate-400 mt-2">Mínimo de 20 clientes · R$ 20/mês para começar</p>
              </div>

              <div className="space-y-3 mb-6">
                {[
                  { label: 'Você tem', val: '10 clientes', note: 'abaixo do mínimo', color: 'text-orange-600 bg-orange-50' },
                  { label: 'Você paga', val: 'R$ 20,00', note: 'mínimo garantido', color: 'text-slate-700 bg-slate-50' },
                  { label: 'Você tem', val: '35 clientes', note: 'acima do mínimo', color: 'text-green-700 bg-green-50' },
                  { label: 'Você paga', val: 'R$ 35,00', note: 'exato pelo uso', color: 'text-slate-700 bg-slate-50' },
                ].map((row, i) => (
                  <div key={i} className={`flex items-center justify-between px-4 py-2.5 rounded-xl ${row.color}`}>
                    <span className="text-sm font-medium">{row.label}</span>
                    <div className="text-right">
                      <span className="text-sm font-bold block">{row.val}</span>
                      <span className="text-[10px] opacity-70">{row.note}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-400 text-center">
                Cobrança via Asaas no fechamento mensal pelo count real de clientes ativos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Planos ── */}
      <section id="planos" className="bg-slate-50/60 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="section-label mb-4 inline-block">Planos</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
              Dois planos. Uma decisão simples.
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Solo se é para você. Revendedor se quer distribuir para seus clientes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">

            {/* Solo */}
            <div className="rounded-2xl border-2 border-slate-200 bg-white p-8 flex flex-col">
              <div className="mb-5">
                <span className="text-[10px] font-bold border rounded-full px-2.5 py-1 bg-slate-50 text-slate-600 border-slate-200">
                  Para o seu uso
                </span>
              </div>
              <h3 className="font-black text-slate-900 text-2xl mb-2">HUB de IA Solo</h3>
              <p className="text-slate-500 text-sm mb-6 leading-snug">
                Acesso a todas as IAs disponíveis em um único login. Para profissionais, freelancers e equipes que querem parar de pagar separado.
              </p>
              <div className="mb-6">
                <span className="text-5xl font-black text-slate-900">R$ {HUB_PRICE}</span>
                <span className="text-slate-400 text-sm">/mês</span>
                <p className="text-xs text-green-600 font-semibold mt-1">
                  Vs R$ {INDIVIDUAL_TOTAL}+/mês assinando separado — {Math.round(((INDIVIDUAL_TOTAL - HUB_PRICE) / INDIVIDUAL_TOTAL) * 100)}% mais barato
                </p>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  'ChatGPT / GPT-4o (OpenAI)',
                  'Claude Sonnet (Anthropic)',
                  'Gemini Pro (Google)',
                  'Grok (xAI)',
                  'DeepSeek V3',
                  'Novos modelos automaticamente',
                  '1 único login para tudo',
                  'Sem créditos, sem travas',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <a href="#" className="w-full text-center font-bold text-sm py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white transition-colors">
                Assinar HUB de IA Solo
              </a>
            </div>

            {/* Revendedor */}
            <div className="rounded-2xl border-2 border-purple-500 bg-white p-8 flex flex-col relative shadow-lg shadow-purple-500/10">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-[10px] font-black px-3 py-1 rounded-full whitespace-nowrap">
                {PLAN_RESELLER.badge}
              </span>
              <div className="mb-5">
                <span className="text-[10px] font-bold border rounded-full px-2.5 py-1 bg-purple-50 text-purple-600 border-purple-100">
                  Para revender para clientes
                </span>
              </div>
              <h3 className="font-black text-slate-900 text-2xl mb-2">HUB de IA Revendedor</h3>
              <p className="text-slate-500 text-sm mb-6 leading-snug">
                {PLAN_RESELLER.desc}
              </p>
              <div className="mb-2">
                <span className="text-5xl font-black text-slate-900">R$ 1</span>
                <span className="text-slate-400 text-sm">/cliente/mês</span>
              </div>
              <p className="text-xs text-purple-600 font-semibold mb-6">Mínimo 20 clientes · a partir de R$ 20/mês</p>
              <ul className="space-y-3 mb-8 flex-1">
                {PLAN_RESELLER.modules.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <a href={PLAN_RESELLER.kiwifyLink} className="w-full text-center font-bold text-sm py-3.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white transition-colors">
                Assinar HUB de IA Revendedor
              </a>
            </div>

          </div>

          <p className="text-center text-xs text-slate-400 mt-8">
            Acesso imediato após a compra · Sem fidelidade · Cancele quando quiser
          </p>
        </div>
      </section>

      {/* ── Quem Criou ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="rounded-3xl border border-slate-100 bg-white shadow-sm p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="section-label mb-5 inline-block">
                <ShieldCheck className="w-3 h-3" />
                Quem está por trás
              </span>
              <h2 className="text-3xl font-black text-slate-900 mb-4 leading-tight">
                Criado por quem paga caro pelas IAs todo mês — e cansou disso
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Sou <strong className="text-slate-900">Marciel Corado</strong>, dono da{' '}
                <strong className="text-slate-900">Kem Soluções</strong> — provedor de fibra óptica há mais de 17 anos.
                Usava ChatGPT, Claude e Gemini no dia a dia do meu provedor — três logins, três cobranças.
                O HUB de IA nasceu da minha própria necessidade de centralizar tudo.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Construído em cima do <strong className="text-slate-900">NEXCORE</strong> — a plataforma de automação com IA
                que desenvolvemos para o ecossistema. Tudo testado primeiro no meu próprio negócio.
              </p>
            </div>
            <div className="space-y-3">
              {[
                { icon: <Wifi className="w-5 h-5 text-green-500" />, label: 'Dono de ISP há mais de 17 anos', sub: 'Kem Soluções — fibra óptica para residências e empresas' },
                { icon: <Zap className="w-5 h-5 text-green-500" />, label: 'Usuário das 5 principais IAs no dia a dia', sub: 'Testou e usa cada modelo para o caso de uso certo' },
                { icon: <Sparkles className="w-5 h-5 text-green-500" />, label: 'Criador do NEXCORE Ecosystem', sub: 'Plataforma que ensina automação com IA para qualquer negócio' },
                { icon: <Star className="w-5 h-5 text-green-500" />, label: 'Novos modelos adicionados sem custo extra', sub: 'Quando o mercado lança algo novo, você recebe automaticamente' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-slate-50">
                  <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
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
      </section>

      {/* ── NEXCORE Upsell ── */}
      <section className="bg-slate-50/60 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-7 h-7 text-teal-500" />
              </div>
              <div>
                <p className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-1">NEXCORE Academy</p>
                <h3 className="font-black text-slate-900 text-xl mb-2">
                  Quer aprender a usar cada IA do jeito certo?
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed max-w-xl">
                  O NEXCORE Academy tem trilhas de conteúdo que ensinam como extrair o máximo de cada modelo —
                  prompts avançados, fluxos de automação e casos de uso práticos para o seu negócio.
                </p>
              </div>
            </div>
            <a
              href="https://nexcore.kemsolucoes.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 btn-outline whitespace-nowrap"
            >
              Ver o NEXCORE EAD <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-12">
          <span className="section-label mb-4 inline-block">Dúvidas</span>
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
              Pare de pagar R$ {INDIVIDUAL_TOTAL}+/mês.<br className="hidden sm:block" />
              Comece a pagar R$ {HUB_PRICE}/mês.
            </h2>
            <p className="text-purple-100 text-lg max-w-xl mx-auto mb-10">
              Claude, ChatGPT, Gemini, Grok e DeepSeek em um único hub.
              Acesso em menos de 5 minutos após a compra.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#planos"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-purple-700 hover:bg-purple-50 font-black px-8 py-4 rounded-2xl text-lg transition-colors shadow-lg"
              >
                Assinar por R$ {HUB_PRICE}/mês <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href={`https://wa.me/5561985750506?text=${encodeURIComponent('Olá! Quero saber mais sobre o HUB de IA.')}`}
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
            <div className="w-7 h-7 bg-green-500 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-black text-slate-800">Fin<span className="text-green-500">Control</span></span>
          </div>
          <div className="flex items-center gap-6 text-xs text-slate-400">
            <a href="/privacidade" className="hover:text-slate-600 transition-colors">Privacidade</a>
            <a href="https://nexcore.kemsolucoes.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 transition-colors">NEXCORE EAD</a>
            <a href="/" className="hover:text-slate-600 transition-colors">Ver FinControl completo</a>
            <a href="https://wa.me/5561985750506" target="_blank" rel="noopener noreferrer" className="hover:text-purple-600 transition-colors">Suporte</a>
          </div>
          <p className="text-xs text-slate-400">© 2026 Kem Soluções. Todos os direitos reservados.</p>
        </div>
      </footer>

    </div>
  )
}
