import { Router } from "express"
import { MostrarTodosControllers, CadastrarPokemonControllers, MostrarPeloID } from "../controllers/controllersInfo.js"

const route = Router()


route.post("/mostrar", MostrarTodosControllers)
route.post("/cadastro", CadastrarPokemonControllers)
route.get("/:id", MostrarPeloID)


export default route
