import React, { ReactElement, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import useAxios from 'axios-hooks'

function Book(): ReactElement {
  const router = useRouter()
  const { id, name } = router.query

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
    console.log(data)
  }, [data])

  useEffect(() => {
    console.log(router)
  }, [router])
  return (
    <div>
      <Head>
        <title>{name}</title>
      </Head>
    </div>
  )
}

export default Book
