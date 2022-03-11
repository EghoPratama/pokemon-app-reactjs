import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { API_URL } from "../utils/constants";
import { Container } from "react-bootstrap";

function DetailPokemon() {
    const params = useParams();
    const [poke_detail, setPokeDetail] = useState({});

    useEffect(() => {
        const fetchDetail = async () => {
            const res = await fetch(API_URL + `/pokemon/${params.id}`)
            const data = await res.json();

            setPokeDetail(data);
        }

        fetchDetail()
    })

    return (
        <div className="mt-3">
            <Container fluid>
                <h2 className='center-position'>{poke_detail.name}</h2>
            </Container>
        </div>
    )
}

export default DetailPokemon