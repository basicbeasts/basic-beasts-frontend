// import type { NextPage } from "next"
// import styled from "styled-components"
// import { TypeAnimation } from "react-type-animation"
// import chest from "public/nft-day-treasure-chest.png"
// import { motion } from "framer-motion"

// const Spacing = styled.div`
//   @media (min-width: 1100px) {
//     padding: 100px 0;
//   }
// `

// const Container = styled.div`
//   background: black;
//   color: white;
//   height: 80vh;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   flex-direction: column;
//   font-size: 1em;
//   text-align: center;
// `

// const Img = styled.img`
//   margin: 0;
// `

// const Button = styled.button`
//   padding: 8px 24px 12px 26px;
//   margin-top: 30px;
//   margin-right: 2px;
//   font-size: 26px;
//   background-color: #feff95;
//   box-shadow: -3px 0px 0px 0px #a15813, 0px -3px 0px 0px #a15813,
//     0px 3px 0px 0px #a15813, 3px 0px 0px 0px #a15813, inset -3px -3px #f3cb23;
//   color: #a75806;
//   border: none;
//   transition: all 0.1s ease 0s;
//   -moz-transition: all 0.1s ease 0s;
//   -webkit-transition: all 0.1s ease 0s;
//   &:active {
//     transition: all 0.1s ease 0s;
//     -moz-transition: all 0.1s ease 0s;
//     -webkit-transition: all 0.1s ease 0s;
//     box-shadow: -3px 0px 0px 0px #a15813, 0px -3px 0px 0px #a15813,
//       0px 3px 0px 0px #a15813, 3px 0px 0px 0px #a15813, inset 3px 3px #f3cb23;
//   }
// `

// const Treasure: NextPage = () => {
//   return (
//     <Container>
//       <Img src={chest.src} />
//       <TypeAnimation
//         // Same String at the start will only be typed once, initially
//         sequence={[
//           "I found this treasure chest on a rocky islet…",
//           1000,
//           "The chest seems to be locked.",
//           1000,
//           "It needs a key…",
//           1000,
//           "I should seek the Hunter community for advice.",
//           1000,
//         ]}
//         speed={50} // Custom Speed from 1-99 - Default Speed: 40
//         style={{ fontSize: "2em" }}
//         wrapper="span" // Animation will be rendered as a <span>
//         repeat={0} // Repeat this Animation Sequence infinitely
//       />
//       <motion.div
//         animate={{ opacity: [0, 1] }}
//         transition={{
//           delay: 15.5,
//         }}
//       >
//         <Button>
//           <a
//             target="_blank"
//             rel="noreferrer"
//             href="https://discord.gg/CG3kfkxb65"
//           >
//             Find The Hunters
//           </a>
//         </Button>
//       </motion.div>
//     </Container>
//   )
// }

// export default Treasure
