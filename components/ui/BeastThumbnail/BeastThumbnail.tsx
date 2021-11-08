import { useAuth } from "@components/auth/AuthProvider"
import { useUser } from "@components/user/UserProvider"
import React, { FC } from "react"
import styled from "styled-components"
import Spinner from "../Spinner"

const Container = styled.div`
  margin: 1rem auto;
  width: auto;
  justify-items: center;
  align-items: center;
  justify-content: center;
  display: flex;
  background: #424f66;
  padding: 20px;
  border: solid 5px #93a4be;

  user-drag: none;
  -webkit-user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
`

const TextInfo = styled.div`
  margin-right: 20px;
`

const BeastAction = styled.div`
  display: flex;
  flex-direction: column;
  width: 150px;
`

const BeastImg = styled.img`
  max-width: 100px;
  user-drag: none;
  -webkit-user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
`

type FuncProps = {
  beast: any
}

const BeastCard: FC<FuncProps> = ({ beast }) => {
  const { loadingBeast } = useUser()
  const { user } = useAuth()

  return (
    <Container>
      {loadingBeast ? (
        <>
          <div className="lds-ring"></div>
        </>
      ) : (
        <></>
      )}
      <TextInfo>
        <div>Name: {beast.name}</div>
        <div>Dex number: {("00" + beast.dexNumber).slice(-3)}</div>
        <br />
        <div>Beast ID: {beast.beastID}</div>
        <div>Serial number: {beast.serialNumber}</div>
        <div>Gender: {beast.gender}</div>
        <br />
        <div>Type: {beast.elements}</div>
        <br />
        <div>Basic Skills:</div>
        {beast.basicSkills.map((skill: String, i: any) => (
          <div key={i}>{skill}</div>
        ))}
      </TextInfo>
      <BeastAction>
        <BeastImg src={beast.imageURL} />
        <button>Transfer to Bestie</button>
      </BeastAction>
    </Container>
  )
}
export default BeastCard
