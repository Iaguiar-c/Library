import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();
import multer from 'multer';

// Configuração do multer
const storage = multer.memoryStorage();
const upload = multer({ storage }).single('profileImage');

export class UserController {
  async startServer(req, res) {
    res.status(200).json({ msg: "Servidor está funcionando corretamente." });
  }

  async register(req, res) {
    const { name, email, password, confirmpassword } = req.body;
    const profileImage = req.file; // Imagem carregada pelo multer
  
    console.log("Iniciando registro do usuário");
  
    // Validações dos campos obrigatórios
    if (!name || !email || !password) {
      console.log("Campos obrigatórios faltando");
      return res
        .status(422)
        .json({ msg: "Por favor, forneça todos os campos obrigatórios." });
    }
  
    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log("Formato de email inválido");
      return res.status(422).json({ msg: "Formato de email inválido." });
    }
  
    // Validar a força da senha
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(password)) {
      console.log("Senha fraca");
      return res.status(422).json({
        msg: "A senha deve conter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.",
      });
    }
  
    if (password !== confirmpassword) {
      console.log("Senhas não coincidem");
      return res.status(422).json({ msg: "As senhas precisam ser iguais!" });
    }
  
    try {
      // Verifica se o usuário já existe no banco de dados
      const userExists = await User.findOne({ email: email });
  
      if (userExists) {
        console.log("Usuário já existe");
        return res.status(422).json({ msg: "Este email já está cadastrado. Por favor, use outro email." });
      }
  
      // Gera um hash da senha
      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(password, salt);
  
      // Cria um novo usuário com ou sem imagem de perfil
      const user = new User({
        name,
        email,
        password: passwordHash,
        profile: profileImage ? profileImage.buffer : undefined, // Adiciona a imagem se fornecida
      });
  
      // Salva o usuário no banco de dados
      await user.save();
  
      console.log("Usuário registrado com sucesso");
      res.status(201).json({ msg: "Usuário registrado com sucesso!" });
    } catch (error) {
      console.error("Erro ao registrar usuário:", error.message);
      res.status(500).json({
        msg: "Houve um erro no servidor ao registrar o usuário. Por favor, tente novamente mais tarde.",
      });
    }
  }
  
  async login(req, res) {
    const { email, password } = req.body;

    // Validações dos campos obrigatórios
    if (!email || !password) {
      return res
        .status(422)
        .json({ msg: "Por favor, forneça o email e a senha." });
    }

    try {
      // Verifica se o usuário existe no banco de dados
      const user = await User.findOne({ email: email });

      // Retorna uma mensagem genérica em vez de "Usuário não encontrado" para evitar vazamento de informações
      if (!user) {
        return res.status(401).json({ msg: "Credenciais inválidas." });
      }

      // Verifica se a senha está correta
      const checkPassword = await bcrypt.compare(password, user.password);

      if (!checkPassword) {
        return res.status(401).json({ msg: "Credenciais inválidas." });
      }

      const secret = process.env.SECRET;

      // Gera um token de autenticação
      const token = jwt.sign({ id: user._id }, secret);

      res.status(200).json({ msg: "Usuário autenticado!", token, user });
    } catch (error) {
      console.error("Erro ao fazer login:", error.message);
      res.status(500).json({ msg: "Erro no servidor ao fazer login." });
    }
  }

  async getUserById(req, res) {
    const id = req.params.id;

    try {
      // Verifica se o usuário existe no banco de dados
      const user = await User.findById(id, "-password");

      if (!user) {
        return res.status(404).json({ msg: "Usuário não encontrado!" });
      }

      res.status(200).json({ user });
    } catch (error) {
      console.error("Erro ao buscar usuário:", error.message);
      res.status(500).json({ msg: "Erro ao buscar usuário." });
    }
  }

  async logout(req, res) {
    res.status(200).json({ msg: "Usuário desconectado com sucesso!" });
    const Id = req.params.Id;

    try {
      // Verificar se o usuário existe antes de realizar o logout
      const user = await User.findById(Id);
      if (!user) {
        return res.status(404).json({ msg: "Usuário não encontrado" });
      }

      // Deslogar o usuário
      res.status(200).json({ msg: "Usuário desconectado com sucesso!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Erro no servidor" });
    }
  }

  async updateUser(req, res) {
    const id = req.params.id;
    const { name, email, password, confirmpassword } = req.body;
    const profileImage = req.file; // Imagem carregada pelo multer

    if (!name || !email) {
      return res.status(422).json({ msg: "Por favor, forneça todos os campos obrigatórios." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(422).json({ msg: "Formato de email inválido." });
    }

    if (password) {
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
      if (!passwordRegex.test(password)) {
        return res.status(422).json({
          msg: "A senha deve conter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.",
        });
      }

      if (password !== confirmpassword) {
        return res.status(422).json({ msg: "As senhas precisam ser iguais." });
      }
    }

    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ msg: "Usuário não encontrado." });
      }

      const updates = { name, email };
      if (password) {
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);
        updates.password = passwordHash;
      }

      if (profileImage) {
        updates.profile = profileImage.buffer;
      }

      await User.findByIdAndUpdate(id, updates);

      res.status(200).json({ msg: "Usuário atualizado com sucesso!" });
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error.message);
      res.status(500).json({ msg: "Erro no servidor ao atualizar usuário." });
    }
  }

  async deleteUser(req, res) {
    const Id = req.params.id;

    try {
      // Deleta o usuário diretamente pelo Id
      const deletedUser = await User.findByIdAndDelete(Id);

      // Verifica se o usuário foi encontrado e deletado com sucesso
      if (!deletedUser) {
        return res.status(404).json({ msg: "Usuário não encontrado." });
      }

      res.status(200).json({ msg: "Usuário deletado com sucesso!" });
    } catch (error) {
      console.error("Erro ao deletar usuário:", error.message);
      res.status(500).json({ msg: "Erro no servidor ao deletar usuário." });
    }
  }
}

// Exportar a instância do controlador e o middleware de upload
export const userController = new UserController();
export const uploadMiddleware = multer({ storage }).single('profileImage');