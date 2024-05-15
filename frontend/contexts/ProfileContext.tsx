import { AuthServices } from '@/services/authentication/authservices';
import { createContext, useState, useEffect } from 'react';
import Cookies from "js-cookie";
import { useRouter } from 'next/router';
import { notifications } from '@mantine/notifications';
import jwtDecode from "jwt-decode";

type ProfileContextProps = {
    authorized: boolean;
    profile: any;
    violationData: any;
    login: (data: any) => void;
    register: (data: any) => void;
    logout: () => void;
};

export const ProfileContext = createContext<ProfileContextProps>({
    authorized: false,
    profile: {},
    violationData: null,
    login: () => { },
    register: () => { },
    logout: () => { },
});

export const ProfileProvider = ({ children }: any) => {
    const [authorized, setAuthorized] = useState(false);
    const [profile, setProfile] = useState({});
    const [violationData, setViolationData] = useState<any>(null);
    const router = useRouter()

    useEffect(() => {
        getUserProfile();
    }, [])

    /**
     * When load page, check cookies to see if user is logged in
     */
    const getUserProfile = () => {
        const profile: any = localStorage.getItem('profile');

        const decodedData = jwtDecode(profile);

        //Case not authenticated
        if (!profile) {
            setAuthorized(false)
        } else {
            //Case have accessToken
            setProfile({
                email: decodedData?.email,
                name: decodedData?.name,
                user_type: decodedData?.user_type,
            })

            //Case logged in
            setAuthorized(true);
        }
    }

    const login = (data: any) => {
        // Call api login
        console.log("call api login...");
        AuthServices.callApiLogin(data).then((response: any) => {
            if (response && response?.data) {
                const dataResponse = response?.data;
                //If the authentication succeeds, update the state with the user's profile
                const decodedData = jwtDecode(dataResponse?.access);
                setProfile({
                    email: decodedData?.email,
                    name: decodedData?.name,
                    user_type: decodedData?.type,
                })
                setAuthorized(true);
                localStorage.setItem('profile', dataResponse?.access);

                if(decodedData?.type === 'normal') {
                    router.push('/dashboard');
                }

                console.log("decodedData", decodedData);
            } else {
                console.log("login failed");
                setAuthorized(false);
            }
        }).catch((error: any) => {
            if (error?.response?.status === 400) {
                console.log("login failed because");
                console.log(error?.response?.data);
                notifications.show({
                    title: 'Error',
                    message: 'Email sau parola incorecte',
                    color: 'red',
                    withBorder: true,
                    styles: (theme) => ({
                        root: {
                            backgroundColor: theme.colors.red[6],
                            borderColor: theme.colors.red[6],

                            '&::before': { backgroundColor: theme.white },
                        },

                        title: { color: theme.white },
                        description: { color: theme.white },
                        closeButton: {
                            color: theme.white,
                            '&:hover': { backgroundColor: theme.colors.blue[7] },
                        },
                    }),
                })
            } else {
                console.error(error);
            }
        })

    };

    const register = (data: any) => {
        // Call api login
        console.log("call api register...");
        AuthServices.callApiRegister(data).then((response: any) => {
            if (response && response?.data) {
                const dataResponse = response?.data;

                console.log("register success");
                router?.push('/login');
            } else {
                console.log("register failed");
                setAuthorized(false);
            }
        }).catch((error: any) => {
            if (error?.response?.status === 400) {
                console.log("register failed because");
                console.log(error?.response?.data);
                notifications.show({
                    title: 'Error',
                    message: error?.response?.data,
                    color: 'red',
                    withBorder: true,
                    styles: (theme) => ({
                        root: {
                            backgroundColor: theme.colors.red[6],
                            borderColor: theme.colors.red[6],

                            '&::before': { backgroundColor: theme.white },
                        },

                        title: { color: theme.white },
                        description: { color: theme.white },
                        closeButton: {
                            color: theme.white,
                            '&:hover': { backgroundColor: theme.colors.blue[7] },
                        },
                    }),
                })
            } else {
                console.error(error);
            }
        })

    };

    const logout = () => {
        //Set authorization false
        setAuthorized(false);
        setProfile({});
        //Remove accessToken and refreshToken from localStorage/Cookies
        localStorage.removeItem('accessToken');
        Cookies.remove('refreshToken');
        //Redirect to login page
        router.push(`/start/dashboard`)
    };
    
    return (
        <ProfileContext.Provider value={{ authorized, profile, login, register, logout, violationData}}>
            {children}
        </ProfileContext.Provider>
    );
};