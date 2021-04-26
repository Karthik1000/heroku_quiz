import React from 'react';
import { useState,useEffect,useRef } from 'react';
import axios from "axios";
import { 
  Page,
  Icon,
  List,
  ListInput,
  Button,
  Radio,
  ListItem,
  f7,
  View,
    App,
    Navbar,
    NavLeft,
    NavTitle,
    NavTitleLarge,
    NavRight,
    Link,
    Preloader,
    Toolbar,
    Block,
    BlockTitle,
    LoginScreen,
    LoginScreenTitle,
    ListButton,
    Row,
    Col,
    BlockFooter,
    Card

} from 'framework7-react';
import firebase from 'firebase';
import Switch from "react-switch";

require('firebase/auth');
import '../css/hover.css'

export default function Questions(props) {

   const [inputList, setInputList] = useState(["","","",""]);
   const [question_description,setQuestion_description]=useState("");

   const [questiontype,setQuestiontype]=useState("Multiple Choice Questions");

   const [selectedoption,setSelectedoption]=useState([]);
   
  


   const [difficulty_level,setDifficultylevel]=useState("easy");

   

   const [category,setCategory]=useState("");
   const [cat_lis,setCat_lis]=useState([]);
  // const cat_lis=[{id:"",category_name:"Technical"},{id:"",category_name:"Aptitude"},{id:"",category_name:"Sports"}];
   const [category_id,setCategory_id] = useState('')
  
  const [sub_cat_lis,setSub_cat_lis]=useState({"":[]});  
  /*
   const sub_cat_lis={"":[],"Technical":["Java1","Java2","Java3","Java4","Java5","Java6","Java 7","Java 8"],"Aptitude":["C++1","C++2","C++3","C++4","C++5","C++6","C++7","C++8"],
                        "Sports":["Cricket","Football","Hockey"]};
  */
   const [selected_sub_cats_2,setSelected_sub_cats_2]=useState([]);
   
   const [sub_Cat_key,setSub_cat_key]=useState(0);

   const [toggle_options,setToggle_options]=useState([0,0,0,0]);

   const get_email=JSON.parse(localStorage.getItem("firebase_email"));
    useEffect(() => {

   
    var parent_cat_names={};

    axios.get('http://localhost:4000/api/get-main-categories').then(
      data=>{
          //console.log(data)
          let main_cate = data.data;
          var new_ele={_id:12,category_name:"Select"};
          main_cate.unshift(new_ele);
          console.log("Main Cat");
          console.log(main_cate)
          setCat_lis(main_cate.map(val=>{
            parent_cat_names[val._id]=val.category_name;
            
              return{
                  id: val._id,
                  category_name:val.category_name

              }
          }))
        
      }
  )

  axios.get('http://localhost:4000/api/get-all-sub-categories').then(
    data=>{
        //console.log(data)
        let sub_cate = data.data;
        //setSub_cate(data.data);
        var temp={"":[]}
        
        sub_cate.map((ele)=>{ 
            
          var sub_cat_name=ele.category_name;
          var main_cat_name=parent_cat_names[ele.parent_category_id];
          if (main_cat_name in temp){
            var temp2=temp[main_cat_name];
            console.log(sub_cat_name);
            temp2.push(sub_cat_name);
            temp[main_cat_name]=temp2;
          } 
          else{
            console.log(main_cat_name);
            console.log(sub_cat_name);
            temp[main_cat_name]=[sub_cat_name];
            console.log(temp);
          }
          
        })
        setSub_cat_lis(temp);
        
  }
  
)


  }, [])


useEffect(() => {

    console.log("use Effect");
    console.log(toggle_options)
}, [toggle_options])
  
  
  const sub_cat_change=(e)=>{
    
    var options_1 = e.target.options;
    var temp=[]
    for (var i = 0, l = options_1.length; i < l; i++) {
      if (options_1[i].selected) {
        //console.log(options_1[i]);
        console.log(options_1[i].text) ;
        temp.push(options_1[i].text);
      }
    }
    console.log(temp);
    setSelected_sub_cats_2(temp);
  }

   


  const Sub_categorychildfunc=(sub_category_data)=>{
    setSelected_sub_cats_2(sub_category_data);
  }

  


   const onChangeCategory=(e)=>{
     setCategory(e.target.value);
     var cat=String(e.target.value);
     var id;
     for(var i=0;i<cat_lis.length;i++){
       if (cat_lis[i].category_name===cat){
         setCategory_id(cat_lis[i].id);
         break;
       }
     }
     setSelected_sub_cats_2([]);
     //setSub_cat_key(prevkey=>prevkey+1);
    // props.categorychildfunction(e.target.value);
   }

   const onChangeQuestiontype=(e)=>{
    
    setQuestiontype(e.target.value);
    const toggle_lis = [...toggle_options.map(val => val)];
    var tog_lis=toggle_lis.map((ele)=>0);
    setToggle_options(tog_lis);
    setSelectedoption([]);
   
   // props.questiontypechildfunc(e.target.value);
  }

  const onChangedifficultylevel=(e)=>{
    setDifficultylevel(e.target.value);
    }
   
  
   const removeTag = (i) => {
    const newTags = tags;
    newTags.splice(i, 1);
    setTags(newTags);
  }

  const handleQuestionChange =(e)=>{
   // props.questionchildfunc(e.target.value);
    setQuestion_description(e.target.value);
  }

  const handleInputChange = (e, index) => {
    const  value  = e.target.value;
    const list = [...inputList];
    list[index] = value;
   // props.optionchildfunc(list);
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...inputList];
    const toggle_lis=toggle_options;
    const sel_options=selectedoption;
    if(sel_options.includes(list[index])){
      var ind = sel_options.indexOf(list[index]);
      if (ind !== -1) {
        sel_options.splice(ind, 1);
        }
    }
    list.splice(index, 1);
    toggle_lis.splice(index,1);
    //props.optionchildfunc(list);
    setInputList(list);
    setToggle_options(toggle_lis);
    
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, "" ]);
    const toggle_lis=toggle_options;
    toggle_lis.push(0);
    setToggle_options(toggle_lis);
  };


  



  const toggleoptionfield=(i,element)=>{
    const toggle_lis = [...toggle_options.map(val => val)];
    console.log("YYY");
    console.log(toggle_lis);
      if(toggle_lis[i]==1){
        if(questiontype==="Checkbox"){
          toggle_lis[i]=0;
          var sel_options=selectedoption;
          var index = sel_options.indexOf(element);
          if (index !== -1) {
          sel_options.splice(index, 1);
          }
          setSelectedoption(sel_options);
          console.log(sel_options);
        setToggle_options(toggle_lis);
        }
        else if(questiontype==="Multiple Choice Questions"){
          var tog_lis=toggle_lis.map((ele)=>0);
          
          setToggle_options(tog_lis);
          
          setSelectedoption([]);
          
        }
        
      }
      else{
        if(questiontype==="Checkbox"){
          toggle_lis[i]=1;
           var sel_options=selectedoption;
           if(!sel_options.includes(element)){
             sel_options.push(element);
             setSelectedoption(sel_options);
             console.log(sel_options);
           }
           setToggle_options(toggle_lis);
          
        }
        else if(questiontype==="Multiple Choice Questions"){
          var tog_lis=toggle_lis.map((ele)=>0);
          tog_lis[i]=1;
          var temp=[element];
          setSelectedoption(temp);
          setToggle_options(tog_lis);
        }
      }
      
      
  }


  function checkwhitespaces(arr){
    for(var i=0;i<arr.length;i++){
      if(!arr[i] || !arr[i].trim()){
        return false
      }
    }
    return true
  }

  const myQuestionSubmitfunc=()=>{
    if(!category){
      f7.dialog.alert('Please select category ');  
    }

    else if(selected_sub_cats_2.length===0){
      f7.dialog.alert('Please select sub category ');  
    }
    else if(!questiontype){
      f7.dialog.alert('Please select question type');  
    }
    else if(!question_description){
      f7.dialog.alert('Please enter question ');  
    }
    
    else if(!inputList){
      f7.dialog.alert('Please add options ');  

    }
    else if(inputList.includes("")){ 
      f7.dialog.alert("Options should not be Empty")

    }
    else if(!checkwhitespaces(inputList)){
      f7.dialog.alert("Options cannot have blank spaces only")

    }
    else if(selectedoption.length===0){
      f7.dialog.alert("Choose the correct option");
    }
    else{
    axios.get(`http://localhost:4000/route/get-user-id/${get_email}`).then(data12=>{
      console.log(data12.data)
      const current_user_id = data12.data; 
    
    console.log('current user id',current_user_id)

    console.log(inputList);
    console.log(question_description);
    console.log(category);
    console.log(questiontype);
    console.log(selectedoption);
    //console.log(sub_categories);
    console.log(selected_sub_cats_2);
    console.log('post in current user id',current_user_id);
    //phani work 603895679d04c0a200039d0c
    let sub_categories = selected_sub_cats_2;
    let question = question_description
    let created_by = current_user_id
    let answers = inputList
    let correct_answers = selectedoption
    let difficulty = difficulty_level;
    let answer_type = questiontype

      console.log("difficulty");
      console.log(difficulty);


    let data = {
        category,
        sub_categories,
        question,
        created_by,
        answers, correct_answers,difficulty,answer_type


    }
    axios.post("http://localhost:4000/api/create-question",data).then(
       d =>{
        console.log(d)
        
       } 
    ).catch(err=>{
        alert(err)
    })
    //end
    
  })

  f7.dialog.alert('Question Added Successfully',"Question Add Notification",()=>{window.location.href='/select'});
    

    }
    

  }


 

  return (<div>
    <h1>Create Question</h1>
      
    

    <div class="list">
  <ul>
    <li>
      <a class="item-link smart-select" data-open-in="popup">
        <select name="category" onChange={onChangeCategory} value={category}>
          {cat_lis.map((ele)=>{
            
            return <option value={ele.category_name} key={ele.category_name}>{ele.category_name}</option>})}
          </select>
        <div class="item-content">
          <div class="item-inner">
            <div class="item-title">Category</div>
            </div>
        </div>
      </a>
    </li>
    </ul>
</div>

{category!=="Select"?
<div>
<List>
    <ul>
      <li>
        <a class="item-link smart-select smart-select-init" data-open-in="popup" data-searchbar="true"
          data-searchbar-placeholder="Search SUB Category">
          <select  multiple onClick={(e)=>{console.log(e.target.value);console.log("Clicked")}}
                onChange={sub_cat_change}
                key={sub_Cat_key}
                
               >
            <optgroup label="SUB CATEGORIES" 
            
              >
              {
              sub_cat_lis[category].map((ele)=>{
                
                return (<option value={ele} 
                   key={ele}
              >{ele}</option>)})}
              </optgroup>
            </select>
          <div class="item-content">
            <div class="item-inner">
              <div class="item-title">{ category===""?"Please Choose a Category":category }</div>
            </div>
          </div>
        </a>
      </li>
      
      
    </ul>
    </List>

                  

    <div class="list">
    <ul>
      <li>
        <a class="item-link smart-select" data-open-in="popup">
          <select name="questiontype" onChange={onChangeQuestiontype} value={questiontype}>
          <option value="Multiple Choice Questions" selected>Multiple Choice Questions</option>
              <option value="Checkbox">Checkbox</option>
              
            </select>
          <div class="item-content">
            <div class="item-inner">
              <div class="item-title">SELECT QUESTION TYPE</div>
              </div>
          </div>
        </a>
      </li>
      </ul>
  </div>
  
  <div class="list">
    <ul>
      <li>
        <a class="item-link smart-select" data-open-in="popup">
          <select name="difficulty_level" onChange={onChangedifficultylevel} value={difficulty_level}>
          <option value="easy" selected>easy</option>
              <option value="moderate">moderate</option>
              <option value="difficult">difficult</option>
              
            </select>
          <div class="item-content">
            <div class="item-inner">
              <div class="item-title">SELECT QUESTION DIFFICULTY</div>
              </div>
          </div>
        </a>
      </li>
      </ul>
  </div>
  
  
  
        <div class="block-title" >Question Description</div>
        <div class="list no-hairlines-md">
          <ul>
            <li class="item-content item-input item-input-outline">
              <div class="item-media">
                <i class="icon demo-list-icon"></i>
              </div>
              <div class="item-inner">
                <div class="item-title item-floating-label">Question Description</div>
                <div class="item-input-wrap" style={{position:"relative",right:"5%"}} >
                  <input type="text" placeholder="Enter Question Description" 
                  value={question_description}
            
          onChange={handleQuestionChange} />
                  <span class="input-clear-button"></span>
                </div>
              </div>
            </li>
          </ul>
          </div>
          
      <table class="block-title" style={{width:"19%"}}><tr><td >Enter Options</td><td>Correct ?</td></tr></table>
      <div className="App">
            {inputList.map((x, i) => {
                return (
                 

                <div className="box">
                    
                    
                    
                    <input
                    name="option"
                    placeholder="Enter the option"
                    value={x}
                    onChange={e => handleInputChange(e, i)}
                    />&nbsp;&nbsp;&nbsp;
                    {/* <div className="tooltip">  */}
                    <Switch  onChange={()=>toggleoptionfield(i,inputList[i])} checked={toggle_options[i]===0?false:true} />
                    {inputList.length !== 1 &&
                    
                     <Button style={{width:"10%",display:"inline-block",marginTop:"-20px"}}
                        
                        onClick={() => handleRemoveClick(i)}><Icon f7="bin_xmark" size="35px" color="blue" ></Icon></Button>}
                        
                    {/* </div> */}
                    
                    {inputList.length - 1 === i && <Button onClick={handleAddClick} style={{position:"absolute",left:"25%",top:"86%"}}><Icon f7="plus_circle" size="35px" color="blue"></Icon></Button>}
                    
                </div>
                );
            })}
            
        </div>
  
        <Button onClick={myQuestionSubmitfunc} >Save the Question </Button>
    
</div>

:<div>Please Choose A Category</div>}

    
     

 

      </div>)

  
      
   
  
  
  
  
}