import {Flex, Text} from '@chakra-ui/react'
import useAuth from '@/data/hook/useAuth'

export default function UserProfileCard() {
    const {user} = useAuth()

    return (
        <Flex 
        flexDirection="column"
        gap="4"
        alignItems="center">
            <Text fontSize="xl" fontWeight="500" textColor="gray.700">
                {user?.name ?? 'Nome'}
            </Text>
            <Text fontSize="xl" fontWeight="500" textColor="gray.700">
                {user?.email ?? 'Email'}
            </Text>
        </Flex>
    )
}