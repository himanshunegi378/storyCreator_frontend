import axios from 'axios'
import useAxios from 'axios-hooks'
import React, { ReactElement, useEffect, useState } from 'react'

function BookList(): ReactElement {
  const [booksData, setBooksData] = useState<any[]>([])
  const [{ data, loading, error }, refetch] = useAxios({
    method: 'GET',
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    url: '/bookList'
  })

  useEffect(() => {
    if (data) {
      console.log(data);
      setBooksData(data)
    }
  }, [data])

  return (
    <div>
      <ul>
        {booksData.map((bookData, index) => {
          return <li key={index}>{bookData.name}</li>
        })}
      </ul>
    </div>
  )
}

export default BookList
