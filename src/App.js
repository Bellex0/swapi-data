// import { useEffect, useState } from 'react';
import React from 'react';
import  Header from './components/Header';
import Table from './components/Table';
import Footer  from './components/Footer';
import './App.css';

const App = () => {  
  return (
    <div className="body">
      <Header/>
      <Table/>
      <Footer/>
    </div>
  );
}

export default App;
