"use client"
import React, { useRef, useEffect, } from 'react';

function AnimatedDiv({ word, t, updateTarget, counter, target }) {
  // const counter = useRef(0)
  // const [word, setWord] = useState(words[0])
  let flag = false
  const animatedDivRef = useRef(null);
  // setTimeout(() => {
  //   counter.current++
  //   setWord(words[counter.current])
  // }, 4000)







  useEffect(() => {
    const animatedDiv = animatedDivRef.current;

    let startTime;
    let duration = t; // Duration of the animation in milliseconds

    function animate(time) {
      if (!startTime) startTime = time;
      let elapsedTime = time - startTime;
      let progress = elapsedTime / duration;

      // Calculate the vertical position based on the progress
      let translateY = progress * window.innerHeight;

      // Update the transform property of the element
      animatedDiv.style.transform = `translateY(${translateY}px)`;

      if (elapsedTime < duration && counter <= target) {
        // Continue the animation
        requestAnimationFrame(animate);
      } else if (flag == false) {
        // Animation ended
        console.log('Animation ended');
        updateTarget()
        flag = true

      }
    }


    // Start the initial animation
    requestAnimationFrame(animate);

    // Cleanup function
    return () => {
      // Cancel the animation if component unmounts
      animatedDiv.style.transform = 'none';
    };
  }, [word, t]);

  const options = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900]
  const option = options[Math.floor((Math.random() * options.length))]
  return (
    <div
      ref={animatedDivRef}
      className={`word word${option}`}

    >
      {word} {/* Display the first word initially */}
    </div>
  );
}

export default AnimatedDiv;
