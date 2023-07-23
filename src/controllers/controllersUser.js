import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import pool from '../database/db.js'
import { primeiraLetraMaiuscula } from './controllersInfo.js'



const CadastrarUsuarioControllers = async (req, res) => {
    try {
        const{
            nome, senha, confirmSenha
        } = req.body

        if (!nome || !senha || ! confirmSenha) {
            return res.status(200).json({Mensagem: "Há campo(s) vazio(s).", status:400})
        } else {
            const novoUsuario = primeiraLetraMaiuscula(nome) 
            const novaSenha = senha.trim()
            const novaConfirmSenha = confirmSenha.trim()

            if (novaSenha.length < 6) {
                return res.status(200).json({Mensagem: "A senha precisa ter no minimo 6 caracteres.", status:400})
            } else {

                if (novaSenha != novaConfirmSenha) {
                    return res.status(200).json({Mensagem: "As senha estão diferentes.", status:400})
                } else {

                    const verificaUsuarioExiste = await pool.query('SELECT * FROM usuarios WHERE nome = $1', [novoUsuario]);
                    if (verificaUsuarioExiste.rows.length > 0) {
                      return res.status(200).json({ Mensagem: 'Usuário já existe', status:400 });
                    } else {

                        const senhaCriptografada = await bcrypt.hash(novaSenha, 10)
    
                        const CadastroUsuario = await pool.query("INSERT INTO usuarios (nome, senha) VALUES ($1, $2)", [novoUsuario, senhaCriptografada])
                        if (!CadastroUsuario) {
                            res.status(200).json({Mensagem: "Erro na criação do usuario.", status:400})
                        } else {
                            res.status(201).json(
                                {
                                    user: {
                                        id: CadastroUsuario.user_id,
                                        nome,
                                    },
                                    Mensagem: "Usuario cadastrada com sucesso."
                                }
                            ) 
                        }
                    }
                }
            }
        }

    }  
    catch (erro){
        res.status(500).json({Mensagem: erro.Mensagem})
    }
}

const Login = async (req, res) => {
    try {
        const {
            nome,
            senha
          } = req.body;
          
          if (!nome || !senha) {
            return res.status(200).json({ Mensagem: "Há campo(s) vazio(s).", status: 400 });
          }
          
          const novoUsuario = primeiraLetraMaiuscula(nome);
          const novaSenha = senha.trim();
          
          const verificaUsuario = await pool.query("SELECT * FROM usuarios WHERE nome = $1", [novoUsuario]);
          const senhaValida = bcrypt.compareSync(novaSenha, verificaUsuario.rows[0].senha);
          
          if (!senhaValida) {
            return res.status(200).json({ Mensagem: 'Usuário ou senha incorretos.', status: 400 });
          }
          
          const usuarioId = verificaUsuario.rows[0].user_id
          const usuarioSenha = verificaUsuario.rows[0].senha

          const token = jwt.sign({ usuario: verificaUsuario.rows[0].nome }, 'a802c6ed36c616ef9df379ef94c38b0f', { expiresIn: 86400 });
          
          res.cookie("token",token,{httpOnly:true})
          res.status(200).json({ token, usuarioId, novoUsuario, usuarioSenha});
    }
    catch (erro) {
        return res.status(500).json({Mensagem: erro.Mensagem})
    }
}


const validarToken = async (req, res) => {
    const token =  req.body.token || req.query.token || req.cookies.token || req.headers['x-access-token'];
    req.token = token

    if(!token){
        return res.status(200).json({Message:"Token inválido.", status:400})
    }

    console.log(token)
    jwt.verify(token, 'a802c6ed36c616ef9df379ef94c38b0f', (err, decoded) =>{
        if(err){
            return res.status(200).json({Message:"Token inválido.", status:400})
        }else{
            req.usuario = decoded.usuario
            return res.status(200).json({Message:"Token válido."})
        }
    })
}

const deletarToken = async (req, res) => {
    const token = req.body.token || req.query.token || req.cookies.token || req.headers['x-access-token'];

    if(!token){
       return res.status(200).json({Message:"Logout não autorizado.", status:400})
    }
    res.cookie('token', null, {httpOnly:true})
    
    return res.status(200).json({Message:"Você foi desconectado."})
};

const EncontrarTodosUsuarios = async (req, res) => {
    try {
        const Usuarios = await pool.query('SELECT nome FROM usuarios')
      
        if (Usuarios.length === 0) {
            res.status(200).json({Mensagem: "Não há usuários cadastrados.", status:400})
        }

        res.status(200).json(Usuarios.rows)

    } catch (erro) {
        res.status(500).json({Mensagem: erro.Mensagem})
    }
}

const EncontrarUsuarioId = async (req, res) => {
    try {
        const Usuario = await pool.query(`SELECT
          nome
      FROM
          usuarios
      WHERE
          user_id = ${req.params.id};`)
          
          return res.status(200).json(Usuario.rows[0])
      }
  
      catch (erro){
          return res.status(500).json({Mensagem: erro.Mensagem})
      }
}

const removeUsuarioID = async (req, res) => {
    try {
        const {id} = req

        await pool.query(
            'Delete from usuarios where user_id = $1',
            [id]
          );

        return res.status(200).json({Mensagem: "Usuário excluido com sucesso."})
    }

    catch (erro){
        res.status(500).json({Mensagem: erro.Mensagem})
    }
}

export {
    CadastrarUsuarioControllers, Login, EncontrarUsuarioId, removeUsuarioID, validarToken, deletarToken, EncontrarTodosUsuarios
}