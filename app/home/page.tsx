'use client'

import { useEffect, useState } from 'react';
import jsonData from '../data/words.json';
import '../../styles/global.css'
import AnimatedDiv from '../components/AnimatedDiv';
import { Input } from '../components/Input';

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
  console.log(target)

  let renderedComponentsCounter = 0
  let targetCounter = 0

  let interval = 2500;
  let animation = 5000;


  useEffect(() => {
    const fetcher = () => {
      let newWords = shuffle(jsonData.words)
      setWords(newWords)
      setTarget(newWords[0])
    }
    fetcher()
  }, [])





  const updateTarget = () => {
    targetCounter++
    setTarget(words[targetCounter])
  }



  const handleSubmit = (e: Event, inputValue: string) => {
    e.preventDefault();
    if (inputValue.trim().toLowerCase() != target) return
    updateTarget()

    // Handle form submission logic here, for example:
    console.log('Form submitted with value:', inputValue);
  };



  const addComponent = () => {
    console.log("RenderedCounter : ", renderedComponentsCounter)
    console.log("targetCounter : ", targetCounter)

    setComponents((prevComponents) => [...prevComponents, <AnimatedDiv word={words[renderedComponentsCounter]} t={animation} updateTarget={() => updateTarget()} counter={renderedComponentsCounter} target={targetCounter} />]);
    renderedComponentsCounter++
    if (renderedComponentsCounter % 4 == 0 && interval > 300) interval -= 300
    if (renderedComponentsCounter % 2 == 0 && animation > 200) animation -= 200
    // if (counter == words.length && counter != 0) window.alert("you won")
  };


  useEffect(() => {
    const intervalId = setInterval(addComponent, interval); // Add a new component every 4 seconds
    return () => {
      clearInterval(intervalId); // Cleanup the interval when the component unmounts
    };
  }, [words]); // Empt



  return (<div className='dp-flex  bg-blue-200 '>

    {components.map((component, index) => (
      <div key={index}>{component}</div>
    ))}


    <form onSubmit={() => handleSubmit}>
      <Input handleSubmit={handleSubmit} />
      <button type="submit" disabled={true} className={`hidden`}>
        Submit</button>
    </form>




  </div>)
}