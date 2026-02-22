'use client'

import { useEffect, useRef, useState } from 'react'
import { Waves } from '@/components/ui/wave-background'

const prizes = [
  {
    position: '🥇',
    title: '1st Prize',
    amount: '₹75,000',
    badge: null,
    color: 'from-yellow-500 to-amber-500',
  },
  {
    position: '🥈',
    title: '2nd Prize',
    amount: '₹50,000',
    badge: null,
    color: 'from-gray-400 to-gray-500',
  },
  {
    position: '🥉',
    title: '3rd Prize',
    amount: '₹25,000',
    badge: null,
    color: 'from-orange-400 to-orange-500',
  },
  {
    position: '👩‍💻',
    title: 'Women-Led Team Award',
    amount: '₹40,000',
    badge: '⭐ Special Recognition',
    color: 'from-pink-500 to-rose-500',
  },
]

export default function Prizes() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredPrize, setHoveredPrize] = useState<number | null>(null)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true)
    }, { threshold: 0.1 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-background overflow-hidden">
      {/* Wave — pointer events fully on so mouse interaction works */}
      <Waves
        strokeColor="var(--secondary)"
        backgroundColor="transparent"
        pointerSize={0.5}
        className="opacity-60"
      />

      {/* Gradient accents — pointer-events-none so they don't block wave */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-gradient-to-r from-primary/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-gradient-to-l from-secondary/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 pointer-events-none">
        <div className={`transition-all duration-1000 mb-16 pointer-events-none ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">Prize Pool</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Total prize pool of ₹2,00,000+ to reward the best innovations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {prizes.map((prize, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredPrize(index)}
              onMouseLeave={() => setHoveredPrize(null)}
              className={`group relative h-80 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 transform pointer-events-auto ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              } ${hoveredPrize === index ? '-translate-y-4' : ''}`}
              style={{ transitionDelay: isVisible ? `${index * 100}ms` : '0ms' }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${prize.color} opacity-15 group-hover:opacity-30 transition-opacity duration-500`} />
              <div className="absolute inset-0 border-2 border-primary/20 group-hover:border-primary/60 rounded-2xl transition-colors duration-300" />
              <div className="absolute inset-0 rounded-2xl shadow-2xl shadow-primary/0 group-hover:shadow-primary/50 transition-shadow duration-500" />

              <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-6">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {prize.position}
                </div>
                <h3 className="text-2xl font-bold mb-2">{prize.title}</h3>
                {prize.badge && (
                  <div className="inline-block px-3 py-1 bg-primary/20 border border-primary/40 rounded-full text-xs font-semibold text-primary mb-4 group-hover:bg-primary/30 transition-colors duration-300">
                    {prize.badge}
                  </div>
                )}
                <div className={`text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${prize.color} transition-all duration-300 ${hoveredPrize === index ? 'scale-110' : ''}`}>
                  {prize.amount}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={`mt-16 p-6 sm:p-8 bg-card/50 backdrop-blur-sm border border-primary/20 rounded-xl transition-all duration-1000 text-center pointer-events-auto ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-muted-foreground mb-2">
            🎁 Plus internship opportunities, mentorship, and exciting merchandise for all participants
          </p>
        </div>
      </div>
    </section>
  )
}
