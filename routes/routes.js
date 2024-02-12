const path = require('path');
const express = require('express');
const fs = require('fs/promises');
const app = express();
const {v4: uuidv4} = require('uuid');
const rootDir = require('../utils/path')

const createUser = async (req, res) => {
  try {
      const { name, password } = req.body;

      if (!name || !password) {
        return res.status(400).send( {
          ok:false,
          message: 'Invalid data'
        })
      }

      const users = JSON.parse(await fs.readFile(path.join(rootDir, 'db', 'db.json'), {encoding: 'utf-8'}));

      users.forEach((user) => {

      if (user.name === name && user.password === password) {
           return res.status(400).send({
             ok:false,
             message:"User already exists"
           })
         }
      })

      users.push({
        uuid:uuidv4(),
        name,
        password
      })

      await fs.writeFile(path.join(rootDir, 'db', 'db.json'), JSON.stringify(users,null, 2));


      return res.status(200).send({
        ok:true,
        message:'User registered succesfully'
      })

  }catch (e) {
    console.log(e)
  }
}

let body;

const checkUser = async (req, res) => {
   try {
         const { name, password } = req.body;

        const users = JSON.parse( await fs.readFile(path.join(rootDir, 'db', 'db.json'), {encoding:'utf-8'}))
        const userNameChecker = users.filter(user => user.name === name);
        const userPasswordChecker = users.filter(user => user.password === password);
        const userCheckerGeneral = users.filter(user => user.name === name && user.password === password)

              if (userNameChecker.length && !userPasswordChecker.length) {
                  return res.status(400).send({
                      isCorrectName: true,
                      isCorrectPassword: false,
                      message:'Password is invalid'
                  })
              }

              if (!userNameChecker.length && userPasswordChecker.length) {
                  return res.status(400).send({
                      isCorrectPassword: true,
                      isCorrectName: false,
                      message:'Username is invalid'
                  })
              }


            if (userCheckerGeneral.length) {

                userCheckerGeneral.forEach((filteredUser) => {
                    body = {
                        name:filteredUser.name,
                        password:filteredUser.password
                    }
                })

                return res.status(200).send({
                    ok: true,
                    message:'User logged successfully',
                    body:body
                })

            }else {
                return res.status(400).send({
                    ok: false,
                    message:"User didn't register"
                })
            }

   }catch(e) {
     console.log(e)
   }
}

const renderData = async (req, res) => {
    try {
        res.status(200).send({
            ok:true,
            message:'For rendering',
            body
        })
    }catch (e) {
        console.log(e)
    }
}

module.exports = {
  createUser:createUser,
  checkUser:checkUser,
  renderData:renderData
}