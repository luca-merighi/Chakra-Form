import {useState} from 'react'
import useAuth from '@/data/hook/useAuth'

import {Flex, InputGroup, Input, InputRightAddon, useToast} from '@chakra-ui/react'
import {HiOutlinePencil} from 'react-icons/hi'

export default function EditUserProfile() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const {editUsername, editUserEmail} = useAuth()

    const toast = useToast()

    async function handleEditUsername() {
        if(name == '') {
            toast({
                title: 'Digite um nome de usuário',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top'
            })
        } else {
            await editUsername(name)
        }
    }

    async function handleEditEmail() {
        if(email == '') {
            toast({
                title: 'Digite um E-mail',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top'
            })
        } else {
            await editUserEmail(email)
        }
    }

    return (
        <Flex flexDirection="column" gap="4">
            <InputGroup size="lg">
                <Input 
                type="text"
                placeholder="Alterar nome"
                value={name}
                onChange={e => setName(e.target.value)}
                bgColor="gray.300"
                _hover={{bg: 'gray.200'}}
                variant="filled" />
                <InputRightAddon 
                border="none" children={<HiOutlinePencil />}
                cursor="pointer"
                bgColor="gray.300"
                _hover={{bg: 'gray.200'}}
                onClick={handleEditUsername} />
            </InputGroup>

            <InputGroup size="lg">
                <Input 
                type="email"
                placeholder="Alterar E-mail"
                value={email}
                onChange={e => setEmail(e.target.value)}
                bgColor="gray.300"
                _hover={{bg: 'gray.200'}}
                variant="filled" />
                <InputRightAddon 
                border="none" children={<HiOutlinePencil />}
                cursor="pointer"
                bgColor="gray.300"
                _hover={{bg: 'gray.200'}}
                onClick={handleEditEmail} />
            </InputGroup>
        </Flex>
    )
}