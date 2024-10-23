import React from 'react';
import Card from './Card';
import './Column.css';

const Column = ({ title, tickets, users, grouping }) => {
  const getIcon = (type, value) => {
    const icons = {
      status: {
        backlog: '/assets/Backlog.svg',
        todo: '/assets/To-do.svg',
        'in progress': '/assets/in-progress.svg',
        done: '/assets/Done.svg',
        cancelled: '/assets/Cancelled.svg'
      },
      priority: {
        urgent: '/assets/SVG - Urgent Priority colour.svg',
        high: '/assets/Img - High Priority.svg',
        medium: '/assets/Img - Medium Priority.svg',
        low: '/assets/Img - Low Priority.svg',
        'no priority': '/assets/No-priority.svg'
      }
    };
    return icons[type][value.toLowerCase()] || icons[type].todo;
  };

  const user = grouping === 'user' ? users.find(u => u.name === title) : null;

  return (
    <div className="column">
      <div className="column-header">
        <div className="column-title">
          {grouping === 'user' && (
            <div className="user-avatar">
              <img 
                src={`https://ui-avatars.com/api/?name=${user?.name}&background=random`} 
                alt={user?.name}
              />
              <span className={`status-indicator ${user?.available ? 'available' : ''}`} />
            </div>
          )}
          {grouping === 'priority' && (
            <img src={getIcon('priority', title)} alt={title} className="priority-icon" />
          )}
          {grouping === 'status' && (
            <img src={getIcon('status', title)} alt={title} />
          )}
          <span>{title}</span>
          <span className="ticket-count">{tickets.length}</span>
        </div>
        <div className="column-actions">
          <button className="icon-button">
            <img src="/assets/add.svg" alt="Add" />
          </button>
          <button className="icon-button">
            <img src="/assets/3 dot menu.svg" alt="Menu" />
          </button>
        </div>
      </div>
      <div className="column-content">
        {tickets.map(ticket => (
          <Card 
            key={ticket.id}
            ticket={ticket}
            user={users.find(u => u.id === ticket.userId)}
            showUserAvatar={grouping !== 'user'}
            grouping={grouping}
          />
        ))}
      </div>
    </div>
  );
};

export default Column;
