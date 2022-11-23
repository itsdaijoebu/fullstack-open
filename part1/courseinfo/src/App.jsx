import { useState } from 'react'

function Hello(props) {
  return (
    <>
      <p>Hello {props.age} y/o {props.name}</p>
    </>
  )
}

function App() {
  const name = 'pete'
  const age = 3

  return (
    <>
      <p>'sup</p>
      <Hello name="george" age={32+1}/>
      <Hello name={name} age={age}/>
    </>
  )
}

export default App
