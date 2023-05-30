const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

morgan.token("req-body", (req, res) => JSON.stringify(req.body));
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :req-body"
  )
);
app.use(cors());
app.use(express.json());

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

app.get("/api/persons", (req, res) => {
  res.json(phonebook);
});

app.get("/info", (req, res) => {
  const peopleInfo = phonebook.length;
  const date = new Date();
  res.send(`<p>Phone book has info for ${peopleInfo} people</p><p>${date}</p>`);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = phonebook.find((person) => person.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  phonebook = phonebook.filter((person) => person.id !== id);
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const id = phonebook.length + 1;
  const body = req.body;

  if (body || body.name || body.number) {
    const personExists = phonebook.some((person) => person.name === body.name);
    if (personExists == true) {
      return res.status(404).send({ error: "Person exists" });
    }
    const person = {
      name: body.name,
      number: body.number,
      id: id,
    };

    phonebook = phonebook.concat(person);
    res.json(phonebook);
  } else {
    return res.status(404).send({ error: "No body, name or number" });
  }
});

app.listen(process.env.PORT || 3001, () => {
  res.status(200).end();
});
