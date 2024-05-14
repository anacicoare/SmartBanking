import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import Layout from "@/contents/layout/Layout";
import React, { useRef} from 'react';
import { Button, Card, ScrollArea, Text, UnstyledButton } from "@mantine/core";
import { IconArrowBarRight, IconArrowForwardUp, IconArrowRight } from "@tabler/icons-react";

// Hook
function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        // only execute all the code below in client side
        // Handler to call on window resize
        function handleResize() {
            // Set window width/height to state
            setWindowSize({
                width: window.innerWidth as any,
                height: window.innerHeight as any,
            });
        }

        // Add event listener
        window.addEventListener("resize", handleResize);

        // Call handler right away so state gets updated with initial window size
        handleResize();

        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
}

export default function DashboardPage() {
    const router = useRouter();
    const [opened, setOpened] = useState(false);
    const [showCardDetails, setShowCardDetails] = useState(false);
    const size = useWindowSize();

    useEffect(() => {
        console.log('here')
        const profile: any = localStorage.getItem('profile');
        if (!profile) {
            console.log('no access token')
            router?.push('/login');
        } else {
            console.log('have access token')
        }
    }, []);

    return (
        <React.Fragment>
            <Layout />
            <div className='absolute left-[18%] top-[7%] mt-7 w-[82%]'>
                <ScrollArea h={`${size?.height * 0.87}px`} className={`${size?.width}px`} style={{ maxHeight: '80%' }}>
                    <h1>Acasă </h1>
                    <div className={'flex flex-row'}>
                    <Card withBorder shadow={'md'} radius={'lg'} className={'w-[70%]'}>
                        <p className={'font-semibold text-xl'}>Detalii despre contul tău</p>
                        <Card style={{
                            backgroundImage: "url(login-bg.jpg)",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }} radius={'lg'}>
                            <div className='flex flex-col'>
                                <div className='flex flex-col'>
                                    <Text className={'font-semibold text-white'}>Suma totală </Text>
                                    <div className={' flex flex-row justify-between'}>
                                        <Text className={'font-semibold text-white'}>0.00 RON</Text>
                                        <Button variant={'filled'} radius={'lg'} className={'text-black'} color={'gray.0'}>
                                            Detalii
                                            <IconArrowForwardUp className={'-mt-1 ml-1 -mr-1'} size={20} />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                        <div className={'grid grid-cols-3 gap-4 mt-10'}>
                            <UnstyledButton onClick={() => setShowCardDetails(!showCardDetails)}>
                                <Card withBorder className="w-[280px] h-[140px] flex flex-col justify-between p-4" radius="lg"
                                      style={{
                                          borderColor: '#ffffff', // VISA blue color
                                          borderWidth: '3px', // Border width
                                          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Shadow
                                          background: 'linear-gradient(45deg, #ffffff, #0f4fff)', // Gradient background
                                          borderRadius: '10px', // Border radius
                                          fontFamily: 'Arial, sans-serif', // Font family
                                      }}>
                                    <div className="text-sm text-blue-950">Ana-Maria Cicoare</div>
                                    <div className="text-xl font-bold text-gray-800 mt-2">**** **** **** 1234</div>
                                    <div className="flex justify-between items-center">
                                        <img src="/visa-logo.svg" alt="Visa Logo" className="h-[60px] -mb-3" />
                                        <div className="text-black -mb-3 font-semibold">Expira: 12/24</div>
                                        <div className="text-black -mb-3 font-semibold">CVV: 111</div>
                                    </div>
                                </Card>
                            </UnstyledButton>

                            <UnstyledButton>
                                <Card className="w-[280px] h-[140px] flex justify-center items-center font-semibold"
                                      withBorder
                                      radius="lg"
                                      style={{
                                          borderStyle: 'dotted',
                                          borderColor: '#878787', // Adjust the color as needed
                                          borderWidth: '4px', // Increase the width of the border
                                          gap: '10px', // Adjust the distance between points
                                      }}>
                                    <Text>Creează un card nou </Text>
                                    <IconArrowRight />
                                </Card>
                            </UnstyledButton>

                        </div>
                    </Card>
                    {showCardDetails && (
                        <React.Fragment className="w-[300px] h-[200px] flex justify-center items-center font-semibold"
                             style={{
                                 borderStyle: 'dotted',
                                 borderColor: '#878787', // Adjust the color as needed
                                 borderWidth: '4px', // Increase the width of the border
                                 gap: '10px', // Adjust the distance between points
                             }}>
                            <Card withBorder shadow={'lg'} radius={'lg'} className={'w-[28%] ml-3'}>
                                <div className="flex flex-col justify-center items-center h-full">
                                    <Card withBorder
                                          className="w-[170px] h-[280px] flex flex-row-reverse justify-between p-4"
                                          radius="lg"
                                          style={{
                                              borderColor: '#ffffff', // VISA blue color
                                              borderWidth: '3px', // Border width
                                              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Shadow
                                              background: 'linear-gradient(45deg, #ffffff, #0f4fff)', // Gradient background
                                              borderRadius: '10px', // Border radius
                                              fontFamily: 'Arial, sans-serif', // Font family
                                          }}>
                                        <div className="text-sm text-blue-950"
                                             style={{writingMode: 'vertical-rl', textOrientation: 'mixed'}}>Ana-Maria
                                            Cicoare
                                        </div>
                                        <div className="text-xl font-bold text-gray-800"
                                             style={{writingMode: 'vertical-rl', textOrientation: 'mixed'}}>**** ****
                                            **** 1234
                                        </div>
                                        <div className="flex justify-between items-center"
                                             style={{writingMode: 'vertical-rl', textOrientation: 'mixed'}}>
                                            <img src="/visa-logo.svg" alt="Visa Logo"
                                                 className="h-[60px] -mb-3 rotated-image"/>
                                            <div className="text-black -mb-3 font-semibold">Expira: 12/24</div>
                                            <div className="text-black -mb-3 font-semibold">CVV: 111</div>
                                        </div>
                                    </Card>
                                    <Card className="flex flex-col justify-between p-4 mt-4"
                                          radius="lg">

                                        <Card withBorder className="flex flex-col justify-between p-4 mt-4 shadow-lg"
                                              radius="lg">
                                            <div className={'flex flex-row justify-between'}>
                                                <Text className={'font-semibold'}>TOTAL: </Text>
                                                <Text className={'ml-2'}> 0.00 RON</Text>
                                            </div>
                                        </Card>

                                        <div className={'flex flex-row mt-5'}>
                                            <Text className={'font-semibold'}>NUMAR CARD: </Text>
                                            <Text className={'ml-2'}> 1234 1234 1234 1234</Text>
                                        </div>
                                        <div className={'flex flex-row'}>
                                            <Text className={'font-semibold'}>Data expirarii: </Text>
                                            <Text className={'ml-2'}> 12/24</Text>
                                        </div>
                                        <div className={'flex flex-row'}>
                                            <Text className={'font-semibold'}>CVV: </Text>
                                            <Text className={'ml-2'}> 353</Text>
                                        </div>

                                    </Card>
                                </div>
                            </Card>
                        </React.Fragment>
                    )}
                    </div>
                </ScrollArea>
            </div>
        </React.Fragment>
    );
}
