import { useState } from 'react'
import {
  ArrowRight, CheckCircle2, ChevronDown, Menu, X,
  BarChart3, MessageSquare, Sparkles, Zap, Users,
  ShieldCheck, TrendingUp, Clock, DollarSign,
  Wifi, Briefcase, Calculator, ShoppingBag,
  BookOpen, Star, Phone,
} from 'lucide-react'

// ── Dados ─────────────────────────────────────────────────────────────────────

const MODULES = [
  {
    icon: <BarChart3 className="w-6 h-6 text-green-500" />,
    name: 'Financeiro',
    tag: 'Core',
    tagColor: 'bg-green-50 text-green-600 border-green-100',
    desc: 'Despesas fixas, REC mensal, fechamento automatizado e saldos encadeados. Sabe exatamente para onde vai o dinheiro.',
    items: ['Despesas fixas e variáveis', 'Fechamento mensal automático', 'REC mensal e saldos', 'Projeção de caixa'],
  },
  {
    icon: <MessageSquare className="w-6 h-6 text-blue-500" />,
    name: 'Disparador WhatsApp',
    tag: 'Em breve',
    tagColor: 'bg-blue-50 text-blue-600 border-blue-100',
    desc: 'Disparo em massa via API oficial e não oficial. Anti-banimento inteligente, aquecimento de números e campanhas segmentadas.',
    items: ['API oficial (Meta) e não oficial', 'Anti-banimento inteligente', 'Aquecimento automático de números', 'Campanhas segmentadas'],
  },
  {
    icon: <Sparkles className="w-6 h-6 text-purple-500" />,
    name: 'HUB de IA',
    tag: 'Destaque',
    tagColor: 'bg-purple-50 text-purple-600 border-purple-100',
    desc: 'Conecte suas próprias chaves de LLMs (OpenAI, Anthropic, Gemini) e tenha um assistente de IA trabalhando dentro do seu financeiro.',
    items: ['Assistente financeiro por IA', 'Análise automática de dados', 'Integração com suas LLMs', 'Módulo Integrações incluso'],
  },
  {
    icon: <Zap className="w-6 h-6 text-orange-500" />,
    name: 'NexCore',
    tag: 'Em breve',
    tagColor: 'bg-orange-50 text-orange-600 border-orange-100',
    desc: 'Agente orquestrador que executa tarefas complexas: gera documentos, analisa dados, dispara ações e cria fluxos automáticos.',
    items: ['Orquestração de agentes de IA', 'Geração de documentos automática', 'Gatilhos baseados em eventos', 'Templates de workflows prontos'],
  },
  {
    icon: <BookOpen className="w-6 h-6 text-teal-500" />,
    name: 'Academy',
    tag: 'Incluso',
    tagColor: 'bg-teal-50 text-teal-600 border-teal-100',
    desc: 'Cursos e trilhas de conteúdo para você e seu time dominarem a plataforma. Gratuitos dentro do plano.',
    items: ['Aulas de infraestrutura', 'Trilhas por função', 'Conteúdo sempre atualizado', 'Certificado de conclusão'],
  },
  {
    icon: <Zap className="w-6 h-6 text-yellow-500" />,
    name: 'EvoNexus',
    tag: 'Add-on',
    tagColor: 'bg-yellow-50 text-yellow-600 border-yellow-100',
    desc: 'Instância completa do EvoNexus pré-configurada e instalada na nossa infraestrutura. Acesse direto do FinControl.',
    items: ['38 agentes de IA especializados', 'Instalado e configurado por nós', 'Acesso via iframe no FinControl', 'Subdomínio próprio por tenant'],
  },
]

