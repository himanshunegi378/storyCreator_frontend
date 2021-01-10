import useAxios from 'axios-hooks'
import React, { useEffect, ReactElement, useState, FormEvent } from 'react'
import useNumberRange from '../hooks/useNumberRange'
import Fragment, { IFragment } from './Fragment.component'
import Modal from 'react-modal'
import axios from 'axios'

export interface SectionProps {
  sectionId: number
}
Modal.setAppElement('#__next')

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    width: `min(700px,100%)`,
    transform: 'translate(-50%, -50%)'
  }
}

function Section(props: SectionProps): ReactElement {
  const { sectionId } = props
  const [fragments, setFragments] = useState([])
  const [modalIsOpen, setIsOpen] = useState(false)
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

  function handleAddFragment() {
    setIsOpen(true)
  }

  async function addFragment(fragmentText: string) {
    const res = await axios({
      method: 'POST',
      baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
      url: '/createFragment',
      data: {
        sectionId: sectionId,
        text: fragmentText
      }
    })
    return res.data
  }

  async function handleFragmentSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const addedData = await addFragment(event.currentTarget['fragment']?.value)
    if (!addedData?.text) return
    const { id, like, text } = addedData
    setFragments(prevFragments => {
      return [...prevFragments, { id, like, text }]
    })
    setIsOpen(false)
  }

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
    <div className="flex w-full justify-between my-4">
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
          <div className="flex justify-center">
            <button
              onClick={handleAddFragment}
              className="px-4 py-2 bg-blue-300"
            >
              Add Fragment
            </button>
          </div>
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
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        // onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="">
          <form className="" onSubmit={handleFragmentSubmit}>
            <textarea
              name="fragment"
              className="border-gray-400 border rounded-sm w-full px-2 py-1"
              rows={5}
            ></textarea>
            <div className="flex flex-row justify-end">
              <button type="submit" className="bg-blue-500 px-4 font-semibold">
                Add
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  )
}

export default Section
