import React from 'react'

const NotFound404 = () => {
    document.title="Motique | Not Found🚫"
  return (
    <div className="min-h-screen flex flex-grow items-center justify-center bg-zinc-800">
  <div className="rounded-lg bg-zinc-500 p-8 text-center shadow-xl">
    <h1 className="mb-4 text-4xl text-red-300 font-bold">404</h1>
    <p className="text-zinc-50">Oops! The page you are looking for could not be found.</p>
    <a href="/" className="mt-4 cursor-pointer inline-block rounded bg-blue-500 px-4 py-2 font-semibold text-white duration-200 hover:bg-blue-700"> Go back to Home </a>
  </div>
</div>
  )
}

export default NotFound404