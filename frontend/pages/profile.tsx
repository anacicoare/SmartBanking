import { Card, Image, Text, Badge, Button, Group, Avatar, Space } from '@mantine/core';
import bg from '../public/startpage_bg.jpg';

export default function ProfilePage() {
    return (
        <div className="h-screen relative">
            {/* Top half with the background image */}
            <div 
                className="h-1/2 w-full bg-cover bg-center" 
                style={{backgroundImage: `url(${bg.src})`}}
            />

            {/* Centered card */}
            <div className="absolute inset-0 flex justify-center items-center">
                <Card shadow="sm" padding="xl" radius="md" withBorder className="w-full max-w-3xl">
                    <Group position="center" mt="md">
                        <Avatar src= '../public/user.png' alt="User" radius="xl" size="xl" />
                    </Group>

                    {/* <Group position="apart" mt="md" mb="xs">
                        <Text weight={500} size="xl">Norway Fjord Adventures</Text>
                        <Badge color="pink" variant="light" size="lg">
                            On Sale
                        </Badge>
                    </Group> */}    

                    {/* <Group mt="md" mb="xs" className="flex items-center">
                        <Text weight={500} size="xl" className="ml-32">Nume</Text>
                        <Text weight={500} size="xl" className="ml-64">Prenume</Text>
                    </Group>
                    <Group mt="md" mb="xs" className="flex items-center">
                        <Text weight={500} size="xl" color="dimmed" className="ml-32">Nume backend</Text>
                        <Text weight={500} size="xl" color="dimmed" className="ml-[150px]">Prenume backend</Text>
                    </Group> */}

                    {/* Frontend names */}
                    <Group mt="md" mb="xs" position="center">
                        <Text weight={500} size="xl">Nume</Text>
                        <Text weight={500} size="xl" className="ml-8">Prenume</Text>
                    </Group>

                    {/* Backend names */}
                    <Group mt="md" mb="xs" className="flex justify-center">
                        <Text weight={500} size="xl" color="dimmed" className="mr-8">Nume backend</Text>
                        <Text weight={500} size="xl" color="dimmed" className="ml-8">Prenume backend</Text>
                    </Group>    
                </Card>
            </div>
        </div>
    );
}
