import { useState } from "react";

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};
const Anecdote = ({ heading, text, points }) => {
  return (
    <section>
      <h2>{heading}</h2>
      <p>{text}</p>
      <p>has {points} votes</p>
    </section>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];

  const pointArray = new Array(anecdotes.length).fill(0);

  const getRand = () => {
    return Math.floor(Math.random() * anecdotes.length);
  };
  const getNextA = () => {
    setSelected(getRand);
  };
  const addToVote = () => {
    let newPoints = [...points];
    newPoints[selected] += 1;
    setPoints(newPoints);
  };
  const [selected, setSelected] = useState(getRand);
  const [points, setPoints] = useState(pointArray);
  const maxIndex = points.indexOf(Math.max(...points));

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote
        heading="Anecdote of the day"
        text={anecdotes[selected]}
        points={points[selected]}
      />
      <Button text="vote" onClick={addToVote} />
      <Button text="next anecdote" onClick={getNextA} />
      <Anecdote heading="Anecdote with most votes" text={anecdotes[maxIndex]} points={points[maxIndex]}/>
    </div>
  );
};

export default App;