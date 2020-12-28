import React, { RefObject, useRef, useState, useEffect } from 'react'
import useNumberRange from '../hooks/useNumberRange'
import Fragment, { IFragment } from './Fragment'

export interface SectionProps {
  fragments: IFragment[]
}

function Section(props: SectionProps) {
  const [fragmentInViewIndex, setFragmentInViewIndex] = useNumberRange(
    0,
    props.fragments.length
  )

  useEffect(() => {
    const fragmentsCount = props.fragments.length
    if (fragmentInViewIndex > fragmentsCount - 1) {
      setFragmentInViewIndex(fragmentsCount - 1)
    }
    return () => {}
  }, [props.fragments])

  function moveLeft() {
    setFragmentInViewIndex(
      fragmentInViewIndex - 1 >= 0 ? fragmentInViewIndex - 1 : 0
    )
  }

  function moveRight() {
    const fragmentsCount = props.fragments.length
    setFragmentInViewIndex(
      fragmentInViewIndex + 1 <= fragmentsCount - 1
        ? fragmentInViewIndex + 1
        : fragmentsCount - 1
    )
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
