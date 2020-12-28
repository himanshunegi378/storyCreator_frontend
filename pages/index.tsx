import React from 'react'
import Section from '../components/Section'

export default function Home() {
  return (
    <div>
      <Section
        fragments={[
          { text: 'Himanshu', like: 10 },
          { text: 'Laxmi', like: 10 },
          { text: 'Lata', like: 10 }
        ]}
      />
    </div>
  )
}
