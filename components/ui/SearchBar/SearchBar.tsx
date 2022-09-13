import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import React, { useState, useRef, useEffect, FC } from "react"
import styled from "styled-components"
// import "./SearchBar.css";
import { motion } from "framer-motion"

const SearchDiv = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 2000px;
  flex-direction: column;
`

const ExtraDiv = styled.div`
  display: flex;
  justify-content: center;
  width: auto;
  height: auto;
  position: fixed;
`

const InputDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 600px;
  padding: 8px;
  background: white;
  border: 2px solid rgb(229, 232, 235);
  border-radius: 12px;
  color: rgb(4, 17, 29);
  cursor: text;
  align-items: center;
  height: 48px;
  font-size: 24px;
`

const InputBar = styled.input`
  cursor: text !important;
  background-color: transparent;
  border: none;
  outline: none;
  width: 100%;
  padding: 1px 2px;
`
const IconDiv = styled.div`
  margin-right: 8px;
  max-width: 24px;
  margin-bottom: 5px;
  color: rgb(138, 147, 155);
`
const SuggestionList = styled.div<any>`
  width: 600px;
  background: white;
  border-radius: 10px;
  position: absolute;
  font-size: 24px;
  /* padding: 16px; */
  max-height: 30vw;
  overflow-y: auto;
  transform: translate(0px, 75px);
  &::-webkit-scrollbar {
    display: none;
  }

  p {
    display: flex;
    padding: 4px;

    border-bottom-width: 1px;
    margin: 0;

    align-items: center;
  }
  p:hover {
    box-shadow: rgb(0 0 0 / 16%) 0px 4px 16px;
  }
  /* transition: 10s ease-in-out;
transition-delay: 2s, 4ms;
  opacity: ${({ suggestionsShowing }) => (suggestionsShowing ? "100%" : "0")};
  top: ${({ suggestionsShowing }) => (suggestionsShowing ? "0" : "-100%")}; */
`

const ListWrapper = styled(motion.div)`
  position: absolute;
  left: 0;
  top: 0;
`

const Img = styled.img`
  width: 32px;
  height: 32px;
  margin: 8px 12px;
  object-fit: contain;
  border-radius: 3px;
`

const CategoryName = styled.div`
  padding: 16px;
  border-bottom-width: 1px;
  color: rgb(112, 122, 131);
`

const SearchBar: FC<{ placeholder: any; data: any; beastData: any }> = ({
  placeholder,
  data,
  beastData,
}) => {
  const [filteredData, setFilteredData] = useState([])
  const [filterBeastData, setFilterBeastData] = useState([])
  const [wordEntered, setWordEntered] = useState("")

  useEffect(() => {
    if (data != null) {
      data.sort((a: any, b: any) => (a.findName > b.findName ? 1 : -1))
    }
  }, [data])

  useEffect(() => {
    if (beastData != null) {
      beastData.sort((a: any, b: any) => (a.name > b.name ? 1 : -1))
    }
  }, [beastData])

  // For clearing suggestions when clicking outside
  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setFilteredData([])
          setFilterBeastData([])
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside)
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }, [ref])
  }
  // For clearing suggestions when clicking outside
  const wrapperRef = useRef(null)
  useOutsideAlerter(wrapperRef)

  const handleFilter = (event: any) => {
    const searchWord = event.target.value
    setWordEntered(searchWord)
    const newFilter = data.filter((value: any) => {
      return (
        value.findName.toLowerCase().includes(searchWord.toLowerCase()) ||
        value.address.toLowerCase().includes(searchWord.toLowerCase())
      )
    })

    const newBeastFilter = beastData.filter((value: any) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase())
    })

    if (searchWord === "") {
      setFilteredData([])
      setFilterBeastData([])
    } else {
      setFilteredData(newFilter)
      setFilterBeastData(newBeastFilter)
    }
  }

  const clearInput = () => {
    setFilteredData([])
    setFilterBeastData([])
    setWordEntered("")
  }

  return (
    <SearchDiv>
      <ExtraDiv ref={wrapperRef}>
        <InputDiv>
          <IconDiv>
            <FontAwesomeIcon icon={faSearch} />
          </IconDiv>
          <InputBar
            type="text"
            placeholder={placeholder}
            value={wordEntered}
            onChange={handleFilter}
            onClick={handleFilter}
          />
          <a>
            <IconDiv>
              {wordEntered != "" ? (
                <div id="clearBtn" onClick={clearInput}>
                  {" "}
                  <b> x </b>{" "}
                </div>
              ) : (
                <></>
              )}
            </IconDiv>
          </a>
        </InputDiv>
        {filteredData.length != 0 || filterBeastData.length != 0 ? (
          <ListWrapper
            initial={{ opacity: 0, top: -20 }}
            animate={{ opacity: 1, top: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SuggestionList
              suggestionsShowing={
                filteredData.length != 0 || filterBeastData.length != 0
              }
            >
              {filteredData.length != 0 && <CategoryName>Hunters</CategoryName>}
              {filteredData.slice(0, 15).map((value: any, key: any) => {
                return (
                  <a
                    className="dataItem"
                    href={"/profile/" + value.findName.toLowerCase() + ".find"}
                    target="_self"
                  >
                    <p>
                      {" "}
                      <Img src={value.avatar} />
                      {value.findName}.find{" "}
                    </p>
                  </a>
                )
              })}
              {filterBeastData.length != 0 && (
                <CategoryName>Beasts</CategoryName>
              )}
              {filterBeastData.slice(0, 15).map((value: any, key: any) => {
                return (
                  <a
                    className="dataItem"
                    href={"/profile/" + value.name.toLowerCase()}
                    target="_self"
                  >
                    <p>
                      {" "}
                      <Img src={value.imageTransparentBg} /> {value.name}{" "}
                    </p>
                  </a>
                )
              })}
            </SuggestionList>
          </ListWrapper>
        ) : (
          <></>
        )}
      </ExtraDiv>
    </SearchDiv>
  )
}

export default SearchBar
