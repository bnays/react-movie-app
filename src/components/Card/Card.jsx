import React from 'react'
import { Row, Col } from 'antd';
import './Card.css';

function Card(props) {
    const data = props.data;

    return (
        <div className="Card">
            {data &&
                <div>
                    <Row>
                        <Col flex={2}>
                            <img className="poster" src={data.Poster} alt="" />
                        </Col>
                        <Col flex={3}>
                            <h1>{data.Title}</h1>
                            <h3><label>Cast:</label> {data.Actors}</h3>
                            <ul>
                                <li>Title: <div className="li_data">{data.Title}</div></li>
                                <li>Year: <div className="li_data">{data.Year}</div></li>
                                <li>Runtime: <div className="li_data">{data.Runtime}</div></li>
                                <li>Plot: <div className="li_data">{data.Plot}</div></li>
                            </ul>
                        </Col>
                    </Row>
                </div>
                }
        </div>
    )
}

export default Card
