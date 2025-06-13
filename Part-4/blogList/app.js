const express = require('express')
const app = express()

// Orta katmanlar, routerlar vs burada olmalı
app.use(express.json())

// Örnek router
app.get('/api/blogs', (req, res) => {
  res.json([
    { title: 'First blog', author: 'Author1', url: 'http://first.blog', likes: 2 },
    { title: 'Second blog', author: 'Author2', url: 'http://second.blog', likes: 3 },
  ])
})

module.exports = app
