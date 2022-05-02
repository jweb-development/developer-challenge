const express = require('express')
const serverless = require('serverless-http')
const bodyParser = require('body-parser')
const { users } = require('../lib/db')
const { responseHandler } = require('../lib/utils')
const cors = require('cors')
// const moment = require('moment')

const app = express()

app.use(cors())

const defaultFileParser = bodyParser.json({ extended: true, limit: '500kb' })
const defaultFileEncoder = bodyParser.urlencoded({ extended: true, limit: '500kb' })

// List users
app.get('/v1/user', defaultFileParser, defaultFileEncoder, async (req, res) => {
  try {
    const results = await users.getUsers()
    if (!results) { return responseHandler.handleNotFound('users', req, res) }

    const response = {
      data: results,
      message: 'User list.'
    }

    return responseHandler.handleSuccess(response, req, res)
  } catch (err) {
    console.error(err.message)
    const response = { data: null, message: 'Internal Server Error' }
    return responseHandler.handleError(response, req, res)
  }
})

// GET user by ID
app.get('/v1/user/:userID', defaultFileParser, defaultFileEncoder, async (req, res) => {
  try {
    const id = req.params.userID

    const results = users.getUser(id)

    if (!results) { return responseHandler.handleNotFound('user', req, res) }

    const response = {
      data: results,
      message: `Supervisor ${results.fullName} found.`
    }

    return responseHandler.handleUnauthorized(req, res)
  } catch (err) {
    console.error(err.message)
    const response = { data: null, message: 'Internal Server Error' }
    return responseHandler.handleError(response, req, res)
  }
})

// Handle in-valid route
app.all('*', function (req, res) {
  const response = { data: null, message: 'Route not found!!' }
  res.status(400).send(response)
})

// wrap express app instance with serverless http function
const handler = serverless(app)

export { handler }
