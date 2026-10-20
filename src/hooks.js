import { useEffect, useState } from 'react'
export function useLocalStorage(key, initial) {
  const [v, setV] = useState(() => { try { return JSON.parse(localStorage.getItem(key)) ?? initial } catch { return initial } })
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(v)) } catch {} }, [key, v])
  return [v, setV]
}

export function usePremium() {
  const [isPremium, setIsPremium] = useLocalStorage('wl-pro-unlocked', false)
  return {
    isPremium,
    activateDemoPremium: () => setIsPremium(true),
  }
}
