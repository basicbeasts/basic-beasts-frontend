import { FC, useState } from "react"
import styled from "styled-components"
import { useRouter } from "next/router"
import FB from "public/social_icons/iconFacebook.svg"
import TW from "public/social_icons/iconTwitter.svg"
import WT from "public/social_icons/iconWhatsapp.svg"
import TG from "public/social_icons/iconTelegram.svg"
import COPY from "public/social_icons/copyIcon.svg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { RefreshIcon } from "@heroicons/react/outline"
import {
  faEllipsisH,
  faShareSquare,
  faHeart as heartFull,
  faCaretUp,
} from "@fortawesome/free-solid-svg-icons"
import { faHeart as heartEmpty } from "@fortawesome/free-regular-svg-icons"

const SocialMedia = styled.div`
  position: relative;
  z-index: 1;
  min-width: fit-content;
  display: grid;
  grid-template-columns: 30% 30% 30%;

  justify-items: center;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  & a {
    padding: 0.5rem;
    & img {
      height: 1.2rem;
      display: inline-block;
    }
  }

  @media (max-width: 400px) {
    justify-content: center;
    margin: 1rem auto 0 auto;
    gap: 1rem;
  }
`

const HeartDiv = styled.div`
  grid-column: 1;
  grid-row: 1;

  &:hover {
    cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
        14 0,
      pointer !important;
  }
`

const ShareDiv = styled.div`
  grid-column: 2;
  grid-row: 1;
  &:hover {
    cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
        14 0,
      pointer !important;
  }
`

const RefreshDiv = styled.div`
  grid-column: 3;
  grid-row: 1;

  display: grid;
  width: fit-content;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  &:hover {
    cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
        14 0,
      pointer !important;
  }

  & p {
    grid-column: 2;

    @media (max-width: 400px) {
      display: none;
    }
  }
`

const Refresh = styled.div`
  width: 1rem;
  height: auto;
  grid-column: 1;
`

const ShareDropdownDiv = styled.div`
  position: absolute;
  top: 150%;
  z-index: 3;
  /* background-color: #262d38; */
  background-color: #212127;
  border-radius: 0.5rem;
  width: 60%;
  /* box-shadow: 0px 0px 10px #626262; */
  border: 1px solid #626262;

  @media (max-width: 1100px) {
    width: 70%;
  }

  & ul {
    list-style-type: none;
    padding: 0;
    width: fit-content;

    & li {
      border-bottom: 0.5px solid #626262;

      &.first {
        &:hover {
          box-shadow: 0px 3px 7px -4px white;
        }
      }

      &.last {
        border-bottom: none;
        &:hover {
          box-shadow: 0px -3px 7px -4px white;
        }
      }

      &:hover {
        cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
            14 0,
          pointer !important;
        /* background-color: #181d24;*/
        box-shadow: 0px 3px 7px -4px white, 0px -3px 7px -4px white;
      }

      & button {
        padding: 1rem;
        display: grid;
        grid-template-columns: 15% 80%;
        gap: 5%;
        width: 100%;
        justify-content: space-between;
        align-items: center;

        & h2 {
          grid-column: 2;
          width: fit-content;
          padding: 0;

          @media (max-width: 1100px) {
            font-size: 0.8rem;
          }
        }
      }
    }
  }
`

const Icon = styled.img`
  grid-column: 1;
  width: 100%;
  height: auto;
  padding: 0;

  &.copy {
    height: 100%;
  }
`

const Share = styled.div`
  display: flex;
  width: fit-content;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  & p {
    @media (max-width: 400px) {
      display: none;
    }
  }
`

const Line = styled.div`
  display: grid;
  grid-template-columns: 15% 80%;
  gap: 5%;
  min-width: fit-content;
  padding: 0.5rem;
  align-items: center;
  border-bottom: 1px solid #505256;

  & h2 {
    grid-column: 2;
    width: fit-content;
  }

  &.last {
    border: none;
  }
`

const SocialMediaShare: FC = ({}) => {
  const router = useRouter()

  const url = "https://www.basicbeasts.io" + router.asPath
  const text = "Check out this Beast! @basicbeastsnft"
  const [heart, setHeart] = useState<any>(heartEmpty)

  function shareTw() {
    window.open(
      "https://twitter.com/intent/tweet?text=" +
        encodeURIComponent(text) +
        "&url=" +
        encodeURIComponent(url),
      "",
      "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=350,width=600",
    )
    return false
  }

  function shareFb() {
    window.open(
      "http://www.facebook.com/share.php?u=" + encodeURIComponent(url),
    )
    return false
  }

  function shareTg() {
    window.open(
      "https://t.me/share/url?url=" +
        encodeURIComponent(url) +
        "&text=" +
        encodeURIComponent(text),
    )
    return false
  }

  function shareWs() {
    window.open(
      "https://wa.me/?text=" +
        encodeURIComponent(text) +
        " " +
        encodeURIComponent(url),
    )
    return false
  }

  const heartChange = () => {
    {
      heart == heartEmpty ? setHeart(heartFull) : setHeart(heartEmpty)
    }
  }

  const testURL = "http://localhost:3000/" + router.asPath

  const copyLink = (e: any) => {
    navigator.clipboard.writeText(testURL)
  }

  const ShareToggle = ({
    title,
    content,
    defaultActive,
  }: {
    title: any
    content: any
    defaultActive: Boolean
  }) => {
    const [isActive, setIsActive] = useState(defaultActive)

    return (
      <>
        <Share onClick={() => setIsActive(!isActive)}>
          <FontAwesomeIcon icon={faShareSquare} />
          <p> {title} </p>
          {isActive && <>{content}</>}
        </Share>
      </>
    )
  }

  const ShareDropdown = () => {
    return (
      <>
        <ShareDropdownDiv>
          <ul>
            <li className="first">
              <button onClick={copyLink}>
                <Icon className="copy" src={COPY.src} />
                <h2>Copy link</h2>
              </button>
            </li>
            <li>
              <button onClick={shareFb}>
                <Icon src={FB.src} />
                <h2>Share on Facebook</h2>
              </button>
            </li>
            <li>
              <button
                id="twitter-share-button"
                className="twitter-share-button"
                onClick={shareTw}
              >
                <Icon src={TW.src} />
                <h2>Share on Twitter</h2>
              </button>
            </li>
            <li>
              <button onClick={shareTg}>
                <Icon src={TG.src} />
                <h2>Share on Telegram</h2>
              </button>
            </li>
            <li className="last">
              <button onClick={shareWs}>
                <Icon src={WT.src} />
                <h2>Share on WhatsApp</h2>
              </button>
            </li>
          </ul>
        </ShareDropdownDiv>
      </>
    )
  }

  function refreshPage() {
    router.reload()
  }

  return (
    <SocialMedia>
      <HeartDiv onClick={() => heartChange()}>
        <FontAwesomeIcon style={{ color: "grey" }} icon={heart} />{" "}
      </HeartDiv>
      <ShareDiv>
        <ShareToggle
          title="Share"
          content={ShareDropdown()}
          defaultActive={false}
        />
      </ShareDiv>
      <RefreshDiv onClick={() => refreshPage()}>
        <Refresh>
          <RefreshIcon />
        </Refresh>

        <p>Refresh</p>
      </RefreshDiv>
    </SocialMedia>
  )
}

export default SocialMediaShare
