import { Router } from "express"
import {MostrarTodosPokemonsControllers, MostrarTodasCategorias, MostrarTodasFraquezas,
    MostrarTodosGeneros, MostrarTodosTipagem, MostrarTodasHabilidades, MostrarPokemonPeloID,
    CadastrarPokemonControllers, CadastrarCategoria, CadastrarFraqueza, CadastrarTipagem,
    CadastrarHabilidade, ExcluirPokemonControllers, ExcluirCategoria, ExcluirFraqueza, ExcluirTipagem, 
    ExcluirHabilidade, MostrarTodosAleatorioControllers, primeiraLetraMaiuscula} from "../controllers/controllersInfo.js"

const route = Router()

// rotas mostrar
route.post("/mostrar/pokemon", MostrarTodosPokemonsControllers)
route.post("/mostrar/categoria", MostrarTodasCategorias)
route.post("/mostrar/fraquezas", MostrarTodasFraquezas)
route.post("/mostrar/generos", MostrarTodosGeneros)
route.post("/mostrar/tipagem", MostrarTodosTipagem)
route.post("/mostrar/habilidades", MostrarTodasHabilidades)


// rotas cadastrar
route.post("/cadastrar/pokemon", CadastrarPokemonControllers)
route.post("/cadastrar/categoria", CadastrarCategoria)
route.post("/cadastrar/fraquezas", CadastrarFraqueza)
route.post("/cadastrar/tipagem", CadastrarTipagem)
route.post("/cadastrar/habilidades", CadastrarHabilidade)

// rotas excluir
route.delete("/excluir/pokemon", ExcluirPokemonControllers)
route.delete("/excluir/categoria", ExcluirCategoria)
route.delete("/excluir/fraqueza", ExcluirFraqueza)
route.delete("/excluir/tipagem", ExcluirTipagem)
route.delete("/excluir/habilidade", ExcluirHabilidade)

route.get("/mostrar/:id", MostrarPokemonPeloID)


export default route