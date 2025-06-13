// resolvers.js

const { authors, books } = require('./data')

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      let filteredBooks = books

      if (args.author) {
        filteredBooks = filteredBooks.filter(b => b.author === args.author)
      }

      if (args.genre) {
        filteredBooks = filteredBooks.filter(b => b.genres.includes(args.genre))
      }

      return filteredBooks
    },
    allAuthors: () => {
      return authors.map(author => {
        const count = books.filter(b => b.author === author.name).length
        return { ...author, bookCount: count }
      })
    }
  },
  Mutation: {
    addBook: (root, args) => {
      const book = { ...args }

      // Yeni yazar varsa ekle
      if (!authors.find(a => a.name === args.author)) {
        authors.push({ name: args.author, born: null })
      }

      books.push(book)
      return book
    },
    editAuthor: (root, args) => {
      const author = authors.find(a => a.name === args.name)
      if (!author) {
        return null
      }
      author.born = args.setBornTo
      return author
    }
  }
}

module.exports = resolvers
