import {PureComponent} from "react";
import './Header.scss'
import {Link} from "react-router-dom";
import credentialsRepository from "../../module/account/repository/CredentialsRepository.ts";
import {observer} from "mobx-react";

@observer
export default class Header extends PureComponent {

    private signOut() {
        credentialsRepository.clearToken();
    }

    render() {
        return (
            <div className="header">
                <Link to="/">Logo</Link>
                <div className="auth">
                    {credentialsRepository.getToken() ? <>
                        <Link to="/changePassword">Change Password</Link>
                        <div>/</div>
                        <Link to={"/"} onClick={this.signOut}>Sign Out</Link>
                    </> : <>
                        <Link to="/signIn">Sign In</Link>
                        <div>/</div>
                        <Link to="/signUp">Sign Up</Link>
                    </>}

                </div>
            </div>
        );
    }
}