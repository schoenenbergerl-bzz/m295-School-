const swaggerAutogen = require('swagger-autogen')()

const doc = {
  info: {
    title: 'Library API',
    description: 'API for managing books and lending records in a library.'
  },
  host: 'localhost:3000',
  schemes: ['http'],
  basePath: '/',
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'Book',
      description: 'Operations about books'
    },
    {
      name: 'Lend',
      description: 'Operations about lending'
    }
  ],
  definitions: {
    Book: {
      isbn: '978-3-16-148410-0',
      title: 'Example Book',
      year: 2021,
      author: 'John Doe'
    },
    Lend: {
      id: 1,
      customer_id: 101,
      isbn: '978-3-16-148410-0',
      borrowed_at: '2024-04-01T10:00:00Z',
      returned_at: null
    }
  }
}

const outputFile = './swagger-output.json'
const endpointsFiles = ['./a6.2.js']

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('Swagger spec generated!')
  require('./a6.2.js')
})
