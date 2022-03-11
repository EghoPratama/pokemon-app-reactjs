import React, { Component } from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import { API_URL } from '../utils/constants';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            poke_list: [],
            poke_offset: 0,
        }
    }

    componentDidMount() {
        axios
            .get(API_URL + `/pokemon?offset=${this.state.poke_offset}&limit=20`)
            .then(res => {
                this.setState({ poke_list: res.data.results });
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        return (
            <div className='mt-3'>
                <Container fluid>
                    <h2 className='center-position'>Pokemon List</h2>

                    <ListGroup className='mb-5'>
                        {this.state.poke_list && this.state.poke_list.map((list, index) => (
                            <Link to={`/detail-pokemon/${index+1}`} key={index} className="href-dark">
                                <ListGroup.Item className='position'>
                                    {index+1}. {list.name}
                                </ListGroup.Item>
                            </Link>
                        ))}
                    </ListGroup>
                </Container>
            </div>
        )
    }
}
