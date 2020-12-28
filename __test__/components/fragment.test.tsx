import React from 'react'
import { cleanup, render } from '@testing-library/react'
import Fragment, { IFragment } from '../../components/Fragment'

afterEach(cleanup)

describe('Fragment', () => {
  it('match snapshot', () => {
    const fragmentProps: IFragment = { like: 10, text: 'himanshu' }
    const { asFragment } = render(<Fragment {...fragmentProps} />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should show provided text', () => {
    const fragmentProps: IFragment = { like: 10, text: 'himanshu' }
    const { getByTestId } = render(<Fragment {...fragmentProps} />)
    expect(getByTestId('text')).toHaveTextContent('himanshu')
  })

  it('should show provided likes', () => {
    const fragmentProps: IFragment = { like: 10, text: 'himanshu' }
    const { getByTestId } = render(<Fragment {...fragmentProps} />)
    expect(getByTestId('like')).toHaveTextContent('10')
  })
})
