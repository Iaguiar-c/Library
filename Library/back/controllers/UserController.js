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
  
    // Verifica se o email e senha foram fornecidos
    if (!email || !password) {
      return res
        .status(422)
        .json({ msg: "Por favor, forneça o email e a senha." });
    }
  
    try {
      // Procura o usuário pelo email
      const user = await User.findOne({ where: { email } });
  
      if (!user) {
        console.log("Usuário não encontrado para o email:", email);
        return res.status(401).json({ msg: "Credenciais inválidas." });
      }
  
      // Verifica se a senha fornecida corresponde ao hash armazenado
      const checkPassword = await bcrypt.compare(password, user.password);
  
      // Para depuração, mas REMOVA para produção
      console.log("Senha fornecida:", password);
      console.log("Hash armazenado:", user.password);
      console.log("Resultado da comparação:", checkPassword);
  
      if (!checkPassword) {
        return res.status(401).json({ msg: "Credenciais inválidas." });
      }
  
      // Verifica se a chave secreta do JWT está configurada
      const secret = process.env.SECRET;
      if (!secret) {
        return res.status(500).json({ msg: "Erro no servidor: segredo do JWT ausente." });
      }
  
      // Gera o token JWT
      const token = jwt.sign({ id: user.id }, secret);
  
      // Retorna o token e os dados do usuário
      return res.status(200).json({ msg: "Usuário autenticado!", token, user });
    } catch (error) {
      // Trata qualquer erro no processo
      console.error("Erro ao fazer login:", error.message);
      return res.status(500).json({ msg: "Erro no servidor ao fazer login." });
    }
  }
  
  
  async register(req, res) {
    const { name, email, user_type, password, confirmpassword, profile } = req.body;
  
    console.log('req', req.body);
  
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
  
    // Verificação de tipo de usuário válido
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
  
      return res.status(201).json({ msg: "Usuário registrado com sucesso!", user });
  
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
  
  async checkUserByEmail(req, res) {
    const { email } = req.params;

    if (!email) {
      return res.status(422).json({ msg: "Por favor, forneça o email." });
    }

    try {
      const user = await User.findOne({ email: email });

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

  async getUserById(req, res) {
    const id = req.params.id;

    try {
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
      const user = await User.findById(Id);
      if (!user) {
        return res.status(404).json({ msg: "Usuário não encontrado" });
      }

      res.status(200).json({ msg: "Usuário desconectado com sucesso!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Erro no servidor" });
    }
  }

  async updateUser(req, res) {
    const id = req.params.id;
    const { name, email, password, confirmpassword, profile } = req.body;

    if (!name && !email && !profile && !password) {
      return res
        .status(422)
        .json({ msg: "Por favor, forneça pelo menos um campo para atualização." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
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

      // if (email) {
      //   const existingUser = await User.findOne({ email });
      //   if (existingUser && existingUser._id.toString() !== id) {
      //     return res.status(422).json({ msg: "Email já está em uso por outro usuário." });
      //   }
      // }

      // const updates = {};
      // if (name) updates.name = name;
      // if (email) updates.email = email;
      // if (profile) updates.profile = profile;
      const existingUser = await User.findOne({ email });
      if (existingUser && existingUser._id.toString() !== id) {
        return res.status(422).json({ msg: "Email já está em uso por outro usuário." });
      }

      const updates = { name, email, profile };
      if (password) {
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);
        updates.password = passwordHash;
      }

      const updatedUser = await User.findByIdAndUpdate(id, updates);

      res.status(200).json({ msg: "Usuário atualizado com sucesso!", user: updatedUser });
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error.message);
      res.status(500).json({ msg: "Erro no servidor ao atualizar usuário." });
    }
  }

  async deleteUser(req, res) {
    const Id = req.params.id;

    try {
      const deletedUser = await User.findByIdAndDelete(Id);

      if (!deletedUser) {
        return res.status(404).json({ msg: "Usuário não encontrado." });
      }

      res.status(200).json({ msg: "Usuário deletado com sucesso!" });
    } catch (error) {
      console.error("Erro ao deletar usuário:", error.message);
      res.status(500).json({ msg: "Erro no servidor ao deletar usuário." });
    }
  }

  async changePassword(req, res) {
    const { email, newPassword, confirmNewPassword } = req.body;

    if (!email || !newPassword || !confirmNewPassword) {
      return res
        .status(422)
        .json({ msg: "Por favor, forneça todos os campos obrigatórios." });
    }

    if (newPassword !== confirmNewPassword) {
      return res
        .status(422)
        .json({ msg: "As novas senhas precisam ser iguais." });
    }

    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      return res.status(422).json({
        msg: "A nova senha deve conter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.",
      });
    }

    try {
      const user = await User.findOne({ email: email });

      if (!user) {
        return res.status(404).json({ msg: "Usuário não encontrado." });
      }

      const isSamePassword = await bcrypt.compare(newPassword, user.password);
      if (isSamePassword) {
        return res
          .status(422)
          .json({ msg: "A nova senha não pode ser igual à senha atual." });
      }

      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(newPassword, salt);

      user.password = passwordHash;
      await user.save();

      res.status(200).json({ msg: "Senha alterada com sucesso!" });
    } catch (error) {
      console.error("Erro ao alterar senha:", error.message);
      res.status(500).json({ msg: "Erro no servidor ao alterar senha." });
    }
  }
}

export const userController = new UserController();
export const uploadMiddleware = multer({ storage }).single("profile");
