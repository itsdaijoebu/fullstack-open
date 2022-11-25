import { useState } from "react";

const Header = (props) => {
  return <h2>{props.text}</h2>;
};
const Button = (props) => {
  const setState = () => {
    props.setter(props.state + 1);
  };

  return <button onClick={() => setState()}>{props.text}</button>;
};
const StatisticsLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td> 
      <td>{value} {text==='positive' && '%'}</td>
    </tr>
  );
};
const Statistics = ({ good, bad, neutral }) => {
  let all = good + bad + neutral;
  return (
    <section>
      <Header text="statistics" />
      {all > 0 ? (
        <table>
          <tbody>
            <StatisticsLine text="good" value={good} />
            <StatisticsLine text="neutral" value={neutral} />
            <StatisticsLine text="bad" value={bad} />
            <StatisticsLine text="all" value={all} />
            <StatisticsLine text="average" value={(good - bad) / all || 0} />
            <StatisticsLine text="positive" value={good / all || 0} />
          </tbody>
        </table>
      ) : (
        <p>No feedback given</p>
      )}
    </section>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <Header text="give feedback" />
      <Button state={good} setter={setGood} text="good" />
      <Button state={neutral} setter={setNeutral} text="neutral" />
      <Button state={bad} setter={setBad} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

export default App;
