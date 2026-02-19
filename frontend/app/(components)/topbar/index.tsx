import React from 'react';

const Topbar = () => {
    return (
    <div className="top-bar">
      {/* Left Section */}
      <div className="top-bar-left">
        <span className="session-title">
          Grade · Group A
        </span>
        {/* <span className="session-badge">
          <svg 
            width="12" 
            height="12" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5"
            style={{ marginRight: '4px' }}
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          Safe & Guided
        </span> */}
      </div>

      {/* Center Progress */}
      <div className="top-bar-center">
        <div className="progress-header">
          <span>Module progress</span>
          <span> of  complete</span>
        </div>
        <div className="progress-track">
          <div 
            className="progress-fill" 
            style={{ width: `%` }}
          ></div>
        </div>
      </div>

      {/* Right Section */}
      <div className="top-bar-right">
        {/* Identity Engine */}
        <button className="pill-btn pill-identity">
          <span className="pill-indicator status-medium"></span>
          <span>Identity Engine</span>
        </button>

        {/* Wellness Indicator */}
        <div className="wellness-pill">
          <span className="pill-indicator status-calm"></span>
          <div className="wellness-content">
            <span className="wellness-status">
              Wellness: 
            </span>
            <span className="wellness-detail">
              Mood:  · Energy: 
            </span>
          </div>
        </div>

        {/* Profile Button */}
        <button className="pill-btn pill-profile">
          <svg 
            width="14" 
            height="14" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <span>Profile</span>
          <span className="pill-subtext">
            (Age  · Grade )
          </span>
        </button>

        {/* Personality Settings */}
        <button className="pill-btn pill-personality">
          <svg 
            width="14" 
            height="14" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
          <span>Personality</span>
          <span className="pill-subtext">Friendly · Coaching</span>
        </button>

        {/* Help Button */}
        <button className="pill-btn pill-help">
          <svg 
            width="14" 
            height="14" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          <span>Help</span>
        </button>
      </div>
    </div>
  );
}

export default Topbar;