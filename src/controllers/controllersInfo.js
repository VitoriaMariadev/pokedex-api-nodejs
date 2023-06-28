import pool from "../database/db.js"


// funções mostrar
const MostrarTodosPokemonsControllers = async (req, res) => {
   try {
        const Pokemons = await pool.query(`SELECT
        p.pokemon_info_id,
        p.nome,
        p.descricao,
        p.altura,
        p.peso,
        c.categoria,
        string_agg(DISTINCT c.imagem_categoria, ', ') as img_categoria,
        g.genero,
        p.total,
        p.hp,
        p.ataque,
        p.defesa,
        p.especial_ataque,
        p.especial_defesa,
        p.velocidade,
        p.imagem,
        p.numero_pokemon,
        string_agg(DISTINCT f.fraqueza, ', ') as fraquezas,
        string_agg(DISTINCT f.imagem_fraqueza, ', ') as img_fraquezas,
        string_agg(DISTINCT h.habilidade, ', ') as habilidades,
        string_agg(DISTINCT h.imagem_habilidade, ', ') as img_habilidade,
        string_agg(DISTINCT t.tipo, ', ') as tipos,
        string_agg(DISTINCT t.imagem_tipagem, ', ') as img_tipo
    FROM
        pokemon_info p
        INNER JOIN categorias c ON p.categoria_id = c.categoria_id
        INNER JOIN generos g ON p.genero_id = g.genero_id
        INNER JOIN pokemon_fraquezas pf ON p.pokemon_info_id = pf.pokemon_info_id
        INNER JOIN fraquezas f ON pf.fraquezas_id = f.fraquezas_id
        INNER JOIN pokemon_habilidades ph ON p.pokemon_info_id = ph.pokemon_info_id
        INNER JOIN habilidades h ON ph.habilidade_id = h.habilidade_id
        INNER JOIN pokemon_tipagem pt ON p.pokemon_info_id = pt.pokemon_info_id
        INNER JOIN tipagem t ON pt.tipagem_id = t.tipagem_id
    GROUP BY
        p.pokemon_info_id,
        p.nome,
        p.descricao,
        p.altura,
        p.peso,
        c.categoria,
        g.genero,
        p.total,
        p.hp,
        p.ataque,
        p.defesa,
        p.especial_ataque,
        p.especial_defesa,
        p.velocidade,
        p.imagem,
        p.numero_pokemon
        
    order by p.numero_pokemon
      `)
        
        if (Pokemons.length === 0) {
            res.status(200).json({Mensagem: "Não há pokemons cadastrados.", status:400})
        }

        res.status(200).json(Pokemons.rows)

    } catch (erro) {
        res.status(500).json({Mensagem: erro.Mensagem})
    }
}

const MostrarTodasCategorias = async (req, res) => {
  try {
    const Categorias = await pool.query("SELECT * FROM categorias")
    

    if (Categorias.length === 0) {
      return res.status(200).json({Mensagem: "Não há categorias cadastrados.", status:400})
    }

    return res.status(200).json(Categorias.rows)

} catch (erro) {
  return res.status(500).json({Mensagem: erro.Mensagem})
}
}

const MostrarTodasFraquezas = async (req, res) => {
  try {
    const fraquezas = await pool.query("SELECT * FROM fraquezas")
    

    if (fraquezas.length === 0) {
      return res.status(200).json({Mensagem: "Não há fraquezas cadastrados.", status:400})
    }

    return res.status(200).json(fraquezas.rows)

} catch (erro) {
  return res.status(500).json({Mensagem: erro.Mensagem})
}
}

const MostrarTodosGeneros = async (req, res) => {
  try {
    const generos = await pool.query("SELECT * FROM generos")
    

    if (generos.length === 0) {
      return res.status(200).json({Mensagem: "Não há generos cadastrados.", status:400})
    }

    return res.status(200).json(generos.rows)

} catch (erro) {
  return res.status(500).json({Mensagem: erro.Mensagem})
}
}

const MostrarTodasHabilidades = async (req, res) => {
  try {
    const habilidades = await pool.query("SELECT * FROM habilidades")
    

    if (habilidades.length === 0) {
      return res.status(200).json({Mensagem: "Não há habilidades cadastrados.", status:400})
    }

    return res.status(200).json(habilidades.rows)

} catch (erro) {
  return res.status(500).json({Mensagem: erro.Mensagem})
}
}

const MostrarTodosTipagem = async (req, res) => {
  try {
    const tipagem = await pool.query("SELECT * FROM tipagem")
    
  
    if (tipagem.length === 0) {
      return res.status(200).json({Mensagem: "Não há tipos cadastrados.", status:400})
    }
  
    return res.status(200).json(tipagem.rows)

  

}catch (erro) {
  return res.status(500).json({Mensagem: erro.Mensagem})
}
}

