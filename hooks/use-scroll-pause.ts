"use client"

import { useEffect, useState } from "react"

/**
 * Hook que detecta scroll rápido y pausa animaciones
 * Mejora rendimiento pausando animaciones durante scroll
 */
export function useScrollPause() {
  const [isScrolling, setIsScrolling] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout
    let lastScrollY = window.scrollY
    let scrollSpeed = 0

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      scrollSpeed = Math.abs(currentScrollY - lastScrollY)
      lastScrollY = currentScrollY

      // Si scroll es rápido (>50px), pausar animaciones
      if (scrollSpeed > 50) {
        setIsPaused(true)
        setIsScrolling(true)
      } else {
        setIsPaused(false)
      }

      // Limpiar timeout anterior
      clearTimeout(scrollTimeout)

      // Reanudar animaciones después de 150ms sin scroll
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false)
        setIsPaused(false)
      }, 150)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(scrollTimeout)
    }
  }, [])

  return { isScrolling, isPaused }
}
