import pool from "../database/db.js"

const MostrarTodosControllers = async (req, res) => {
    try {
        const Pokemons = await pool.query("SELECT * FROM pokemon_info")

        if (Pokemons.length === 0) {
            res.status(200).json({Mensagem: "Não há pokemons cadastrados."})
        }

        res.status(200).json(Pokemons.rows[0])

    } catch (erro) {
        res.status(500).json({Mensagem: erro.Mensagem})
    }
}

const MostrarPeloID = async (req, res) => {
    try {
        const pokemon = await pool.query(`SELECT pokemon_info_id, nome, descricao, altura, peso, categoria_id, genero_id, total, hp, ataque, defesa, especial_ataque, especial_defesa, velocidade
        FROM public.pokemon_info
        WHERE pokemon_info_id = ${req.params.id}`)
        console.log(pokemon.rows[0])
        res.status(200).json(pokemon.rows[0])
    }

    catch (erro){
        return res.status(500).json({Message: erro.Message})
    }
}

const CadastrarPokemonControllers = async (req, res) => {

    const { 
        nome, descricao, altura, peso, categoria_id, genero_id, total, hp, ataque, defesa, especial_ataque, especial_defesa, velocidade
    } = req.body

    if (!nome || !descricao || !altura || !peso || !categoria_id || !genero_id || !total || !hp || !ataque || !defesa || !especial_ataque || !especial_defesa || !velocidade) {
            res.status(200).json({Mensagem: 'Há campo(s) vazio(s).', status: 400})
    } else {
        console.log('não tá vazio')
        try {
            // const verificaCategoria = await pool.query("Select categorias from categoria")
            // if (verificaCategoria === categoria_id) {
            //     return res.status(200).json({Mensagem: "Categoria já cadastrada."})
            // } else {
            //     const insereCategoria = await pool.query("Insert into categorias Values($1)," [categoria_id])
            // } if (verificaTipo === tipo) {
            //     return res.status(200).json({Mensagem: "Tipo já cadastrada."})
            // } else {
            //     const insereGenero = await pool.query("Insert into generos Values($1)," [genero_id])
            // }  

            const CadastroPokemon = await pool.query(`INSERT INTO public.pokemon_info(nome, descricao, altura, peso, categoria_id, genero_id, total, hp, ataque, defesa, especial_ataque, especial_defesa, velocidade) VALUES ('${nome}', '${descricao}', ${altura}, ${peso}, ${categoria_id}, ${genero_id}, ${total}, ${hp}, ${ataque}, ${defesa}, ${especial_ataque}, ${especial_defesa}, ${velocidade});`)
            res.status(200).json({CadastroPokemon,
                    Mensagem: "Pokemon cadastrado com sucesso."})
        }
            catch (erro) {
                return res.status(500).json({Mensagem:"Erro ao cadastrar pokemon.", erro})
                
            }
    } 
    }

export {
    MostrarTodosControllers, CadastrarPokemonControllers, MostrarPeloID
}