const MostrarPokemonPeloID = async (req, res) => {
    try {
      const pokemon = await pool.query(`SELECT
      p.pokemon_info_id,
      p.nome,
      p.descricao,
      p.altura,
      p.peso,
      c.categoria,
      string_agg(DISTINCT c.imagem_categoria, ', ') as img_categoria,
      g.genero,
      p.total,
      p.hp,
      p.ataque,
      p.defesa,
      p.especial_ataque,
      p.especial_defesa,
      p.velocidade,
      p.imagem,
      p.numero_pokemon,
      string_agg(DISTINCT f.fraqueza, ', ') as fraquezas,
      string_agg(DISTINCT f.imagem_fraqueza, ', ') as img_fraquezas,
      string_agg(DISTINCT h.habilidade, ', ') as habilidades,
      string_agg(DISTINCT h.imagem_habilidade, ', ') as img_habilidade,
      string_agg(DISTINCT t.tipo, ', ') as tipos,
      string_agg(DISTINCT t.imagem_tipagem, ', ') as img_tipo
  FROM
      pokemon_info p
      INNER JOIN categorias c ON p.categoria_id = c.categoria_id
      INNER JOIN generos g ON p.genero_id = g.genero_id
      INNER JOIN pokemon_fraquezas pf ON p.pokemon_info_id = pf.pokemon_info_id
      INNER JOIN fraquezas f ON pf.fraquezas_id = f.fraquezas_id
      INNER JOIN pokemon_habilidades ph ON p.pokemon_info_id = ph.pokemon_info_id
      INNER JOIN habilidades h ON ph.habilidade_id = h.habilidade_id
      INNER JOIN pokemon_tipagem pt ON p.pokemon_info_id = pt.pokemon_info_id
      INNER JOIN tipagem t ON pt.tipagem_id = t.tipagem_id
  WHERE
      p.pokemon_info_id = ${req.params.id}
  GROUP BY
      p.pokemon_info_id,
      p.nome,
      p.descricao,
      p.altura,
      p.peso,
      c.categoria,
      g.genero,
      p.total,
      p.hp,
      p.ataque,
      p.defesa,
      p.especial_ataque,
      p.especial_defesa,
      p.velocidade,
      p.imagem,
      p.numero_pokemon
      ;`)
      res.status(200).json(pokemon.rows[0])    
    }

    catch (erro){
        return res.status(500).json({Message: erro.Message})
    }
}

// mostrar todos os pokemons com características espécificas
const MostrarTodosPokemonsFraquezas = async (req, res) => {
  const { fraqueza } = req.body;

  try {
    if (!fraqueza) {
      return res.status(200).json({ Mensagem: 'Há campo(s) vazio(s).', status: 400 });
    }

    const pokemon = await pool.query(
      `SELECT
      p.pokemon_info_id,
      p.nome,
      p.descricao,
      p.altura,
      p.peso,
      c.categoria,
      string_agg(DISTINCT f.imagem_categoria, ', ') as img_categoria,
      g.genero,
      p.total,
      p.hp,
      p.ataque,
      p.defesa,
      p.especial_ataque,
      p.especial_defesa,
      p.velocidade,
      p.imagem,
      p.numero_pokemon,
      string_agg(DISTINCT f.fraqueza, ', ') as fraquezas,
      string_agg(DISTINCT f.imagem_fraqueza, ', ') as img_fraquezas,
      string_agg(DISTINCT h.habilidade, ', ') as habilidades,
      string_agg(DISTINCT h.imagem_habilidade, ', ') as img_habilidade,
      string_agg(DISTINCT t.tipo, ', ') as tipos,
      string_agg(DISTINCT f.imagem_tipagem, ', ') as img_tipo
  FROM
      pokemon_info p
      INNER JOIN categorias c ON p.categoria_id = c.categoria_id
      INNER JOIN generos g ON p.genero_id = g.genero_id
      INNER JOIN pokemon_fraquezas pf ON p.pokemon_info_id = pf.pokemon_info_id
      INNER JOIN fraquezas f ON pf.fraquezas_id = f.fraquezas_id
      INNER JOIN pokemon_habilidades ph ON p.pokemon_info_id = ph.pokemon_info_id
      INNER JOIN habilidades h ON ph.habilidade_id = h.habilidade_id
      INNER JOIN pokemon_tipagem pt ON p.pokemon_info_id = pt.pokemon_info_id
      INNER JOIN tipagem t ON pt.tipagem_id = t.tipagem_id
    WHERE fraqueza = $1 
    GROUP BY
      p.pokemon_info_id,
      p.nome,
      p.descricao,
      p.altura,
      p.peso,
      c.categoria,
      g.genero,
      p.total,
      p.hp,
      p.ataque,
      p.defesa,
      p.especial_ataque,
      p.especial_defesa,
      p.velocidade,
      p.imagem,
      p.numero_pokemon
      ORDER BY numero_pokemon`,
      [fraqueza]
    );

    return res.status(200).json(pokemon.rows);
  } catch (erro) {
    return res.status(500).json({ Mensagem: erro.message });
    }
}

