import React from 'react'
import Logo from '../assets/logo.png'
import Button from '../components/Button'
export default function Header(){
    return(
        <section className='header'>
            <article className='article'>
                <h1>odecor clinic</h1>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores nisi voluptates, velit id beatae distinctio voluptatibus nulla repellat libero esse?</p>
                <Button 
                type="button"
                text="Book Now"
                />
            </article>
            <div className="sideContent">
                <img src={Logo} alt="Image Holder" />
            </div>
        </section>
    )   
}