const path = require('path');
const express = require('express');
const fs = require('fs/promises');
const app = express();
const router = express.Router();
const {v4: uuidv4} = require('uuid');

const createUser = async (req, res) => {
  try {
    const {name, password} = req.body;

    if (!name || !password) {
      return res.status(400).send({
        ok: false,
        message: 'Data is not enough'
      })
    }

    const users = JSON.parse(await fs.readFile(path.join(__dirname, '..', 'db', 'db.json'), {encoding: "utf-8"}))

    users.forEach((user) => {
      if (name === user.name && password === user.password) {
        return res.status(400).send({
          ok: false,
          message: 'User already exists!'
        })
      }
    })
    users.push({
      uid: uuidv4(),
      name,
      password,
      date: new Date().toLocaleString()
    })
    await fs.writeFile(path.join(__dirname, '../', 'db', 'db.json'), JSON.stringify(users, null, 2))
    return res.status(200).send({
      ok: true,
      message: 'User signed up successfully'
    })
  } catch (e) {
    console.log(e)
  }
}


const checkUser = async (req, res) => {
  const {name, password} = req.body

  if (!name || !password) {
    return res.status(400).send({
      ok: false,
      message: 'Invalid data'
    })
  }
  const users = JSON.parse(await fs.readFile(path.join(__dirname, '..', 'db', 'db.json'), {encoding: "utf-8"}))
  const userNameChecker = users.filter(user => user.name === name);
  const userPasswordChecker = users.filter(user => user.password === password);
  const userCheckerGeneral = users.filter(user => user.name === name && user.password === password)
  console.log(userCheckerGeneral)
  if (!userNameChecker.length && userPasswordChecker.length) {
    return res.status(400).send({
      ok:false,
      message:"User's name is incorrect!"
    })
  }
  if (userNameChecker.length && !userPasswordChecker.length) {
    return res.status(400).send({
      ok:false,
      message:"User's password is incorrect!"
    })
  }


  if (userCheckerGeneral.length) {
    return res.status(200).send({
      ok: true,
      message: 'User exists!'
    })
  }
  return res.status(400).send({
    ok: false,
    message: "That user doesn't exist!"
  })
}


module.exports = {
  createUser: createUser,
  checkUser: checkUser
}