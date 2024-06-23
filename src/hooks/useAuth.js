import { useSelector } from 'react-redux';

const useAuth = () => {
	const { isAuthenticated, token } = useSelector((state) => state.authSlice);
	return { isAuthenticated, token };
};

export default useAuth;
