import React from 'react';
import {useState} from 'react';
import "../css/alltest.css";
 
import {
  Page,
  Navbar,
} from 'framework7-react';

const Content = ()=>{
    
    let data =[
        {"Testname":"Test-1",
         "Level":"Easy",
         "Duration":45,
         "Passrate":90,
         "Certificate":"yes"
        },
        {"Testname":"Test-2",
        "Level":"Hard",
        "Duration":50,
        "Passrate":60,
        "Certificate":"yes"},
        {
        "Testname":"Test-3",
         "Level":"Moderate",
         "Duration":45,
         "Passrate":80,
         "Certificate":"yes"
        }]
        return(
            <div>
            {data.map(data=>{
            const taketest=()=>{
                console.log("hai",data.Testname);
                // window.location.href="/test1"
            }
        return( 
            
            <div>
              <div className="item-inner test"  >
                 <div className="item-title-row">
                   <div className="item-title">{data.Testname}</div>
                 </div>
               <div className="item-text">Difficulty level:{data.Level}, Duration:{data.Duration}, Passrate:{data.Passrate}, Certificate:{data.Certificate}</div>
               <button className="item-after move btn btn-primary" onClick={taketest} style={{width:"100px"}}>Take Test</button>
 
             </div><br/>
           </div>    
   )
    })}
            </div>
        )
    
    
}
 
const Alltest =() =>{
    const [testlists, setTestLists]=useState(false);
 
const tests=()=>{
   setTestLists(true);
  }
 
const history=()=>{
    window.location.href = '/yourtest'
  
  }
 
  const profile=()=>{
    window.location.href = '/edit-profile'
  
  }
 
 
  
    return (
        <Page>
 
 
 
<Navbar> 
                
                
               
                    <div className="left" onClick={tests}><p>TestLists</p> 
                    </div>
                    <div className="right" onClick={history}><p>Your Test History</p>
                    </div>
                    <div className="right" onClick={profile}><p>Profile</p>
                        
                    </div>
 
                   
                   
                
           </Navbar>
           {testlists ? <Content/> : null}
           </Page>
    )
}
export default Alltest;
