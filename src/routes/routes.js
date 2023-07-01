import { Router } from "express"
import {MostrarTodosPokemonsControllers, MostrarTodasCategorias, MostrarTodasFraquezas,
    MostrarTodosGeneros, MostrarPokemonPeloNome, MostrarTodosTipagem, MostrarTodasHabilidades, MostrarPokemonPeloID,
    MostrarTodosPokemonsFraquezas, MostrarTodosPokemonsTipagem, MostrarTodosPokemonsAleatorio,
    CadastrarPokemonControllers, CadastrarCategoria, CadastrarFraqueza, CadastrarTipagem, CadastrarHabilidade,
    ExcluirPokemonControllers, ExcluirCategoria, ExcluirFraqueza, ExcluirTipagem, ExcluirHabilidade, 

    CadastrarGradeEvolutivaPokemon, MostrarGradeEvolutivaPokemon,
    primeiraLetraMaiuscula, ExcluirGradeEvolutivaPokemon
    } from "../controllers/controllersInfo.js"

import { CadastrarUsuarioControllers, Login, validarToken, deletarToken, EncontrarUsuarioId, removeUsuarioID, EncontrarTodosUsuarios } from "../controllers/controllersUser.js"


const route = Router()

// pokemons
// rotas mostrar
route.get("/mostrar/pokemon", MostrarTodosPokemonsControllers)
route.get("/mostrar/categoria", MostrarTodasCategorias)
route.get("/mostrar/fraquezas", MostrarTodasFraquezas)
route.get("/mostrar/generos", MostrarTodosGeneros)
route.get("/mostrar/tipagem", MostrarTodosTipagem)
route.get("/mostrar/habilidades", MostrarTodasHabilidades)
route.get("/mostrar/:id", MostrarPokemonPeloID)
route.post("/mostrar/nome", MostrarPokemonPeloNome)
route.get("/mostrar_aleatorio", MostrarTodosPokemonsAleatorio)
route.post("/mostrar/por_tipagem", MostrarTodosPokemonsTipagem)
route.post("/mostrar/por_fraquezas", MostrarTodosPokemonsFraquezas)

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


// usuarios
// rotas mostrar
route.get("/mostrar/usuario/:id", EncontrarUsuarioId)
route.get("/mostrar_usuarios", EncontrarTodosUsuarios)

// rotas cadastrar/logar
route.post("/cadastro/usuario", CadastrarUsuarioControllers)
route.post("/login", Login)

// rotas token
route.post("/validar/token", validarToken)

// rotas excluir
route.post("/deletar/token", deletarToken)
route.delete("/excluir_usuario/:id", removeUsuarioID)

// grade evolutiva
// rotas mostrar
route.post("/mostrar_grade/", MostrarGradeEvolutivaPokemon)

// rotas cadastrar
route.post("/cadastrar_grade", CadastrarGradeEvolutivaPokemon)

// rotas excluir
route.delete("/excluir_grade", ExcluirGradeEvolutivaPokemon)

export default route