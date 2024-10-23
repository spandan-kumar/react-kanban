import React from 'react';
import Column from './Column';
import './Board.css';

const Board = ({ tickets, users, grouping, sorting }) => {
  const getPriorityLabel = (priority) => {
    const labels = ["No priority", "Low", "Medium", "High", "Urgent"];
    return labels[priority] || "No priority";
  };

  const groupTickets = () => {
    let grouped = {};

    switch(grouping) {
      case 'status':
        // Ensure all possible statuses are included
        const allStatuses = ['Backlog', 'Todo', 'In progress', 'Done', 'Cancelled'];
        allStatuses.forEach(status => {
          grouped[status] = tickets.filter(ticket => 
            ticket.status.toLowerCase() === status.toLowerCase()
          );
        });
        break;

      case 'user':
        users.forEach(user => {
          grouped[user.name] = tickets.filter(ticket => 
            ticket.userId === user.id
          );
        });
        break;

      case 'priority':
        [0, 1, 2, 3, 4].forEach(priority => {
          grouped[getPriorityLabel(priority)] = tickets.filter(ticket => 
            ticket.priority === priority
          );
        });
        break;

      default:
        break;
    }

    // Sort tickets within each group
    Object.keys(grouped).forEach(key => {
      grouped[key].sort((a, b) => {
        if (sorting === 'priority') {
          return b.priority - a.priority;
        } else {
          return a.title.localeCompare(b.title);
        }
      });
    });

    return grouped;
  };

  const groupedTickets = groupTickets();

  return (
    <div className="board">
      {Object.entries(groupedTickets).map(([groupName, tickets]) => (
        <Column 
          key={groupName} 
          title={groupName} 
          tickets={tickets}
          users={users}
          grouping={grouping}
        />
      ))}
    </div>
  );
};

export default Board;
