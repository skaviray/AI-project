import express from "express"
import type { Request,Response } from "express"
import dotenv from 'dotenv'
dotenv.config()
const app = express()
const port = process.env.PORT || 3000
app.get('/', (req: Request,res: Response) => {
    res.send(process.env.OPENAPI_API_KEY)
})
app.get('/api/info', (req: Request,res: Response) => {
    res.send({message: "This is a simple backend developed in node", version: "1.0"})
})

app.listen(port, () => {console.log(`Server is listening on http://localhost:3000`)})