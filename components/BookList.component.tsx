import axios from 'axios'
import useAxios from 'axios-hooks'
import React, { ReactElement, useEffect, useState } from 'react'
import Link from 'next/link'

function BookList(): ReactElement {
  const [booksData, setBooksData] = useState<any[]>([])
  const [{ data, loading, error }, refetch] = useAxios({
    method: 'GET',
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    url: '/bookList'
  })

  useEffect(() => {
    if (data) {
      console.log(data)
      setBooksData(data)
    }
  }, [data])

  return (
    <div>
      <ul>
        {booksData.map(({ id, name }, index) => {
          return (
            <li key={index}>
              <Link
                href={{
                  pathname: `/book`,
                  query: { name: name, id: id }
                }}
              >
                <a> {name}</a>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default BookList