const USE_CASES = [
  {
    icon: <Calculator className="w-5 h-5 text-green-500" />,
    sector: 'PME e Gestão Financeira',
    color: 'border-green-100 bg-green-50/30',
    items: ['Fechamento mensal sem planilha', 'Controle de despesas fixas e variáveis', 'Saldo atualizado em tempo real'],
  },
  {
    icon: <Wifi className="w-5 h-5 text-blue-500" />,
    sector: 'Provedor de Internet (ISP)',
    color: 'border-blue-100 bg-blue-50/30',
    items: ['Cobrança autônoma via WhatsApp', 'HUB de IA para clientes (revendedor)', 'Financeiro do provedor integrado'],
  },
  {
    icon: <Briefcase className="w-5 h-5 text-purple-500" />,
    sector: 'Agências e Consultorias',
    color: 'border-purple-100 bg-purple-50/30',
    items: ['Disparador de campanhas em massa', 'Relatórios financeiros automáticos', 'HUB de IA para clientes da agência'],
  },
  {
    icon: <Calculator className="w-5 h-5 text-orange-500" />,
    sector: 'Escritórios de Contabilidade',
    color: 'border-orange-100 bg-orange-50/30',
    items: ['Financeiro multi-empresa', 'Fechamento por cliente', 'Relatórios prontos para entrega'],
  },
  {
    icon: <ShoppingBag className="w-5 h-5 text-rose-500" />,
    sector: 'Varejo e E-commerce',
    color: 'border-rose-100 bg-rose-50/30',
    items: ['Régua de cobrança via WhatsApp', 'Campanhas de promoção em massa', 'Conciliação financeira automática'],
  },
  {
    icon: <Users className="w-5 h-5 text-teal-500" />,
    sector: 'Revendedores (B2B2C)',
    color: 'border-teal-100 bg-teal-50/30',
    items: ['Distribua HUB de IA para seus clientes', 'Painel de gestão de sub-tenants', 'Cobrança por uso (R$ 1/cliente/mês)'],
  },
]

// NOTE: em produção, buscar via GET /api/public/plans
const PLANS = [
  {
    slug: 'starter',
    name: 'Starter',
    price: 97,
    desc: 'Para quem está começando e precisa de controle financeiro sem bagunça.',
    highlight: false,
    modules: ['Módulo Financeiro', 'Fechamento mensal', 'REC mensal', 'Saldos encadeados', 'Academy incluso'],
    excluded: ['HUB de IA', 'Disparador WhatsApp'],
    kiwifyLink: '#',
  },
  {
    slug: 'pro',
    name: 'Pro',
    price: 197,
    desc: 'Para quem quer crescer e investir em aprendizado junto com o controle.',
    highlight: false,
    modules: ['Tudo do Starter', 'Academy NexCore (trilhas avançadas)'],
    excluded: ['HUB de IA', 'Disparador WhatsApp'],
    kiwifyLink: '#',
  },
  {
    slug: 'business',
    name: 'Business',
    price: 397,
    desc: 'O pacote completo: financeiro + IA + cursos para quem quer resultado.',
    highlight: true,
    badge: 'Mais popular',
    modules: ['Tudo do Pro', 'HUB de IA completo', 'Módulo Integrações (LLMs)', 'Disparador WhatsApp (em breve)'],
    excluded: [],
    kiwifyLink: '#',
  },
  {
    slug: 'hub-ia',
    name: 'HUB de IA',
    price: 297,
    desc: 'Para quem já tem controle financeiro e quer adicionar inteligência artificial.',
    highlight: false,
    modules: ['HUB de IA completo', 'Módulo Integrações (OpenAI, Anthropic, Gemini…)', 'Academy incluso'],
    excluded: ['Módulo Financeiro'],
    kiwifyLink: '#',
  },
]

const RESELLER_PLAN = {
  name: 'Revendedor HUB de IA',
  price: 20,
  priceLabel: 'a partir de R$ 20/mês',
  priceDetail: 'R$ 1,00 por cliente ativo · mínimo 20 clientes',
  desc: 'Para provedores de internet e empresas que querem oferecer HUB de IA para seus clientes.',
  modules: [
    'HUB de IA para você e seus clientes',
    'Painel de revendedor self-service',
    'Convide clientes por email ou CSV',
    'Cobrança pelo uso real no fechamento do mês',
    'R$ 1,00 por cliente ativo (mínimo 20 = R$ 20/mês)',
  ],
  kiwifyLink: '#',
}

