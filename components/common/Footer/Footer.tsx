import { FC } from "react"
import styled from "styled-components"
import Image from "next/image"
import Link from "next/link"
import TwitterImage from "/public/twitter.png"
import DiscordImage from "/public/discord.png"

const FooterContainer = styled.div`
  user-select: none;
  box-sizing: border-box;
  text-align: center;
  font-family: "Pixelar", sans-serif, arial;
  color: #f9f9f9;
  font-size: 26px;
`

const FooterContent = styled.div`
  position: relative;
  display: flex;
  background-color: #111;
  flex-flow: column nowrap;
  -webkit-box-align: center;
  align-items: center;
  padding: 3em 0px 4em;
`

const NavLogo = styled.a`
  color: #f3cb23;
  cursor: pointer;
  font-size: 50px;
  line-height: 30px;
  margin-left: 20px;
  margin-top: 10px;
  text-transform: capitalize;
`

const Socials = styled.div`
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  min-width: 100px;
  display: flex;
  flex-flow: row nowrap;
  text-align: center;
  align-content: center;
  margin: 2em auto 2em;
`

const LegalLinks = styled.div`
  margin: 2.5em auto 0em;
`

const LegalLink = styled(Link)``

const SocialLink = styled.a`
  font-size: 25px;
`
const A = styled.a`
  margin: 0 10px;
  text-decoration: underline;
  color: #7e7e7e;
  transition: all 0.2s linear;
  cursor: pointer;
`
//<Twitter/>
//

const Footer: FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <Link href="/">
          <NavLogo>Basic Beasts</NavLogo>
        </Link>
        <Socials>
          <SocialLink
            aria-label="Twitter Account"
            href="https://twitter.com/basicbeastsnft"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={TwitterImage} width="40px" height="40px" />
          </SocialLink>
          <SocialLink
            aria-label="Discord Server"
            href="https://discord.gg/mhdKhHDzpK"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={DiscordImage} width="40px" height="40px" />
          </SocialLink>
        </Socials>
        <a href="https://www.onflow.org/" target="_blank" rel="noreferrer">
          Built on Flow Blockchain
        </a>
        {/*<LegalLinks>
                    <LegalLink href="/">
                        <A>Privacy Notice</A>
                    </LegalLink>
                    <LegalLink href="/">
                        <A>Terms &#38; Conditions</A>
                        </LegalLink>
                    <LegalLink href="/">
                        <A>Disclaimer</A>
                    </LegalLink>
                </LegalLinks> */}
      </FooterContent>
    </FooterContainer>
  )
}

export default Footer
