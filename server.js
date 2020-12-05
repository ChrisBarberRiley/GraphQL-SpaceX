import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import schema from './schema.js'

const app = express()

app.use(
    '/graphql',
    graphqlHTTP({
        schema,
        graphiql: true,
    })
)

const PORT = process.env.port || 4000

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
