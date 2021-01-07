import React, { ReactElement } from 'react'
import Section from '../components/Section.component'

export default function Home(): ReactElement {
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
