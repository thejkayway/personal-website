import React from 'react';

import './Backdrop.css';

const Backdrop = props => (
    <div className="backdrop" onClick={props.click}>
        <div className="closebutton">
            <div className="closebutton-line-1"/>
            <div className="closebutton-line-2"/>
        </div>
    </div>
);

export default Backdrop;