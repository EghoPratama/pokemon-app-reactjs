import React from 'react';
import { ListGroup } from 'react-bootstrap';

const ListMenu = ({ menu }) => {
    return (
        <ListGroup as="ol" numbered>
            <ListGroup.Item as="li">Cras justo odio</ListGroup.Item>
        </ListGroup>
    )
}

export default ListMenu