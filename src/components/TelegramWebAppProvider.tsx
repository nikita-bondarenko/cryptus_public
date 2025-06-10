'use client'

import { useEffect } from 'react'
import Script from 'next/script'




export function TelegramWebAppProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const script = document.createElement('script')
      script.src = 'https://telegram.org/js/telegram-web-app.js'
      script.async = true
      script.onload = () => {
        if (window.Telegram?.WebApp) {
          window.Telegram.WebApp.ready()
          window.Telegram.WebApp.expand()
        }
      }
      document.body.appendChild(script)

      return () => {
        document.body.removeChild(script)
      }
    }
  }, [])

  return (
    <>
      <Script
        src="https://telegram.org/js/telegram-web-app.js"
        strategy="beforeInteractive"
        onLoad={() => {
          if (window.Telegram?.WebApp) {
            window.Telegram.WebApp.ready()
            window.Telegram.WebApp.expand()
          }
        }}
      />
      {children}
    </>
  )
} 