import { FC, useState } from "react"
import picture from "public/beasts/001_normal.png"
import BeastMarketThumbnail from "../BeastMarketThumbnail"
import styled from "styled-components"
import star from "public/basic_starLevel.png"
import pic from "public/profile_pictures/bb_face_028.png"
import {
  faEllipsisH,
  faShareSquare,
  faHeart as heartFull,
} from "@fortawesome/free-solid-svg-icons"
import { faHeart as heartEmpty } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { RefreshIcon } from "@heroicons/react/outline"
import BeastMarketBeastList from "../BeastMarketBeastList"

const StarLevel = styled.div`
  vertical-align: middle;
  position: absolute;
  top: 0;
`

const StarImg = styled.img`
  margin-top: 10px;
  width: 1.2em;
  user-drag: none;
  -webkit-user-drag: none;
  float: left;
`
const Panel = styled.div`
  background: none;
  /* border: 1px solid gray;
  border-radius: 10px; */
  color: #fff;
  cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
      14 0,
    pointer !important;
  padding: 10px;
  margin: 2rem auto;

  text-align: left;
  font-size: 16px;

  outline: none;
  transition: 0.4s;
`
const AccordionTitle = styled.div`
  display: flex;
  gap: 1rem;
  margin-left: 10px;

  font-size: 2rem;
  margin-bottom: 5px;
  /* border-bottom: 1px solid rgba(220, 220, 220, 0.25); */
  line-height: 1;
`
const AccordionContent = styled.div`
  padding: 1rem;
  font-size: 1.2em;
  border: 1px solid grey;
  border-radius: 10px;
  width: max-content;
`
const AccordionDiv = styled.div`
  width: max-content;
`
const BuyButton = styled.button`
  width: 100%;
  background: #ffd966;
  border-radius: 10px;
  color: black;
  font-size: 1.5rem;
  padding: 0.75rem 2rem;
  border: 1px solid grey;
`
const BidButton = styled.button`
  width: 100%;
  background: transparent;
  border-radius: 10px;
  color: white;
  font-size: 1.5rem;
  padding: 0.75rem 2rem;
  border: 1px solid grey;
`

const Property = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 75px;
  @media (max-width: 420px) {
    margin-bottom: 0;
  }
`

const ImgDiv = styled.div`
  position: relative;
  max-width: 40rem;

  border-radius: 10px;
  overflow: hidden;
  margin: 0 auto;
`
const Owners = styled.div`
  display: flex;
  gap: 1rem;
  padding: 2rem 0;
  border-bottom: 1px solid grey;
  width: 100%;
  justify-content: left;
`
const OwnerImg = styled.img`
  max-width: 3.5rem;
  border: solid 2px #f3cb23;
  border-radius: 8px;
  height: max-content;
  object-fit: contain;
`
const Owner = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`

const P = styled.p`
  color: white;
`
const H1 = styled.h1`
  width: 100%;
  font-size: 4.25rem;
  color: white;
`
const H2 = styled.h2`
  font-size: 1.215rem;
  line-height: 0.5;
  color: grey;
`
const H3 = styled.h1`
  width: 100%;
  font-size: 2rem;
  color: white;
`

const Ul = styled.ul`
  font-size: 1.215rem;
  display: flex;
  width: 100%;
  align-items: center;
  gap: 2rem;
`
const Li = styled.li`
  color: grey;
  &:hover {
    cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
        14 0,
      pointer !important;
  }
`
const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const SaleDiv = styled.div`
  display: flex;
  gap: 1.25rem;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  border: 1px solid grey;
  border-radius: 10px;
  padding: 1.5rem;
  width: 110%;
`
const PriceBox = styled.div`
  background: #1e1e23;
  border-radius: 10px;
  padding: 1rem;
  width: 50%;
`
const MoreBeasts = styled.ul`
  display: grid;
  gap: 1.25rem;

  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
`

