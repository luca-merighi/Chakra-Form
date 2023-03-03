import React, {useState} from 'react'
import Head from 'next/head'

import useAuth from '@/data/hook/useAuth'

import {Box, Flex, Heading, Text, Checkbox, Button, Show, Image, useToast} from '@chakra-ui/react'
import {HiOutlineMail, HiOutlineUser, HiOutlineEye, HiOutlineLogin} from 'react-icons/hi'

import AuthInput from '@/components/AuthInput'

export default function Authentication() {
    const [authMode, setAuthMode] = useState<'login' | 'register'>('register')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, register} = useAuth()
    const [checkbox, setCheckbox] = useState<'agreed' | 'disagreed'>('disagreed')

    const toast = useToast()

    function showErrorMessage(msg) {
        toast({
            title: msg,
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'top'
        })
    }

    function handleCheckbox() {
        checkbox === 'disagreed' ? setCheckbox('agreed') : setCheckbox('disagreed')
    }

    async function handleAuthentication() {
        if(authMode === 'login') {
            if(email == '') {
                showErrorMessage('E-mail incorreto!')
            } else if(password == '') {
                showErrorMessage('Senha incorreta!') 
            } else {
                await login(email, password)
            }   
        } else if(authMode === 'register') {
            if(email == '') {
                showErrorMessage('E-mail incorreto!')
            } else if(password == '') {
                showErrorMessage('Senha incorreta!') 
            } else if(checkbox === 'disagreed') {
                showErrorMessage('Você concorda com nossos Termos e Condições e Política de Privacidade?')
            } else {
                await register(email, password)
            }
        }
    }

    return (
        <React.Fragment>
            <Head>
                <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
                <title>Chakra Form | Register</title>
            </Head>
            <main>  
                <Box 
                height="100vh" width="100vw" bgColor="gray.100"
                display="flex" alignItems="center" justifyContent="space-between">
                    <Flex  justifyContent="center" w={{base: '100%', lg: '75%'}} p={{base: '10', lg: '5'}}>
                        <Flex 
                        flexDirection="column" 
                        gap="4"  
                        height="100%"
                        w={{xl: '40%'}}>
                            <Heading size="lg" fontWeight="500" textColor="gray.800">
                                {authMode === 'register' 
                                ? 'Crie uma conta gratuitamente.' 
                                : 'Faça login com sua conta.'}
                            </Heading>
                            <Text fontSize="xl" textColor="gray.500">
                                Grátis para sempre. Não precisa pagar.
                            </Text>

                            <Flex
                            flexDirection="column" 
                            gap="6">
                                <AuthInput 
                                    label="E-mail"
                                    icon={<HiOutlineMail />}
                                    type="email"
                                    placeholder="Digite seu E-mail"
                                    mandatory
                                    value={email}
                                    changeValue={setEmail} />

                                <AuthInput 
                                    label="Senha"
                                    icon={<HiOutlineEye />}
                                    type="password"
                                    placeholder="Digite sua Senha"
                                    mandatory
                                    value={password}
                                    changeValue={setPassword} />

                                {authMode === 'register' ? (
                                    <Checkbox 
                                    size="md" 
                                    colorScheme="cyan"
                                    onChange={handleCheckbox}>
                                        Ao criar uma conta você concorda com nossos Termos e <br />
                                        Condições e Política de Privacidade.
                                    </Checkbox>
                                ) : false}

                                <Button
                                bgColor="blue.500"
                                _hover={{bg: 'blue.600'}}
                                _active={{bg: 'blue.400'}}
                                textColor="white"
                                fontSize="xl"
                                height="60px"
                                leftIcon={<HiOutlineLogin />}
                                onClick={handleAuthentication}>
                                    {authMode === 'register' ? 'Cadastre-se ' : 'Login'}
                                </Button>

                                {authMode === 'register' ? (
                                    <Text 
                                    textColor="gray.500"
                                    fontSize="lg" 
                                    fontWeight="500"
                                    textAlign="center"
                                    cursor="pointer"
                                    _hover={{textColor: 'blue.500'}}
                                    onClick={() => setAuthMode('login')}>
                                        Já possuí uma conta?
                                    </Text>
                                ) : (
                                    <Text 
                                    textColor="gray.500"
                                    fontSize="lg" 
                                    fontWeight="500"
                                    textAlign="center"
                                    cursor="pointer"
                                    _hover={{textColor: 'blue.500'}}
                                    onClick={() => setAuthMode('register')}>
                                        Fazer Cadastro
                                    </Text>
                                )}

                            </Flex>
                        </Flex>
                    </Flex>
                    <Show breakpoint="(min-width: 1024px)">
                        <Image 
                        src="https://images.unsplash.com/photo-1577762001740-1becf9c5045b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80"
                        height="100vh"
                        w={{lg: '45%'}} />
                    </Show>
                </Box>
            </main>
        </React.Fragment>
    )
}