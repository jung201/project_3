import React from 'react';
import Recommend from './Recommend';
import Search from './Search';
import '../../static/scss/Info/Sidebar.scss';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <Recommend />
            <Search />
        </div>
    );
};

export default Sidebar;