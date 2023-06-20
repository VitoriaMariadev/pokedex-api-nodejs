import pool from "../database/db.js"

const MostrarTodosControllers = async (req, res) => {
    try {
        const Pokemons = await pool.query("SELECT * FROM pokemon_info")
        

        if (Pokemons.length === 0) {
            res.status(200).json({Mensagem: "Não há pokemons cadastrados."})
        }

        res.status(200).json(Pokemons.rows)

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
        pokemon_info_id, nome, descricao, altura, peso, categoria, genero_id, total, hp, ataque, defesa, especial_ataque, especial_defesa, velocidade
    } = req.body

    if (!nome || !descricao || !altura || !peso || !categoria || !genero_id || !total || !hp || !ataque || !defesa || !especial_ataque || !especial_defesa || !velocidade) {
            res.status(200).json({Mensagem: 'Há campo(s) vazio(s).', status: 400})
    } else {
        try {
            const flagCategoria = false
            const verificaCategoria = await pool.query("Select categoria from categorias")
            const rowsCategoria = verificaCategoria.rows
            rowsCategoria.map((item, index) => {
                if (item.categoria === categoria) {
                    flagCategoria = true
                    categoria = item.categoria_id
                    console.log(categoria)
                }
            })  
            const flagGenero = false
            const verificaGenero = await pool.query("Select genero from generos")
            const rowsGenero = verificaGenero.rows
            rowsGenero.map((item, index) => {
                if (item.genero === genero_id) {
                    flagGenero = true
                }
            })  
            
            if (flagCategoria === false) {
                const cadastroCategoria = await pool.query(`INSERT INTO categoria(categoria) VALUES ('${categoria}');`)  
            }  
            

            const CadastroPokemon = await pool.query(`INSERT INTO pokemon_info(pokemon_info_id, nome, descricao, altura, peso, categoria_id, genero_id, total, hp, ataque, defesa, especial_ataque, especial_defesa, velocidade) VALUES ('${pokemon_info_id}, ${nome}', '${descricao}', ${altura}, ${peso}, ${categoria_id}, ${genero_id}, ${total}, ${hp}, ${ataque}, ${defesa}, ${especial_ataque}, ${especial_defesa}, ${velocidade});`)
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