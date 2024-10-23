import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Board from './components/Board';

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState(localStorage.getItem('grouping') || 'status');
  const [sorting, setSorting] = useState(localStorage.getItem('sorting') || 'priority');

  useEffect(() => {
    fetchData();
    loadUserPreferences();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
      const data = await response.json();
      setTickets(data.tickets);
      setUsers(data.users);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const loadUserPreferences = () => {
    const savedGrouping = localStorage.getItem('grouping');
    const savedSorting = localStorage.getItem('sorting');
    if (savedGrouping) setGrouping(savedGrouping);
    if (savedSorting) setSorting(savedSorting);
  };

  const handleGroupingChange = useCallback((newGrouping) => {
    setGrouping(newGrouping);
    localStorage.setItem('grouping', newGrouping);
  }, []);

  const handleSortingChange = useCallback((newSorting) => {
    setSorting(newSorting);
    localStorage.setItem('sorting', newSorting);
  }, []);

  return (
    <div className="app">
      <Navbar 
        grouping={grouping}
        sorting={sorting}
        onGroupingChange={handleGroupingChange}
        onSortingChange={handleSortingChange}
      />
      <Board 
        tickets={tickets}
        users={users}
        grouping={grouping}
        sorting={sorting}
      />
      <footer className="footer">
        Made with <span role="img" aria-label="heart">❤️</span> by Spandan
      </footer>
    </div>
  );
};

export default App;
