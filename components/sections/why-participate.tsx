'use client'

import { useEffect, useRef, useState } from 'react'

const benefits = [
  {
    icon: '🚀',
    title: 'Showcase Your Skills',
    description: 'Build and demonstrate your technical abilities in a supportive, competitive environment with industry professionals as judges.',
  },
  {
    icon: '🤝',
    title: 'Network & Collaborate',
    description: 'Connect with like-minded innovators, potential teammates, mentors, and industry leaders in tech.',
  },
  {
    icon: '🏆',
    title: 'Win Amazing Prizes',
    description: 'Compete for cash prizes, internship opportunities, and special recognition for women-led teams.',
  },
  {
    icon: '💡',
    title: 'Build Impact',
    description: 'Create solutions that matter. Focus on real-world problems and meaningful innovation with social impact.',
  },
]

export default function WhyParticipate() {
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
    <section ref={ref} className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-[#1a1a2e] overflow-hidden">
      {/* Background gradient accent */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-secondary/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className={`transition-all duration-1000 mb-16 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-balance">
            Why Participate?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            HACKHERTHON offers more than competition—it&apos;s an opportunity to grow, connect, and make a difference.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`group relative bg-card/40 backdrop-blur-sm border border-primary/20 rounded-2xl p-8 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 cursor-pointer ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{
                transitionDelay: isVisible ? `${index * 100}ms` : '0ms',
              }}
            >
              {/* Gradient background on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
              </div>

              {/* Border accent animation */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
