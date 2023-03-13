import { FC, Fragment, useEffect, useState } from "react"
import styled from "styled-components"
import { useRouter } from "next/router"

const FiltersWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 0.5rem;
  max-width: 100%;
  flex-wrap: wrap;
  @media (max-width: 426px) {
    overflow-x: scroll;
    height: 40px;
    flex-wrap: nowrap;
    font-size: 0.8rem;
  }
`

const Filter = styled.div`
  min-width: 120px;
  height: 30px;
  color: white;
  border: 1px solid;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(228, 37, 117, 0.2);
  border-color: rgba(228, 37, 117, 1);
  padding: 0 10px;
  @media (max-width: 426px) {
    padding: 0 8px;
  }
`

const DeleteFilter = styled.div`
  padding-left: 1rem;
  font-size: 1.2rem;

  &:hover {
    cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
        14 0,
      pointer !important;
  }
  @media (max-width: 426px) {
    padding: 0;
  }
`

const ClearAllFiltersBtn = styled(Filter)`
  background-color: rgba(36, 24, 47, 1);
  border-color: rgba(228, 37, 117, 0.2);
  &:hover {
    cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
        14 0,
      pointer !important;
  }
  @media (max-width: 426px) {
    min-width: 90px;
  }
`

interface selectedFilters {
  [key: string]: string[]
}

type Props = {
  selectedFilters: selectedFilters
  setSelectedFilters: React.Dispatch<React.SetStateAction<selectedFilters>>
}

const SelectedFiltersOverview: FC<Props> = ({
  selectedFilters,
  setSelectedFilters,
}) => {
  const router = useRouter()
  const removeFilterOption = (filterName: string, filterValue: string) => {
    if (router.query[filterName]?.includes(",")) {
      const filteredValues = (router.query[filterName] as string)
        ?.split(",")
        .filter((fil: string) => fil !== filterValue)
      const query = { ...router.query, [filterName]: filteredValues.join(",") }
      router.push({ pathname: router.pathname, query }, undefined, {
        shallow: true,
      })
    } else {
      const routerQueryMockup = router.query
      console.log(Object.keys(routerQueryMockup).length)
      if (Object.keys(routerQueryMockup).length <= 1) {
        removeAllFilers()
      } else {
        delete routerQueryMockup[filterName]
        router.push(
          { pathname: router.pathname, query: routerQueryMockup },
          undefined,
          { shallow: true },
        )
      }
    }
  }

  const removeAllFilers = () => {
    setSelectedFilters({
      dexNumber: [],
      skin: [],
      starLevel: [],
      element: [],
      serialNumber: [],
    })
    router.push({ pathname: router.pathname, query: "" }, undefined, {
      shallow: true,
    })
  }

  return (
    <>
      {Object.keys(router.query).length == 0 ? (
        ""
      ) : (
        <>
          <FiltersWrapper>
            <ClearAllFiltersBtn
              onClick={() => {
                removeAllFilers()
              }}
            >
              {" "}
              Clear all
            </ClearAllFiltersBtn>
            {Object.entries(selectedFilters).map((filters) =>
              filters[1].map((filter: any) => {
                return (
                  <Filter key={filter}>
                    <p>
                      {filters[0].charAt(0).toUpperCase() +
                        filters[0].slice(1, filters[0].length)}
                      : {filter}
                    </p>
                    <DeleteFilter
                      onClick={() => removeFilterOption(filters[0], filter)}
                    >
                      <p className="relative bottom-0.5">x</p>
                    </DeleteFilter>
                  </Filter>
                )
              }),
            )}
          </FiltersWrapper>
        </>
      )}
    </>
  )
}

export default SelectedFiltersOverview