const MostrarTodosPokemonsTipagem = async (req, res) => {
  const { tipagem } = req.body;

try {
  if (!tipagem) {
    return res.status(200).json({ Mensagem: 'Há campo(s) vazio(s).', status: 400 });
  }

  const pokemon = await pool.query(
    `SELECT
    p.pokemon_info_id,
    p.nome,
    p.descricao,
    p.altura,
    p.peso,
    c.categoria,
    string_agg(DISTINCT f.imagem_categoria, ', ') as img_categoria,
    g.genero,
    p.total,
    p.hp,
    p.ataque,
    p.defesa,
    p.especial_ataque,
    p.especial_defesa,
    p.velocidade,
    p.imagem,
    p.numero_pokemon,
    string_agg(DISTINCT f.fraqueza, ', ') as fraquezas,
    string_agg(DISTINCT f.imagem_fraqueza, ', ') as img_fraquezas,
    string_agg(DISTINCT h.habilidade, ', ') as habilidades,
    string_agg(DISTINCT h.imagem_habilidade, ', ') as img_habilidade,
    string_agg(DISTINCT t.tipo, ', ') as tipos,
    string_agg(DISTINCT f.imagem_tipagem, ', ') as img_tipo
FROM
    pokemon_info p
    INNER JOIN categorias c ON p.categoria_id = c.categoria_id
    INNER JOIN generos g ON p.genero_id = g.genero_id
    INNER JOIN pokemon_fraquezas pf ON p.pokemon_info_id = pf.pokemon_info_id
    INNER JOIN fraquezas f ON pf.fraquezas_id = f.fraquezas_id
    INNER JOIN pokemon_habilidades ph ON p.pokemon_info_id = ph.pokemon_info_id
    INNER JOIN habilidades h ON ph.habilidade_id = h.habilidade_id
    INNER JOIN pokemon_tipagem pt ON p.pokemon_info_id = pt.pokemon_info_id
    INNER JOIN tipagem t ON pt.tipagem_id = t.tipagem_id
    WHERE tipo = $1 
  GROUP BY
    p.pokemon_info_id,
    p.nome,
    p.descricao,
    p.altura,
    p.peso,
    c.categoria,
    g.genero,
    p.total,
    p.hp,
    p.ataque,
    p.defesa,
    p.especial_ataque,
    p.especial_defesa,
    p.velocidade,
    p.imagem,
    p.numero_pokemon
    ORDER BY numero_pokemon`,
    [tipagem]
  );

  return res.status(200).json(pokemon.rows);
} catch (erro) {
  return res.status(500).json({ Mensagem: erro.message });
}
}

const MostrarPokemonPeloNome = async (req, res) => {
  const { nome } = req.body;

  try {
    const pokemon = await pool.query(`
    SELECT
    p.pokemon_info_id,
    p.nome,
    p.descricao,
    p.altura,
    p.peso,
    c.categoria,
    string_agg(DISTINCT f.imagem_categoria, ', ') as img_categoria,
    g.genero,
    p.total,
    p.hp,
    p.ataque,
    p.defesa,
    p.especial_ataque,
    p.especial_defesa,
    p.velocidade,
    p.imagem,
    p.numero_pokemon,
    string_agg(DISTINCT f.fraqueza, ', ') as fraquezas,
    string_agg(DISTINCT f.imagem_fraqueza, ', ') as img_fraquezas,
    string_agg(DISTINCT h.habilidade, ', ') as habilidades,
    string_agg(DISTINCT h.imagem_habilidade, ', ') as img_habilidade,
    string_agg(DISTINCT t.tipo, ', ') as tipos,
    string_agg(DISTINCT f.imagem_tipagem, ', ') as img_tipo
FROM
    pokemon_info p
    INNER JOIN categorias c ON p.categoria_id = c.categoria_id
    INNER JOIN generos g ON p.genero_id = g.genero_id
    INNER JOIN pokemon_fraquezas pf ON p.pokemon_info_id = pf.pokemon_info_id
    INNER JOIN fraquezas f ON pf.fraquezas_id = f.fraquezas_id
    INNER JOIN pokemon_habilidades ph ON p.pokemon_info_id = ph.pokemon_info_id
    INNER JOIN habilidades h ON ph.habilidade_id = h.habilidade_id
    INNER JOIN pokemon_tipagem pt ON p.pokemon_info_id = pt.pokemon_info_id
    INNER JOIN tipagem t ON pt.tipagem_id = t.tipagem_id
      WHERE
        nome ILIKE '%' || '${nome}' || '%'
      GROUP BY
        p.pokemon_info_id,
        p.nome,
        p.descricao,
        p.altura,
        p.peso,
        c.categoria,
        g.genero,
        p.total,
        p.hp,
        p.ataque,
        p.defesa,
        p.especial_ataque,
        p.especial_defesa,
        p.velocidade,
        p.imagem,
        p.numero_pokemon
      ORDER BY
        numero_pokemon;
    `);

    if (pokemon.rows.length === 0) {
      return res.status(200).json({ mensagem: 'Pokemon(s) não encontrado(s)', status:400 });
    }

    return res.status(200).json(pokemon.rows);
  } catch (error) {
    console.error('Erro ao buscar Pokémon por nome:', error);
    return res.status(500).json({ mensagem: 'Ocorreu um erro interno no servidor' });
  }
}

