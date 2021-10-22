import React, { FC } from 'react'
import styled from 'styled-components'

const Container = styled.div`
    min-height: 50vh;
    padding: 0 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 50vh;
    border: solid 15px #93A4BE;
    background: #424F66;
`

const Content = styled.div`
    padding: 5rem 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const H1 = styled.h1`
    margin: 0;
    line-height: 1.15;
    font-size: 4rem;
    color: #fff;
`

const P = styled.p`
    color: #fff;
    line-height: 1.5;
    font-size: 1.5rem;
`

type FuncProps = {
    title: String;
    description: String;
}

const ComingSoon: FC<FuncProps> = ({title, description}) => {
    return (
        <Container>

      <Content>
            <H1>
                {title}
            </H1>

            <P>
                {description}
            </P>
        </Content>
    </Container>
    )
}
export default ComingSoon