import React, { FC } from 'react';
import { Link } from 'react-router-dom';


const Navbar: FC = () => {
  return (
    <nav>
      <Link to="/">POKESKETCH</Link>
    </nav>
  );
};

export default Navbar;
