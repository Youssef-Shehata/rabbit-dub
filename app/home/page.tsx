'use client'

import { useEffect, useState } from 'react';
import jsonData from '../data/words.json';
import '../../styles/global.css'

const shuffle = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export default function home() {
  const [words, setWords] = useState<string[]>([])
  const [target, setTarget] = useState<string>('')
  const [inputValue, setInputValue] = useState('');



  const nextTarget = () => {
    const newtarget = words.shift()
    setWords(words)
    return newtarget

  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setInputValue('')


    if (inputValue.trim().toLowerCase() != target) return
    setTarget(nextTarget())
    console.log(target)
    // Handle form submission logic here, for example:
    console.log('Form submitted with value:', inputValue);
  };

  const handleInputChange = (e) => {
    const value = e.target.value

    const sanitizedValue = value.replace(/[\s\t]/g, '');

    setInputValue(sanitizedValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };




  useEffect(() => {
    const fetcher = () => {
      let newWords = shuffle(jsonData.words)
      setWords(newWords)
      setTarget(newWords[0])


    }
    fetcher()
  }, [])




  return (<div className='dp-flex align-center justify-center'>
    <div> {target}</div>

    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Enter your text here..."
        className="mr-2 px-3 py-2 border rounded-lg"

      />
      <button type="submit" disabled={true} className={`hidden`}>
        Submit</button>
    </form>




  </div>)
}