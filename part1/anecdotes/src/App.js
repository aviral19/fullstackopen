import React, { useState } from 'react'

const Button = ({handleClick, text}) => {
  return(
    <button onClick = {handleClick}>{text}</button>
  )
}

const getRandom = () =>{
  return Math.floor(Math.random() * 6)
}



const App = () => {

  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
  
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState([0,0,0,0,0,0])
  const [maxIndex, setMaxIndex] = useState(0)

  const countVote = (selected) => {
    const copy = {...points}
    copy[selected] += 1
    setPoints(copy)

    let k = 0;
    let curmax = copy[0];
    for(let i = 0; i<6; i++){
      if(curmax < copy[i]){
        curmax = copy[i]
        k = i
      }
    }
    setMaxIndex(k)
  }

  const updateAnecdote = () => {
    setSelected(getRandom())
  }

  
  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <p>has {points[selected]} votes</p>
      <p>
      <Button handleClick = {()=> countVote(selected)} text = "vote" />
      <Button handleClick = {()=> updateAnecdote()} text = "next anecdote"/>
      </p>
      
      <h1>Anecdote with most votes</h1>
      
      <p>{anecdotes[maxIndex]}</p>
      <p>has {points[maxIndex]} votes</p>
    </div>
  )
}

export default App