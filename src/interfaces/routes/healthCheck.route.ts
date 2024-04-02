import express, { Router } from 'express'

const router: Router = express.Router()

router.get('/', (_, res) => {
  res.json({ message: 'Health check is OK' })
})

export default router