const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

// Yeni bir token tanımla (POST isteklerinin gövdesi için)
morgan.token('body', (req) => {
  return JSON.stringify(req.body);
});

// Morgan'ı yeni token ile kullan (yalnızca POST istekleri için)
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body', {
  skip: function (req, res) { return req.method !== 'POST' }
}));
app.use(morgan('tiny', {
  skip: function (req, res) { return req.method === 'POST' }
}));

let persons = [
  {
    "id": "1",
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": "2",
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": "3",
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": "4",
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
];

app.get('/info', (req, res) => {
  const numberOfEntries = persons.length;
  const date = new Date();
  res.send(`
    <p>Phonebook has info for ${numberOfEntries} people</p>
    <p>${date}</p>
  `);
});

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  const person = persons.find(person => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  persons = persons.filter(person => person.id !== id);
  res.status(204).end();
});

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map(n => parseInt(n.id))) : 0;
  return String(Math.floor(Math.random() * 1000000));
};

app.post('/api/persons', (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'name or number missing'
    });
  }

  if (persons.some(person => person.name === body.name)) {
    return res.status(409).json({
      error: 'name must be unique'
    });
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);
  res.json(person);
});

// Ön uç derleme dizininin yolunu tanımlayın (eğer ön ucu buradan sunacaksanız)
const frontendBuildPath = path.join(__dirname, '../phonebook-frontend/build');

// Statik dosyaları sunma middleware'ini kullanın (eğer ön ucu buradan sunacaksanız)
app.use(express.static(frontendBuildPath));

// Herhangi bir tanımlanmamış GET isteğini ön ucun index.html dosyasına yönlendirin (eğer ön ucu buradan sunacaksanız)
app.get('*', (req, res) => {
  res.sendFile(path.resolve(frontendBuildPath, 'index.html'));
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});