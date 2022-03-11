import React, { Component } from 'react';
import { Container, Card, Badge, Button, ProgressBar, Modal, Form, Toast } from 'react-bootstrap';
import { API_URL } from '../utils/constants';
import axios from 'axios';

export default class DetailPokemon extends Component {
    constructor(props) {
        super(props)

        this.state = {
            poke_detail: {},
            poke_ability: '',
            modal_show: false,
            modal_catch: false,
            is_catch: false,
            nick_name: '',
        }
    }

    componentDidMount() {
        axios
            .get(API_URL + `/pokemon/1`)
            .then(res => {
                this.setState({ poke_detail: res.data });
                if (!localStorage.getItem('isCatch')) {
                    localStorage.setItem('isCatch', 'not catch');
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    showPokeAbility = (value) => {
        this.setState({ modal_show: true });
        axios
            .get(value)
            .then(res => {
                for (let i = 0; i < res.data.effect_entries.length; i++) {
                    let data = res.data.effect_entries;
                    if (data[i].language.name === 'en') (
                        this.setState({ poke_ability: data[i].effect })
                    )
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    closePokeAbility = () => {
        this.setState({
            modal_show: false,
            poke_ability: '',
        })
    }

    showPokeCatch = () => {
        this.setState({ modal_catch: true });

        let isCatch = localStorage.getItem('isCatch');
        if (isCatch === 'not catch') {
            this.setState({ is_catch: false });
            localStorage.setItem('isCatch', 'catch');
        } else if (isCatch === 'catch') {
            this.setState({ is_catch: true });
            localStorage.setItem('isCatch', 'not catch');
        }
    }

    closePokeCatch = () => {
        this.setState({ modal_catch: false });
    }

    catchPokemon = () => {
        let arr_pokemon = localStorage.getItem('savedPokemon') ? JSON.parse(localStorage.getItem('savedPokemon')) : [];
        arr_pokemon.push({
            name: this.state.nick_name,
            pict: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
        });

        localStorage.setItem('savedPokemon', JSON.stringify(arr_pokemon));

        this.setState({ modal_catch: false });
    }

    render() {
        return (
            <div className='mt-3'>
                <Container fluid>
                    <h2 className='center-position'>Detail Pokemon</h2>

                    <Card style={{ width: '20rem' }} className='text-center center'>
                        <Card.Img variant="top" src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png" />
                        <Card.Body>
                            <Card.Title>{this.state.poke_detail.name} #001</Card.Title>
                        </Card.Body>
                    </Card>

                    <Card style={{ width: '20rem' }} className='text-dark center mt-3 mb-3' bg='light'>
                        <Card.Header className='text-center'>Description</Card.Header>
                        <Card.Body>
                            <Card.Title>Height</Card.Title>
                            <Card.Text>{this.state.poke_detail.height}</Card.Text>

                            <Card.Title>Weight</Card.Title>
                            <Card.Text>{this.state.poke_detail.weight}</Card.Text>

                            <Card.Title>Types</Card.Title>
                            <Card.Text>
                                {this.state.poke_detail && this.state.poke_detail.types && this.state.poke_detail.types.map((list, index) => (
                                    <Badge pill bg={index % 0 ? 'success' : 'secondary'} key={index} className='mx-1'>
                                        {list.type.name}
                                    </Badge>
                                ))}
                            </Card.Text>

                            <Card.Title>Abilities</Card.Title>
                            <Card.Text>
                                {this.state.poke_detail && this.state.poke_detail.abilities && this.state.poke_detail.abilities.map((list, index) => (
                                    <Button variant="secondary" size="sm" key={index} className='mx-1' onClick={() => this.showPokeAbility(list.ability.url)}>
                                        {list.ability.name}
                                    </Button>
                                ))}

                                <Toast show={this.state.modal_show} onClose={this.closePokeAbility}>
                                    <Toast.Header>
                                        <strong className="me-auto">Ability Info</strong>
                                    </Toast.Header>
                                    <Toast.Body>{this.state.poke_ability}</Toast.Body>
                                </Toast>
                            </Card.Text>
                        </Card.Body>
                    </Card>

                    <Card style={{ width: '20rem' }} className='text-dark center mt-3 mb-3' bg='light'>
                        <Card.Header className='text-center'>Stats</Card.Header>
                        <Card.Body>
                            {this.state.poke_detail && this.state.poke_detail.stats && this.state.poke_detail.stats.map((list, index) => (
                                <ProgressBar now={list.base_stat} label={`${list.stat.name} (${list.base_stat}%)`} key={index} className='my-1' animated />
                            ))}
                        </Card.Body>
                    </Card>

                    <div className='center'>
                        <Button variant="success" size="md" className='mt-3 mb-3' onClick={() => this.showPokeCatch()}>
                            Catch Pokemon
                        </Button>

                        <Modal show={this.state.modal_catch} onHide={this.closePokeCatch}>
                            <Modal.Header closeButton>
                                <Modal.Title>Catch Pokemon</Modal.Title>
                                <Modal.Body>
                                    <p>{this.state.is_catch ? 'Yeaaah, you got the pokemon!!' : 'Ooopps, try again next time'}</p>

                                    {this.state.is_catch
                                        ? <Form.Group>
                                            <Form.Control
                                                as="textarea"
                                                rows="3"
                                                placeholder="Pokemon New Nickname"
                                                value={this.state.nick_name}
                                                onChange={e => this.setState({ nick_name: e.target.value })}
                                                type="text"
                                            />
                                            <Button
                                                variant="outline-success"
                                                size='sm'
                                                className='mt-2 mb-2'
                                                onClick={() => this.catchPokemon()}
                                            >
                                                Add Nick Name
                                            </Button>
                                        </Form.Group>
                                        : ''
                                    }
                                </Modal.Body>
                            </Modal.Header>
                        </Modal>
                    </div>
                </Container>
            </div>
        )
    }
}