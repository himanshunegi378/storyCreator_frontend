import React, { useEffect, ReactElement } from 'react'
import useNumberRange from '../hooks/useNumberRange'
import Fragment, { IFragment } from './Fragment.component'

export interface SectionProps {
  fragments: IFragment[]
}

function Section(props: SectionProps): ReactElement {
  const { fragments } = props
  const [fragmentInViewIndex, setFragmentInViewIndex] = useNumberRange(
    0,
    fragments.length
  )

  useEffect(() => {
    const fragmentsCount = props.fragments.length
    if (fragmentInViewIndex > fragmentsCount - 1) {
      setFragmentInViewIndex(fragmentsCount - 1)
    }
  }, [fragmentInViewIndex, props.fragments, setFragmentInViewIndex])

  function moveLeft() {
    setFragmentInViewIndex(
      (fragmentInViewIndex - 1 + fragments.length) % fragments.length
    )
  }

  function moveRight() {
    setFragmentInViewIndex((fragmentInViewIndex + 1) % fragments.length)
  }

  return (
    <div className="flex w-full justify-between">
      <button
        data-testid="previousButton"
        className="px-2 bg-gray-300"
        onClick={moveLeft}
      >
        {' '}
        {'<'}{' '}
      </button>
      <div data-testid="fragmentView" className="flex-grow">
        {props.fragments[fragmentInViewIndex] ? (
          <Fragment
            text={props.fragments[fragmentInViewIndex].text}
            like={props.fragments[fragmentInViewIndex].like}
          />
        ) : (
          'Add Fragment'
        )}
      </div>
      <button
        data-testid="nextButton"
        className="px-2 bg-gray-300"
        onClick={moveRight}
      >
        {' '}
        {'>'}{' '}
      </button>
    </div>
  )
}

export default Section
