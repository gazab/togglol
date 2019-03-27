import React from 'react';
import SummaryBar from './SummaryBar';


const messages = {
    today: 'today',
    previous: 'back',
    next: 'next',
    week: 'week',
    month: 'month'
};

const Toolbar = (toolbar) => {
    const goToPrev = () => { toolbar.onNavigate('PREV'); };
    const goToNext = () => { toolbar.onNavigate('NEXT'); };
    const goToToday = () => { toolbar.onNavigate('TODAY'); };
    const changeView = view => { toolbar.onViewChange(view); };
    
    function viewNamesGroup () {
      let viewNames = toolbar.views;
      const view = toolbar.view;
  
      if (viewNames.length > 1) {
        return viewNames.map(name => (
          <button
            type="button"
            key={name}
            className={view === name ? 'rbc-active' : ''}
            onClick={() => changeView(name)}
          >
            {messages[name]}
          </button>
        ));
      }
    };
  
  return (
    <div>
      <div className="rbc-toolbar">
          <span className="rbc-btn-group">
            <button
              type="button"
              onClick={goToToday}
            >
              {messages.today}
            </button>
            <button
              type="button"
              onClick={goToPrev}
            >
              {messages.previous}
            </button>
            <button
              type="button"
              onClick={goToNext}
            >
              {messages.next}
            </button>
          </span>

          <span className="rbc-toolbar-label">{toolbar.label}</span>

          <span className="rbc-btn-group">{viewNamesGroup()}</span>
        </div>
        <SummaryBar events={toolbar.events} />
      </div>
    );
  



};

export default Toolbar;
