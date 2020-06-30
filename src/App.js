import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import SearchParams from './SearchParams';
import { Router, Link } from '@reach/router';
import Details from './Detials';
import ThemeContext from './ThemeContext';

const App = () => {
  const themeHook = useState('darkblue');

  return (
    <React.StrictMode>
      <ThemeContext.Provider
        // @ts-ignore
        value={themeHook}
      >
        <div>
          <header>
            <Link to="/">Adopt Me!</Link>
          </header>
          <Router>
            <SearchParams
              // @ts-ignore
              path="/"
            />
            <Details path="/details/:id" />
          </Router>
        </div>
      </ThemeContext.Provider>
    </React.StrictMode>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
