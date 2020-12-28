import React from 'react'
import { cleanup, render } from '@testing-library/react'
import Section, { SectionProps } from '../../components/Section'
import userEvent from '@testing-library/user-event'

afterEach(cleanup)

describe('Section Component', () => {
  it('snapshot with fragments props', () => {
    const sectionProps: SectionProps = {
      fragments: [
        { text: 'himanshu', like: 10 },
        { text: 'himanshu', like: 10 },
        { text: 'himanshu', like: 10 }
      ]
    }
    const { asFragment } = render(<Section {...sectionProps} />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('when fragment props empty', () => {
    const sectionProps: SectionProps = {
      fragments: []
    }
    const { getByTestId } = render(<Section {...sectionProps} />)

    expect(getByTestId('fragmentView')).toHaveTextContent('Add Fragment')
  })

  it('should show previous fragment data when previousButton Clicked', () => {
    const sectionProps: SectionProps = {
      fragments: [
        { text: 'Himanshu', like: 10 },
        { text: 'Laxmi', like: 10 },
        { text: 'Lata', like: 10 }
      ]
    }
    const { getByTestId } = render(<Section {...sectionProps} />)
    expect(getByTestId('text')).toHaveTextContent('Himanshu')
    userEvent.click(getByTestId('previousButton'))
    expect(getByTestId('text')).toHaveTextContent('Himanshu')
  })

  it('should show next fragment data when nextButton Clicked', () => {
    const sectionProps: SectionProps = {
      fragments: [
        { text: 'Himanshu', like: 10 },
        { text: 'Laxmi', like: 10 },
        { text: 'Lata', like: 10 }
      ]
    }
    const { getByTestId } = render(<Section {...sectionProps} />)
    expect(getByTestId('text')).toHaveTextContent('Himanshu')
    userEvent.click(getByTestId('nextButton'))
    expect(getByTestId('text')).toHaveTextContent('Laxmi')
  })

  it('Add button click should open modal form to add fragment data', () => {})

  it('modal submision should append a new fragment Data in section props', () => {})
})
