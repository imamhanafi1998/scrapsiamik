// konfigurasi express
const express = require('express')
const getMhs = require('./getMhs');
const app = express()
const port = 3000

// declare routes
app.get('/', (req, res) => {
  res.status(200).send("Halo Imamm..")
})
app.get('/siamik', async (req, res) => {
  const npm = await getMhs()
  // ubah response menjasi json
  res.json(npm)
})

// serve
app.listen(port, () => console.log(`running on port ${port}`))
