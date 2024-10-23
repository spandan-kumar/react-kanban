import React from 'react';
import './Card.css';

const Card = ({ ticket, user, showUserAvatar, grouping }) => {
  const getPriorityIcon = (priority) => {
    switch(priority) {
      case 4: return '/assets/SVG - Urgent Priority colour.svg';
      case 3: return '/assets/Img - High Priority.svg';
      case 2: return '/assets/Img - Medium Priority.svg';
      case 1: return '/assets/Img - Low Priority.svg';
      default: return '/assets/No-priority.svg';
    }
  };

  const getStatusIcon = (status) => {
    switch(status.toLowerCase()) {
      case 'backlog': return '/assets/Backlog.svg';
      case 'todo': return '/assets/To-do.svg';
      case 'in progress': return '/assets/in-progress.svg';
      case 'done': return '/assets/Done.svg';
      case 'cancelled': return '/assets/Cancelled.svg';
      default: return '/assets/To-do.svg';
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <span className="ticket-id">{ticket.id}</span>
        {showUserAvatar && (
          <div className="user-avatar">
            <img 
              src={`https://ui-avatars.com/api/?name=${user?.name}&background=random`} 
              alt={user?.name}
            />
            <span className={`status-indicator ${user?.available ? 'available' : ''}`} />
          </div>
        )}
      </div>
      <div className="card-title">
        {grouping !== 'status' && (
          <img 
            src={getStatusIcon(ticket.status)} 
            alt={ticket.status}
            className="status-icon"
          />
        )}
        <span>{ticket.title}</span>
      </div>
      <div className="card-footer">
        {grouping !== 'priority' && (
          <img 
            src={getPriorityIcon(ticket.priority)} 
            alt="Priority"
            className="priority-icon"
          />
        )}
        <div className="card-tags">
          {ticket.tag.map((tag, index) => (
            <span key={index} className="tag">
              <span className="dot">●</span>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
