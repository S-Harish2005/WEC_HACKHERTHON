'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    question: 'Who can participate in HACKHERTHON?',
    answer: 'Anyone with a passion for coding and innovation can participate! Whether you\'re a student, professional, or hobbyist, you\'re welcome. Teams can have 2-4 members, and individual participation is also allowed.',
  },
  {
    question: 'Do I need to have a team before registering?',
    answer: 'No, you can register as an individual and we\'ll help you find teammates. You can also form teams after registration opens. Just make sure your final team is confirmed before the hackathon begins.',
  },
  {
    question: 'What should I bring to the hackathon?',
    answer: 'Bring your laptop, chargers, and any equipment you might need. We\'ll provide snacks, refreshments, and a comfortable workspace. Don\'t forget to bring your enthusiasm and creativity!',
  },
  {
    question: 'Is there a registration fee?',
    answer: 'No, registration is completely free! We believe in making technology accessible to everyone.',
  },
  {
    question: 'Can I use pre-built libraries and frameworks?',
    answer: 'Yes, absolutely! You can use existing libraries, APIs, and frameworks. The focus is on your innovation and implementation, not reinventing the wheel.',
  },
  {
    question: 'What happens if my team cannot complete the project?',
    answer: 'That\'s okay! Participants are judged on innovation, technical skills, and presentation. A partially completed project with a strong idea can still win recognition.',
  },
  {
    question: 'Will there be mentors available?',
    answer: 'Yes! We\'ll have experienced mentors and industry professionals available throughout the hackathon to help guide your team.',
  },
  {
    question: 'How are winners decided?',
    answer: 'Winners are selected based on Innovation & Creativity (30%), Technical Implementation (30%), Problem Solving & Impact (20%), and Presentation & Demo (20%).',
  },
]

export default function FAQ() {
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
      {/* Background gradient accents */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-gradient-to-tr from-secondary/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className={`transition-all duration-1000 mb-16 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Have questions? We&apos;ve got answers.
          </p>
        </div>

        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="border border-primary/20 rounded-xl data-[state=open]:border-primary/50 overflow-hidden transition-all duration-300 bg-card/40 backdrop-blur-sm hover:border-primary/30"
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline group">
                  <span className="text-lg font-semibold text-left group-hover:text-primary transition-colors duration-300">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Still have questions? */}
        <div className={`mt-12 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-muted-foreground mb-4">
            Can&apos;t find your answer?
          </p>
          <p className="text-foreground font-semibold">
            Reach out to us at <a href="mailto:hackherthon@womenempowerment.org" className="text-primary hover:text-secondary transition-colors">
              hackherthon@womenempowerment.org
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
