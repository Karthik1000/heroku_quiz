import React from 'react';
//  import {
     
//      table,
//  }from 'framework7-react';


const summary = ()=>{
   let data= [
    {
       "Name":"Test-1",
       "AnswersAttempted":10,
       "CorrectAnswers":6,
       "WrongAnswers":4,
       "Score":6,
       "TestResult":"Pass",
       "Percentage":"60%",
    },

    {
        "Name":"Test-2",
        "AnswersAttempted":10,
        "CorrectAnswers":7,
        "WrongAnswers":3,
        "Score":7,
        "TestResult":"Pass",
        "Percentage":"70%",
    },

    {
        "Name":"Test-3",
        "AnswersAttempted":10,
        "CorrectAnswers":5,
        "WrongAnswers":5,
        "Score":5,
        "TestResult":"Pass",
        "Percentage":"50%",
    },

    {
        "Name":"Test-4",
        "AnswersAttempted":10,
        "CorrectAnswers":4,
        "WrongAnswers":6,
        "Score":4,
        "TestResult":"Fail",
        "Percentage":"40%",
    },
    
    {
        "Name":"Test-5",
        "AnswersAttempted":10,
        "CorrectAnswers":3,
        "WrongAnswers":7,
        "Score":3,
        "TestResult":"Fail",
        "Percentage":"30%",
    },
     
   ]

    return(
        <div  className="data-table">

            <h1>Test Summary</h1>
            <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Answers Attempted</th>
                                    <th>Correct Answers</th>
                                    <th>Wrong Answers</th>
                                    <th>Score</th>
                                    <th>Test Result</th>
                                    <th>Percentage</th>
                                </tr>
                            </thead>
            {data.map(data=>{
                return(
                    
                        
                            <tbody>
                                <td>{data.Name}</td>
                                <td>{data.AnswersAttempted}</td>
                                <td>{data.CorrectAnswers}</td>
                                <td>{data.WrongAnswers}</td>
                                <td>{data.Score}</td>
                                <td>{data.TestResult}</td>
                                <td>{data.Percentage}</td>
                            </tbody>
         
                      
                   
                )
            })}
             </table>
        </div>

    )
}
export default summary;