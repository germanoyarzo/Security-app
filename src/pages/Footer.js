import {  Facebook, Instagram, MailLockOutlined, Phone, Room, Twitter } from "@mui/icons-material"
import styled  from "styled-components"

const Container = styled.div`
    display: flex;
`

const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
`
const Logo = styled.h1`

`

const Description = styled.p`
    margin: 20px 0px;
`

const SocialContainer = styled.div`
    display: flex;
`

const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${props =>props.color};
    align-items: center;
    justify-content: center;
    margin-right: 20px;
`

const Center = styled.div`
    flex:1;
    padding: 20px;
`

const Title = styled.h3`
    margin-bottom: 30px;
`

const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
`

const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;
`

const Right= styled.div`
    flex:1;
`
const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
`
const Payment = styled.img`
    width: 50%;
`


export default function Footer() {
  return (
    <Container>
        <Left>
            <Logo>Security App</Logo>
            <Description>
                Todos los derechos reservados.
            </Description>
            <SocialContainer>
                <SocialIcon color ="3b5999">
                    <Facebook/>
                </SocialIcon>
                <SocialIcon color ="E4405F">
                    <Instagram/>
                </SocialIcon>  
                <SocialIcon color= "55ACEE">
                    <Twitter/>
                </SocialIcon>      
            </SocialContainer>
        </Left>
      
        <Right>
            <Title>Contacto</Title>
            <ContactItem><Room style ={{ marginRight: "10px"}}/>
                Mar del Plata, Buenos Aires, Argentina
            </ContactItem>
            <ContactItem><Phone style ={{ marginRight: "10px"}}/>
                +54 223 456
            </ContactItem>
            <ContactItem><MailLockOutlined style ={{ marginRight: "10px"}}/>
                contact@gmail.com
            </ContactItem>
        </Right>

    </Container>
  )
}
