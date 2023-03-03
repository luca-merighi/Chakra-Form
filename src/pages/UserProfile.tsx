import React, {useState} from 'react'
import Head from 'next/head'

import {Flex, Heading, Text, Link} from '@chakra-ui/react'
import {HiOutlineLogout} from 'react-icons/hi'
import useAuth from '@/data/hook/useAuth'

import UserProfileCard from '@/components/UserProfileCard'
import EditUserProfile from '@/components/EditUserProfile'

export default function UserProfile() {
    const [layout, setLayout] = useState<'profile' | 'form'>('profile')
    const {logout} = useAuth()

    function handleChangeLayout() {
        if(layout === 'profile') {
            setLayout('form')
        } else if(layout === 'form') {
            setLayout('profile')
        }
    }

    return (
        <React.Fragment>
            <Head>
                <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
                <title>Chakra Form | User Profile</title>
            </Head>
            <main>
                <Flex 
                position="relative"
                width="100vw" height="100vh" 
                alignItems="center" justifyContent="center">
                    <Flex 
                    flexDirection="column" 
                    gap="6"
                    alignItems="center" 
                    justifyContent="center"
                    padding="10"
                    bgColor="gray.100"
                    borderRadius="md">
                        <Heading size="xl" fontWeight="700" textColor="blue.500">
                            User Profile
                        </Heading>
                        {layout === 'profile' ? (
                            <UserProfileCard />
                        ) : (
                            <EditUserProfile />
                        )}

                        <Link
                        onClick={handleChangeLayout}
                        padding="2"
                        display="flex"
                        gap="2" 
                        alignItems="center"
                        bgColor="gray.200"
                        _hover={{bg: 'gray.300'}}
                        _active={{bg: 'gray.100'}}
                        borderRadius="md">
                            {layout === 'profile' ? 'Atualizar Perfil' : 'Voltar'}
                        </Link>
                    </Flex>

                    <Link 
                    onClick={logout}
                    position="absolute"
                    bottom="5"
                    left="5"
                    padding="2"
                    display="flex"
                    gap="2" 
                    alignItems="center"
                    bgColor="gray.200"
                    _hover={{bg: 'gray.300'}}
                    _active={{bg: 'gray.100'}}
                    borderRadius="md">
                        <HiOutlineLogout />
                        Logout
                    </Link>
                </Flex>
            </main>
        </React.Fragment>
    )
}