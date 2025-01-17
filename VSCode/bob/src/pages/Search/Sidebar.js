import React from 'react';
import SearchDest from './SearchDest';
import RecommendSTN from './RecommendSTN';
import '../../static/scss/Search/Sidebar.scss';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <SearchDest />
            <RecommendSTN />
        </div>
    );
};

export default Sidebar;