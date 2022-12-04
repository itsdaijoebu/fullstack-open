const express = require("express");
const app = express();
const cors = require("cors");

const morgan = require("morgan");
morgan.token("post-details", (req) => {
  if (req.body.length) {
    return JSON.stringify(req.body);
  } else {
    return " ";
  }
});
app.use(
  morgan(
    ":method :url :status :res[content-length] - response-time ms :post-details"
  )
);

app.use(express.json());
app.use(express.static("dist"))
app.use(cors());

let phonebook = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (req, res) => {
  res.send("<h1>Whassup</h1>");
});
app.get("/api/persons", (req, res) => {
  res.json(phonebook);
});
app.get("/api/info", (req, res) => {
  let phonebookLength = phonebook.length;
  let date = new Date();
  res.send(
    `<p>Phonebook has info for ${phonebookLength} people</p><p>${date}</p>`
  );
});
app.get("/api/persons/:id", (req, res) => {
  let id = Number(req.params.id);
  let person = phonebook.find((entry) => entry.id === id);
  if (!person) {
    return res.status(404).json({ status: 404, message: "no such id" });
  }
  res.json(person);
});

const generateId = () => {
  return Math.floor(Math.random() * 1000000);
};
app.post("/api/persons", (req, res) => {
  let body = req.body;

  if (!body.name) {
    return res.status(400).json({ status: 400, message: "missing name" });
  }
  if (!body.number) {
    return res.status(400).json({ status: 400, message: "missing number" });
  }

  let name = body.name;
  if (phonebook.filter((entry) => entry.name === name).length) {
    return res
      .status(400)
      .json({ status: 400, message: "person already exists" });
  }

  let entry = {
    id: generateId(),
    name: name,
    number: body.number,
  };
  phonebook = phonebook.concat(entry);
  res.json(entry);
});

app.delete("/api/persons/:id", (req, res) => {
  let id = Number(req.params.id);
  phonebook = phonebook.filter((entry) => entry.id !== id);
  res.status(204).end();
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
