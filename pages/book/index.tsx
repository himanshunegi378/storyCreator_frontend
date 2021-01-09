import React, { ReactElement, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import useAxios from 'axios-hooks'
import Section from '../../components/Section.component'

function Book(): ReactElement {
  const router = useRouter()
  const { id, name } = router.query
  const [sectionData, setSectionData] = useState([])

  const [{ data, loading, error }, refetch] = useAxios(
    {
      method: 'GET',
      baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
      url: '/section',
      params: {
        bookId: id
      }
    },
    { manual: false }
  )

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
    </div>
  )
}

export default Book
