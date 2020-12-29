import React, {
    useState,
    useEffect,
    useCallback
} from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { GetAllRepo } from '../services';
import GetRandomId from '../getRandomId';
import ErrorIndicator from '../errorIndicator';
import Spinner from '../spinner';

import styled from "styled-components";

const Table = styled.table `
    margin: 2rem auto;
    border: 2px solid transparent;
    border-image: linear-gradient(to right, red, purple);
    border-image-slice: 1;
`;

const Tr = styled.tr `
    margin: 1.5rem;
    display: ${(props) => (props.block ? "block" : "table")};
`;

const Td = styled.td `
    width: 200px;
    word-break: break-all;
    text-align: center;
    vertical-align: middle;
    font-weight: ${(props) => (props.name) ? "bold" : "regular"};
    font-size: ${(props) => (props.name) ? "20px" : "16px"};
`;
const Main = ({ history, match, valueSearch }) => {

    const [ result, setResult ] = useState('');
    const [ loading, toggleLoading ] = useState(true);
    const [ error, toggleError ] = useState(false);

    const { number } = match.params;
    const numberPage = number ? number : 1;

    const onError = () => {
        toggleLoading(false);
        toggleError(true);
    }

    useEffect(() => {
        GetAllRepo(valueSearch, numberPage)
            .then(results => {
                setResult(results);
                toggleLoading(false);
                toggleError(false);
            })
            .catch(() => onError())
    },[valueSearch, numberPage]);

    const renderList = (arr) => {
            const listRepo = arr.items.map((repo) => {
                const key = GetRandomId();
                return (
                    <Tr key={key}>
                        <Td>
                            <Link 
                                to={{ pathname: `/repositories/${repo.name}`, query: { full: `${repo.full_name}` } }}
                            >
                                {repo.name}
                            </Link>
                        </Td>
                        <Td>{repo.stargazers_count}</Td>
                        <Td>{repo.pushed_at}</Td>
                        <Td>
                            <a href={repo.html_url}>{repo.html_url}</a>
                        </Td>
                    </Tr>
                )
            })
            return listRepo;
    }

    const spinner = loading ? <Spinner /> : null;
    const errorIndicator = error ? <ErrorIndicator /> : null;
    const hasData = !(loading || error);
    const content = hasData ? renderList(result) : null;

    return (
        <Table>
            <tbody>
                {errorIndicator}
                {spinner}
                {content}
            </tbody>
        </Table>
    )
}

export default withRouter(Main);