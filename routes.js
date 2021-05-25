// Imports
const express = require("express")  
const router = express.Router()
const homeController = require("./src/controllers/homeController.js")
const loginController = require("./src/controllers/loginController.js")
const agendaController = require("./src/controllers/agendaController.js")
const {loginRequired} = require("./src/middlewares/middleware")

// Rotas da Home
router.get("/", homeController.index)

// Rotas de Login
router.get("/login/index", loginController.index)
router.post("/login/register", loginController.register)
router.post("/login/login", loginController.login)
router.get("/login/logout", loginController.logout)

// Rotas de Agenda
router.get("/agenda/index", loginRequired, agendaController.index)
router.get("/agenda/index/:id", loginRequired, agendaController.editIndex)
router.post("/agenda/edit/:id", loginRequired, agendaController.edit)
router.post("/agenda/register", loginRequired, agendaController.register)
router.get("/agenda/delete/:id", loginRequired, agendaController.delete)



module.exports = router
