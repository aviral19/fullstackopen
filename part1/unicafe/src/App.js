import React, { useState } from 'react'

const Statistic = ({text, value}) => {
  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, bad, neutral}) => {
  let all = good + bad + neutral
  let average = (good*1 + bad*(-1))/(all)
  let positive = (good/(all))*100
  positive = positive + '%'
  if(all === 0){
    return(
      <div>no feedback given</div> 
    )
  }
  else{
    return(
      <div>
        <Statistic text = "good" value = {good}/>
        <Statistic text = "neutral" value = {neutral}/>
        <Statistic text = "bad" value = {bad}/>
        <Statistic text = "all" value = {all}/>
        <Statistic text = "average" value = {average}/>
        <Statistic text = "postive" value = {positive}/>
      </div>
    )
  }
  
}

const Button = ({text, handleClick}) => {
  return(
    <button onClick = {handleClick}>{text}</button>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick = {()=> setGood(good + 1)} text = "good" />
      <Button handleClick = {()=> setNeutral(neutral + 1)} text = "neutral" />
      <Button handleClick = {()=> setBad(bad + 1)} text = "bad" />
      <h1>Statistics</h1>
      
      <Statistics good = {good} bad = {bad} neutral = {neutral} />

    </div>
  )
}

export default App