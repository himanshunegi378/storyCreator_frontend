import useAxios from 'axios-hooks'
import React, { useEffect, ReactElement, useState } from 'react'
import useNumberRange from '../hooks/useNumberRange'
import Fragment, { IFragment } from './Fragment.component'

export interface SectionProps {
  sectionId: string
}

function Section(props: SectionProps): ReactElement {
  const { sectionId } = props
  const [fragments, setFragments] = useState([])
  const [fragmentInViewIndex, setFragmentInViewIndex] = useNumberRange(
    0,
    fragments.length
  )

  const [{ data, loading, error }, refetch] = useAxios(
    {
      method: 'GET',
      baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
      url: '/fragment',
      params: {
        sectionId: sectionId
      }
    },
    { manual: false }
  )

  useEffect(() => {
    if (!data) return
    setFragments(data)
    console.log(data)
  }, [data])

  useEffect(() => {
    const fragmentsCount = fragments.length
    if (fragmentInViewIndex > fragmentsCount - 1) {
      setFragmentInViewIndex(fragmentsCount - 1)
    }
  }, [fragmentInViewIndex, fragments, setFragmentInViewIndex])

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
        {fragments[fragmentInViewIndex] ? (
          <Fragment
            text={fragments[fragmentInViewIndex].text}
            like={fragments[fragmentInViewIndex].like}
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
