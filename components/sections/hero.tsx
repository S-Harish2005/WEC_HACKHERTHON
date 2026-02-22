'use client'

import { useState, useEffect } from 'react'
import { FallingPattern } from '@/components/ui/falling-pattern'
import { TextScramble } from '@/components/ui/text-scramble'
import { RippleButton } from '@/components/ui/ripple-button'

export default function Hero() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [triggerScramble, setTriggerScramble] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-background">
      {/* Falling Pattern Background */}
      <div className="absolute inset-0 z-0">
        <FallingPattern 
          color="var(--primary)"
          backgroundColor="transparent"
          duration={120}
          className="opacity-40 [mask-image:radial-gradient(ellipse_at_center,transparent_0%,var(--background)_70%)]"
        />
      </div>

      {/* Animated gradient blobs beneath pattern */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary to-secondary rounded-full blur-3xl animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-r from-secondary to-primary rounded-full blur-3xl animate-blob animation-delay-2000" />
      </div>

      {/* Enhanced overlay for readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-background/60 via-background/40 to-background/60" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-block mb-8 opacity-0 animate-fade-in">
          <span className="px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 text-primary text-sm font-medium">
            Women Empowerment Cell
          </span>
        </div>

        <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold mb-6 opacity-0 animate-fade-in-delay-1 leading-tight text-balance">
          <TextScramble
            as="span"
            trigger={triggerScramble}
            duration={2}
            speed={0.12}
            className="bg-clip-text text-transparent bg-gradient-to-r from-foreground via-primary to-secondary inline-block font-bold"
            onScrambleComplete={() => setTriggerScramble(false)}
          >
            HACKHERTHON
          </TextScramble>
        </h1>

        <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed opacity-0 animate-fade-in-delay-2">
          Empowering Innovation Through Code
        </p>

        <p className="text-base sm:text-lg text-muted-foreground mb-12 max-w-3xl mx-auto opacity-0 animate-fade-in-delay-3">
          Join us for an empowering hackathon experience where innovation meets inclusivity. Collaborate with brilliant minds, build groundbreaking solutions, and showcase your skills in a warm and supportive environment.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center opacity-0 animate-fade-in-delay-4">
          <RippleButton
            variant="primary"
            className="bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/50 text-primary-foreground"
            onClick={() => window.open('https://forms.gle/AEesKaFhCCMMoxs1A', '_blank')}
          >
            Register Now
          </RippleButton>
          <RippleButton
            variant="outline"
            className="hover:bg-primary/10"
            onClick={() => {}}
          >
            Download Brochure
          </RippleButton>
        </div>

        <div className="mt-16 opacity-0 animate-fade-in-delay-5">
          <p className="text-sm text-muted-foreground mb-4">Featured Categories</p>
          <div className="flex flex-wrap gap-3 justify-center text-xs sm:text-sm">
            {['AI/ML', 'Web Dev', 'Cybersecurity', 'Social Impact', 'Open Innovation'].map((track) => (
              <span 
                key={track}
                className="px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-foreground hover:border-primary/50 transition-colors duration-300"
              >
                {track}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-primary/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}
