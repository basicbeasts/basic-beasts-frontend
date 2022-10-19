import type { NextPage } from "next"
import styled from "styled-components"
import { useAuth } from "@components/auth/AuthProvider"
import "react-toastify/dist/ReactToastify.css"
import Chests from "@components/ui/Chests"

const Spacing = styled.div`
  @media (min-width: 1100px) {
    padding: 100px 0;
  }
`

const Container = styled.div`
  background: black;
  color: white;
  height: 90vh;
  // height: 3000px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 1em;
  text-align: center;
`

const Img = styled.img`
  margin: 0;
`

const Button = styled.button`
  padding: 8px 24px 12px 26px;
  margin-top: 30px;
  margin-right: 2px;
  font-size: 26px;
  background-color: #feff95;
  box-shadow: -3px 0px 0px 0px #a15813, 0px -3px 0px 0px #a15813,
    0px 3px 0px 0px #a15813, 3px 0px 0px 0px #a15813, inset -3px -3px #f3cb23;
  color: #a75806;
  border: none;
  transition: all 0.1s ease 0s;
  -moz-transition: all 0.1s ease 0s;
  -webkit-transition: all 0.1s ease 0s;
  &:active {
    transition: all 0.1s ease 0s;
    -moz-transition: all 0.1s ease 0s;
    -webkit-transition: all 0.1s ease 0s;
    box-shadow: -3px 0px 0px 0px #a15813, 0px -3px 0px 0px #a15813,
      0px 3px 0px 0px #a15813, 3px 0px 0px 0px #a15813, inset 3px 3px #f3cb23;
  }
`

const BlackMarketButton = styled.button`
  padding: 8px 24px 10px 26px;
  margin-top: 30px;
  margin-right: 2px;
  font-size: 26px;
  background-color: #0ae890;
  box-shadow: -3px 0px 0px 0px #097248, 0px -3px 0px 0px #097248,
    0px 3px 0px 0px #097248, 3px 0px 0px 0px #097248, inset -3px -3px #0bc379;
  color: #095436;
  border: none;
  transition: all 0.1s ease 0s;
  -moz-transition: all 0.1s ease 0s;
  -webkit-transition: all 0.1s ease 0s;
  &:active {
    transition: all 0.1s ease 0s;
    -moz-transition: all 0.1s ease 0s;
    -webkit-transition: all 0.1s ease 0s;
    box-shadow: -3px 0px 0px 0px #097248, 0px -3px 0px 0px #097248,
      0px 3px 0px 0px #097248, 3px 0px 0px 0px #097248, inset 3px 3px #0bc379;
  }
`

const BlackMarket: NextPage = () => {
  const { logIn, logOut, user, loggedIn } = useAuth()

  const Completionist = () => {
    return <>{<Chests />}</>
  }

  return (
    <Container>
      {/* <ToastContainer autoClose={4000} position="bottom-right" theme="dark" /> */}
      {loggedIn ? (
        // <>{<Chests />}</>
        <div style={{ color: "#0ae890" }}>
          <Chests />
        </div>
      ) : (
        <>
          <h2 style={{ fontSize: "2em" }}>
            Connect your wallet to view black market
          </h2>
          <Button onClick={() => logIn()}>Connect Wallet</Button>
        </>
      )}
    </Container>
  )
}

export default BlackMarket
