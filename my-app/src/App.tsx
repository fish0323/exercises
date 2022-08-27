import React, { useState } from 'react';
import './App.css';
import Counter from './components/Counter';

interface ICounterConfig {
  id: number;
  num: number;
}

function App() {
  const [countArr, setCounterArr] = useState<Array<ICounterConfig>>([])

  return (
    <>
  <h1>Total: {countArr.reduce((acc,cur) => acc + cur.num, 0 )}</h1>

      <button onClick={() => {
        const newCountArr = countArr.slice();
        const newId = newCountArr.length > 0 ? newCountArr.at(-1)!.id + 1 : 1;
        newCountArr.push({ id: newId, num: 0 })
        setCounterArr(newCountArr)
      }}>
        Add a Counter
      </button>
      {
        countArr.map(counterConfig => (<Counter count={counterConfig.num} key={counterConfig.id} setCount={(newNum: number) => {
          const newCountArr = countArr.slice();
          const foundCounter = newCountArr.find(counter => counter.id === counterConfig.id)
          foundCounter!.num = newNum;
          setCounterArr(newCountArr);
        }} />))
      }
    </>
  );
}

export default App;
