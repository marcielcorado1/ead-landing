import { useState } from 'react'

const SECRET = import.meta.env.VITE_SITE_SECRET as string | undefined
const SESSION_KEY = 'ead_auth'

function isAuthenticated() {
  if (!SECRET) return true // sem var configurada, site aberto
  return sessionStorage.getItem(SESSION_KEY) === SECRET
}

export default function PasswordGate({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(isAuthenticated)
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)

  if (authenticated) return <>{children}</>

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (input === SECRET) {
      sessionStorage.setItem(SESSION_KEY, SECRET!)
      setAuthenticated(true)
    } else {
      setError(true)
      setInput('')
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-600 mb-4">
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-xl font-semibold text-white">Acesso restrito</h1>
          <p className="text-sm text-gray-400 mt-1">Digite a senha para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            autoFocus
            value={input}
            onChange={e => { setInput(e.target.value); setError(false) }}
            placeholder="Senha"
            className={`w-full px-4 py-3 rounded-xl bg-gray-800 text-white placeholder-gray-500 border outline-none transition-colors ${
              error ? 'border-red-500' : 'border-gray-700 focus:border-indigo-500'
            }`}
          />
          {error && (
            <p className="text-sm text-red-400">Senha incorreta. Tente novamente.</p>
          )}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  )
}
