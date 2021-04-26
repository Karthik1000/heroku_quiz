import React from 'react';
import { useState } from 'react';
import axios from "axios";
import { 
  Page,
  List,
  ListInput,
  Button,

} from 'framework7-react';

const CreatePage = ({f7router}) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const clearState = () => {
    setQuestion('')
    setAnswer('')
}
  const save =(e)=>{
    e.preventDefault();
    console.log("hii")
    let data ={
      question,
      answer,
    }
    console.log("ooo",data);
    postquestion(data);
    clearState()

  }
   const postquestion = data =>{
    axios.post("http://localhost:4000/route/ques",data)
    .then(d =>{
      console.log(d);
    })
    .catch(err => alert(err))
   }

  return (
  <Page>
          <List form>
            <ListInput
              label="Questiontext"
              type="text"
              placeholder="question"
              name="question"
              value={question}
              onChange={e => setQuestion(e.target.value)}
            />
            <ListInput
              label="Answer"
              type="text"
              placeholder="Answer"
              name="answer"
              value={answer}
              onChange={e => setAnswer(e.target.value)}
            />
          </List>
          <List>
            <Button className="col" onClick= {e => {save(e)}}  fill>save</Button>
          </List>
  </Page>
  )
};

export default CreatePage;
