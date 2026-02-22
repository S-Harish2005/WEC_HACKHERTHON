'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

type CarouselItem = {
  id: number
  image: string
  title: string
  description: string
  details: string
}

const items: CarouselItem[] = [
  {
    id: 1,
    image: '/wec-logo.jpg',
    title: 'Women Empowerment Cell',
    description: 'WEC',
    details: 'The Women Empowerment Cell (WEC) of SVCE is dedicated to fostering an inclusive environment and empowering women in technology. We organize events, workshops, seminars, and training sessions to equip women with the skills, confidence to excel in their roles. Actively works toward creating a more inclusive and supportive environment for all members.',
  },
  {
    id: 2,
    image: '/svce-logo.png',
    title: 'SVCE',
    description: 'Sri Venkateswara College of Engineering',
    details: 'Sri Venkateswara College of Engineering (SVCE) is one of the premier engineering institutions established by the Southern Petrochemical Industries Corporation (SPIC) group. The college offers 12 UG programs and 8 PG programs. SVCE is ISO 2100:2018 certified institution and accredited by NAAC. The college was established in the year 1997 by SPIC.',
  },
  {
    id: 3,
    image: '/epic-logo.jpg',
    title: 'EPIC',
    description: 'Entrepreneurship Development Cell',
    details: 'The Entrepreneurship Development Cell (EDC) was established in Feb. 2023, with the funding support from the National Science and Technology Entrepreneurship Development Board (NSTEDB), Department of Science and Technology, Government of India. EPIC is a brand and central government recognized organization providing entrepreneurship activities for the benefit of the student community and society.',
  },
]

export default function CarouselSection() {
  const [current, setCurrent] = useState(0)
  const [isAutoplay, setIsAutoplay] = useState(true)

  useEffect(() => {
    if (!isAutoplay) return

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % items.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [isAutoplay])

  const next = () => {
    setCurrent((prev) => (prev + 1) % items.length)
    setIsAutoplay(false)
  }

  const prev = () => {
    setCurrent((prev) => (prev - 1 + items.length) % items.length)
    setIsAutoplay(false)
  }

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-[#1a1a2e] to-background overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-80 h-80 bg-gradient-to-r from-primary/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-gradient-to-l from-secondary/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 opacity-0 animate-fade-in">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground via-primary to-secondary">
            About Our Community
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Get to know the organizations and initiatives behind HACKHERTHON
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative h-full opacity-0 animate-fade-in-delay-2">
          {/* Carousel Items */}
          <div className="relative h-96 sm:h-80">
            {items.map((item, index) => (
              <div
                key={item.id}
                className={`absolute inset-0 transition-all duration-700 ease-out ${
                  index === current
                    ? 'opacity-100 translate-x-0'
                    : index < current
                      ? 'opacity-0 -translate-x-full'
                      : 'opacity-0 translate-x-full'
                }`}
              >
                <div className="h-full flex flex-col items-center justify-center text-center">
                  {/* Image */}
                  <div className="mb-8 transform transition-transform duration-700">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-20 w-auto object-contain mx-auto drop-shadow-lg"
                    />
                  </div>

                  {/* Content */}
                  <div className="max-w-2xl px-6">
                    <h3 className="text-3xl sm:text-4xl font-bold mb-2 text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-primary text-lg font-semibold mb-4">
                      {item.description}
                    </p>
                    <p className="text-muted-foreground text-base leading-relaxed">
                      {item.details}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <Button
              variant="outline"
              size="icon"
              onClick={prev}
              className="rounded-full h-12 w-12 border-primary/50 hover:bg-primary/10"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            {/* Dot Indicators */}
            <div className="flex gap-3">
              {items.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrent(index)
                    setIsAutoplay(false)
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === current
                      ? 'bg-primary w-8'
                      : 'bg-muted-foreground/40 w-2 hover:bg-muted-foreground/60'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={next}
              className="rounded-full h-12 w-12 border-primary/50 hover:bg-primary/10"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Autoplay Indicator */}
          <div className="text-center mt-6">
            <p className="text-xs text-muted-foreground">
              {isAutoplay ? 'Auto-playing' : 'Manual mode'} • Slide {current + 1} of {items.length}
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-primary rounded-full blur-3xl opacity-5" />
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-secondary rounded-full blur-3xl opacity-5" />
    </section>
  )
}
