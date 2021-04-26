import React, { createContext } from "react";
import { Page, Button, Link, Icon } from "framework7-react";
import "bootstrap/dist/css/bootstrap.min.css";
import About from '../pages/about';
import Home from '../pages/home';
import Sample from '../pages/sample';
import Test from '../pages/test';
import Created_test from '../pages/created_test';
import Question_form from '../pages/question_form';
import Question from '../pages/question';
import Select_Question from '../pages/Select_question';
import EditTest from '../pages/edittest';
import StudentTest from '../pages/studenttest';
import CreatedTest from '../pages/select';
import Display from '../pages/Display_questions';
import Context from '../pages/contextfile';
 
import {BrowserRouter as Router,Switch, Route} from "react-router-dom";
import CreateUser from "./create-user.component";
// import Certificate from "./certificate";

import EditUser from "./edit-user.component";
import UserList from "./user-list.component";
import home from "./home";
import UserProfile from "../pages/userprofile";

import Profile from "../pages/profile";

import TestResult from "../pages/TestResult";
import Test_Summary from "../pages/Test_Summary";

export const appContext = createContext();

export default class MainContainer extends React.Component {
  render() {
    const pathname = window.location.pathname;
    return (
      <Page className="main-container">
        <div className="display-flex maxHeight" style={{ padding: "6px 10px" }}>
            <div className="dashboard-navbar">
                <Router>
                    <Switch>
                        <Route exact path="/" component={Home}/> 
                        <Route path="/about" component={About}/>
                        <Route path="/ho" component={home}/>
                        <Route path= "/create-user" component={CreateUser}/>
                        {/* <Route path= "/certificate" component={Certificate}/> */}
                        <Route path= "/select" component={CreatedTest}/>
                        {/* <Route path= "/certificate" component={Certificate}/> */}

                        <Route path= "/edit-user" component={EditUser}/>
                        <Route path= "/user-list" component={UserList}/>
                        <Route path= "/user-profile" component={UserProfile}/>
                        <Route path= "/edit-profile" component={Profile}/>
                        <Route path= "/sample" component={Sample}/>
                        <Route path="/create-test" component={Test}/> 
                        <Route path= "/select-question" component={Select_Question}/>
                        <Route path= "/created-test" component={Created_test}/>
                        <Route path= "/edit-test" component={EditTest}/>
                        <Route path= "/question-form" component={Question_form}/>
                        <Route path= "/question" component={Question}/>
                        <Route path= "/student-test" component={StudentTest}/>
                        <Route path= "/questions-in-test" component={Display}/>
                        <Route path= "/test-result" component={TestResult}/>
                        <Route path="/test-summary" component={Test_Summary} />
                        {/* ..........usecontext testcase.......... */}
                        <Route path="/context" component={Context} />
                       
                    </Switch>
                </Router>
              
              </div>
              <div
                className="display-flex justify-content-flex-end align-items-center flex-wrap content"
                style={{ width: "20%" }}
              >
              </div>
            </div>
        
      </Page>
    );
  }
}