const { request, response } = require("express");
const express = require("express");
const app = express();

let persons = [
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

app.get("/", (request, response) => {
  response.send("<h1>Hello Walter!</h1>");
});

app.use(express.json()); //The json-parser functions so that it takes the JSON data of a request, transforms it into a JavaScript object and then attaches it to the body property of the request object before the route handler is called.

// get all resources

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

//get one resource

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  console.log(id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).send("<h1>Questa nota non esiste.</h1>").end();
  }
  console.log(person);
  response.json(person);
});

// delete one resource

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

// add new resource

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      errore: "content missing",
    });
  }

  const person = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId(),
  };

  persons = persons.concat(person);
  console.log(person);
  response.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});