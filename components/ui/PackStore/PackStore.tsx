import React, { FC } from 'react'
import styled from 'styled-components'
import BuyCard from '../BuyCard'

const Container = styled.div`
    padding: 10em 3em;
    position: relative;
    -webkit-box-pack: center;
    justify-content: center;
    padding-bottom: 0.5em;
    top: -9.5em;
`

const Content = styled.div`
    padding: 10em 3em;
    position: relative;
    display: flex;
    flex-flow: row wrap;
    -webkit-box-pack: center;
    justify-content: center;
    padding-bottom: 0.5em;
    top: -9.5em;
`

const PackStore: FC = () => {
    return (
        <Container>
            <Content>
                <BuyCard/>
                <BuyCard/>
                <BuyCard/>
            </Content>
        </Container>
    )
}
export default PackStore