import React, { ReactElement, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import useAxios from 'axios-hooks'
import Section from '../../components/Section.component'
import axios from 'axios'

type SectionDb = {
  id: number
  previousSection: {
    id: number
  } | null
  nextSection: {
    id: number
  } | null
}

function Book(): ReactElement {
  const router = useRouter()
  const { id, name } = router.query
  const [sectionData, setSectionData] = useState<SectionDb[]>([])

  const [{ data, loading, error }, refetch] = useAxios(
    {
      method: 'GET',
      baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
      url: '/section',
      params: {
        bookId: id
      }
    },
    { useCache: false }
  )

  async function handleAddSection() {
    const response = await axios({
      method: 'post',
      baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
      url: '/createSection',
      data: {
        bookId: id
      }
    })
    if (!response.data.id) return
    const sectionData = response.data
    setSectionData(previousSectionData => {
      return [
        ...previousSectionData,
        {
          id: sectionData.id,
          previousSection: sectionData.previousSection,
          nextSection: sectionData.nextSection
        }
      ]
    })

    console.log(response.data)
  }

  useEffect(() => {
    if (!data) return
    console.log(data)
    setSectionData(data)
  }, [data])

  useEffect(() => {
    console.log(router)
  }, [router])
  return (
    <div>
      <Head>
        <title>{name}</title>
      </Head>
      {sectionData.map((sectionData, index) => {
        return <Section key={index} sectionId={sectionData.id} />
      })}
      <div className="flex flex-row justify-center align-middle my-4 border-current ">
        <button
          onClick={handleAddSection}
          className="bg-blue-600 text-white px-3 py-1 rounded-md"
        >
          Add Section
        </button>
      </div>
    </div>
  )
}

export default Book
