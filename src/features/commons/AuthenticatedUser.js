import { useSelector } from 'react-redux';
export const AuthenticatedUser = () => {
    const userToken = useSelector((state) => state.user.token);
    return !!userToken;
};
