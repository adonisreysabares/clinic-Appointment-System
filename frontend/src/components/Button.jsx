import React from 'react'
import './Component.css'
export default function Button(props){
    return <button className='button' type={props.type}>{props.text}</button>
}