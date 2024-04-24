import React from 'react';
import {Badge, Button, Card, Container, Group, UnstyledButton, Image, Text} from '@mantine/core';
import Header from "@/contents/components/header/Header";
import {IconChevronDown, IconPigMoney, IconAppWindow, IconDeviceDesktop, IconWallet, IconBeach} from "@tabler/icons-react";
import { Carousel } from '@mantine/carousel';
import {useRouter} from "next/router";

const IndexPage = () => {
    const scrollToNextSection = () => {
        const nextSection = document.getElementById('next-section');
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const router = useRouter();

    return (
        <div>

            <div className="bg-cover bg-center h-screen flex" style={{ backgroundImage: 'url("city.jpg")' }}>
                <div className={'w-full'}>
                    <Header />
                    <div className={'ml-20 mt-28'}>
                        <h1 className={'text-7xl text-white'}>SCHIMBĂ FELUL ÎN CARE <br />ÎȚI GESTIONEZI BANII</h1>
                        <p className={' text-xl text-white -mt-3 '}>
                            Pentru cei ce vă doriți mai mult de la banii voștri -<br />
                            avem Smartbanking.<br /><br />
                            Înregistrează-te acum, cu un simplu click<br />
                            <Button variant={'filled'} color={'gray.1'} radius={'xl'} size={'sm'}
                                    className={'mr-8 mt-2 text-black'} onClick={() => {router.push('/register')}}>Începe de azi</Button>
                        </p>
                    </div>
                </div>
                {/* Move the IconChevronDown inside the div containing the first section content */}
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
                    <UnstyledButton onClick={scrollToNextSection}>
                        <IconChevronDown className={'text-white font-bold'} size={'50px'} />
                    </UnstyledButton>
                </div>
            </div>

            <div className="bg-gray-100 py-20 h-screen" id="next-section">
                <Container size="xl">
                    <h2 className="text-2xl font-semibold mb-4">Ce poți face cu Smartbank?</h2>
                    <div className={'w-full flex justify-center mt-16'}>
                        <Group>
                            <div  className={'w-[200px] h-[150px]'}>
                                <div className={'flex justify-center'}>
                                    <IconAppWindow size={50} color={'#104788'}/>
                                </div>
                                <Text align={'center'} className={'mt-1'}>Deschizi cont de la distanță</Text>
                            </div>
                            <div className={'w-[200px] h-[150px]'}>
                                <div className={'flex justify-center'}>
                                    <IconDeviceDesktop size={50} color={'#104788'}/>
                                </div>
                                <Text align={'center'} className={'mt-1'}>Banking de oriunde</Text>
                            </div>
                            <div  className={'w-[200px] h-[150px]'}>
                                <div className={'flex justify-center'}>
                                    <IconWallet size={50} color={'#104788'}/>
                                </div>
                                <Text align={'center'} className={'mt-1'}>Credite pentru nevoi personale</Text>
                            </div>
                            <div  className={'w-[200px] h-[150px]'}>
                                <div className={'flex justify-center'}>
                                    <IconPigMoney size={50} color={'#104788'}/>
                                </div>
                                <Text align={'center'} className={'mt-1'}>Câștigi mai mult din banii tăi</Text>
                            </div>
                            <div  className={'w-[200px] h-[150px]'}>
                                <div className={'flex justify-center'}>
                                    <IconBeach size={50} color={'#104788'}/>
                                </div>
                                <Text align={'center'} className={'mt-1'}>Asiguri ce ți-e drag</Text>
                            </div>
                        </Group>
                    </div>
                    <div className={'w-full flex justify-center mt-8'}>
                        <Card shadow="xs" padding="xl" radius="lg" className={'w-full  ml-16'}>
                            <h1 className={'font-semibold'}>Vrei să tot faci lucruri din Smartbank?</h1>
                            <Button variant="light" color="blue" fullWidth mt="md" radius="md">
                                Află mai multe
                            </Button>
                        </Card>
                        <Card shadow="xs" padding="xl" radius="lg" className={'w-full  ml-16'}>
                            <h1 className={'font-semibold'}>Ești interesat de un credit de nevoi personale?</h1>
                            <Button variant="light" color="blue" fullWidth mt="md" radius="md">
                                Află mai multe
                            </Button>
                        </Card>
                        <Card shadow="xs" padding="xl" radius="lg" className={'w-full ml-16'}>
                            <h1 className={'font-semibold'}>Nu știi cum să economisești pentru o vacanță?</h1>
                            <Button variant="light" color="blue" fullWidth mt="md" radius="md">
                                Află mai multe
                            </Button>
                        </Card>


                    </div>
                </Container>
            </div>

            {/* Add more sections as needed */}

        </div>
    );
};

export default IndexPage;
