import React from 'react'
import '../Css/Home.css'
import { BsCalendar2Check,BsClipboard2DataFill  } from "react-icons/bs";
import { MdOutlinePendingActions } from "react-icons/md";
import { useState } from 'react';

function Home() {
  // const list = [{id:1,title:"TOTAL COMPLAINTS",total:10},{id:2,title:" RESOLVED",total:2},
  // {id:3,title:" PENDING",total:8}]
  const [count,setCount] = useState(0);
  const list = [{id:1,title:"TOTAL COMPLAINTS",total:10}]
  const displayGrid = () =>{
    setTimeout(()=>{
      if(count<3){
      console.log(count);
      setCount(count+1);
    }

    else{
      clearInterval(displayGrid)
    }
    }
      ,1000
    )
  }

  displayGrid();

  return (
    <>
       <div className='homeMain'>
          <div className={(count===2)?`dashboardGrid`:"displaySingle"}>
                {/* {
                  list.map((ele)=>(
                    
                    <div className="dashboardInfos" key={ele.id}>
                    <div className="info">
                    <h1>{ele.title}</h1>
                      <div className="infoIcons">
                      {
                        ele.id===1?<BsCalendar2Check />: ele.id===2?<BsClipboard2DataFill />:<MdOutlinePendingActions />
                       
                      }

                      </div>
                    
                          <h1>{ele.total}</h1>
    
                    </div>
                    </div>
                  ))
                    

                } */}
                
                {
                  list.map((ele)=>(
                    
                    <div className="dashboardInfos" key={ele.id}>
                    <div className="info">
                    <h1>{ele.title}</h1>
                      <div className="infoIcons">
                      {
                        ele.id===1?<BsCalendar2Check />: ele.id===2?<BsClipboard2DataFill />:<MdOutlinePendingActions />
                       
                      }

                      </div>
                    
                          <h1>{ele.total}</h1>
    
                    </div>
                    </div>
                  ))
                    

                }
                
          </div>
      </div>
      </>
  )
}

export default Home