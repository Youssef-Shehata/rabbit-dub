'use client'

import { useEffect, useState } from 'react';
import jsonData from '../data/words.json';
import '../../styles/global.css'
import AnimatedDiv from '../components/AnimatedDiv';

const shuffle = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export default function home() {
  const [words, setWords] = useState<string[]>([])
  const [components, setComponents] = useState([])

  const [target, setTarget] = useState<string>('')
  const [inputValue, setInputValue] = useState('');

  let counter = 0
  let interval = 2500;


  let animation = 5000;
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

  const addComponent = () => {
    setComponents((prevComponents) => [...prevComponents, <AnimatedDiv key={prevComponents.length} word={words[counter]} t={animation} />]);
    counter++
    if (counter % 4 == 0 && interval > 300) interval -= 300
    if (counter % 2 == 0 && animation > 200) animation -= 200
    // if (counter == words.length && counter != 0) window.alert("you won")
  };


  useEffect(() => {


    const intervalId = setInterval(addComponent, interval); // Add a new component every 4 seconds

    return () => {
      clearInterval(intervalId); // Cleanup the interval when the component unmounts
    };
  }, [words]); // Empt



  return (<div className='dp-flex  bg-blue-200 '>

    {/* <div className="w-20 h-20 bg-blue-500 absolute top-0 animate-float">{target}</div> */}
    {components.map((component, index) => (
      <div key={index}>{component}</div>
    ))}
    {/* <AnimatedDiv key={0} word={target} /> */}
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