import React, { useEffect, useState } from 'react'

export default function SideNav({ img, items, name }) {
    return (
        <nav className="sideNav">
            <div className="img-container">
                <img src={img} alt="Profile" className="profile-img" />
                <p className="profile-name">{name}</p>
            </div>
            <ul className="nav-items">
                {items.map(item => (
                    <li key={item} className="nav-item">
                        {item}
                    </li>
                ))}
            </ul>
        </nav>
    );
}
