import { PageHeader, Radio, Typography, Button } from 'antd';
import React, { Component } from 'react';
export default class Toolbar extends Component {
  handleZoomChange = (e) => {
    if (this.props.onZoomChange) {
      this.props.onZoomChange(e.target.value)
    }
  }
  render() {
    const zoomRadios = [/*'Hours', */ 'Days', 'Months'];
    const getIsActive = (value) => value === this.props.zoom ? 'active' : '';
    return (
      <PageHeader
      ghost={false}
      title="Planner"
      extra={
        zoomRadios.map((value) => <Button className={getIsActive(value)} onClick={this.handleZoomChange} value={value}>{value}</Button>)
      }
    >
    </PageHeader>
    )
    return (
      <div className="tool-bar">
       
      </div>
    );
  }
}