import React from 'react'

function InputWithLabel({ label, type, value, placeHolder, onChange, configInputStyle, nameInput }){
  return (
    <div className="input flex flex-col w-60 md:w-72">
      <label htmlFor={label} className='cursor-pointer mb-2 text-lg font-bold text-sky-400'>{label}</label>
      <input value={value} 
              type={type} 
              autoComplete="true" 
              required 
              onChange={(e) => onChange(e.target.value)} 
              id={label} 
              className={configInputStyle +' text-base mb-2 indent-2 border-b-2 focus:border-sky-200 focus:outline-none transition duration-200 ease-in-out hover:ease-in'} 
              placeholder={placeHolder} 
              name={nameInput}
             
      />
    </div>

  )
}

export default InputWithLabel