const MostrarTodosPokemonsAleatorio = async (req, res) => {
  try{

    const Pokemons = await pool.query(`SELECT
    p.pokemon_info_id,
    p.nome,
    p.descricao,
    p.altura,
    p.peso,
    c.categoria,
    string_agg(DISTINCT c.imagem_categoria, ', ') as img_categoria,
    g.genero,
    p.total,
    p.hp,
    p.ataque,
    p.defesa,
    p.especial_ataque,
    p.especial_defesa,
    p.velocidade,
    p.imagem,
    p.numero_pokemon,
    string_agg(DISTINCT f.fraqueza, ', ') as fraquezas,
    string_agg(DISTINCT f.imagem_fraqueza, ', ') as img_fraquezas,
    string_agg(DISTINCT h.habilidade, ', ') as habilidades,
    string_agg(DISTINCT h.imagem_habilidade, ', ') as img_habilidade,
    string_agg(DISTINCT t.tipo, ', ') as tipos,
    string_agg(DISTINCT t.imagem_tipagem, ', ') as img_tipo
FROM
    pokemon_info p
    INNER JOIN categorias c ON p.categoria_id = c.categoria_id
    INNER JOIN generos g ON p.genero_id = g.genero_id
    INNER JOIN pokemon_fraquezas pf ON p.pokemon_info_id = pf.pokemon_info_id
    INNER JOIN fraquezas f ON pf.fraquezas_id = f.fraquezas_id
    INNER JOIN pokemon_habilidades ph ON p.pokemon_info_id = ph.pokemon_info_id
    INNER JOIN habilidades h ON ph.habilidade_id = h.habilidade_id
    INNER JOIN pokemon_tipagem pt ON p.pokemon_info_id = pt.pokemon_info_id
    INNER JOIN tipagem t ON pt.tipagem_id = t.tipagem_id
  GROUP BY
    p.pokemon_info_id,
    p.nome,
    p.descricao,
    p.altura,
    p.peso,
    c.categoria,
    g.genero,
    p.total,
    p.hp,
    p.ataque,
    p.defesa,
    p.especial_ataque,
    p.especial_defesa,
    p.velocidade,
    p.imagem,
    p.numero_pokemon
     ORDER BY RANDOM()`)

    if (Pokemons.length === 0) {
      return res.status(200).json({Mensagem: "Não há pokemons cadastrados.", status:400})
    }

    return res.status(200).json(Pokemons.rows)

  } catch {
    return res.status(500).json({Mensagem: erro.Mensagem})
  }
}



// função de cadastrar pokemon
const CadastrarCategoria = async (req, res) => {
  const { categoria, imagem_categoria, descricao } = req.body;

  try {
    if (!categoria || !imagem_categoria || !descricao) {
      return res.status(200).json({ Mensagem: 'Há campo(s) vazio(s).', status: 400 });
    }

    const nova_categoria = primeiraLetraMaiuscula(categoria);
    const nova_categoria_imagem = imagem_categoria.trim();
    const nova_descricao = descricao.trim();

    let categoria_id;
    const verificaCategoria = await pool.query(
      'SELECT categoria_id FROM categorias WHERE categoria = $1',
      [nova_categoria]
    );

    if (verificaCategoria.rows.length > 0) {
      categoria_id = verificaCategoria.rows[0].categoria_id;
    } else {
      const cadastroCategoria = await pool.query(
        'INSERT INTO categorias (categoria, imagem_categoria, descricao) VALUES ($1, $2, $3) RETURNING categoria_id',
        [nova_categoria, nova_categoria_imagem, nova_descricao]
      );
      categoria_id = cadastroCategoria.rows[0].categoria_id;
    }

    return res.status(200).json({ Mensagem: 'Categoria cadastrada com sucesso.' });
  } catch (erro) {
    return res.status(500).json({ Mensagem: 'Erro ao cadastrar categoria.', erro });
  }
};


