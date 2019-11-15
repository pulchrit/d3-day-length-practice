import React from 'react';
import './Header.css';

const Header = () => {
    return (
    <header role="banner">

    <h1>Day Length Visualization</h1>

    <p>A static visualization based on the {' '}
        <a href="http://www.recursion.org/d3-for-mere-mortals/">example by Luke Francl</a>
        {' '} but refactored using D3 v5 and React Hooks.
    </p>

    </header>
    )
}

export default Header;