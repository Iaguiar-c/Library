import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js"; // Use importação padrão
import dotenv from "dotenv";
dotenv.config();
import multer from "multer";

const storage = multer.memoryStorage();

export class UserController {
  async startServer(req, res) {
    res.status(200).json({ msg: "Servidor está funcionando corretamente." });
  }

  async login(req, res) {
    const { email, password } = req.body;

    // Verificação de campos obrigatórios
    if (!email || !password) {
      return res.status(422).json({ msg: "Por favor, forneça o email e a senha." });
    }

    try {
      // Busca o usuário pelo email
      const user = await User.findOne({ where: { email } });

      // Verifica se o usuário existe
      if (!user) {
        console.log("Usuário não encontrado para o email:", email);
        return res.status(401).json({ msg: "Credenciais inválidas." });
      }

      // Verifica a senha
      const checkPassword = await bcrypt.compare(password, user.password);
      if (!checkPassword) {
        return res.status(401).json({ msg: "Credenciais inválidas." });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      // Se a senha não for válida
      if (!isPasswordValid) {
        return res.status(422).json({ msg: "Senha incorreta." });
      }

      // Gera o token JWT
      const secret = process.env.SECRET;
      if (!secret) {
        return res.status(500).json({ msg: "Erro no servidor: segredo do JWT ausente." });
      }

      // Inclui informações adicionais, como user_type, e define a expiração do token
      const token = jwt.sign(
        { id: user.id, user_type: user.user_type }, // payload com informações do usuário
        secret,
        { expiresIn: '1h' } // token expira em 1 hora (ajuste conforme necessário)
      );

      // Retorna o token e os dados do usuário autenticado
      return res.status(200).json({
        msg: "Usuário autenticado!",
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          user_type: user.user_type,
          profile: user.profile,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      });
    } catch (error) {
      console.error("Erro ao fazer login:", error.message);
      return res.status(500).json({ msg: "Erro no servidor ao fazer login." });
    }
  }

  async register(req, res) {
    const { name, email, user_type, password, confirmpassword, profile } = req.body;

    if (!name || !email || !password || !confirmpassword || !user_type) {
      return res.status(422).json({ msg: "Por favor, forneça todos os campos obrigatórios." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(422).json({ msg: "Formato de email inválido." });
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(422).json({
        msg: "A senha deve conter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.",
      });
    }

    if (password !== confirmpassword) {
      return res.status(422).json({ msg: "As senhas precisam ser iguais!" });
    }

    const allowedUserTypes = ['ADMIN', 'USER'];
    if (!allowedUserTypes.includes(user_type)) {
      return res.status(422).json({ msg: "Tipo de usuário inválido!" });
    }

    try {
      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        return res.status(422).json({
          msg: "Este email já está cadastrado. Por favor, use outro email.",
        });
      }

      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(password, salt);

      const user = await User.create({
        name,
        email,
        password: passwordHash,
        user_type,
        profile,
      });

      // Gerar o token JWT
      const token = jwt.sign(
        { id: user.id, email: user.email, user_type: user.user_type },
        process.env.SECRET, // Chave secreta deve estar no .env
        { expiresIn: '1h' } // Define o tempo de expiração do token
      );

      return res.status(201).json({
        msg: "Usuário registrado com sucesso!",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          user_type: user.user_type,
          profile: user.profile,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
        token, // Retorna o token gerado
      });

    } catch (error) {
      console.error("Erro ao registrar usuário:", error.message);

      if (error.name === 'ValidationError') {
        return res.status(422).json({
          msg: "Por favor, forneça todos os campos obrigatórios corretamente.",
          errors: error.errors
        });
      } else {
        res.status(500).json({
          msg: "Houve um erro no servidor ao registrar o usuário. Por favor, tente novamente mais tarde.",
        });
      }
    }
  }

  async deleteUser(req, res) {
    const id = req.params.id;

    // Verifica se o usuário logado é ADMIN
    if (req.user.user_type !== 'ADMIN') {
      return res.status(403).json({ msg: "Acesso negado. Apenas administradores podem deletar usuários." });
    }

    try {
      // Tenta encontrar e deletar o usuário pelo ID
      const deletedUser = await User.destroy({ where: { id } });

      if (!deletedUser) {
        return res.status(404).json({ msg: "Usuário não encontrado." });
      }

      res.status(200).json({ msg: "Usuário deletado com sucesso!" });
    } catch (error) {
      console.error("Erro ao deletar usuário:", error.message);
      res.status(500).json({ msg: "Erro no servidor ao deletar usuário." });
    }
  }

  async getUserById(req, res) {
    const id = req.params.id;

    // Verificar se o ID é um número válido (você pode ajustar se o ID for string ou outro tipo)
    if (isNaN(id)) {
      return res.status(422).json({ msg: "ID inválido." });
    }

    try {
      // Buscar o usuário pelo ID usando findByPk (Primary Key)
      const user = await User.findByPk(id, {
        attributes: { exclude: ['password'] }, // Excluindo a senha do retorno
      });

      if (!user) {
        return res.status(404).json({ msg: "Usuário não encontrado!" });
      }

      res.status(200).json({ user });
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      res.status(500).json({ msg: "Erro ao buscar usuário.", error: error.message });
    }
  }

  async logout(req, res) {
    res.status(200).json({ msg: "Usuário desconectado com sucesso!" });
  }

  async checkUserByEmail(req, res) {
    const { email } = req.params;
  
    if (!email) {
      return res.status(422).json({ msg: "Por favor, forneça o email." });
    }
  
    try {
      // Verificar se o usuário existe com o email fornecido
      const user = await User.findOne({
        where: { email: email }, // Condição para buscar o email
        attributes: { exclude: ['password'] }, // Excluir a senha do retorno
      });
  
      if (user) {
        return res.status(200).json({ msg: "Usuário encontrado!", user });
      } else {
        return res.status(404).json({ msg: "Usuário não encontrado!" });
      }
    } catch (error) {
      console.error("Erro ao verificar usuário pelo email:", error.message);
      res.status(500).json({ msg: "Erro no servidor ao verificar usuário." });
    }
  }

  async changePassword(req, res) {
    const { email, newPassword, confirmNewPassword } = req.body;
  
    // Validação dos campos obrigatórios
    if (!email || !newPassword || !confirmNewPassword) {
      return res
        .status(422)
        .json({ msg: "Por favor, forneça todos os campos obrigatórios." });
    }
  
    // Verifica se as senhas coincidem
    if (newPassword !== confirmNewPassword) {
      return res
        .status(422)
        .json({ msg: "As novas senhas precisam ser iguais." });
    }
  
    // Validação do formato da senha
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      return res.status(422).json({
        msg: "A nova senha deve conter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.",
      });
    }
  
    try {
      // Encontrar o usuário pelo email
      const user = await User.findOne({ where: { email } }); // Corrigido a consulta
  
      // Verifica se o usuário existe
      if (!user) {
        return res.status(404).json({ msg: "Usuário não encontrado." });
      }
  
      // Verifica se a nova senha é a mesma da atual
      const isSamePassword = await bcrypt.compare(newPassword, user.password);
      if (isSamePassword) {
        return res
          .status(422)
          .json({ msg: "A nova senha não pode ser igual à senha atual." });
      }
  
      // Criptografar a nova senha
      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(newPassword, salt);
  
      // Atualizar a senha do usuário
      user.password = passwordHash;
      await user.save();
  
      // Resposta de sucesso
      return res.status(200).json({ msg: "Senha alterada com sucesso!" });
    } catch (error) {
      console.error("Erro ao alterar senha:", error.message);
      return res.status(500).json({ msg: "Erro no servidor ao alterar senha." });
    }
  }
  
  
  async updateUser(req, res) {
    const id = req.params.id;
    const { name, email, password, confirmpassword, profile } = req.body;

    // Garantir que pelo menos um campo seja enviado
    if (!name && !email && !profile && !password) {
      return res.status(422).json({ msg: "Por favor, forneça pelo menos um campo para atualização." });
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      return res.status(422).json({ msg: "Formato de email inválido." });
    }

    // Validação de senha
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
      // Buscar o usuário no banco
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ msg: "Usuário não encontrado." });
      }

      // Verificar se o email foi alterado e se já existe outro usuário com o novo email
      if (email && email !== user.email) {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(422).json({ msg: "Email já está em uso por outro usuário." });
        }
      }

      // Montar o objeto de atualizações
      const updates = {};
      if (name) updates.name = name;
      if (email) updates.email = email;
      if (profile) updates.profile = profile;

      // Se a senha foi fornecida, criptografá-la e adicionar ao objeto de updates
      if (password) {
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);
        updates.password = passwordHash;
      }

      // Atualizar o usuário no banco de dados
      const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });

      // Retornar resposta de sucesso
      res.status(200).json({ msg: "Usuário atualizado com sucesso!", user: updatedUser });
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error.message);
      res.status(500).json({ msg: "Erro no servidor ao atualizar usuário." });
    }
  }
}

export const userController = new UserController();
export const uploadMiddleware = multer({ storage }).single("profile");
