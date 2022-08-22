import { FC, useState } from "react"
import styled from "styled-components"
import ShinyImg from "public/packs/pack_pf/shiny.png"
import PersonalDexiconModal from "../PersonalDexiconModal"
import NextLink from "next/link"
import beastTemplates from "data/beastTemplates"
import { useRouter } from "next/router"
import profiles from "data/profiles"
import ChangeProfilePictureModal from "../ChangeProfilePictureModal"
import { IsAny } from "@tanstack/react-table"

const Container = styled.div`
  background: #1e1e23;
  color: #e4be23;
  border-radius: 15px;
  padding: 35px 0px 0px;
  margin-top: -30%;
  filter: drop-shadow(0 1px 10px #383232);
`
const CardImage = styled.img`
  width: 180px;
  cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
      14 0,
    pointer !important;
  border-radius: 10px;
`

const CardImageNoPointer = styled.img`
  width: 180px;
  border-radius: 10px;
`

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const Content = styled.div`
  margin-top: 20px;
  text-align: center;
  line-height: 2em;
  width: 300px;
  height: 220px;
`

const ProfileName = styled.div`
  font-size: 2em;
`
const ProfileAddress = styled.div`
  font-size: 1.5em;
`

const ToolTipText = styled.span`
  visibility: hidden;
  width: 200px;
  background-color: rgba(0, 0, 0);
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 10px;
  position: absolute;
  z-index: 1;
  bottom: 100%;
  right: -88px;
  font-size: 1em;
  text-transform: capitalize;

  @media (max-width: 1010px) {
    width: 340px;
    font-size: 4vw;
    margin-left: -170px;
  }

  //bottom arrow
  ::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: black transparent transparent transparent;
  }
`

const ToolTip = styled.div`
  position: relative;
  display: inline-block;
  &:hover span {
    visibility: visible;
  }
`

const FlowSVG = styled.svg``

const Address = styled.div`
  margin-left: 5px;

  cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
      14 0,
    pointer !important;
`
const HunterScore = styled.div`
  margin-top: 30px;
  font-size: 1.5em;
  text-transform: uppercase;
`
const Rank = styled.div`
  border-left: 1px solid #5c5e6c;

  border-right: 1px solid #5c5e6c;

  cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
      14 0,
    pointer !important;
`

const PersonalDexicon = styled.div`
  cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
      14 0,
    pointer !important;
`

const TotalBeasts = styled.div``

const HunterStats = styled.div`
  background: #1a1a1a;
  border-radius: 0 0 15px 15px;
  text-align: center;
  padding: 15px 5px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-flow: row;
  line-height: 16px;
`
const Label = styled.div`
  font-size: 0.9em;
  text-transform: capitalize;
`

type Props = {
  hunterScore: any
  dexicon: any
  profile: any
  profilePicture: any
  setProfilePicture: any
  userAddr: any
}

const ProfileCard: FC<Props> = ({
  hunterScore,
  dexicon,
  profile,
  profilePicture,
  setProfilePicture,
  userAddr,
}) => {
  const router = useRouter()
  const { address }: any = router.query

  const [open, setOpen] = useState(false)

  const [open2, setOpen2] = useState(false)

  return (
    <Container>
      <PersonalDexiconModal
        open={open}
        setOpen={setOpen}
        dexicon={dexicon}
        profileName={profile?.name}
      />
      <ChangeProfilePictureModal
        open={open2}
        setOpen={setOpen2}
        profile={profile}
        profilePicture={profilePicture}
        setProfilePicture={setProfilePicture}
      />

      <ImageContainer>
        {userAddr == address ? (
          <CardImage src={profilePicture} onClick={() => setOpen2(true)} />
        ) : (
          <CardImageNoPointer src={profilePicture} />
        )}
      </ImageContainer>
      <Content>
        {/* <ProfileName>
          {profiles[address as keyof typeof profiles] != null
            ? profiles[address as keyof typeof profiles].name
            : "no name"}
        </ProfileName> */}

        <ProfileName>{profile != null ? profile.name : <></>}</ProfileName>
        <ProfileAddress>
          {/* <div>-bz.find</div> */}
          <ToolTip>
            <FlowSVG
              width="15"
              height="16"
              viewBox="0 0 13 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8111 5.08545H7.92871V7.97557H10.8111V5.08545Z"
                fill="#e4be23"
              />
              <path
                d="M5.04471 9.05855C5.04471 9.27291 4.9813 9.48245 4.8625 9.66068C4.7437 9.83891 4.57484 9.97782 4.37728 10.0599C4.17972 10.1419 3.96233 10.1633 3.7526 10.1215C3.54287 10.0797 3.35022 9.97648 3.19901 9.82491C3.04781 9.67334 2.94484 9.48023 2.90312 9.26999C2.8614 9.05976 2.88281 8.84184 2.96464 8.6438C3.04648 8.44576 3.18505 8.2765 3.36285 8.15741C3.54065 8.03832 3.74969 7.97476 3.96353 7.97476H5.04471V5.08545H3.96353C3.17962 5.08545 2.41331 5.31847 1.76151 5.75504C1.10971 6.19161 0.601697 6.81212 0.301707 7.53811C0.00171719 8.2641 -0.0767736 9.06296 0.0761598 9.83367C0.229093 10.6044 0.606583 11.3123 1.16089 11.868C1.7152 12.4236 2.42143 12.802 3.19028 12.9553C3.95913 13.1086 4.75606 13.0299 5.4803 12.7292C6.20454 12.4285 6.82356 11.9193 7.25908 11.2659C7.69459 10.6125 7.92705 9.84436 7.92705 9.05855V7.97476H5.04471V9.05855Z"
                fill="#e4be23"
              />
              <path
                d="M9.00845 3.63874H12.252V0.750244H9.00845C7.95751 0.751539 6.95 1.17066 6.20695 1.91566C5.4639 2.66066 5.046 3.67069 5.04492 4.72417V5.08544H7.92726V4.72417C7.92726 4.43658 8.04112 4.16074 8.24384 3.95723C8.44655 3.75372 8.72155 3.63917 9.00845 3.63874V3.63874Z"
                fill="#e4be23"
              />
            </FlowSVG>
            <ToolTipText>Blockchain: Flow</ToolTipText>
          </ToolTip>
          <ToolTip>
            <Address>
              {address.slice(0, 6).concat("...").concat(address.slice(-4))}
            </Address>
          </ToolTip>
        </ProfileAddress>
        {/* <pre>{JSON.stringify(profile, null, 2)}</pre> */}
        <HunterScore>
          Hunter Score
          {hunterScore != null ? (
            <div>{hunterScore.toLocaleString()}</div>
          ) : (
            <div>0</div>
          )}
        </HunterScore>
      </Content>
      <HunterStats>
        <PersonalDexicon onClick={() => setOpen(true)}>
          {dexicon != null ? (
            <>
              {Object.keys(dexicon).length}/151<Label>Dexicon</Label>
            </>
          ) : (
            <>
              0/151<Label>Dexicon</Label>
            </>
          )}
        </PersonalDexicon>
        <NextLink href="/rankings">
          <Rank>
            #1<Label>Rank</Label>
          </Rank>
        </NextLink>
        <TotalBeasts>
          2<Label>Total Beasts</Label>
        </TotalBeasts>
      </HunterStats>
    </Container>
  )
}
export default ProfileCard
