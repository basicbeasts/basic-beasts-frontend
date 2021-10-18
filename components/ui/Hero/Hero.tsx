import React, { FC } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import HeroImg from 'public/saber001_reverse.png'

const Container = styled.div`
    padding: 0 0.5rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 50vh;
    min-height: 50vh;
    border: solid 15px #93A4BE;
    background: #424F66;
    @media (max-width: 900px) {
        flex-direction: column;
    }
`

const Content = styled.div`
    //padding: 4rem 0;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: 899px) {
        flex-direction: column;
    }
`

const HeroImage = styled.img`
    width: 200px;
    height: auto;
    margin: 100px;
    user-drag: none;
    -webkit-user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    @media (max-width: 899px) {
        width: 100px;
        margin: 0px;
    }
`

const Description = styled.div`
    max-width: 600px;
    user-select: none;
    @media (max-width: 1010px) {
        max-width: 500px;
    }
`

const P = styled.p`
    color: #fff;
    line-height: 40px;
    font-size: 36px;
    @media (max-width: 1010px) {
        line-height: 30px;
        font-size: 26px;
    }
    @media (max-width: 600px) {
        line-height: 24px;
        font-size: 20px;
        margin: 20px;
    }
`

const Hero: FC = () => {
    return (
        <Container>
            <Content>
                <HeroImage src={HeroImg.src}/>
                <Description>
                    <P>
                    Pokémon-inspired NFT collectibles game made by 10-year old and his brother. 
                    <br/>
                    Collect, evolve, breed, and trade beasts. 
                    <br/>
                    Play-2-earn. 
                    </P>
                </Description>
        </Content>
    </Container>
    )
}
export default Hero