type Props = {
  beast: any
  beasts: any
}

const ProductBeastView: FC<Props> = ({ beast, beasts }) => {
  const [heart, setHeart] = useState<any>(heartEmpty)

  const heartChange = () => {
    {
      heart == heartEmpty ? setHeart(heartFull) : setHeart(heartEmpty)
    }
  }
  const Accordion = ({
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
      <Panel className="accordion-item" onClick={() => setIsActive(!isActive)}>
        <AccordionTitle>
          <div>{title}</div>
          <div>{isActive ? "-" : "+"}</div>
        </AccordionTitle>
        {isActive && <AccordionContent>{content}</AccordionContent>}
      </Panel>
    )
  }

  return (
    <>
      <section className="flex justify-between mx-5 text-white px-5">
        <div className="mx-auto w-max">
          <ImgDiv>
            <BeastMarketThumbnail
              id={beast.id}
              className="object-cover  group-hover:opacity-90"
              beastTemplateID={beast.beastTemplateID}
            />
            <StarLevel>
              {Array(beast.starLevel)
                .fill(0)
                .map((_, i) => (
                  <StarImg key={i} src={star.src} />
                ))}
            </StarLevel>
          </ImgDiv>
          <AccordionDiv>
            <Accordion
              title="Description"
              content={beast.description}
              defaultActive={true}
            />
          </AccordionDiv>
          <AccordionDiv>
            <Accordion
              title="Properties"
              content={beast.description}
              defaultActive={true}
            />
          </AccordionDiv>
          <AccordionDiv>
            <Accordion
              title="Offers"
              content={beast.description}
              defaultActive={true}
            />
          </AccordionDiv>
        </div>
        <Info>
          <H1>{beast.name + " " + "#" + beast.serialNumber}</H1>
          <Owners>
            <Owner>
              <OwnerImg src={pic.src} alt="" />
              <div>
                <H2>first owner</H2>
                <P>{beast.firstOwner}</P>
              </div>
            </Owner>
            <Owner>
              <OwnerImg src={pic.src} alt="" />
              <div>
                <H2>current owner</H2>
                <P>{beast.currentOwner}</P>
              </div>
            </Owner>
          </Owners>
          <div className="flex w-full p-5 justify-between items-center">
            <Ul>
              <Li onClick={() => heartChange()}>
                <FontAwesomeIcon style={{ color: "grey" }} icon={heart} /> 76
              </Li>
              <Li>
                {" "}
                <FontAwesomeIcon icon={faShareSquare} /> Share
              </Li>
              <Li className="flex gap-2 items-center leading-none">
                <RefreshIcon className="-mr-1 ml-2 h-5 w-5" />
                Refresh
              </Li>
            </Ul>
            <button style={{ color: "grey" }} className=" ">
              <FontAwesomeIcon icon={faEllipsisH} />
            </button>
          </div>
          <SaleDiv>
            <div className="flex gap-5 w-full">
              <PriceBox>
                <H2>Price</H2>
                <H3>{beast.price} FUSD</H3>
              </PriceBox>
              <PriceBox>
                <H2>Highest Floor bid</H2>
                <H3>[price] FUSD</H3>

                <H2>
                  by <span className="text-white">0xsomething</span>
                </H2>
              </PriceBox>
            </div>
            <span>Last sale price [price] ETH</span>
            <BuyButton>Buy now for [price] ETH</BuyButton>
            <BidButton>Place a bid</BidButton>
            <H2>Sale ends in [time]</H2>
          </SaleDiv>
        </Info>{" "}
      </section>
      <section className="mb-24">
        <H1 className="mx-auto text-center">More Basic Beasts</H1>

        {/* <BeastMarketBeastList
          displayBeasts={beasts}
          setOpen={setOpen}
          setDisplayNickname={setDisplayNickname}
        /> */}
      </section>
    </>
  )
}

export default ProductBeastView
