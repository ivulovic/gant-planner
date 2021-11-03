import React, { Component } from 'react';
import Gantt from './components/Gantt';
import Toolbar from './components/Toolbar';

const DATA_KEY = 'gant-data';

const addLeadingZero = (s) => `00${s}`.slice(-2);

const getDate = (d) => {
  const _d = new Date(d);
  return `${_d.getFullYear()}-${addLeadingZero(_d.getMonth()+1)}-${addLeadingZero(_d.getDate())}`
}

const mapToItem = x => ({
  id: x.id,
  text: x.text,
  end_date: getDate(x.end_date),
  start_date: getDate(x.start_date),
  duration: x.duration,
  progress: x.progress,
  parent: x.parent,
});

const data = {
  data: [
    { id: 1, text: 'Planning', start_date: '2020-04-01', duration: 3, progress: 0.6 },
    { id: 11, parent: 1, text: 'Planning', start_date: '2020-04-01', duration: 3, progress: 0.6 },
    { id: 2, text: 'Documentation', start_date: '2020-04-3', duration: 3, progress: 0.4 },
    { id: 3, text: 'Implementation', start_date: '2020-04-6', duration: 4, progress: 0.2 },
    { id: 4, text: 'Initial Testing', start_date: '2020-04-10', duration: 5, progress: 0.0 },
    { id: 5, text: 'Testing', start_date: '2020-04-11', duration: 4, progress: 0.0 },
    { id: 6, text: 'Finishing', start_date: '2020-04-15', duration: 1, progress: 0.0 }
  ],
  links: [
    // { id: 1, source: 1, target: 2, type: '0' }
  ]
};

class App extends Component {
  state = {
    currentZoom: 'Days',
    tasks: localStorage.getItem(DATA_KEY) ?  JSON.parse(localStorage.getItem(DATA_KEY)): data,
  };

  logDataUpdate = (type, action, item, id) => {
    // delete
    if(item['!nativeeditor_status'] === "deleted"){
      const newData = this.state.tasks.data.filter(x => x.id !== item.id).map(mapToItem);
      this.handleUpdateTasks(newData);
      return;
    }
    // update or create
    let newData = this.state.tasks.data.map(mapToItem);
    const itemExists = newData.find(x => x.id === item.id);
    if(itemExists){
      newData = newData.map(x => {
        if(x.id === item.id){
          return mapToItem(item);
        }
        return x;
      });
    } else {
      newData.push(mapToItem(item));
    }
    this.handleUpdateTasks(newData);
  }

  handleUpdateTasks = (newData) => {
    const updatedTasks = {
      ...this.state.tasks,
      data: newData,
    };
    localStorage.setItem(DATA_KEY, JSON.stringify(updatedTasks));
    this.setState({
      ...this.state,
      tasks: updatedTasks
    })
  }

  handleZoomChange = (zoom) => {
    this.setState({
      currentZoom: zoom
    });
  }

  render() {
    const { currentZoom } = this.state;
    return (
      <div>
        <div className="zoom-bar">
          <Toolbar
            zoom={currentZoom}
            onZoomChange={this.handleZoomChange}
          />
        </div>
        <div className="gantt-container">
          <Gantt
            tasks={this.state.tasks}
            zoom={currentZoom}
            onDataUpdated={this.logDataUpdate}
          />
        </div>
      </div>
    );
  }
}

export default App;