const CadastrarFraqueza = async (req, res) => {
  const { fraqueza, imagem_fraqueza, descricao } = req.body;

  try {
    if (!fraqueza || !imagem_fraqueza || !descricao) {
      return res.status(200).json({ Mensagem: 'Há campo(s) vazio(s).', status: 400 });
    }

    const nova_fraqueza = primeiraLetraMaiuscula(fraqueza);
    const nova_imagem_fraqueza = imagem_fraqueza.trim();
    const nova_descricao = descricao.trim();

    let fraquezas_id;
    const verificaFraqueza = await pool.query(
      'SELECT fraquezas_id FROM fraquezas WHERE fraqueza = $1',
      [nova_fraqueza]
    );

    if (verificaFraqueza.rows.length > 0) {
      fraquezas_id = verificaFraqueza.rows[0].fraquezas_id;
    } else {
      const cadastroFraqueza = await pool.query(
        'INSERT INTO fraquezas (fraqueza, imagem_fraqueza, descricao) VALUES ($1, $2, $3) RETURNING fraquezas_id',
        [nova_fraqueza, nova_imagem_fraqueza, nova_descricao]
      );
      fraquezas_id = cadastroFraqueza.rows[0].fraquezas_id;
    }

    return res.status(200).json({ Mensagem: 'Fraqueza cadastrada com sucesso.' });
  } catch (erro) {
    return res.status(500).json({ Mensagem: 'Erro ao cadastrar fraqueza.', erro });
  }
};

const CadastrarHabilidade = async (req, res) => {
  const { habilidade, imagem_habilidade, descricao } = req.body;

  try {
    if (!habilidade || !imagem_habilidade || !descricao) {
      return res.status(200).json({ Mensagem: 'Há campo(s) vazio(s).', status: 400 });
    }

    const nova_habilidade = primeiraLetraMaiuscula(habilidade);
    const nova_imagem_habilidade = imagem_habilidade.trim();
    const nova_descricao = descricao.trim();
    let habilidade_id;
    const verificaHabilidade = await pool.query(
      'SELECT habilidade_id FROM habilidades WHERE habilidade = $1',
      [nova_habilidade]
    );

    if (verificaHabilidade.rows.length > 0) {
      habilidade_id = verificaHabilidade.rows[0].habilidade_id;
    } else {
      const cadastroHabilidade = await pool.query(
        'INSERT INTO habilidades (habilidade, imagem_habilidade, descricao) VALUES ($1, $2, $3) RETURNING habilidade_id',
        [nova_habilidade, nova_imagem_habilidade, nova_descricao]
      );
      habilidade_id = cadastroHabilidade.rows[0].habilidade_id;
    }

    return res.status(200).json({ Mensagem: 'Habilidade cadastrada com sucesso.' });
  } catch (erro) {
    return res.status(500).json({ Mensagem: 'Erro ao cadastrar habilidade.', erro });
  }
};


const CadastrarTipagem = async (req, res) => {
  const {
    tipagem, imagem_tipagem, descricao
  } = req.body

  try {
    if (!tipagem || !imagem_tipagem || !descricao) {
      return res.status(200).json({ Mensagem: 'Há campo(s) vazio(s).', status: 400 });
    }

    const nova_tipagem = primeiraLetraMaiuscula(tipagem)
    const nova_imagem_tipagem = imagem_tipagem.trim()
    const nova_descricao = descricao.trim()

    let tipagem_id;
    const verificaTipagem = await pool.query(
      'SELECT tipagem_id FROM tipagem WHERE tipo = $1',
      [nova_tipagem]
    );

    if (verificaTipagem.rows.length > 0) {
      tipagem_id = verificaTipagem.rows[0].tipagem_id;
    } else {
      const cadastroTipagem = await pool.query(
        'INSERT INTO tipagem (tipo, imagem_tipagem, descricao) VALUES ($1, $2, $3) RETURNING tipagem_id',
        [nova_tipagem, nova_imagem_tipagem, nova_descricao]
      );
      tipagem_id = cadastroTipagem.rows[0].tipagem_id;
    }

    return res.status(200).json({ Mensagem: 'Tipo cadastrado com sucesso.' });
  } catch (erro) {
    return res.status(500).json({ Mensagem: 'Erro ao cadastrar tipo.', erro });
  }
}



