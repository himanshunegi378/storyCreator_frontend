import React from 'react'

export interface IFragment {
  like: number
  text: string
}

export interface FragmentProps extends IFragment {}

function Fragment(props: FragmentProps) {
  const { like, text } = props
  return (
    <div className="px-4 py-2 bg-blue-50">
      <div data-testid="text">{text}</div>
      <div data-testid="like"> {like} </div>
    </div>
  )
}

export default Fragment
