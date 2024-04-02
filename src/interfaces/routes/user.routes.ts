import express, { Router } from 'express'
import { UserApplicationService  } from '@application/user/UserApplication.service'
import { UserController } from '@interfaces/controllers/User.controller'
import { UserMemoryRepository } from '@infrastructure/persistence/UserMemoryRepository'
import { UserService } from '@domain/user/User.service'


const router: Router = express.Router()

const userRepository = new UserMemoryRepository()
const userService = UserService(userRepository)
const userApplicationService = UserApplicationService(userService)

const userController = UserController(userApplicationService)

router.get('/', userController.getaAllUsers)
router.post('/', userController.createUser)
router.get('/:email', userController.findUserByEmail)

export default router