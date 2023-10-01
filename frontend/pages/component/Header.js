import React from 'react';
import stylesComponet from './stylesComponet/HeaderStyles.module.css';
import Link from 'next/link';

const Header = () => {
    return (
      <nav className={stylesComponet.navbar}>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
        </ul>
        <div className={stylesComponet.logo}>
          <h1> SPEED</h1>
        </div>
      </nav>
    );
};

export default Header;
