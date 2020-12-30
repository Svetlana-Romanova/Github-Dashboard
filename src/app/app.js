import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import SearchHeader from '../searchHeader';
import { Main, Card } from '../pages';
import Pagination from '../pagination';

const App = () => {
  const [valueSearch, setValueSearch] = useState('stars:>=0');
  const [savedValue, setSaveValue] = useState('');
  const [totalCount, setTotalCount] = useState('');

  const changeValueSearch = useCallback((value) => {
    setValueSearch(value);
    setSaveValue(value);
  }, []);

  const changeTotalCount = useCallback((count, perPage) => {
    setTotalCount([count, perPage]);
  }, []);

  return (
    <Router>
      <Route path="/page/:number?" render={() => <SearchHeader savedValue={savedValue} onSetValueSearch={changeValueSearch} />} exact />
      <Switch>
        <Route path="/page/:number?" render={() => <Main valueSearch={valueSearch} onChangeTotalCount={changeTotalCount} />} />
        <Route
          path="/repositories/:name"
          exact
          render={({ location }) => {
            const { full } = location.query;
            return <Card itemName={full} />;
          }}
        />
        <Redirect to="/page" />
      </Switch>
      <Route path="/page/:number?" render={() => <Pagination totalCount={totalCount} />} exact />
    </Router>
  );
};

export default App;
