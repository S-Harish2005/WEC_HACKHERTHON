'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import { RippleButton } from '@/components/ui/ripple-button'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Problems', href: '#problems' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Prizes', href: '#prizes' },
  { label: 'Rules', href: '#rules' },
  { label: 'FAQ', href: '#faq' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const ids = navLinks.map(l => l.href.replace('#', ''))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { threshold: 0.3 }
    )
    ids.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const scrollTo = (href: string) => {
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-2 bg-background/85 backdrop-blur-xl border-b border-primary/10 shadow-lg shadow-primary/5'
          : 'py-4 bg-transparent'
      }`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

          {/* Logo — WEC image */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 group"
          >
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-primary/30 group-hover:border-primary/60 shadow-lg shadow-primary/20 group-hover:shadow-primary/50 transition-all duration-300 group-hover:scale-105 bg-white">
              <Image
                src="/wec-logo.jpg"
                alt="WEC Logo"
                fill
                className="object-cover"
              />
            </div>
            <span className="text-base font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-tight hidden sm:block">
              HACKHERTHON
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className={`relative px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-300 group ${
                  activeSection === link.href.replace('#', '')
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <span className={`absolute inset-0 rounded-lg bg-primary/10 transition-all duration-300 ${
                  activeSection === link.href.replace('#', '') ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
                }`} />
                <span className="relative z-10">{link.label}</span>
              </button>
            ))}
          </div>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <RippleButton
                variant="primary"
                className="bg-gradient-to-r from-primary to-secondary text-primary-foreground text-sm px-5 py-2 shadow-lg shadow-primary/20 hover:shadow-primary/50"
                onClick={() => window.open('https://forms.gle/AEesKaFhCCMMoxs1A', '_blank')}
              >
                Register Now
              </RippleButton>
            </div>

            <button
              onClick={() => setMenuOpen(v => !v)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {menuOpen
                ? <X className="w-5 h-5 text-primary" />
                : <Menu className="w-5 h-5 text-primary" />
              }
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
        menuOpen ? 'pointer-events-auto' : 'pointer-events-none'
      }`}>
        <div
          className={`absolute inset-0 bg-background/60 backdrop-blur-sm transition-opacity duration-300 ${menuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setMenuOpen(false)}
        />
        <div className={`absolute top-0 right-0 h-full w-72 bg-background/95 backdrop-blur-xl border-l border-primary/20 shadow-2xl shadow-primary/10 transition-transform duration-300 flex flex-col ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="flex items-center justify-between px-6 py-5 border-b border-primary/10">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-primary/30 bg-white">
                <Image src="/wec-logo.jpg" alt="WEC" fill className="object-cover" />
              </div>
              <span className="text-base font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                HACKHERTHON
              </span>
            </div>
            <button
              onClick={() => setMenuOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-primary/10 transition-colors"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          <nav className="flex flex-col gap-1 px-4 py-6 flex-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-medium transition-all duration-200 ${
                  activeSection === link.href.replace('#', '')
                    ? 'bg-primary/15 text-primary border border-primary/25'
                    : 'text-muted-foreground hover:bg-primary/10 hover:text-foreground'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary/50 flex-shrink-0" />
                {link.label}
              </button>
            ))}
          </nav>

          <div className="px-6 py-6 border-t border-primary/10">
            <button
              onClick={() => { window.open('https://forms.gle/AEesKaFhCCMMoxs1A', '_blank'); setMenuOpen(false) }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground text-sm font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 hover:scale-[1.02]"
            >
              Register Now →
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
