// data.js

let authors = [
  { name: "Robert Martin", born: null },
  { name: "Martin Fowler", born: null },
  { name: "Fyodor Dostoevsky", born: null },
  { name: "Joshua Kerievsky", born: null },
  { name: "Sandi Metz", born: null },
]

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    genres: ["refactoring"]
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    genres: ["agile", "patterns", "design"]
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    genres: ["refactoring"]
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    genres: ["refactoring", "patterns"]
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    genres: ["refactoring", "design"]
  },
  {
    title: "Crime and Punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    genres: ["classic", "crime"]
  },
  {
    title: "The Idiot",
    published: 1869,
    author: "Fyodor Dostoevsky",
    genres: ["classic"]
  }
]

module.exports = { authors, books }
