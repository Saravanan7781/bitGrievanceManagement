import React from 'react'
import '../Css/Home.css'


function Home() {
  const list = [{id:1,title:"No.of.Complaints",total:10},{id:2,title:"Complaints Resolved",total:2},
  {id:3,title:"Complaints pending",total:8},{id:4,title:"No.of.-",total:"-"}]
  
  return (
    <>
       <div className='homeMain'>
          <div className="dashboardGrid">
                {
                  list.map((ele)=>(
                    <div className="dashboardInfos" key={ele.id}>
                    <div className="info">
                         <h1>{ele.title}</h1>
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