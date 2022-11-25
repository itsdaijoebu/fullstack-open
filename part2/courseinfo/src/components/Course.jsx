const Header = ({ name }) => <h1>{name}</h1>;
const Total = ({ sum }) => <p><b>Total of {sum} exercises</b></p>;
const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => {
    const sum = parts.reduce((total, part) => total+part.exercises, 0)
  return (
    <>
      {parts.map(part => 
        <Part key={part.id} part={part} />
      )}
      <Total sum={sum} />
    </>
  );
};

const Course = ({ course }) => {
  const { id, name, parts } = course;
  return (
    <>
      <Header name={name} />
      <Content parts={parts} />
    </>
  );
};

export default Course;
