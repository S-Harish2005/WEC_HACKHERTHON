'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const rules = [
  {
    category: 'Team Composition',
    items: [
      'Teams can have 2-4 members',
      'Members must be pre-registered before hackathon starts',
      'Individual participation is also allowed',
      'Team leaders must be present at the venue',
    ],
  },
  {
    category: 'Code & Submission',
    items: [
      'All code must be original and developed during the hackathon',
      'Pre-existing projects cannot be modified for submission',
      'Code should be uploaded to GitHub with proper documentation',
      'Submission deadline is strict - late submissions will not be accepted',
    ],
  },
  {
    category: 'Conduct & Environment',
    items: [
      'Respectful behavior towards all participants and organizers',
      'No plagiarism or dishonest practices allowed',
      'Harassment of any kind will result in disqualification',
      'Follow all venue rules and instructions from organizers',
    ],
  },
  {
    category: 'Judging Criteria',
    items: [
      'Innovation & Creativity (30%)',
      'Technical Implementation (30%)',
      'Problem Solving & Impact (20%)',
      'Presentation & Demo (20%)',
    ],
  },
]

export default function Rules() {
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
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-tr from-secondary/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className={`transition-all duration-1000 mb-16 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            Rules & Guidelines
          </h2>
          <p className="text-lg text-muted-foreground">
            Please review these important guidelines before participating.
          </p>
        </div>

        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {rules.map((ruleGroup, index) => (
              <AccordionItem
                key={index}
                value={`rule-${index}`}
                className="border border-primary/20 rounded-xl data-[state=open]:border-primary/50 overflow-hidden transition-all duration-300 bg-card/40 backdrop-blur-sm hover:border-primary/30"
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline group">
                  <span className="text-lg font-bold group-hover:text-primary transition-colors duration-300">
                    {ruleGroup.category}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-muted-foreground">
                  <ul className="space-y-3">
                    {ruleGroup.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3">
                        <span className="text-primary font-bold mt-1">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Important note */}
        <div className={`mt-12 p-6 sm:p-8 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/30 rounded-xl transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <p className="text-sm text-foreground">
            <span className="font-bold">Important:</span> By registering for HACKHERTHON, you agree to follow all rules and guidelines. Violations may result in disqualification and exclusion from future events.
          </p>
        </div>
      </div>
    </section>
  )
}
