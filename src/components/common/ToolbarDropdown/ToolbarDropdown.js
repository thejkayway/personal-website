import React, { Component } from 'react';

class ToolbarDropdown extends Component {
  render() {
    return(
      <div className='toolbar_navigation-items_dropdown_content'>
        {this.props.links}
      </div>
    );
  }
}

export default ToolbarDropdown;