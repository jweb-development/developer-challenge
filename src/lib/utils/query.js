const { dbConfig } = require('../config/dbConfig')

const db = require('serverless-mysql')({
  config: dbConfig
})

export { db }
