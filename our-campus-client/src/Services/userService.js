import useHandleResponse from '../Utilities/handle-response';
import authHeader from '../Utilities/auth-header';
// import { useSnackbar } from 'notistack';

export function useGetUsers() {
    // const { enqueueSnackbar } = useSnackbar();
    const handleResponse = useHandleResponse();
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };

    const getUsers = () => {
        return fetch(
            `http://localhost:5000/users/messages`,
            requestOptions
        )
            .then(handleResponse)
            .catch((err) =>
                // enqueueSnackbar('Could not load Users', {
                //     variant: 'error',
                // })
                console.log(err)
            );
    };

    return getUsers;
}
