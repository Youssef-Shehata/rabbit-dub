import React, { useState } from 'react'


export const Input = ({ handleSubmit }) => {

  const [inputValue, setInputValue] = useState('');


  const handleInputChange = (e) => {
    const value = e.target.value
    const sanitizedValue = value.replace(/[\s\t]/g, '');
    setInputValue(sanitizedValue);
  };





  return (
    <input
      type="text"
      value={inputValue}
      onChange={handleInputChange}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          handleSubmit(e, inputValue);
          setInputValue('')

        }
      }}
      placeholder="Enter your text here..."
      className="mr-2 px-3 py-2 border rounded-lg"

    />
  )
}
