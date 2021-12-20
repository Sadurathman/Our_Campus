// import { authenticationService } from '../Services/authenticationService';

function authHeader(props) {
    const currentUser = props?.userInfo || null;
    if (currentUser && currentUser.token) {
        return {
            Authorization: `${currentUser}`,
            'Content-Type': 'application/json',
        };
    } else {
        return {};
    }
}

export default authHeader;
