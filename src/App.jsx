import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import './App.css';
import Searchbox from './components/Searchbox/Searchbox';
import Card from './components/Card/Card';
import { Layout } from 'antd';

const { Header, Content } = Layout;

function App() {

  const [data, setData] = useState([]);

  useEffect(() => {
    let movieId = 'tt0816692';
    fetchData(movieId);
  }, []);

  function fetchData(imdbId) {
    fetch(`https://www.omdbapi.com/?i=${imdbId}&apikey=7018f1f5`).then((res) => res.json()).then((data) => {
      setData(data);
    });
  }

  return (
    <div className="App" id="outer-container">
      <div className="container">
        <Layout>
          <Header>
            <Searchbox fetchMovie={fetchData}/>
          </Header>
          <Content>
            <Card data={data}/>
          </Content>
        </Layout>
      </div>
    </div>
  );
}

export default App;
