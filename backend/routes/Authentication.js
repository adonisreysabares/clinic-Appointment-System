import express from 'express'
import bcrypt from 'bcrypt'
import pool from '../database/db.js'

const loginRouter = express.Router()

loginRouter.post('/login', async(req,res)=>{
    const { email , password, isChecked } = req.body
    const userQuery = `SELECT username,password_hash, role FROM users WHERE username = $1`
    const userCredentials = `SELECT users.username, doctors.firstName, doctors.middleName, doctors.lastName
                                FROM doctors
                                JOIN users
                                ON users.user_id = doctors.user_id
                                WHERE users.username = $1
                                `
    const valueData = [email]

    try {
        const response = await pool.query(userQuery,valueData)
        const user = response.rows[0]
        if(user){
            const passwordValidation = await bcrypt.compare(password, user.password_hash)
            if(passwordValidation == 0){
                req.session.userId = user
                req.session.user = user.username
                req.session.role = user.role
                switch(req.session.role){
                    case 'doctor':
                        const result = await pool.query(userCredentials, valueData)
                        const userData = result.rows[0]
                        console.log(userData)
                        if(userData){
                            req.session.data = userData
                            return res.status(200).json({
                                isLogin: true,
                                message: 'Login Success', 
                                data: req.session.data,
                                role: req.session.role
                            })
                        }else{
                            res.json({
                                message:'An error occured'
                            })
                        }
                    break
                    case 'admin':
                        res.status(200).json({
                            isLogin: true,
                            message: 'Login Success',
                            data: req.session.user,
                            role: req.session.role
                        })
                    break
                    case 'user':
                        res.status(200).json({
                            isLogin: true,
                            message: 'Login Success',
                            data: req.session.user,
                            role: req.session.role
                        })
                    default:
                        res.status(400).json({
                            isLogin: false,
                            message: 'login Unsucessful'
                        })
                }
            }
        }else{
            res.status(403).json({
                message: "Invalid Credentials"
            })
        }
        
    } catch (error) {
        console.error(error.stack)
        res.status(500).json({
            message: 'An Internal Error occured',
            error: error.message
        })
    }
})

loginRouter.post('/register', async(req,res)=>{
    const {email, password, role,firstName, middleName,lastName } = req.body
    const checkedEmail = `SELECT username FROM users WHERE username = $1`
    const registerUser = `INSERT INTO users (username, password_hash, role) VALUES ($1, $2, $3) RETURNING user_id, role`
    const emailValue = [email]

    try {
        const emailValidation = await pool.query(checkedEmail, emailValue)
        if(emailValidation.rows[0] == null){
            const hashedPassword= await bcrypt.hash(password,10)
            const valueInsert = [email,hashedPassword,role]
            const registerData = await pool.query(registerUser,valueInsert)
            const registerId = registerData.rows[0]
            switch(registerId.role){
                case 'doctor':
                    const doctorDate = `INSERT INTO doctors(user_id, firstName, middleName, lastName) VALUES ($1, $2, $3, $4)`;
                    const doctorValue = [registerId.user_id, firstName, middleName, lastName]
                    const registerData = await pool.query(doctorDate, doctorValue)
                    console.log('Doctor registered successfully!')
                    res.status(201).json({ message: 'Doctor registered successfully!' })
                break
                case 'admin':
                    res.status(201).json({
                        message:'Admin registerd successfully'
                    })
                break
                case 'patient':
                    res.status(201).json({
                        message:'Patient registerd successfully'
                    })
                break
                default:
                    res.status(400).json({
                        message: "No data be inserterd"
                    })
            }
        }else{
            res.status(400).json({
                message: 'Email already exists'
            })
        }
        
    } catch (error) {
        console.log(error.stack)
        res.status(500).json({
            message: 'An Internal Error occured',
            error: error.message
        })
    }
})

loginRouter.get('/protected', (req,res)=>{
    if(req.session.userId){
        res.status(200).json({
            message: 'You are logged in',
        })
    }else{
        res.status(401).json({
            message: ' Unauthorized'
        })
    }
})

loginRouter.post('/logout', (req,res)=>{
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ success: false });
        }
        res.clearCookie('connect.sid');
        res.json({ success: true });
    });
})

export default loginRouter