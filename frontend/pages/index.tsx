// index.tsx
import React from 'react';
import Header from "@/contents/components/header/Header";
import {Button, Text, Collapse, UnstyledButton} from "@mantine/core";
import {IconChevronDown} from "@tabler/icons-react";
import { useDisclosure } from '@mantine/hooks';

const Home = () => {
    const scrollToPage = () => {
        window.scrollTo({
            top: document.getElementById('end-startpage').offsetTop, // Get offsetTop of the target element
            behavior: "smooth"
        });
    };

    const [opened, { toggle }] = useDisclosure(false);

    return (
        <div className="flex w-screen h-screen">
            <img
                src="/city.jpg"
                alt="Background"
                className="absolute inset-0 w-screen h-screen object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-between h-screen">
                <div className="relative z-10">
                    <Header />
                    <div className={'flex justify-left'}>
                        <div className={'ml-20 mt-20'}>
                            <h1 className={'text-7xl text-white'}>SCHIMBĂ FELUL ÎN CARE <br/>ÎȚI GESTIONEZI BANII</h1>
                            <p className={' text-xl text-white -mt-3 '}>
                                Pentru cei ce vă doriți mai mult de la banii voștri -<br/>
                                avem Smartbanking.<br/><br/>
                                Înregistrează-te acum, cu un simplu click<br/>
                                <Button variant={'filled'} color={'gray.1'} radius={'xl'} size={'sm'}
                                        className={'mr-8 mt-2 text-black'}>Începe de azi</Button>
                            </p>
                        </div>
                    </div>
                </div>

                <div className={'text-white text-center pb-4'}>
                    {/* 2. Link or button to trigger smooth scroll to EndStartpage */}
                    <UnstyledButton onClick={toggle}>
                        <IconChevronDown size={'60px'} className={'text-white mt-10'} />
                    </UnstyledButton>
                </div>

                <Collapse in={opened}>
                    <Text className={'absolute'}>text</Text>
                </Collapse>
            </div>
        </div>
    );
}

export default Home;
