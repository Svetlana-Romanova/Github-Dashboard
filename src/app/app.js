import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import SearchHeader from '../searchHeader';
import { Main, Card } from '../pages';
import Pagination from '../pagination';

const App = () => {

    const [ valueSearch, setValueSearch ] = useState('stars:>=0');
    const [ savedValue, setSaveValue ] = useState('');

    const onChangeValueSearch = (value) => {
        setValueSearch(value);
        setSaveValue(value)
    }

    return (
        <Router>
            <Route path="/page/:number?" render={() => <SearchHeader savedValue={savedValue} setValueSearch={onChangeValueSearch} />} exact />
            <Switch>
                <Route path="/page/:number?" render={() => <Main valueSearch={valueSearch} />} />
                <Route path="/repositories/:name" exact render={({ location, history }) => {
                    const { full } = location.query;
                    return <Card itemName={full} />
                }} />
                <Redirect to="/page" />
            </Switch>
            <Route path="/page/:number?" render={() => <Pagination />} exact />
        </Router>
    )
}

export default App;