'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'

const problems = [
  {
    id: 1,
    title: 'AI/ML Innovation',
    description: 'Build AI and machine learning solutions that solve real-world problems. Explore natural language processing, computer vision, and predictive analytics.',
  },
  {
    id: 2,
    title: 'Web Development Excellence',
    description: 'Create responsive, user-friendly web applications. Showcase your skills in frontend, backend, and full-stack development with modern technologies.',
  },
  {
    id: 3,
    title: 'Cybersecurity & Privacy',
    description: 'Design secure systems and applications. Develop tools and solutions that protect data, ensure privacy, and mitigate cybersecurity threats.',
  },
  {
    id: 4,
    title: 'IoT & Hardware Integration',
    description: 'Combine hardware and software to create smart connected devices. Develop IoT solutions that improve efficiency and user experience.',
  },
  {
    id: 5,
    title: 'Social Impact Technology',
    description: 'Build technology solutions for social good. Address challenges in education, healthcare, environment, and community development.',
  },
  {
    id: 6,
    title: 'Open Innovation',
    description: 'Bring your creative ideas to life. Whether it is a mobile app, game, tool, or any innovative solution - showcase your creativity and technical prowess.',
  },
]

export default function ProblemStatement() {
  const [isVisible, setIsVisible] = useState(false)
  const [expandedId, setExpandedId] = useState<number | null>(null)
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

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <section ref={ref} className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-background overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-bl from-primary/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-tr from-secondary/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="text-primary font-semibold text-sm uppercase tracking-widest mb-4 block">Problem Statements</span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-balance">
            Choose Your Challenge
          </h2>
          <p className="text-lg text-muted-foreground">
            HACKHERTHON offers multiple innovation tracks to challenge your creativity and technical skills. Click on any track to view full details.
          </p>
        </div>

        {/* Problem Statements List */}
        <div className="space-y-4">
          {problems.map((problem, index) => (
            <div
              key={problem.id}
              className={`transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{
                transitionDelay: isVisible ? `${index * 50}ms` : '0ms',
              }}
            >
              <button
                onClick={() => toggleExpand(problem.id)}
                className="w-full text-left"
              >
                <div className="relative bg-gradient-to-r from-card to-card/50 border border-primary/20 rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 group">
                  {/* Decorative top accent */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Header */}
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                      {problem.title}
                    </h3>
                    <ChevronDown 
                      className={`w-6 h-6 text-primary flex-shrink-0 transition-transform duration-300 ${
                        expandedId === problem.id ? 'transform rotate-180' : ''
                      }`}
                    />
                  </div>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary rounded-b-xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </div>
              </button>

              {/* Expanded Content */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  expandedId === problem.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="bg-card/30 border border-t-0 border-primary/20 rounded-b-xl p-6 sm:p-8">
                  <p className="text-foreground/80 text-base leading-relaxed">
                    {problem.description}
                  </p>
                  <div className="mt-6 pt-6 border-t border-primary/10">
                    <p className="text-primary font-semibold text-sm mb-3">What you can build:</p>
                    <ul className="text-foreground/70 text-sm space-y-2">
                      <li>Innovative solutions addressing real-world challenges</li>
                      <li>Prototype or fully functional implementation</li>
                      <li>Original ideas with technical depth and creativity</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
