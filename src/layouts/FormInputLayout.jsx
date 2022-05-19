import React from 'react'

function FormInputLayout({children}) {
  return (
    <form className='border-2 border-sky-400 py-8 px-8 rounded-md'>
        {children}
    </form>
  )
}

export default FormInputLayout