import {PureComponent} from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import PostSearch from "./components/post/search/PostSearch.tsx";
import SignUp from "./components/signup/SignUp.tsx";
import Post from "./components/post/Post.tsx";
import Header from "./components/header/Header.tsx";
import {observer} from "mobx-react";
import credentialsRepository from "./module/account/repository/CredentialsRepository.ts";
import SignIn from "./components/signin/SignIn.tsx";
import ChangePassword from "./components/changepassword/ChangePassword.tsx";

@observer
export default class App extends PureComponent {
    render() {
        return (
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path="/*" element={<PostSearch/>}/>
                    <Route path="/new-post" element={<Post/>}/>
                    <Route path="/post/:id" element={<Post/>}/>
                    <Route path="/signIn" element={
                        credentialsRepository.getToken() ? <Navigate to="/" replace/> : <SignIn/>
                    }/>
                    <Route path="/signUp" element={
                        credentialsRepository.getToken() ? <Navigate to="/" replace/> : <SignUp/>
                    }/>
                    <Route path="/changePassword" element={
                        credentialsRepository.getToken() ? <ChangePassword/> : <Navigate to="/" replace/>
                    }/>
                </Routes>
            </BrowserRouter>
        );
    }
}