const CadastrarPokemonControllers = async (req, res) => {
  const {
    nome,
    descricao,
    altura,
    peso,
    categoria,
    genero,
    hp,
    ataque,
    defesa,
    especial_ataque,
    especial_defesa,
    velocidade,
    imagem,
    numero_pokemon,
    fraqueza,
    habilidade,
    tipagem
  } = req.body;

  // Formatar os campos
  const nomeFormatado = primeiraLetraMaiuscula(nome);
  const descricaoFormatada = primeiraLetraMaiuscula(descricao);
  const alturaFormatada = String(altura).trim();
  const pesoFormatado = String(peso).trim();
  const categoriaFormatada = primeiraLetraMaiuscula(categoria);
  const generoFormatado = primeiraLetraMaiuscula(genero);
  const hpFormatado = String(hp).trim();
  const ataqueFormatado = String(ataque).trim();
  const defesaFormatada = String(defesa).trim();
  const especialAtaqueFormatado = String(especial_ataque).trim();
  const especialDefesaFormatada = String(especial_defesa).trim();
  const velocidadeFormatada = String(velocidade).trim();
  const imagemFormatada = imagem.trim();
  const numeroPokemonFormatado = String(numero_pokemon).trim();

  try {
    if (
      !nomeFormatado ||
      !descricaoFormatada ||
      !alturaFormatada ||
      !pesoFormatado ||
      !categoriaFormatada ||
      !generoFormatado ||
      !hpFormatado ||
      !ataqueFormatado ||
      !defesaFormatada ||
      !especialAtaqueFormatado ||
      !especialDefesaFormatada ||
      !velocidadeFormatada ||
      !fraqueza ||
      !habilidade ||
      !tipagem ||
      !imagemFormatada ||
      !numeroPokemonFormatado
    ) {
        return res.status(200).json({ Mensagem: 'Há campo(s) vazio(s).', status: 400 });
      }
      let total = (parseInt(ataque) + parseInt(defesa) + parseInt(hp) + parseInt(especialAtaqueFormatado) + parseInt(especialDefesaFormatada) + parseInt(velocidade))

    // Verifica categoria
    let categoria_id;
    console.log('aqui')
    const verificaCategoria = await pool.query(
      'SELECT categoria_id FROM categorias WHERE categoria = $1',
      [categoriaFormatada]
    );
    categoria_id = verificaCategoria.rows[0].categoria_id;
    console.log('categoria', categoria_id)
    

    // Verifica fraqueza
    let fraquezas_id;
    const list_fraqueza_id = [];

    for (let i = 0; i < fraqueza.length; i++) {
      const fraqueza_nome = fraqueza[i];
      const fraquezaFormatada = primeiraLetraMaiuscula(fraqueza_nome);
      const verificaFraqueza = await pool.query(
        'SELECT fraquezas_id FROM fraquezas WHERE fraqueza = $1',
        [fraquezaFormatada]
      );
    fraquezas_id = verificaFraqueza.rows[0].fraquezas_id;
    list_fraqueza_id.push(fraquezas_id);  
    console.log(list_fraqueza_id)
    }

    // Verifica habilidade
    let habilidade_id;
    const list_habilidade_id = [];

    for (let i = 0; i < habilidade.length; i++) {
      const habilidade_nome = habilidade[i];
      const habilidadeFormatada = primeiraLetraMaiuscula(habilidade_nome);
      const verificaHabilidade = await pool.query(
        'SELECT habilidade_id FROM habilidades WHERE habilidade = $1',
        [habilidadeFormatada]
      );
    habilidade_id = verificaHabilidade.rows[0].habilidade_id;
    list_habilidade_id.push(habilidade_id);
    console.log(list_habilidade_id)
    }

    // Verifica genero
    let genero_id;
    const verificaGenero = await pool.query(
      'SELECT genero_id FROM generos WHERE genero = $1',
      [generoFormatado]
    );

    if (verificaGenero.rows.length > 0) {
      genero_id = verificaGenero.rows[0].genero_id;
    } else {
      return res.status(200).json({ Mensagem: 'Gênero inválido.', status: 400 });
    }

    // Verifica tipagem
    let tipagem_id;
    const list_tipagem_id = [];

    for (let i = 0; i < tipagem.length; i++) {
      const tipagem_nome = tipagem[i];
      const verificaTipagem = await pool.query(
        'SELECT tipagem_id FROM tipagem WHERE tipo = $1',
        [tipagem_nome]
      );
      tipagem_id = verificaTipagem.rows[0].tipagem_id;
      list_tipagem_id.push(tipagem_id);
      console.log(list_tipagem_id)
    }

    const verificaNumeroPokemon = await pool.query(
      'SELECT pokemon_info_id FROM pokemon_info WHERE numero_pokemon = $1',
      [numeroPokemonFormatado]
    );

    if (verificaNumeroPokemon.rows.length > 0) {
      return res.status(200).json({Mensagem: 'Número pokemon já cadastrado!', status: 400 });
    }

      // Inserindo nas tabelas
      const CadastroPokemon = await pool.query(
        `INSERT INTO pokemon_info (
          nome,
          descricao,
          altura,
          peso,
          categoria_id,
          genero_id,
          total,
          hp,
          ataque,
          defesa,
          especial_ataque,
          especial_defesa,
          velocidade,
          imagem,
          numero_pokemon
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING pokemon_info_id`,
        [
          nomeFormatado,
          descricaoFormatada,
          alturaFormatada,
          pesoFormatado,
          categoria_id,
          genero_id,
          total,
          hpFormatado,
          ataqueFormatado,
          defesaFormatada,
          especialAtaqueFormatado,
          especialDefesaFormatada,
          velocidadeFormatada,
          imagemFormatada,
          numeroPokemonFormatado
        ]
      );
  
      const pokemon_info_id = CadastroPokemon.rows[0].pokemon_info_id;
  
      // Relacionando as tabelas

      for (const fraqueza_id of list_fraqueza_id) {
        console.log('fraqueza', fraqueza_id)
        await pool.query(
          'INSERT INTO pokemon_fraquezas (pokemon_info_id, fraquezas_id) VALUES ($1, $2)',
          [pokemon_info_id, fraqueza_id]
        );
      }

      for (const habilidade_id of list_habilidade_id) {
        console.log('habilidade', habilidade_id)
        await pool.query(
          'INSERT INTO pokemon_habilidades (pokemon_info_id, habilidade_id) VALUES ($1, $2)',
          [pokemon_info_id, habilidade_id]
        );
      }

      for (const tipagem_id of list_tipagem_id) {
        console.log('Tipagem', tipagem_id)
        await pool.query(
          'INSERT INTO pokemon_tipagem (pokemon_info_id, tipagem_id) VALUES ($1, $2)',
          [pokemon_info_id, tipagem_id]
        );
      }
  
      return res.status(200).json({ Mensagem: 'Pokemon cadastrado com sucesso.' });
    } catch (erro) {
      return res.status(500).json({ Mensagem: 'Erro ao cadastrar pokemon.', erro });
    }
};



