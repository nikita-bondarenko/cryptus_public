'use client'

import { useEffect, useState } from 'react'
import type WebAppType from '@twa-dev/sdk'

let webAppInstance: typeof WebAppType | null = null
let isInitialized = false

export function useTelegramWebApp() {
  const [webApp, setWebApp] = useState<typeof WebAppType | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    if (webAppInstance) {
      setWebApp(webAppInstance)
      return
    }

    import('@twa-dev/sdk').then((mod) => {
      const WebApp = mod.default
      if (!isInitialized) {
        WebApp.ready()
        isInitialized = true
      }
      webAppInstance = WebApp
      setWebApp(WebApp)
    })
  }, [])

  return webApp
}
