import React from 'react';
import { Link } from 'gatsby';

import './layout.scss';

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location.pathname === rootPath;

  const header = (
    <div className="root-header">
      <h1>
        <Link to="/">{title}</Link>
      </h1>
    </div>
  );

  return (
    <div>
      {header}
      <main>{children}</main>
      <footer>
        ©
        {' '}
        {new Date().getFullYear()}
        , Built with
        {' '}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </div>
  );
};

export default Layout;
