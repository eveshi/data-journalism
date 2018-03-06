import React from 'react';
import Sidebar from './sidebar/sidebar';
import Aux from '../../Aux/aux';

const Toolbar = () => {
    return (
        <Aux>
            <div>
                <p>菜单</p>
                <p>数据新闻</p>
            </div>
            <div>
                <Sidebar />
            </div>
        </Aux>
    )
};

export default Toolbar;