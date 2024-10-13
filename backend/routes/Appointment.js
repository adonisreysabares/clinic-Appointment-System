import express from 'express'
import pool from '../database/db.js'

const router = express.Router()

router.get('/list', async (req, res) => {
    const query = `
        SELECT 
            p.patient_id, 
            p.first_name, 
            p.last_name, 
            p.email, 
            a.appointment_time, 
            a.status 
        FROM 
            patients p 
        JOIN 
            appointments a 
        ON 
            p.patient_id = a.patient_id;
    `;

    try {
        const result = await pool.query(query);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error.stack);
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
});


router.post('/post', async(req,res)=>{
    const {firstName, lastName, email, phone, dob, medical_history, appointment, status} = req.body

    const insertData = `INSERT INTO patients(first_name,last_name,email,phone,dob,medical_history) VALUES($1,$2,$3,$4,$5,$6) RETURNING patient_id`
    const insertAppointment = `INSERT INTO appointments(patient_id, appointment_time,status) VALUES($1,$2,$3)`

    const patientData = [firstName,lastName,email,phone,dob,medical_history]

    try {
        const result = await pool.query(insertData,patientData)
        if(result.rows.length > 0){
            const patientId = result.rows[0].patient_id
            const appointmentData = [patientId,appointment,status]
            const appointmentResult = await pool.query(insertAppointment,appointmentData)
            res.status(200).json({
                message: 'Data inserted successfully',
            })
        }else{
            res.status(400).json({
                message: 'Failed to insert data'
            })
        }
    } catch (error) {
        console.error(error.stack)
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        })
    }
})

router.put('/update/:id', async(req,res)=>{
    const { id } = req.params
    const { status } = req.body
    const updateData = `UPDATE appointments SET status = $1 WHERE patient_id = $2`
    const updateValue = [status,id]

    try {
        const response = await pool.query(updateData,updateValue)
        if(response.rowCount > 0){
            res.status(200).json({
                message: 'Data updated successfully',
                })
        }
        else{
            res.status(400).json({
                message: 'Data not updated'
            })
        }
    } catch (error) {
        console.error(error.stack)
        res.status(500).json({
            message:'Internal Server Error ',
            error: error.message
        })
    }
})

router.delete('/delete/:id', async(req,res)=>{
    const { id } = req.params
    const deleteData = `DELETE FROM appointments WHERE patient_id = $1`
    const deleteValue = [id]
    try {
        const response = await pool.query(deleteData,deleteValue)
        if(response.rowCount > 0){
            res.status(200).json({
                message: 'Data deleted successfully',
            })
        }
        else{
            res.status(400).json({
                message: 'No data has been delete'
            })
        }
        
    } catch (error) {
        console.error(error.stack)
        res.status(500).json({
            message:'Internal Server Error ',
            error: error.message
        })
    }
})


export default router