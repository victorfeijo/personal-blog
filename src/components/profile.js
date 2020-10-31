import React from 'react';
import { Link } from 'gatsby';
import * as R from 'ramda';

import Card from './card';

import './profile.scss';

const CodeBlock = ({ children }) => (
  <div className="code__block">{children}</div>
);

const CodeObject = ({ object }) => {
  const keys = R.keys(object);

  return (
    <>
      <span className="code__tag">{'{'}</span>
      <CodeBlock>
        {keys.map((key) => (
          <CodeLine
            attr={key}
            value={object[key]}
            isLast={key === R.last(keys)}
          />
        ))}
      </CodeBlock>
      <span className="code__tag">{'}'}</span>
    </>
  );
};

const CodeLine = ({ attr, value, isLast = false }) => {
  let codeValue = (<span className="code__value">{value}</span>);

  if (R.is(Object, value)) {
    codeValue = <CodeObject object={value} />;
  }

  if (R.is(String, value)) {
    codeValue = (
      <span>
        "
        {codeValue}
        "
      </span>
    );
  }

  return (
    <p className="code__line">
      "
      <span className="code__attr">{attr}</span>
      ":
      {' '}
      {codeValue}
      {isLast ? '' : ','}
    </p>
  );
};

const Code = ({ data }) => (
  <pre className="code">
    <CodeObject object={data} />
  </pre>
);

const Profile = ({ title, isRootPath }) => {
  const data = {
    name: 'Victor Feijo',
    email: 'victor.feijoa@gmail.com',
    created_at: 166317361,
    status: 'Married 💍',
    location: 'Shenzhen, China 🇨🇳',
    company: {
      name: 'Crypto.com',
      project: 'Crypto Pay',
    },
  };

  return (
    <div className="profile">
      <div className="container">
        <Card>
          <Card.Body>
            <div className="row">
              <div className="col-12 col-md-5">
                <h1>
                  <Link to="/">{title}</Link>
                </h1>
              </div>
              <div className="col-12 col-md-7">
                <Code data={data} />
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
