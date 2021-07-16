import React from 'react';
import {  Select, Spin, Row, Col } from 'antd';
import debounce from 'lodash/debounce';
import './Searchbox.css';
import logo from '../../images/logo.png';

function DebounceSelect({ fetchOptions, debounceTimeout = 800, ...props }) {
  const [fetching, setFetching] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const fetchRef = React.useRef(0);
  const debounceFetcher = React.useMemo(() => {
    const loadOptions = (value) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);
      fetchOptions(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }

        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);
  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
      options={options}
    />
  );
} // Usage of DebounceSelect

async function fetchMovieList(moviename) {
  console.log('fetching movie', moviename);
  return fetch(`https://www.omdbapi.com/?s=${moviename}&apikey=7018f1f5`)
    .then((response) => response.json())
    .then((body) => {
    return body.Search !== undefined && body.Search.map((movie) => ({
        label: `${movie.Title}`,
        value: `${movie.imdbID}`,
      }))}
    );
}

function Searchbox(props) {
    const fetchMovie = props.fetchMovie;
    const [value, setValue] = React.useState([]);

    return (
        <Row className="searchbox__header">
            <Col flex={1}>
                <img src={logo} width="50px" className="logo" alt="The Movie Database" />
            </Col>
            <Col flex={3}>
                <DebounceSelect
                className="searchbox"
                showSearch
                value={value}
                placeholder="Enter Movie Name"
                fetchOptions={fetchMovieList}
                onChange={(newValue) => {
                    setValue(newValue);
                    fetchMovie(newValue.value);
                }}
                style={{
                    width: '100%',
                }}
                />
            </Col>
        </Row>
    );
};


export default Searchbox
