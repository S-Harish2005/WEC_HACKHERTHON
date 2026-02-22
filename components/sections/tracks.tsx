'use client'

import { useEffect, useRef, useState } from 'react'

const tracks = [
  {
    title: 'AI/ML',
    description: 'Build intelligent systems using machine learning, deep learning, and artificial intelligence.',
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    title: 'Web Development',
    description: 'Create stunning, responsive web applications with modern tech stacks and frameworks.',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Cybersecurity',
    description: 'Develop solutions to protect systems, data, and users from digital threats.',
    gradient: 'from-blue-500 to-purple-500',
  },
  {
    title: 'Social Impact',
    description: 'Create technology solutions that address real-world social and environmental challenges.',
    gradient: 'from-green-500 to-teal-500',
  },
  {
    title: 'Open Innovation',
    description: 'Bring your unique idea to life. Choose your own technology and challenge.',
    gradient: 'from-orange-500 to-pink-500',
  },
]

export default function Tracks() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredTrack, setHoveredTrack] = useState<number | null>(null)
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
      {/* Background gradient accents */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-gradient-to-tr from-secondary/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className={`transition-all duration-1000 mb-16 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-balance">
            Innovation Tracks
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Choose your path and compete across multiple innovation categories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {tracks.map((track, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredTrack(index)}
              onMouseLeave={() => setHoveredTrack(null)}
              className={`group relative h-64 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              } ${
                hoveredTrack === index ? 'lg:col-span-2 lg:row-span-2' : ''
              }`}
              style={{
                transitionDelay: isVisible ? `${index * 75}ms` : '0ms',
              }}
            >
              {/* Gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${track.gradient} opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
              
              {/* Card content */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-6 flex flex-col justify-between">
                <div />
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-2">{track.title}</h3>
                  <p className={`text-sm text-gray-200 leading-relaxed transition-all duration-300 ${
                    hoveredTrack === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                  }`}>
                    {track.description}
                  </p>
                </div>
              </div>

              {/* Border gradient */}
              <div className="absolute inset-0 border-2 border-transparent bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  backgroundImage: `linear-gradient(${track.gradient})`,
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                  borderColor: 'transparent',
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
