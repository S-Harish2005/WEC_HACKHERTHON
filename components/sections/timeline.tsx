'use client'

import { Timeline } from '@/components/ui/timeline'

const timelineData = [
  {
    title: 'Registration Start',
    content: (
      <div>
        <p className="text-foreground/80 text-sm md:text-base font-normal mb-4">
          Registration opens for HACKHERTHON. Assemble your team or register as an individual participant. Early registration recommended to secure your spot.
        </p>
        <div className="mb-4 space-y-2">
          <p className="text-primary font-semibold text-sm">Key Details:</p>
          <ul className="text-foreground/70 text-sm space-y-1">
            <li>Team size: 1-4 members</li>
            <li>Registration fee: Free for SVCE students</li>
            <li>External participants welcome</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: 'Registration End',
    content: (
      <div>
        <p className="text-foreground/80 text-sm md:text-base font-normal mb-4">
          Final day to register your team or individual participation. No registrations accepted after this deadline.
        </p>
        <div className="mb-4 space-y-2">
          <p className="text-primary font-semibold text-sm">Last Minute Checklist:</p>
          <ul className="text-foreground/70 text-sm space-y-1">
            <li>Confirm team members and contact details</li>
            <li>Choose your problem statement track</li>
            <li>Submit any required documentation</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: 'Results Out',
    content: (
      <div>
        <p className="text-foreground/80 text-sm md:text-base font-normal mb-4">
          Winners and finalists announced. Results will be shared across all participants via email and on our website.
        </p>
        <div className="mb-4 space-y-2">
          <p className="text-primary font-semibold text-sm">Result Details:</p>
          <ul className="text-foreground/70 text-sm space-y-1">
            <li>Top 3 teams in each track advance to finals</li>
            <li>Detailed feedback from judges provided</li>
            <li>Certificate of participation for all teams</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: 'Final Round',
    content: (
      <div>
        <p className="text-foreground/80 text-sm md:text-base font-normal mb-4">
          Final presentations and awards ceremony. Selected finalists pitch their projects to judges and industry experts. Grand prizes awarded to winners.
        </p>
        <div className="mb-4 space-y-2">
          <p className="text-primary font-semibold text-sm">Prize Pool:</p>
          <ul className="text-foreground/70 text-sm space-y-1">
            <li>1st Prize: 50,000</li>
            <li>2nd Prize: 30,000</li>
            <li>3rd Prize: 20,000</li>
          </ul>
        </div>
      </div>
    ),
  },
]

export default function TimelineSection() {
  return (
    <div className="w-full bg-background">
      <Timeline data={timelineData} />
    </div>
  )
}
