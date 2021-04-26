import React from 'react';
import { useState,useEffect } from 'react';
import axios from "axios";
import { 
  Page,
  List,
  ListInput,
  Button,
  ListItem,
  Card,
  CardContent

} from 'framework7-react';
import { offset } from 'dom7';



function Each_question(props) {
    //console.log("INTO diff file",props.choosen_options)


    const [choosen_options,setChoosen_options]=useState(props.choosen_options);
       
    const optionChangehandler=(id,question_type,ele,e)=>{
        if(question_type==="Multiple Choice Questions"){
            var temp=choosen_options;
            temp[id]=[ele];
            setChoosen_options({...temp});

            props.choosenoptionschildfunc(temp);
        }
        else if(question_type==="Checkbox"){
            var temp=choosen_options;
            if (id in temp){
                var temp2=temp[id];
                if (temp2.includes(e.target.value)){
                    const index=temp2.indexOf(e.target.value);
                    temp2.splice(index,1);
                    temp[id]=temp2;
                    console.log(temp);
                    setChoosen_options(temp);
                    
                    props.choosenoptionschildfunc(temp);
                }
                else{
                    temp2.push(e.target.value);
                    temp[id]=temp2;
                    console.log(temp);
                    setChoosen_options(temp);
                    
                    props.choosenoptionschildfunc(temp);

                }
            }
            else{
                temp[id]=[e.target.value];
                //console.log(temp);
                setChoosen_options(temp);
                props.choosenoptionschildfunc(temp);
            }
        }

    }


    return (
        <div>
                <div className="post">
                    <Card>
                  {props.question_description}
                  <div class="list">
                    
                    <ul >
                      
                        {
                            props.options.map((ele)=>
                            {
                                
                                if(props.question_type==="Checkbox"){
                                    return <ListItem checkbox title={ele}  value={ele} name="demo-checkbox"
                                                //onClick={(e)=>optionChangehandler(props.id,props.question_type,ele,e)}
                                                onChange={(e)=>optionChangehandler(props.id,props.question_type,ele,e)}
                                        
                                                checked={(props.id in choosen_options)? ((choosen_options[props.id].includes(ele))?"checked":null):null} />
                                }


                                else if (props.question_type==="Multiple Choice Questions") {
                                    return <ListItem
                                         radio
                                        radioIcon="start"
                                        title={ele}
                                        value={ele}
                                        //onClick={(e)=>optionChangehandler(props.id,props.question_type,ele,e)}
                                        onChange={(e)=>optionChangehandler(props.id,props.question_type,ele,e)}
                                        
                                        checked={(props.id in choosen_options)? ((choosen_options[props.id].includes(ele))?"checked":null):null}
                                    />                         }



                            }
                    )}
                    
                  </ul>
                  </div>
                  </Card>
                </div>
             
            
        </div>
    )
}

export default Each_question;
