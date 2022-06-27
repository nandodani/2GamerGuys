const Users = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sequelize = require("../config/database");



const controllers = {};

sequelize
  .sync()
  .then(() => {
    console.log("Ligação efetuada: user");
  })
  .catch((error) => {
    console.log("Ocorreu um erro ao ligar à base de dados.");
  });

controllers.getAll = async (req, res) => {
  try {
    const users = await user.findAll({
      attributes: ["id", "username", "name", "lastname", "email"],
    });
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

controllers.getUsers = async(req, res) => {
    try {
        const users = await Users.findAll({
            attributes: ["id", "username", "name", "lastname", "email"]
        });
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}


controllers.Register = async(req, res) => {
    const { username, name, lastname, email, password, confPassword } = req.body;
    if(password !== confPassword) return res.status(400).json({msg: "As passwords não coincidem. Tenta novamente."});
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await Users.create({
            username: username,
            name: name,
            lastname: lastname,
            email: email,
            password: hashPassword
        });        
        res.json({msg: "Registado com sucesso!"});
    } catch (error) {
        console.log(error);
    }
}


controllers.Login = async(req, res) => {
    try {
        const user = await Users.findAll({
            where:{
                email: req.body.email
            }
        });
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match) return res.status(400).json({msg: "Password errada!"});
        const id = user[0].id;
        const username = user[0].username;
        const name = user[0].name;
        const lastname = user[0].lastname;
        const email = user[0].email;
        const accessToken = jwt.sign({id, username, name, lastname, email}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '15s'
        });
        const refreshToken = jwt.sign({id, username, name, lastname, email}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '1d'
        });
        await Users.update({refresh_token: refreshToken},{
            where:{
                id: id
            }
        });
        res.cookie('refreshToken', refreshToken,{
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json( id );
      } catch (error) {
        res.status(404).json({msg:"O email não existe!"});
    }
}


controllers.Logout = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const user = await Users.findAll({
        where:{
            refresh_token: refreshToken
        }
    });
    if(!user[0]) return res.sendStatus(204);
    const id = user[0].id;
    await Users.update({refresh_token: null},{
        where:{
            id: id
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}

controllers.user_update = async (req, res) => {
    const { id } = req.params;
    const { name, lastname, username, email, password } = req.body;
  
    const dados = await Users.update(
      {
        name: name,
        lastname: lastname,
        username: username,
        email: email,
        password: password

      },
      {
        where: { id: id },
      }
    )
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return error;
      });
    res.json({ success: true, data: dados, message: "Atualizado com sucesso" });
  };


  controllers.user_delete = async (req, res) => {
    const { id } = req.params;
    const dados = await Users.destroy({ where: { id: id } })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return error;
      });
  
    res.json({
      success: true,
      deleted: dados,
      message: "Eliminado com sucesso.",
    });
  };
module.exports = controllers;