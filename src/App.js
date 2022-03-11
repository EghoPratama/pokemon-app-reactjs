import React, { Component } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { NavbarComponent } from './components';
import { Home, MyPokemon, DetailPokemon, OtherDetailPokemon } from './pages'
import './App.css';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <NavbarComponent />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path='/my-pokemon' element={<MyPokemon />} />
          <Route exact path='/detail-pokemon/:id' element={<DetailPokemon />} />
          <Route exact path='/other-detail-pokemon/:id' element={<OtherDetailPokemon />} />
        </Routes>
      </BrowserRouter>
    )
  }
}
