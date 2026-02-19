const Sidebar = () => {
	return (
        <>
        <aside className="sidebar">
      {/* Header */}
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </div>
        <div className="sidebar-brand">
          <div className="sidebar-title">ARLO Identity Agent</div>
          <div className="sidebar-subtitle">Voice & Wellness Session</div>
        </div>
      </div>

      {/* Current Module Section */}
      <div className="sidebar-section">
        <div className="sidebar-section-title">Current Module</div>
        
      </div>

      {/* Upcoming Modules */}
      <div className="sidebar-section">
        <div className="sidebar-section-title">Upcoming</div>
        
      </div>

      {/* Completed Modules */}
      
        <div className="sidebar-section">
          <div className="sidebar-section-title">Completed</div>
          
        </div>
      

      {/* Footer */}
      <div className="sidebar-footer">
        <p className="mb-2">🛡️ Safe & Guided Environment</p>
        <small>Teacher & Guardian Tools Available</small>
      </div>
    </aside>
        </>
    );
}

export default Sidebar;