const FAQS = [
  {
    q: 'Preciso instalar alguma coisa?',
    a: 'Não. O FinControl funciona direto no navegador e pode ser adicionado à tela inicial do celular como um aplicativo. Funciona no iOS, Android e desktop.',
  },
  {
    q: 'Quanto tempo leva para começar a usar?',
    a: 'Menos de 5 minutos. Após a compra você recebe o link para criar sua senha por email e WhatsApp. É só clicar, definir a senha e entrar. Sem configuração técnica.',
  },
  {
    q: 'O que é o HUB de IA?',
    a: 'É o módulo de inteligência artificial do FinControl. Você conecta suas próprias chaves de API de LLMs (como OpenAI ou Anthropic) e passa a ter um assistente que analisa seus dados financeiros, responde perguntas e gera relatórios em linguagem natural.',
  },
  {
    q: 'O que é o plano Revendedor?',
    a: 'Para empresas que querem oferecer o HUB de IA para seus próprios clientes. Você compra uma vez e seus clientes acessam com login próprio. Paga R$ 1,00 por cliente ativo por mês, com mínimo de 20. Se tiver 25 clientes em dezembro, paga R$ 25,00.',
  },
  {
    q: 'O Disparador de WhatsApp já está disponível?',
    a: 'Está em desenvolvimento e será lançado em breve. Quem assinar agora terá acesso prioritário quando for liberado, sem custo adicional nos planos Business e superior.',
  },
  {
    q: 'Posso cancelar quando quiser?',
    a: 'Sim. Sem fidelidade, sem multa. Se cancelar, seus dados ficam preservados por 30 dias para eventual reativação.',
  },
  {
    q: 'O que é diferente do EvoNexus?',
    a: 'O EvoNexus é um produto separado — uma instância completa de agentes de IA configurada para o seu negócio, instalada na nossa infraestrutura. O FinControl é o SaaS de gestão com módulos. O EvoNexus pode ser adicionado ao FinControl como add-on premium.',
  },
  {
    q: 'Como o FinControl se relaciona com o NEXCORE?',
    a: 'O FinControl foi construído usando o NEXCORE — nossa plataforma de automação com IA. Se quiser aprender a construir sistemas como esse, acesse o NEXCORE EAD em nexcore.kemsolucoes.com.br.',
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
        <ChevronDown className={`w-5 h-5 text-green-500 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
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

export default function FinControlPage() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-white" />
            </div>
            <span className="font-black text-slate-900">Fin<span className="text-green-500">Control</span></span>
          </a>

          {/* Links desktop */}
          <div className="hidden md:flex items-center gap-6 text-sm text-slate-600">
            <a href="#modulos"    className="hover:text-green-600 transition-colors">Módulos</a>
            <a href="#casos"      className="hover:text-green-600 transition-colors">Casos de uso</a>
            <a href="#planos"     className="hover:text-green-600 transition-colors">Planos</a>
            <a href="#revendedor" className="hover:text-green-600 transition-colors">Revendedores</a>
            <a href="#faq"        className="hover:text-green-600 transition-colors">FAQ</a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://fincontrol-smoky.vercel.app/auth/login"
              className="hidden md:block text-sm text-slate-600 hover:text-green-600 font-medium transition-colors"
            >
              Entrar
            </a>
            <a href="#planos" className="btn-primary text-sm py-2 px-4">
              Ver planos <ArrowRight className="w-4 h-4" />
            </a>
            <button
              className="md:hidden text-slate-600 hover:text-slate-900"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        {menuOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-3">
            {['#modulos', '#casos', '#planos', '#revendedor', '#faq'].map((href, i) => (
              <a
                key={i}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="block text-sm text-slate-700 hover:text-green-600 font-medium py-1 capitalize"
              >
                {href.replace('#', '').charAt(0).toUpperCase() + href.replace('#', '').slice(1)}
              </a>
            ))}
            <a
              href="https://fincontrol-smoky.vercel.app/auth/login"
              className="block text-sm text-green-600 font-semibold py-1"
            >
              Entrar na conta →
            </a>
          </div>
        )}
      </nav>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-green-50/60 to-white">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-green-400/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-16 text-center relative">
          <div className="mb-5">
            <span className="section-label">
              <Sparkles className="w-3 h-3" />
              Financeiro · WhatsApp · IA · Academy
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-slate-900 leading-[1.05] tracking-tight mb-6">
            Gestão financeira,<br />
            WhatsApp e IA —<br />
            <span className="text-gradient">tudo em um lugar.</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            O <strong className="text-slate-800">FinControl</strong> reúne controle financeiro profissional, disparador de
            WhatsApp com anti-banimento e HUB de inteligência artificial. Seu acesso chega
            por email e WhatsApp em <strong className="text-slate-800">menos de 5 minutos.</strong>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <a href="#planos" className="btn-primary text-base px-8 py-4 w-full sm:w-auto justify-center shadow-lg shadow-green-500/20">
              Ver planos e assinar <ArrowRight className="w-5 h-5" />
            </a>
            <a href="#modulos" className="btn-outline text-base px-8 py-4 w-full sm:w-auto justify-center">
              Ver o que está incluso
            </a>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            {[
              { val: '6',       label: 'Módulos disponíveis',       color: 'text-green-500' },
              { val: '< 5min',  label: 'Para ter acesso',           color: 'text-blue-500' },
              { val: 'R$97',    label: 'Para começar',              color: 'text-purple-500' },
              { val: 'R$1/cli', label: 'Plano Revendedor',          color: 'text-orange-500' },
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
            Seu financeiro ainda está no improviso?
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            A maioria das empresas pequenas e médias gerencia tudo no limite — planilha que não fecha, WhatsApp manual e zero inteligência nos dados.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: <Clock className="w-7 h-7 text-red-500" />,
              bg: 'bg-red-50',
              title: 'Planilhas que nunca fecham',
              desc: 'Horas reconciliando números que não batem, lançamentos manuais um a um e relatórios que levam dias para ficar prontos.',
            },
            {
              icon: <MessageSquare className="w-7 h-7 text-orange-500" />,
              bg: 'bg-orange-50',
              title: 'WhatsApp no braço',
              desc: 'Cobrança manual, follow-up de campanha na mão, números banidos e sem nenhuma automação para escalar o alcance.',
            },
            {
              icon: <TrendingUp className="w-7 h-7 text-yellow-500" />,
              bg: 'bg-yellow-50',
              title: 'Decisões no escuro',
              desc: 'Sem dados em tempo real e sem IA analisando o negócio, você decide na intuição — e perde oportunidades invisíveis.',
            },
          ].map((pain, i) => (
            <div key={i} className="card p-6">
              <div className={`w-14 h-14 rounded-2xl ${pain.bg} flex items-center justify-center mb-5`}>
                {pain.icon}
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
              Do clique ao acesso em menos de 5 minutos
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Sem instalação, sem configuração técnica, sem esperar. O acesso chega por email e WhatsApp automaticamente.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {[
              {
                step: '01',
                icon: <DollarSign className="w-7 h-7 text-green-500" />,
                title: 'Escolha seu plano',
                desc: 'Selecione os módulos que fazem sentido para o seu negócio hoje. Do Starter ao Revendedor — cada plano é claro no que inclui.',
              },
              {
                step: '02',
                icon: <Zap className="w-7 h-7 text-green-500" />,
                title: 'Receba seu acesso',
                desc: 'Em menos de 5 minutos você recebe um link para criar sua senha por email e WhatsApp. Clique, defina a senha e entre.',
              },
              {
                step: '03',
                icon: <BarChart3 className="w-7 h-7 text-green-500" />,
                title: 'Comece a usar',
                desc: 'Interface intuitiva, sem treinamento. Funciona no celular e no computador. Adicione à tela inicial como app.',
              },
            ].map((s, i) => (
              <div key={i} className="relative">
                {i < 2 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-green-200 to-transparent z-0" style={{ width: '50%', left: '75%' }} />
                )}
                <div className="card p-6 relative z-10">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-5xl font-black text-green-100 select-none leading-none">{s.step}</span>
                    <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                      {s.icon}
                    </div>
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg mb-2">{s.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Módulos ── */}
      <section id="modulos" className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-14">
          <span className="section-label mb-4 inline-block">Módulos</span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
            Tudo que seu negócio precisa, em um só sistema
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Cada plano habilita um conjunto de módulos. Você só paga pelo que vai usar — e evolui conforme cresce.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {MODULES.map((mod, i) => (
            <div key={i} className="card p-6">
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  {mod.icon}
                </div>
                <span className={`text-[10px] font-bold border rounded-full px-2.5 py-1 ${mod.tagColor}`}>
                  {mod.tag}
                </span>
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">{mod.name}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-4">{mod.desc}</p>
              <ul className="space-y-1.5">
                {mod.items.map((item, j) => (
                  <li key={j} className="flex items-center gap-2 text-xs text-slate-600">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── Casos de Uso ── */}
      <section id="casos" className="bg-slate-50/60 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="section-label mb-4 inline-block">Para quem é</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
              Para qualquer negócio que tem processos repetitivos
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Se há tarefa financeira ou de comunicação que ocorre toda semana — o FinControl automatiza.
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
        <div className="rounded-3xl border-2 border-blue-100 bg-gradient-to-br from-blue-50 to-white p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="section-label mb-5 inline-block">
                <Wifi className="w-3 h-3" />
                Para Provedores e Revendedores
              </span>
              <h2 className="text-3xl font-black text-slate-900 mb-4 leading-tight">
                Tem clientes? Ofereça HUB de IA para eles.
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                O plano Revendedor foi feito para provedores de internet, agências e empresas que querem
                oferecer inteligência artificial como serviço para seus próprios clientes —
                sem precisar desenvolver nada do zero.
              </p>
              <div className="space-y-3 mb-8">
                {RESELLER_PLAN.modules.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-slate-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <a href={RESELLER_PLAN.kiwifyLink} className="btn-primary">
                Assinar plano Revendedor <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <div className="text-center mb-6">
                <p className="text-sm text-slate-500 mb-1">Plano Revendedor HUB de IA</p>
                <p className="text-4xl font-black text-slate-900">
                  R$ <span className="text-green-500">1</span>
                  <span className="text-xl font-semibold text-slate-500">/cliente/mês</span>
                </p>
                <p className="text-xs text-slate-400 mt-2">Mínimo de 20 clientes · R$ 20/mês para começar</p>
              </div>

              <div className="space-y-3 mb-6">
                {[
                  { label: 'Você tem', val: '10 clientes', note: 'abaixo do mínimo', color: 'text-orange-600 bg-orange-50' },
                  { label: 'Você paga', val: 'R$ 20,00', note: 'mínimo garantido', color: 'text-slate-700 bg-slate-50' },
                  { label: 'Você tem', val: '25 clientes', note: 'acima do mínimo', color: 'text-green-700 bg-green-50' },
                  { label: 'Você paga', val: 'R$ 25,00', note: 'exato pelo uso', color: 'text-slate-700 bg-slate-50' },
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
              Planos para cada momento do seu negócio
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Escolha o que faz sentido hoje. Você pode evoluir de plano quando quiser — sem perder seus dados.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
            {PLANS.map((plan) => (
              <div
                key={plan.slug}
                className={`rounded-2xl border-2 p-6 flex flex-col relative ${
                  plan.highlight
                    ? 'border-green-400 bg-white shadow-lg shadow-green-500/10'
                    : 'border-slate-100 bg-white'
                }`}
              >
                {plan.highlight && plan.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-[10px] font-black px-3 py-1 rounded-full whitespace-nowrap">
                    {plan.badge}
                  </span>
                )}

                <div className="mb-4">
                  <h3 className="font-black text-slate-900 text-lg">{plan.name}</h3>
                  <p className="text-slate-500 text-xs mt-1 leading-snug">{plan.desc}</p>
                </div>

                <div className="mb-5">
                  <span className="text-4xl font-black text-slate-900">R$ {plan.price}</span>
                  <span className="text-slate-400 text-sm">/mês</span>
                </div>

                <ul className="space-y-2 mb-6 flex-1">
                  {plan.modules.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                  {plan.excluded.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                      <X className="w-3.5 h-3.5 text-slate-300 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href={plan.kiwifyLink}
                  className={`w-full text-center font-bold text-sm py-3 rounded-xl transition-colors ${
                    plan.highlight
                      ? 'bg-green-500 hover:bg-green-600 text-white'
                      : 'bg-slate-100 hover:bg-green-50 hover:text-green-700 text-slate-700'
                  }`}
                >
                  Assinar {plan.name}
                </a>
              </div>
            ))}
          </div>

          {/* Card Revendedor resumido */}
          <div className="rounded-2xl border-2 border-blue-200 bg-white p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Users className="w-7 h-7 text-blue-500" />
              </div>
              <div>
                <p className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-1">Plano Revendedor</p>
                <h3 className="font-black text-slate-900 text-lg">{RESELLER_PLAN.name}</h3>
                <p className="text-slate-500 text-sm">{RESELLER_PLAN.priceLabel} · {RESELLER_PLAN.priceDetail}</p>
              </div>
            </div>
            <a href={RESELLER_PLAN.kiwifyLink} className="btn-primary whitespace-nowrap flex-shrink-0">
              Assinar Revendedor <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <p className="text-center text-xs text-slate-400 mt-6">
            Todos os planos com acesso imediato após a compra. Sem fidelidade. Cancele quando quiser.
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
                Criado por quem usa no próprio negócio — não por quem teoriza sobre IA
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Sou <strong className="text-slate-900">Marciel Corado</strong>, dono da{' '}
                <strong className="text-slate-900">Kem Soluções</strong> — provedor de fibra óptica há mais de 17 anos.
                Usei as ferramentas do nosso ecossistema para resolver problemas reais: cobrança automática,
                comunicação com clientes, gestão financeira e inteligência artificial.
              </p>
              <p className="text-slate-600 leading-relaxed">
                O FinControl foi construído com o <strong className="text-slate-900">NEXCORE</strong> — nossa plataforma de
                automação com IA. Tudo que você usa aqui foi testado primeiro no meu próprio negócio.
              </p>
            </div>
            <div className="space-y-3">
              {[
                { icon: <Wifi className="w-5 h-5 text-green-500" />, label: 'Dono de ISP há mais de 17 anos', sub: 'Kem Soluções — fibra óptica para residências e empresas' },
                { icon: <BarChart3 className="w-5 h-5 text-green-500" />, label: 'Usa o FinControl em produção', sub: 'Gestão financeira do próprio provedor roda no sistema' },
                { icon: <Sparkles className="w-5 h-5 text-green-500" />, label: 'Criador do NEXCORE Ecosystem', sub: 'Plataforma que ensina automação com IA para qualquer negócio' },
                { icon: <Star className="w-5 h-5 text-green-500" />, label: 'Conteúdo sempre atualizado', sub: 'Quando o produto evolui, o suporte e os cursos evoluem junto' },
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

      {/* ── Academy Upsell ── */}
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
                  Quer aprender como o FinControl foi construído?
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed max-w-xl">
                  O FinControl foi desenvolvido com o NEXCORE — a plataforma que ensina qualquer dono de negócio
                  a automatizar processos com IA, sem programar. Se quiser aprender a construir sistemas como esse, acesse o NEXCORE EAD.
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
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
            Perguntas frequentes
          </h2>
        </div>
        <div className="space-y-3">
          {FAQS.map((faq, i) => <FAQItem key={i} {...faq} />)}
        </div>
      </section>

      {/* ── CTA Final ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="relative rounded-3xl bg-gradient-to-br from-green-500 to-green-600 p-8 lg:p-16 text-center overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          </div>
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
              Pronto para ter controle real<br className="hidden sm:block" /> do seu negócio?
            </h2>
            <p className="text-green-100 text-lg max-w-xl mx-auto mb-10">
              Escolha seu plano e comece hoje. Seu acesso chega por email e WhatsApp em menos de 5 minutos.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#planos"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-green-600 hover:bg-green-50 font-black px-8 py-4 rounded-2xl text-lg transition-colors shadow-lg"
              >
                Ver planos e assinar <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href={`https://wa.me/5500000000000?text=${encodeURIComponent('Olá! Quero saber mais sobre o FinControl.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 border-2 border-white/40 text-white hover:border-white/70 font-semibold px-8 py-4 rounded-2xl text-base transition-colors"
              >
                <Phone className="w-4 h-4" /> Falar com suporte
              </a>
            </div>
            <p className="text-green-200 text-xs mt-6">
              Sem fidelidade · Cancele quando quiser · Seus dados preservados por 30 dias após cancelamento
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
            <a
              href={`https://wa.me/5500000000000`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-600 transition-colors"
            >
              Suporte
            </a>
          </div>
          <p className="text-xs text-slate-400">© 2026 Kem Soluções. Todos os direitos reservados.</p>
        </div>
      </footer>

    </div>
  )
}
