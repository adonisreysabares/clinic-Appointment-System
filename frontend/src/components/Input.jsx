import React from 'react'
import './Component.css'
export default function Input(props){
    return (
            <>
            <label htmlFor="">{props.label}</label>
            <input 
                name = {props.name}
                type={props.text}
                onChange={props.onChange}
                value = {props.value}
                placeholder= {props.placeholder}
                required
            />
            </>
        )
}