// funções de exclusão
const ExcluirCategoria = async (req, res) => {
  const {
    categoria
  } = req.body

  try {
    if (!categoria) {
      return res.status(200).json({Mensagem: 'Há campo(s) vazio(s).', status: 400 });
    }

    const novaCategoria = primeiraLetraMaiuscula(categoria)


    let categoria_id;
    const verificaCategoria = await pool.query(
      'SELECT categoria_id FROM categorias WHERE categoria = $1',
      [novaCategoria]
    );
    // o id da categoria é pegada e comparada
    categoria_id = verificaCategoria.rows[0].categoria_id;

    // verifica se algum pokemon tem essa categoria
    const verificaPokemonTemCategoria = await pool.query(
      'SELECT categoria_id FROM pokemon_info WHERE categoria_id = $1',
      [categoria_id]
    );

    if (verificaPokemonTemCategoria.rows.length === 0) {
      await pool.query(
        'Delete from categorias where categoria_id = ($1)',
        [categoria_id]
      );
      return res.status(200).json({Mensagem: 'Categoria excluida com sucesso.' });
    } else {

      return res.status(200).json({Message: "A categoria está sendo usada!", status: 400})

    }

  } catch (erro){
    res.status(500).json({ Mensagem: 'Erro ao excluir categoria.', erro });
  }
}

const ExcluirFraqueza = async (req, res) => {
  const {
    fraqueza
  } = req.body

  try {
    if (!fraqueza) {
      return res.status(200).json({Mensagem: 'Há campo(s) vazio(s).', status: 400 });
    }

    const NovaFraqueza = primeiraLetraMaiuscula(fraqueza)

    let fraquezas_id;
    const verificaFraqueza = await pool.query(
      'SELECT fraquezas_id FROM fraquezas WHERE fraqueza = $1',
      [NovaFraqueza]
    );
    // o id da categoria é pegada e comparada
    fraquezas_id = verificaFraqueza.rows[0].fraquezas_id;

    // verifica se algum pokemon tem essa categoria
    const verificaPokemonTemFraqueza = await pool.query(
      'SELECT pokemon_fraqueza_id FROM pokemon_fraquezas WHERE fraquezas_id = $1',
      [fraquezas_id]
    );
    
      
    if (verificaPokemonTemFraqueza.rows.length === 0) {
      await pool.query(
        'Delete from fraquezas WHERE fraquezas_id = $1',
        [fraquezas_id]
      );

      res.status(200).json({Mensagem: 'Categoria excluida com sucesso.' });
    } else {

      return res.status(200).json({Message: "A categoria está sendo usada!", status: 400})
      
    }

  } catch (erro){
    return res.status(500).json({ Mensagem: 'Erro ao excluir categoria.', erro });
  }
}

