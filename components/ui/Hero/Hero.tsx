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
`

const Content = styled.div`
    //padding: 4rem 0;
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
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
`

const Description = styled.div`
    width: 600px;
    user-select: none;
`

const H1 = styled.h1`
    margin: 0;
    line-height: 1.15;
    font-size: 4rem;
    color: #fff;
`

const P = styled.p`
    color: #fff;
    line-height: 40px;
    font-size: 36px;
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