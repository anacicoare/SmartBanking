import useWindowDimensions from "@/contents/components/sidebar/useWindowDimension";
import {NavLink, Tabs} from "@mantine/core";
import {useEffect, useState} from "react";
import {IconCategory, IconLogout2, IconSend2, IconChartInfographic, IconSettings} from "@tabler/icons-react";
import colors from "tailwindcss/colors";
import Image from "next/image";
import {usePathname, useRouter} from "next/navigation";
import {useContext} from "react";
import {ProductsServices} from "@/services/products/products";

export default function NewSidebar() {
    const [active, setActive] = useState(0);
    const router = useRouter();
    const pathname = usePathname();
    const [products, setProducts] = useState([]);
    
    return (
        <div className='bg-white flex-col h-screen w-[15%] p-2 shadow-xl'>
            <div className='flex flex-row justify-center'>

            </div>
            <div className='flex flex-row'>
                <NavLink
                    onClick={() => {
                        router?.push('/dashboard');
                    }}
                    active={pathname.includes('dashboard')}
                    label="Dashboard"
                    icon={<IconCategory/>}
                    className={'mt-20'}
                    color='indigo.8'
                    styles={(theme) => {
                        return {
                            label: {
                                color: colors.black,
                                fontSize: '1rem',
                                fontWeight: pathname.includes('dashboard') && '600'
                            }
                        }
                    }}
                />
                {pathname.includes('dashboard') && <div className='mt-20 bg-blue-900 w-0.5'></div>}
            </div>
            <div className='flex flex-row'>
                <NavLink
                    onClick={() => {
                        router?.push('/transfer')
                    }}
                    active={pathname.includes('transfer')}
                    label="Transfer"
                    icon={<IconSend2/>}
                    color='indigo.8'
                    styles={(theme) => {
                        return {
                            label: {
                                color: colors.black,
                                fontSize: '1rem',
                                fontWeight: pathname.includes('transfer') && '600'
                            }
                        }
                    }}
                />
                {pathname.includes('transfer') && <div className='bg-blue-900 w-0.5'></div>}
            </div>
            <div className='flex flex-row'>
                <NavLink
                    onClick={() => {
                        router?.push('/reports');
                    }}
                    active={pathname.includes('reports')}
                    label="Rapoarte"
                    icon={<IconCategory/>}
                    color='indigo.8'
                    styles={(theme) => {
                        return {
                            label: {
                                color: colors.black,
                                fontSize: '1rem',
                                fontWeight: active === 2 && '600'
                            }
                        }
                    }}
                />
                {active == 2 && <div className='bg-blue-900 w-0.5'></div>}
            </div>

            <div className='flex flex-row mt-[100px]'>
                <NavLink
                    onClick={() => setActive(3)}
                    active={active === 3}
                    label='Settings'
                    icon={<IconSettings/>}
                    color='indigo.8'
                    styles={(theme) => {
                        return {
                            label: {
                                color: colors.black,
                                fontSize: '1rem',
                                fontWeight: active === 3 && '600'
                            }
                        }
                    }}
                />
                {active == 3 && <div className=' bg-blue-900 w-0.5'></div>}
            </div>

            <NavLink
                label='Log out'
                icon={<IconLogout2/>}
                onClick={() => {
                    localStorage.removeItem('profile');
                    router.push('/login');
                }}
            />
        </div>


    )
}