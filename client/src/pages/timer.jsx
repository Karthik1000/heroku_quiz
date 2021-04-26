import React from 'react'
import { useState, useEffect } from 'react';
import axios from "axios";
import { 
  Page,
  List,
  ListInput,
  Button,
  ListItem,
  f7

} from 'framework7-react';

const Timer = () => {
    const test_mins=2;
    var h = Math.floor(test_mins/ 60);
    var m = test_mins % 60;
    console.log(h);
    console.log(m);
    const [hours,setHours]=useState(h);
    const [ minutes, setMinutes ] = useState(m);
    const [seconds, setSeconds ] =  useState(0);
    useEffect(()=>{
    let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            else if (seconds === 0) {
                if(minutes === 0){
                    if(hours === 0){
                        f7.dialog.alert("Time is Up. Your Test is Complete","Test Completed")
                        clearInterval(myInterval)
                    }
                    else{
                    setHours(hours-1);
                    setMinutes(59);
                    setSeconds(59);
                    }
                }
                else{
                    setMinutes(minutes-1);
                    setSeconds(59);
                }
            }

            },1000)

        return ()=> {
            clearInterval(myInterval);
          };
    });

    return (
        <Page>
        <div>
            <h1>TIMER</h1>
        { minutes === 0 && seconds === 0
            ? null
            : <h1>{hours<10? `0${hours}` : hours} :{minutes<10? `0${minutes}` : minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</h1> 
        }
        </div>
        </Page>
    )
}

export default Timer;