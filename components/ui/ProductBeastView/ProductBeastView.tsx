import { FC, useState } from "react"
import picture from "public/beasts/001_normal.png"
import BeastMarketThumbnail from "../BeastMarketThumbnail"
import styled from "styled-components"
import star from "public/basic_starLevel.png"
import pic from "public/profile_pictures/bb_face_028.png"
import dexNumIcon from "public/Dex_number_icon.png"
import {
  faEllipsisH,
  faShareSquare,
  faHeart as heartFull,
  faCaretUp,
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
  padding: 1.5rem;
  font-size: 1.2em;
  border: 1px solid #5c5e6c;
  border-radius: 1rem;
  width: 100%;
`
const AccordionDiv = styled.div`
  width: 100%;
`
const BuyButton = styled.button`
  width: 100%;
  background: #ffd966;
  border-radius: 10px;
  color: black;
  font-size: 1.5rem;
  padding: 0.75rem 2rem;
  border: 1px solid #5c5e6c;
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

const ImgDiv = styled.div`
  position: relative;
  max-width: 40rem;

  border-radius: 1rem;
  overflow: hidden;
  margin: 0 auto;
`
const Owners = styled.div`
  display: flex;
  gap: 1rem;
  padding: 2rem 0;
  border-bottom: 2px solid #2e3340;
  justify-content: left;
  @media (max-width: 1470px) {
    flex-direction: column;
  }
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
const Trait = styled.p`
  line-height: 0;
  text-transform: uppercase;
  margin: 1rem 0;
`
const H1 = styled.h1`
  width: 100%;
  font-size: 4.25rem;
  color: white;
`
const H2 = styled.h2`
  font-size: 1.215rem;
  line-height: 0.75;
  color: grey;
`
const H2Traits = styled.h2`
  font-size: 1.215rem;
  color: white;
`
const H3 = styled.h3`
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
  display: flex;
  gap: 0.5rem;
  align-items: center;
  line-height: 1;
  width: 33.33%;
  color: grey;
  &:hover {
    cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
        14 0,
      pointer !important;
  }
  @media (max-width: 1500px) {
    p {
      display: none;
    }
  }
`
const Attributes = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(4, 1fr);

  @media (max-width: 1430px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 820px) {
    grid-template-columns: repeat(1, 1fr);
  }
`
const AttributeBlock = styled.div`
  display: flex;
  padding: 15px;
  flex-direction: column;
  align-items: start;
  gap: 5px;
  font-size: 1.5rem;
  background: #212127;
  border-radius: 10px;
  color: grey;
  &:last-child {
    grid-column: 1 / -1;
    align-items: center;
    text-align: center;
    color: #f3cb23;
  }
  div {
    color: white;
  }
`
const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 32%;
  // padding: 0 10rem;
`
const SaleDiv = styled.div`
  display: flex;
  gap: 1.25rem;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  border: 1px solid #5c5e6c;
  border-radius: 1.2rem;
  padding: 2.5rem;
  width: 100%;
`
const PriceBox = styled.div`
  background: #1e1e23;
  border-radius: 1rem;
  padding: 1rem;
  width: 50%;
  @media (max-width: 1280px) {
    width: 100%;
  }
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

  const accordionProperties = () => {
    return (
      <div>
        <div className="flex text-3xl mb-5 justify-between">
          <div className="flex w-full gap-2">
            {/* <FontAwesomeIcon style={{ color: "black" }} icon={faCaretUp} /> */}
            <img src={dexNumIcon.src} alt="" />
            <p>Dex number</p>
          </div>
          <span>#{("00" + beast.dexNumber).slice(-3)}</span>
        </div>
        <Attributes>
          <AttributeBlock>
            <Trait>Skin</Trait>
            <H3>{beast.skin}</H3>
          </AttributeBlock>
          <AttributeBlock>
            <Trait>Element</Trait>
            <H3>{beast.elements} </H3>
          </AttributeBlock>
          <AttributeBlock>
            <Trait>Star Level</Trait>
            <H3>{beast.starLevel}</H3>
          </AttributeBlock>
          <AttributeBlock>
            <Trait>Basic Skills</Trait>
            <ul>
              {beast.basicSkills.map((skill: any, id: any) => (
                <li key={id} className="leading-none">
                  <H2Traits>{skill}</H2Traits>
                </li>
              ))}
            </ul>
          </AttributeBlock>
          <AttributeBlock>
            <Trait>Ultimate Skill</Trait>
            <H3>{beast.ultimateSkill} </H3>
          </AttributeBlock>
        </Attributes>
      </div>
    )
  }
  const accordionOffers = () => {
    let offerday = 5
    let offerweek = 3

    return (
      <div>
        <ul>
          {/* {something.map((offer: any) => ( */}
          <li>
            <div className="flex text-3xl mb-5 justify-between">
              <div className="flex flex-col md:flex-row gap-5">
                <OwnerImg src={pic.src} alt="" />
                <div>
                  <span>{/* {offer.name} */}Name</span>
                  <H2>
                    {offerday} day{offerday > 1 && "s "} ago | Expires in{" "}
                    {offerweek} week
                    {offerweek > 1 && "s "} | Floor bid
                  </H2>
                </div>
              </div>
              <span>{/* {offer.price} */}FUSD</span>
            </div>
          </li>
          {/* ))} */}
        </ul>
      </div>
    )
  }

  return (
    <>
      <section className="flex justify-between mx-5 text-white px-5">
        <div className="mx-auto w-1/2">
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
              content={accordionProperties()}
              defaultActive={true}
            />
          </AccordionDiv>
          <AccordionDiv>
            <Accordion
              title="Offers"
              content={accordionOffers()}
              defaultActive={true}
            />
          </AccordionDiv>
        </div>
        <Info>
          <div className="w-11/12">
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
                  <FontAwesomeIcon style={{ color: "grey" }} icon={heart} />{" "}
                  <p>76</p>
                </Li>
                <Li>
                  {" "}
                  <FontAwesomeIcon icon={faShareSquare} /> <p>Share</p>
                </Li>
                <Li>
                  <RefreshIcon className="-mr-1 ml-2 h-5 w-5" />
                  <p>Refresh</p>
                </Li>
              </Ul>
              <button
                style={{ color: "grey", textAlign: "end", width: "100%" }}
              >
                <FontAwesomeIcon icon={faEllipsisH} />
              </button>
            </div>
          </div>
          <SaleDiv>
            <div className="flex flex-col xl:flex-row gap-5 w-full">
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
      <section className="mb-24 mx-auto">
        <H1 className="mx-auto text-center">More Basic Beasts</H1>

        <div className="hidden xl:flex justify-center w-10/12 mx-auto ">
          <BeastMarketBeastList
            displayBeasts={beasts}
            // setOpen={setOpen}
            // setDisplayNickname={setDisplayNickname}
          />
        </div>
      </section>
    </>
  )
}

export default ProductBeastView