const ExcluirHabilidade = async (req, res) => {
  const {
    habilidade
  } = req.body

  try {
    if (!habilidade) {
      return res.status(200).json({Mensagem: 'Há campo(s) vazio(s).', status: 400 });
    }

    const NovaHabilidade = primeiraLetraMaiuscula(habilidade)

    let habilidade_id;
    const verificaHabilidade = await pool.query(
      'SELECT habilidade_id FROM habilidades WHERE habilidade = $1',
      [NovaHabilidade]
    );
    
    // o id da categoria é pegada e comparada
    habilidade_id = verificaHabilidade.rows[0].habilidade_id;

    // verifica se algum pokemon tem essa categoria
    const verificaPokemonTemHabilidade = await pool.query(
      'SELECT pokemon_habilidades_id FROM pokemon_habilidades WHERE habilidade_id = $1',
      [habilidade_id]
    );
    
      
    if (verificaPokemonTemHabilidade.rows.length === 0) {
      await pool.query(
        'Delete from habilidades WHERE habilidade_id = $1',
        [habilidade_id]
      );
      res.status(200).json({Mensagem: 'Habilidade excluida com sucesso.' });
    } else {
      return res.status(200).json({Message: "A Habilidade está sendo usada!", status: 400})
      
    }

  } catch (erro){
    res.status(500).json({ Mensagem: 'Erro ao excluir habilidade.', erro });
  }
}

const ExcluirTipagem = async (req, res) => {
  const {
    tipagem
  } = req.body

  try {
    if (!tipagem) {
      return res.status(200).json({Mensagem: 'Há campo(s) vazio(s).', status: 400 });
    }

    const NovaTipagem = primeiraLetraMaiuscula(tipagem)

    let tipagem_id;
    const verificaTipagem = await pool.query(
      'SELECT tipagem_id FROM tipagem WHERE tipo = $1',
      [NovaTipagem]
    );
    // o id da categoria é pegada e comparada
    tipagem_id = verificaTipagem.rows[0].tipagem_id;

    // verifica se algum pokemon tem essa categoria
    const verificaPokemonTemTipo = await pool.query(
      'SELECT pokemon_tipagem_id FROM pokemon_tipagem WHERE tipagem_id = $1',
      [tipagem_id]
    );
    
      
    if (verificaPokemonTemTipo.rows.length === 0) {
      await pool.query(
        'Delete from tipagem WHERE tipagem_id = $1',
        [tipagem_id]
      );
      return res.status(200).json({Mensagem: 'Tipagem excluida com sucesso.' });
    } else {
      return res.status(200).json({Message: "A Tipagem está sendo usada!", status: 400})
      
    }

  } catch (erro){
    return res.status(500).json({ Mensagem: 'Erro ao excluir categoria.', erro });
  }
}

const ExcluirPokemonControllers = async (req, res) => {
  try {
    const {pokemon_info_id} = req

    if (!pokemon_info_id) {
        return res.status(200).json({Mensagem: 'Id não informado.', status:400})
    }

    // excluido pokemon dos relacionamentos
    // excluindo relacionamento fraquezas
    await pool.query(`DELETE FROM pokemon_fraquezas WHERE pokemon_info_id = ${pokemon_info_id}`)

    // excluindo relacionamento habilidades
    await pool.query(`DELETE FROM pokemon_habilidades WHERE pokemon_info_id = ${pokemon_info_id}`)
    
    // excluindo relacionamento tipagem
    await pool.query(`DELETE FROM pokemon_tipagem WHERE pokemon_info_id = ${pokemon_info_id}`)
    

    // excluindo pokemon
    await pool.query(`DELETE FROM pokemon_info WHERE pokemon_info_id = ${pokemon_info_id}`)


    return res.status(200).json({Mensagem: "Pokemon excluida com sucesso."})
}

catch (erro){
    return res.status(500).json({Mensagem: erro.Mensagem})
}
}

    


function primeiraLetraMaiuscula(texto) {
  return String(texto)
    .trim() // Remove espaços em branco no início e no final da string
    .replace(/\s+/g, ' ') // Remove espaços extras entre as palavras
    .toLowerCase() // Converte todo o texto para minúsculas
    .replace(/(^|\s)\S/g, (match) => match.toUpperCase()); // Converte as primeiras letras de cada palavra para maiúsculo

}




export {
    MostrarTodosPokemonsControllers, MostrarTodasCategorias, MostrarTodasFraquezas,
    MostrarTodosGeneros, MostrarPokemonPeloNome, MostrarTodosTipagem, MostrarTodasHabilidades, MostrarPokemonPeloID,
    MostrarTodosPokemonsFraquezas, MostrarTodosPokemonsTipagem, MostrarTodosPokemonsAleatorio,
    CadastrarPokemonControllers, CadastrarCategoria, CadastrarFraqueza, CadastrarTipagem, CadastrarHabilidade,
    ExcluirPokemonControllers, ExcluirCategoria, ExcluirFraqueza, ExcluirTipagem, ExcluirHabilidade, 
    primeiraLetraMaiuscula
}