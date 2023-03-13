import { FC, useEffect, useState, useCallback } from "react"
import styled from "styled-components"
import arrow from "public/arrowIcon.svg"

type Props = {}

const FiltersDiv = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  display: grid;
  grid-template-columns: 48% 48%;
  gap: 4%;
  margin-bottom: 1rem;

  & h3 {
    @media (max-width: 450px) {
      font-size: 1rem;
    }
  }
`

const StarLevel = styled.div`
  /* background-color: #262d38; */
  background-color: #212127;
  border-radius: 10px;
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & h3 {
    float: left;
    width: fit-content;
  }

  &:hover {
    cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
        14 0,
      pointer !important;
  }
`

const StarDropdown = styled.div`
  /* background-color: #262d38; */
  background-color: #212127;
  border-radius: 10px;
  padding: 0.5rem 1rem;
  position: absolute;
  top: 120%;
  left: 0;
  width: 48%;
  z-index: 3;

  & ul > li {
    padding: 0.2rem 0;
    &:hover {
      background-color: #181d24;
      cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
          14 0,
        pointer !important;
    }
  }
`

const SkinType = styled.div`
  /* background-color: #262d38; */
  background-color: #212127;
  border-radius: 10px;
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & h3 {
    float: left;
    width: fit-content;
  }

  &:hover {
    cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
        14 0,
      pointer !important;
  }
`

const SkinDropdown = styled.div`
  /* background-color: #262d38; */
  background-color: #212127;
  border-radius: 10px;
  padding: 0.5rem 1rem;
  position: absolute;
  top: 120%;
  right: 0;
  width: 48%;
  z-index: 3;
  padding: 1rem;
  & ul > li {
    padding: 0.2rem 0;

    &:hover {
      background-color: #181d24;
      cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
          14 0,
        pointer !important;
    }
  }
`

const Arrow = styled.img`
  transform: rotate(180deg);
  display: flex;
  float: right;
  height: 1rem;

  &.opened {
    transform: rotate(0deg);
  }
`

const Filter = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`

const starMap = ["All", "1 star", "2 star", "3 star"]

const skinMap = [
  "All",
  "Normal",
  "Metallic Silver",
  "Shiny Gold",
  "Cursed Black",
  "Mythic Diamond",
]

const BeastExplorerFilters: any = ({
  selectedFilters,
  setSelectedFilters,
}: any) => {
  const handleStarClick = useCallback(
    (star) => {
      setSelectedFilters({ ...selectedFilters, starLevel: star })
    },
    [selectedFilters, setSelectedFilters],
  )

  const handleSkinClick = useCallback(
    (skin) => {
      setSelectedFilters({ ...selectedFilters, skin: skin })
    },
    [selectedFilters, setSelectedFilters],
  )

  const FilterToggle = ({
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
        <Filter onClick={() => setIsActive(!isActive)}>
          <h3>{title}</h3>
          {isActive ? (
            <Arrow src={arrow.src} />
          ) : (
            <Arrow src={arrow.src} className="opened" />
          )}
        </Filter>
        {isActive && <>{content}</>}
      </>
    )
  }

  const StarLevelDropdown = () => {
    return (
      <>
        <StarDropdown>
          <ul>
            {starMap.map((star: any, idx: number) => (
              <li
                key={idx}
                onClick={() =>
                  idx == 0 ? handleStarClick(star) : handleStarClick(`${idx}`)
                }
              >
                {star}
              </li>
            ))}
          </ul>
        </StarDropdown>
      </>
    )
  }

  const SkinTypeDropdown = () => {
    return (
      <>
        <SkinDropdown>
          <ul>
            {skinMap.map((skin: any, id: any) => (
              <li key={id} onClick={() => handleSkinClick(skin)}>
                {skin}
              </li>
            ))}
          </ul>
        </SkinDropdown>
      </>
    )
  }

  return (
    <>
      <FiltersDiv>
        <StarLevel>
          <FilterToggle
            title={
              selectedFilters.starLevel == "All"
                ? "Star level"
                : selectedFilters.starLevel + " star"
            }
            content={StarLevelDropdown()}
            defaultActive={false}
          />
        </StarLevel>

        <SkinType>
          <FilterToggle
            title={
              selectedFilters.skin == "All"
                ? "Sort by Skin"
                : selectedFilters.skin
            }
            content={SkinTypeDropdown()}
            defaultActive={false}
          />
        </SkinType>
      </FiltersDiv>
    </>
  )
}

export default BeastExplorerFilters
