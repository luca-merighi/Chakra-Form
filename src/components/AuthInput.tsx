import {Stack, Text, InputGroup, InputLeftAddon, Input} from '@chakra-ui/react'

interface AuthInputProps {
    label: string,
    icon: any,
    type: string,
    placeholder: string,
    mandatory: boolean,
    value: any,
    changeValue: (newValue: any) => void,
}

export default function AuthInput(props: AuthInputProps) {
    return (
        <Stack spacing="4">
            <label>
                <Text fontSize="xl" fontWeight="500" textColor="gray.800">
                    {props.label}
                </Text>
            </label>
            <InputGroup size="lg">
                <InputLeftAddon 
                bgColor="gray.300" 
                border="none" children={props.icon} />
                <Input 
                bgColor="gray.300"
                _hover={{bg: 'gray.200'}}
                variant="filled"
                
                type={props.type}
                placeholder={props.placeholder}
                required={props.mandatory}
                value={props.value}
                onChange={e => props.changeValue?.(e.target.value)} />
            </InputGroup>
        </Stack>
    )
}