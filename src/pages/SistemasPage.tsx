import '../App.css'
import { useState } from 'react'
import type { ComponentType } from 'react'
import {
  Cpu, CheckCircle2, MessageCircle, ChevronDown, ArrowLeft, ArrowRight,
  Ticket, Trophy, Wallet, Shuffle, Network, Bot,
  ShieldCheck, Repeat, BadgeCheck, LayoutGrid,
} from 'lucide-react'

// ─────────────────────────────────────────────────────────────────────────────
// Central de Sistemas — vitrine de assinatura dos apps já construídos e em
// produção. Cada card é 100% orientado por dados (PRODUCTS) — adicionar um
// 7º sistema é só adicionar um objeto novo ao array, o grid se ajusta sozinho.
// ─────────────────────────────────────────────────────────────────────────────

// TODO(Marciel): substituir pelo número real de WhatsApp antes de publicar.
// Formato: código do país + DDD + número, sem espaços/traços/símbolos (ex: 5511999998888)
const WHATSAPP_NUMBER = '5500000000000'

// Preço único por enquanto — mesmo valor pros 6 sistemas.
const MONTHLY_PRICE = 97
const ANNUAL_PRICE = 647
const ANNUAL_MONTHLY_EQUIVALENT = (ANNUAL_PRICE / 12).toFixed(2).replace('.', ',')
const SAVINGS_PERCENT = Math.round((1 - ANNUAL_PRICE / (MONTHLY_PRICE * 12)) * 100)

type Billing = 'monthly' | 'annual'

type Accent = {
  text: string
  bg: string
  border: string
  thumbGradient: string
}

interface Product {
  slug: string
  name: string
  category: string
  Icon: ComponentType<{ className?: string }>
  copy: string
  features: string[]
  accent: Accent
  lpUrl?: string
}

// Imagem real: coloque o arquivo em /public/placeholders/{slug}.jpg
// (ou .png) com o mesmo nome do slug abaixo — o card troca sozinho, sem
// precisar mexer em código. Enquanto o arquivo não existir, mostra o
// ícone do sistema como placeholder.
const PRODUCTS: Product[] = [
  {
    slug: 'rifas-app',
    name: 'Rifas App',
    category: 'Vendas & Sorteios',
    Icon: Ticket,
    copy: 'Venda números 24h por dia, receba via Pix, boleto ou cartão e sorteie o ganhador automaticamente — sem grupo de WhatsApp lotado nem planilha de controle.',
    features: [
      'Pagamento via Pix, boleto e cartão (Asaas)',
      'Reserva temporária de números',
      'Sorteio automatizado com ganhador em destaque',
    ],
    accent: {
      text: 'text-amber-400',
      bg: 'bg-amber-400/10',
      border: 'border-amber-500/20',
      thumbGradient: 'from-amber-500/25 via-amber-500/5 to-transparent',
    },
  },
  {
    slug: 'recompensa-kickup',
    name: 'Recompensa (Kickup)',
    category: 'Gamificação Infantil',
    Icon: Trophy,
    copy: 'Seus alunos treinam mais quando ganham pontos por isso. Gamifique o treino infantil de futebol e prenda a criança — e o pai — no seu método.',
    features: [
      'Treinos e desafios gamificados',
      'Recompensas por engajamento e presença',
      'Painel de acompanhamento para os pais',
    ],
    accent: {
      text: 'text-emerald-400',
      bg: 'bg-emerald-400/10',
      border: 'border-emerald-500/20',
      thumbGradient: 'from-emerald-500/25 via-emerald-500/5 to-transparent',
    },
    lpUrl: 'https://lp.recompensa.pro/',
  },
  {
    slug: 'fincontrol',
    name: 'FinControl',
    category: 'Gestão Financeira',
    Icon: Wallet,
    copy: 'Pare de fechar o mês no olho. Controle despesas, feche o caixa e acompanhe o financeiro do seu negócio — com espaço para crescer em múltiplos módulos.',
    features: [
      'Despesas fixas e fechamento mensal',
      'Dashboards financeiros em tempo real',
      'Módulos extras: CRM, Academy, Marketing',
    ],
    accent: {
      text: 'text-teal-400',
      bg: 'bg-teal-400/10',
      border: 'border-teal-500/20',
      thumbGradient: 'from-teal-500/25 via-teal-500/5 to-transparent',
    },
    lpUrl: '/fincontrol',
  },
  {
    slug: 'futsal-sorteio',
    name: 'Futsal Sorteio',
    category: 'Sorteio de Times',
    Icon: Shuffle,
    copy: 'Sorteio de time justo em segundos, com balanceamento automático e critério de desempate — acaba a discussão de quem fica com quem na quadra.',
    features: [
      'Balanceamento automático dos times',
      'Critério de desempate configurável',
      'Sorteio pronto em menos de 1 minuto',
    ],
    accent: {
      text: 'text-sky-400',
      bg: 'bg-sky-400/10',
      border: 'border-sky-500/20',
      thumbGradient: 'from-sky-500/25 via-sky-500/5 to-transparent',
    },
  },
  {
    slug: 'internet-lucrativa',
    name: 'Grupo Internet Lucrativa',
    category: 'Ensino & Afiliados',
    Icon: Network,
    copy: 'Ensine seus afiliados a vender mais e monte um programa de indicação profissional — cursos, ferramentas e CRM de afiliados em um só lugar.',
    features: [
      'Cursos e trilhas para donos de provedor',
      'Programa de afiliados estruturado',
      'Ferramentas prontas para usar no dia a dia',
    ],
    accent: {
      text: 'text-violet-400',
      bg: 'bg-violet-400/10',
      border: 'border-violet-500/20',
      thumbGradient: 'from-violet-500/25 via-violet-500/5 to-transparent',
    },
    lpUrl: 'https://grupointernetlucrativa.com.br',
  },
  {
    slug: 'hub-ia',
    name: 'Hub de IA',
    category: 'Inteligência Artificial',
    Icon: Bot,
    copy: 'Acesse agentes de IA prontos para vendas, atendimento, conteúdo e gestão — sem precisar montar infraestrutura nem contratar especialistas.',
    features: [
      'Agentes de IA para WhatsApp e Instagram',
      'Automações de vendas e atendimento',
      'Dashboard de performance em tempo real',
    ],
    accent: {
      text: 'text-purple-400',
      bg: 'bg-purple-400/10',
      border: 'border-purple-500/20',
      thumbGradient: 'from-purple-500/25 via-purple-500/5 to-transparent',
    },
    lpUrl: '/hubia',
  },
]

