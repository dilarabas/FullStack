const app = require('./app') // Express app'in olduğu dosya
const http = require('http')
const server = http.createServer(app)

const PORT = process.env.PORT || 3003
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
