'use client'

import { useEffect, useRef, useState } from 'react'

const stats = [
  { number: '200+', label: 'Expected Participants', icon: '👩‍💻' },
  { number: '₹2L+', label: 'Total Prize Pool', icon: '🏆' },
  { number: '5', label: 'Innovation Tracks', icon: '🚀' },
]

const highlights = [
  { label: 'Free to enter', icon: '✦' },
  { label: 'Open to all', icon: '✦' },
  { label: 'Industry mentors', icon: '✦' },
  { label: 'Certificates for all', icon: '✦' },
]

export default function About() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
      }
    }, { threshold: 0.1 })

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-background overflow-hidden">
      {/* Rich background layer */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-primary/15 via-secondary/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-secondary/10 to-transparent rounded-full blur-3xl" />
        {/* Dot grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle, #ec4899 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Two-column layout */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

          {/* Left: text content */}
          <div>
            {/* Label */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-gradient-to-r from-primary to-transparent" />
              <span className="text-primary font-semibold text-sm uppercase tracking-widest">About The Event</span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 text-balance leading-tight">
              Empowering the{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                Next Generation
              </span>{' '}
              of Innovators
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              HACKHERTHON is more than just a coding competition — it&apos;s a celebration of women in technology and a platform for <span className="text-foreground font-medium">everyone</span> to showcase their creativity, problem-solving abilities, and technical expertise.
            </p>

            <p className="text-base text-muted-foreground leading-relaxed mb-10">
              Whether you&apos;re building your first application or refining advanced solutions, HACKHERTHON provides the perfect environment to collaborate, learn, and create meaningful impact.
            </p>

            {/* Highlights pill row */}
            <div className="flex flex-wrap gap-3">
              {highlights.map((h, i) => (
                <span
                  key={i}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-foreground hover:bg-primary/20 hover:border-primary/40 transition-all duration-300"
                >
                  <span className="text-primary text-xs">{h.icon}</span>
                  {h.label}
                </span>
              ))}
            </div>
          </div>

          {/* Right: stat cards stacked with offset */}
          <div className="relative flex flex-col gap-4">
            {/* Decorative vertical line */}
            <div className="absolute left-0 top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent hidden lg:block" />

            {stats.map((stat, index) => (
              <div
                key={index}
                className={`group relative flex items-center gap-6 bg-card/60 backdrop-blur-sm border border-primary/20 rounded-2xl p-6 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-x-1 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
                style={{ transitionDelay: isVisible ? `${index * 150 + 300}ms` : '0ms' }}
              >
                {/* Left accent */}
                <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl bg-gradient-to-b from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Icon circle */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/10 border border-primary/20 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>

                {/* Number + label */}
                <div>
                  <div className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                    {stat.number}
                  </div>
                  <p className="text-muted-foreground text-sm mt-0.5">{stat.label}</p>
                </div>

                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            ))}

            {/* Decorative floating badge */}
            <div className="absolute -top-4 -right-4 px-3 py-1.5 bg-gradient-to-r from-primary to-secondary rounded-full text-xs font-bold text-primary-foreground shadow-lg shadow-primary/30 rotate-3 select-none hidden sm:block">
              SVCE × WEC 2025
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