const TRUST_ITEMS = [
  { Icon: ShieldCheck, label: 'Suporte direto com quem construiu' },
  { Icon: BadgeCheck, label: 'Atualizações inclusas na assinatura' },
  { Icon: Repeat, label: 'Cancele quando quiser, sem multa' },
]

const FAQS = [
  {
    q: 'Preciso assinar mais de um sistema?',
    a: 'Não. Cada sistema é uma assinatura independente — você escolhe só o que resolve o problema do seu negócio agora e adiciona outro quando quiser.',
  },
  {
    q: 'Posso trocar de plano depois?',
    a: 'Sim. Dá para migrar de mensal para anual (ou o contrário) a qualquer momento — é só chamar no WhatsApp.',
  },
  {
    q: 'Tem suporte incluso?',
    a: 'Sim, direto com quem construiu e mantém o sistema em produção — sem central de atendimento genérica.',
  },
  {
    q: 'Posso cancelar quando quiser?',
    a: 'Sim, sem fidelidade nem multa. Você cancela a qualquer momento pelo WhatsApp.',
  },
]

// ── Componentes locais (mesmo padrão das outras páginas) ─────────────────────

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

// ── Componentes da vitrine ────────────────────────────────────────────────────

function ProductThumb({ product }: { product: Product }) {
  const [imgError, setImgError] = useState(false)
  const { Icon } = product

  return (
    <div className={`relative aspect-[16/10] bg-slate-900 bg-gradient-to-br ${product.accent.thumbGradient} flex items-center justify-center overflow-hidden`}>
      {!imgError && (
        <img
          src={`/placeholders/${product.slug}.jpg`}
          alt={`Prévia do sistema ${product.name}`}
          onError={() => setImgError(true)}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      {imgError && (
        <>
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${product.accent.bg} ${product.accent.text}`}>
            <Icon className="w-7 h-7" />
          </div>
          <span className="absolute bottom-2 right-2 text-[9px] font-bold uppercase tracking-wider text-slate-400 bg-slate-950/70 px-2 py-1 rounded-full border border-white/10">
            Imagem em breve
          </span>
        </>
      )}
    </div>
  )
}

function BillingToggle({ billing, onChange }: { billing: Billing; onChange: (b: Billing) => void }) {
  return (
    <div className="inline-flex items-center gap-1 p-1 rounded-2xl bg-white/5 border border-white/10">
      <button
        onClick={() => onChange('monthly')}
        className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
          billing === 'monthly' ? 'bg-white text-slate-950' : 'text-slate-400 hover:text-white'
        }`}
      >
        Mensal
      </button>
      <button
        onClick={() => onChange('annual')}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
          billing === 'annual' ? 'bg-white text-slate-950' : 'text-slate-400 hover:text-white'
        }`}
      >
        Anual
        <span
          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
            billing === 'annual' ? 'bg-emerald-500 text-white' : 'bg-emerald-500/20 text-emerald-400'
          }`}
        >
          -{SAVINGS_PERCENT}%
        </span>
      </button>
    </div>
  )
}

function ProductCard({ product, billing }: { product: Product; billing: Billing }) {
  const { Icon } = product
  const price = billing === 'monthly' ? MONTHLY_PRICE : ANNUAL_PRICE
  const period = billing === 'monthly' ? '/mês' : '/ano'
  const planLabel =
    billing === 'monthly'
      ? `Mensal — R$ ${MONTHLY_PRICE},00/mês`
      : `Anual — R$ ${ANNUAL_PRICE},00/ano`
  const message = `Olá! Quero assinar o sistema ${product.name} no plano ${planLabel}.`
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

  return (
    <div className={`glass rounded-2xl overflow-hidden flex flex-col border hover:bg-white/10 transition-colors ${product.accent.border}`}>
      <ProductThumb product={product} />

      <div className="p-6 flex flex-col flex-1">
        <div className={`inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-3 ${product.accent.text} ${product.accent.bg}`}>
          <Icon className="w-3 h-3" />
          {product.category}
        </div>

        <h3 className="font-bold text-white text-lg mb-2">{product.name}</h3>
        <p className="text-sm text-slate-400 leading-relaxed mb-5">{product.copy}</p>

        <ul className="space-y-2 mb-6">
          {product.features.map((f, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-slate-400">
              <CheckCircle2 className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${product.accent.text}`} />
              {f}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-5 border-t border-white/10">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black text-white">R$ {price},00</span>
            <span className="text-slate-400 text-sm">{period}</span>
          </div>
          <div className="text-xs font-semibold text-emerald-400 h-4 mb-4">
            {billing === 'annual' ? `equivale a R$ ${ANNUAL_MONTHLY_EQUIVALENT}/mês` : ''}
          </div>

          {product.lpUrl ? (
            <a
              href={product.lpUrl}
              target={product.lpUrl.startsWith('http') ? '_blank' : '_self'}
              rel={product.lpUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={`w-full flex items-center justify-center gap-2 bg-gradient-to-r font-bold py-3 rounded-xl text-sm transition-all text-white ${
                product.accent.text === 'text-purple-400'
                  ? 'from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400'
                  : product.accent.text === 'text-teal-400'
                  ? 'from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400'
                  : product.accent.text === 'text-emerald-400'
                  ? 'from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400'
                  : 'from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400'
              }`}
            >
              Conhecer sistema <ArrowRight className="w-4 h-4" />
            </a>
          ) : (
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white font-bold py-3 rounded-xl text-sm transition-all"
            >
              <MessageCircle className="w-4 h-4" /> Assinar via WhatsApp
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Página principal ──────────────────────────────────────────────────────────

export default function SistemasPage() {
  const [billing, setBilling] = useState<Billing>('monthly')

  return (
    <div className="min-h-screen bg-slate-950 font-sans overflow-x-hidden">

      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-lg flex items-center justify-center">
              <Cpu className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white">Kem<span className="text-teal-400">OS</span></span>
          </a>
          <div className="hidden md:flex items-center gap-6 text-sm text-slate-400">
            <a href="#sistemas" className="hover:text-white transition-colors">Sistemas</a>
            <a href="#faq" className="hover:text-white transition-colors">Dúvidas</a>
          </div>
          <a
            href="/"
            className="flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white border border-white/20 hover:border-white/40 px-4 py-2 rounded-xl transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Início
          </a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-teal-500/8 rounded-full blur-3xl" />
          <div className="absolute top-40 right-1/4 w-[300px] h-[300px] bg-emerald-500/5 rounded-full blur-3xl" />
        </div>

        <Section className="text-center pt-24 pb-4 relative">
          <Badge className="text-teal-400 bg-teal-400/10 border-teal-400/30 mb-6">
            <LayoutGrid className="w-3 h-3" />
            6 sistemas prontos · em produção agora
          </Badge>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">
            Central de Sistemas
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Cada sistema abaixo já foi construído, testado e roda em produção resolvendo um problema real.{' '}
            <strong className="text-white">Assine o que seu negócio precisa</strong> e comece a usar essa semana — sem esperar meses de desenvolvimento.
          </p>

          <BillingToggle billing={billing} onChange={setBilling} />
        </Section>
      </div>

      {/* ── Grid de sistemas ── */}
      <Section id="sistemas" className="pt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.slug} product={product} billing={billing} />
          ))}
        </div>

        {/* Trust bar */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-14 text-sm text-slate-500">
          {TRUST_ITEMS.map(({ Icon, label }, i) => (
            <div key={i} className="flex items-center gap-2">
              <Icon className="w-4 h-4 text-teal-400" /> {label}
            </div>
          ))}
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
            <a href="/" className="hover:text-slate-400 transition-colors">Início</a>
            <a href="/provedor" className="hover:text-slate-400 transition-colors">Curso para ISPs</a>
            <a href="/privacidade" className="hover:text-slate-400 transition-colors">Privacidade</a>
          </div>
          <p className="text-sm text-slate-600">
            © 2026 Kem Soluções. Construído com NEXCORE.
          </p>
        </div>
      </footer>

    </div>
  )
}
