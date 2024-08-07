import React, { useState, useEffect } from 'react';
import '../../Css/admin/Home.css';
import { BsCalendar2Check, BsClipboard2DataFill } from 'react-icons/bs';
import { MdOutlinePendingActions } from 'react-icons/md';

function Home() {


  const list = [
    { id: 1, title: 'TOTAL COMPLAINTS', total: 10 },
    { id: 2, title: ' RESOLVED', total: 2 },
    { id: 3, title: ' PENDING', total: 8 }
  ];

  return (
    <div className='homeMain'>
      <div className={`dashboardGrid info1`}>
        {list.map((ele) => (
          <div className='dashboardInfos' key={ele.id}>
            <div className='info'>
              <h1>{ele.title}</h1>
              <div className='infoIcons'>
                {ele.id === 1 ? (
                  <BsCalendar2Check />
                ) : ele.id === 2 ? (
                  <BsClipboard2DataFill />
                ) : (
                  <MdOutlinePendingActions />
                )}
              </div>
              <h1>{ele.total}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;