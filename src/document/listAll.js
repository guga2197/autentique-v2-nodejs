'use strict'
import fs from 'fs'
import { AUTENTIQUE_DEV_MODE } from 'babel-dotenv'
import Api from '../common/Api'
import utils from '../common/utils'

const listAll = async ({ token }, { page = 1 }) => {
  try {
    const filename = `${__dirname}/../resources/documents/listAll.graphql`
    const operations = fs.readFileSync(filename)
      .toString()
      .replace(/[\n\r]/gi, '')
      .replace('$page', page)
      .replace('$sandbox', AUTENTIQUE_DEV_MODE.toString())

    const formData = (utils.query(operations))
    const response = await Api(token).post('/graphql', formData, {
      processData: false,
      withCredentials: true,
      cache: false,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return response && response.data
  } catch (error) {
    console.log(error)
  }  
}

export {
  listAll
}