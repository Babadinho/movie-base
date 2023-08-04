import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <section className="footer">
      <div className="footer__wrapper">
        <p>MovieBase © 2023. All Rights Reserved</p>
        <span>
          Built by <Link href="https://github.com/Babadinho">Babadinho</Link>
        </span>
      </div>
    </section>
  );
};

export default Footer;
