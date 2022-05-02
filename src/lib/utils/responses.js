// Util functions for handling different HTTP response codes
// const path = require('path')
const { db } = require('../utils/query')

const handleError = async (err, req, res) => {
  const connectionEndPromise = db.quit()
  console.log(err)
  const response = { data: null, message: 'Internal Server Error' }
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true
  })
  res.status(500).send(response)
  await connectionEndPromise
  return false
}

const handleBadRequest = async (req, res, message) => {
  const connectionEndPromise = db.quit()
  console.error('Missing one or more required parameters:')
  console.error(req.body)
  const response = { data: null, message: 'Bad Request' + (message ? ': ' + message : '') }
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true
  })
  res.status(400).send(response)
  await connectionEndPromise
  return false
}

const handleUnauthorized = async (req, res) => {
  const connectionEndPromise = db.quit()
  const response = { data: null, message: 'Unauthorized' }
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true
  })
  res.status(401).send(response)
  await connectionEndPromise
  return false
}

const handleForbidden = async (req, res) => {
  const connectionEndPromise = db.quit()
  const response = { data: null, message: 'Unauthorized' }
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true
  })
  res.status(403).send(response)
  await connectionEndPromise
  return false
}

const handleUnimplemented = async (req, res) => {
  const connectionEndPromise = db.quit()
  const response = { data: null, message: 'Not yet implemented' }
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true
  })
  res.status(501).send(response)
  await connectionEndPromise
  return false
}

const handleSuccess = async (data, req, res) => {
  const connectionEndPromise = db.quit()
  const response = data
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true
  })
  res.status(200).send(response)
  await connectionEndPromise
  return true
}

const handlePartialSuccess = async (data, req, res) => {
  db.quit()
  res.set({ 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true })
  res.status(206).send(data)
  return true
}

const handleInitialPostSuccess = async (data, req, res) => {
  const response = data
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true
  })
  res.status(200).send(response)
  return true
}

/**
 * 204 code
 * @param {Object} data data from request
 * @param {string} data.message message from request
 * @param {Object} req - request
 * @param {Object} res - response
 * @returns true
 */
const handleNoContent = async (data, req, res) => {
  const response = data
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true
  })
  res.status(204).send(response)
  return true
}

const handleResponseEnd = async () => {
  await db.quit()
  return true
}

const handleNotFound = async (target, req, res) => {
  const connectionEndPromise = db.quit()
  console.log(target)
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true
  })
  res.status(404).send()
  await connectionEndPromise
  return false
}

const apiCodes = {
  INVALID_TOKEN: 'invalid-token',
  INVALID_USER: 'invalid-user',
  SUCCES: 'success',
  PARTIAL_SUCESS: 'partial-success',
  INITIAL_SUCESS: 'initial-success',
  DUPLICATE_ENTRY: 'duplicate-entry',
  NOT_FOUND: 'not-found',
  NO_CONTENT: 'no-content',
  UNIMPLEMENTED: 'unimplemented',
  UNAUTHORIZED: 'unauthorized',
  FORBIDDEN: 'forbidden',
  BAD_REQUEST: 'bad-request',
  ERROR: 'error'
}

const handleResponse = (apiCode = '', req, res, data = '') => {
  switch (apiCode) {
    case apiCodes.INVALID_TOKEN: return handleUnauthorized(req, res)
    case apiCodes.INVALID_USER: return handleForbidden(req, res)
    case apiCodes.SUCCES: return handleSuccess(data, req, res)
    case apiCodes.INITIAL_SUCESS: return handleInitialPostSuccess(data, req, res)
    case apiCodes.NO_CONTENT: return handleNoContent(data, req, res)
    case apiCodes.NOT_FOUND: return handleNotFound(data, req, res)
    case apiCodes.UNIMPLEMENTED: return handleUnimplemented(req, res)
    case apiCodes.UNAUTHORIZED: return handleUnauthorized(req, res)
    case apiCodes.FORBIDDEN: return handleForbidden(req, res)
    case apiCodes.BAD_REQUEST: return handleBadRequest(req, res)
    case apiCodes.ERROR: return handleError(data, req, res)
    default: return handleUnimplemented(req, res)
  }
}

export {
  handleError, handleBadRequest, handleUnauthorized, handleForbidden, handleUnimplemented, handleNoContent,
  handleSuccess, handleNotFound, handleInitialPostSuccess, handleResponseEnd, handlePartialSuccess,
  apiCodes, handleResponse
}
