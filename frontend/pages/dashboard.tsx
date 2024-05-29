import { useRouter } from 'next/navigation';
import {useContext, useEffect, useState} from "react";
import Layout from "@/contents/layout/Layout";
import React, { useRef} from 'react';
import {Button, Card, Modal, PasswordInput, ScrollArea, Select, Text, TextInput, UnstyledButton} from "@mantine/core";
import { IconArrowBarRight, IconArrowForwardUp, IconArrowRight } from "@tabler/icons-react";
import {useDisclosure} from "@mantine/hooks";
import {useForm} from "@mantine/form";
import Link from "next/link";
import {CardServices} from "@/services/cards/cardservices";
import {ProfileContext} from "@/contexts/ProfileContext";
import { LoansServices } from '@/services/loans/loans';

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
    const [opened, { open, close }] = useDisclosure(false);
    const [showCardDetails, setShowCardDetails] = useState(false);
    const size = useWindowSize();
    const [selectedCardType, setSelectedCardType] = useState<any>('');
    const profile = useContext(ProfileContext);
    const [cards, setCards] = useState<any>([]);
    const [selectedCardDetails, setSelectedCardDetails] = useState<any>({});
    const [totalAmount, setTotalAmount] = useState(0);
    const [loans, setLoans] = useState<any>([]);

    const handleSubmit = (values: any) => {
        CardServices.callApiCreateCard({name: values?.name, type: selectedCardType, email: profile?.profile?.email}).then((response: any) => {
            if (response && response?.data) {
                setCards(response?.data?.cards);
                response?.data?.cards.forEach((card: any) => {
                    setTotalAmount(totalAmount + card?.balance);
                });
                close();
            } else {
                console.log("failed");
            }
        }).catch((error: any) => {
            console.error(error);
        });
    }

    const form = useForm({
        initialValues: { name: ''},

        // functions will be used to validate values at corresponding key
        validate: {
            name: (value) => {
                if (!value) {
                    return 'Name is required';
                }
               return null;
            }
        },
    });

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

    useEffect(() => {
        if(profile?.profile?.email != undefined) {
            CardServices.callApiGetCards(profile?.profile?.email).then((response: any) => {
                if (response && response?.data) {
                    setCards(response?.data?.cards);
                    let total = 0;
                    response?.data?.cards.forEach((card: any) => {
                        total += parseFloat(card?.balance);
                    });
                    setTotalAmount(total);
                } else {
                    console.log("failed");
                }
            }).catch((error: any) => {
                console.error(error);
            });
        }
    }, [profile?.profile?.email]);


    useEffect(() => {
        if (profile?.profile?.email) {
            LoansServices.getAllLoans(profile?.profile?.email).then((response: any) => {
                if (response.status === 200) {
                    console.log("response", response.data);
                    setLoans(response?.data?.loans);
                } else {
                    console.error(response);
                }
            }).catch((error: any) => {
                if (error?.response?.status === 400) {
                    console.error(error?.response?.data);
                }
            });
        }
    }, [profile?.profile?.email]);

    return (
        <React.Fragment >
            <div style={{ backgroundImage: 'url("city.jpg")' }}>
            <Layout />
            <Modal opened={opened} onClose={close} title="Adaugă un nou card" radius={'lg'}>
                <Card>
                    <form noValidate onSubmit={form.onSubmit(handleSubmit)}>
                        <TextInput
                            autoFocus
                            className={'mt-3'}
                            name='name'
                            label="Nume"
                            placeholder="Shopping"
                            required {...form.getInputProps('name')}
                        />
                        <Select
                            data={[
                                {value: 'credit', label: 'Credit'},
                                {value: 'debit', label: 'Debit'},
                            ]}
                            label="Tip card"
                            placeholder="Selectează tipul cardului"
                            value={selectedCardType}
                            onChange={(value: any) => setSelectedCardType(value)}
                            mt="md"
                        />
                        <Button variant="filled" color={'indigo.4'} type='submit' fullWidth mt="xl">
                            Confirm
                        </Button>
                    </form>
                </Card>
            </Modal>
            <div className='absolute left-[18%] top-[7%] mt-7 w-[82%]' >
                <ScrollArea h={`${size?.height * 0.87}px`} className={`${size?.width}px`} style={{maxHeight: '80%'}}>
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
                                            <Text className={'font-semibold text-white'}>{totalAmount} RON</Text>
                                            <Button variant={'filled'} radius={'lg'} className={'text-black'}
                                                    color={'gray.0'}>
                                                Detalii
                                                <IconArrowForwardUp className={'-mt-1 ml-1 -mr-1'} size={20}/>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                            <div className={'grid grid-cols-3 gap-4 mt-10'}>
                                {cards.map((card: any) => {
                                    return <UnstyledButton key={card?.id} onClick={() => {
                                        setShowCardDetails(!showCardDetails);
                                        setSelectedCardDetails(card);
                                    }}>
                                        <Card withBorder
                                              className="w-[280px] h-[140px] flex flex-col justify-between p-4"
                                              radius="lg"
                                              style={{
                                                  borderColor: '#ffffff', // VISA blue color
                                                  borderWidth: '3px', // Border width
                                                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Shadow
                                                  background: 'linear-gradient(45deg, #ffffff, #0f4fff)', // Gradient background
                                                  borderRadius: '10px', // Border radius
                                                  fontFamily: 'Arial, sans-serif', // Font family
                                              }}>
                                            <div className="text-sm text-blue-950">{card?.name}</div>
                                            <div className="text-xl font-bold text-gray-800 mt-2">**** **** **** {card?.card_number.slice(-4)}
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <img src="/visa-logo.svg" alt="Visa Logo" className="h-[60px] -mb-3"/>
                                                <div className="text-black -mb-3 font-semibold">Expira: {card?.expiration_date?.split("-").slice(1).reverse().join("/")}</div>
                                                <div className="text-black -mb-3 font-semibold">CVV: {card?.cvv}</div>
                                            </div>
                                        </Card>
                                    </UnstyledButton>
                                })}

                            <UnstyledButton onClick={open}>
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
                                             style={{writingMode: 'vertical-rl', textOrientation: 'mixed'}}>
                                            {selectedCardDetails?.name}
                                        </div>
                                        <div className="text-xl font-bold text-gray-800"
                                             style={{writingMode: 'vertical-rl', textOrientation: 'mixed'}}>
                                            **** **** **** {selectedCardDetails?.card_number.slice(-4)}
                                        </div>
                                        <div className="flex justify-between items-center"
                                             style={{writingMode: 'vertical-rl', textOrientation: 'mixed'}}>
                                            <img src="/visa-logo.svg" alt="Visa Logo"
                                                 className="h-[60px] -mb-3 rotated-image"/>
                                            <div className="text-black -mb-3 font-semibold">Expira: {selectedCardDetails?.expiration_date?.split("-").slice(1).reverse().join("/")}</div>
                                            <div className="text-black -mb-3 font-semibold">CVV: {selectedCardDetails?.cvv}</div>
                                        </div>
                                    </Card>
                                    <Card className="flex flex-col justify-between p-4 mt-4"
                                          radius="lg">

                                        <Card withBorder className="flex flex-col justify-between p-4 mt-4 shadow-lg"
                                              radius="lg">
                                            <div className={'flex flex-row justify-between'}>
                                                <Text className={'font-semibold'}>TOTAL: </Text>
                                                <Text className={'ml-2'}> {selectedCardDetails?.balance} RON</Text>
                                            </div>
                                        </Card>

                                        <div className={'flex flex-row mt-5'}>
                                            <Text className={'font-semibold'}>NUMAR CARD: </Text>
                                            <Text className={'ml-2'}> {selectedCardDetails?.card_number}</Text>
                                        </div>
                                        <div className={'flex flex-row'}>
                                            <Text className={'font-semibold'}>Data expirarii: </Text>
                                            <Text
                                                className={'ml-2'}> {selectedCardDetails?.expiration_date?.split("-").slice(1).reverse().join("/")}</Text>
                                        </div>
                                        <div className={'flex flex-row'}>
                                            <Text className={'font-semibold'}>CVV: </Text>
                                            <Text className={'ml-2'}> {selectedCardDetails?.cvv}</Text>
                                        </div>
                                        <div className={'flex flex-row'}>
                                            <Text className={'font-semibold'}>Tip: </Text>
                                            <Text className={'ml-2'}> {selectedCardDetails?.type}</Text>
                                        </div>
                                        <div className={'flex flex-row'}>
                                            <Text className={'font-semibold'}>IBAN: </Text>
                                            <Text className={'ml-2'}> {selectedCardDetails?.iban}</Text>
                                        </div>

                                                <Text className='font-semibold mt-4' size={'lg'}>Credite</Text>
                                        {
                                            loans.filter((loan: any) => loan?.iban === selectedCardDetails?.iban).map((loan: any) => { 
                                                return <div key={loan?.id} className={'flex flex-row'}>
                                                    <Text className={'font-semibold'}>{loan?.details}: </Text>
                                                    <Text className={'ml-2'}> {loan?.amount} RON</Text>
                                                </div>
                                            })
                                                
                                        }

                                    </Card>
                                </div>
                            </Card>
                        </React.Fragment>
                    )}
                    </div>
                </ScrollArea>
            </div>
            </div>
        </React.Fragment>
    );
}
