import React, { Component } from 'react';
import { Container, Card, Button, Modal } from 'react-bootstrap';

export class MyPokemon extends Component {
  constructor(props) {
    super(props)

    this.state = {
      poke_my: [],
      modal_remove: false,
      index_remove: 0,
    }
  }

  componentDidMount() {
    if (localStorage.getItem('savedPokemon')) {
      let my_poke = JSON.parse(localStorage.getItem('savedPokemon'));
      this.setState({ poke_my: my_poke });
    }
  }

  showRemovePokemon = (value) => {
    this.setState({ 
      modal_remove : true,
      index_remove: value, 
    });
  }

  hideRemovePokemon = () => {
    this.setState({ modal_remove: false });
  }

  removePokemon = () => {
    let my_poke = this.state.poke_my;
    my_poke.splice(this.state.index_remove, 1);

    this.setState({ poke_my: my_poke });
    localStorage.setItem('savedPokemon', JSON.stringify(my_poke));

    this.setState({ modal_remove: false });
  }

  render() {
    return (
      <div className='mt-3'>
        <Container fluid>
          <h2 className='center-position'>My Pokemon</h2>

          {this.state.poke_my.length > 0 && this.state.poke_my.map((list, index) => (
            <Card style={{ width: '20rem' }} className='text-center center mt-3 mb-3' key={index}>
              <Card.Img variant="top" src={list.pict} />
              <Card.Body>
                <Card.Title>{list.name}</Card.Title>
                <Card.Text>
                  <Button variant="danger" size="sm" onClick={() => this.showRemovePokemon(index)}>
                    Remove Pokemon
                  </Button>

                  <Modal show={this.state.modal_remove} onHide={this.hideRemovePokemon}>
                    <Modal.Header closeButton>
                      <Modal.Title>Alert !!</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                      <p>Are you sure want to remove this pokemon??</p>
                    </Modal.Body>

                    <Modal.Footer>
                      <Button variant="secondary" onClick={() => this.hideRemovePokemon()}>Close</Button>
                      <Button variant="primary" onClick={() => this.removePokemon()}>Remove</Button>
                    </Modal.Footer>
                  </Modal>
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </Container>
      </div>
    )
  }
}

export default MyPokemon