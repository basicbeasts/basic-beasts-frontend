import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useReducer,
  useState,
  Fragment,
} from "react"
import styled from "styled-components"
import {
  Column,
  Table as ReactTable,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  FilterFn,
  ColumnDef,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table"

import {
  RankingInfo,
  rankItem,
  compareItems,
} from "@tanstack/match-sorter-utils"

import { Menu, Transition } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/solid"
import Link from "next/link"

const Container = styled.div`
  color: #fff;

  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 50px;
  line-height: 1.5em;
  margin-bottom: 120px;
  @media (max-width: 800px) {
    padding: 0 5px;
  }
`

const InputContainer = styled.div`
  display: flex;

  margin-right: 20px;
  @media (max-width: 800px) {
    margin-right: 0;
  }
`

const TableRowWrapper = styled.div`
  border-radius: 15px;
  background-color: #212127;
  width: 100%;
  align-items: center;
  display: flex;
  padding: 20px;
  @media (max-width: 800px) {
    padding: 5px;
  }
`

const Label = styled.div`
  color: #bc9d24;
  font-size: 0.5em;
  @media (max-width: 800px) {
    font-size: 14px;
    line-height: 10px;
  }
`

const TableStyles = styled.div`
  padding: 1rem;
  color: #2c3042;
  font-size: 1.2em;
  @media (max-width: 800px) {
    padding: 0;
  }
  table {
    border-collapse: separate;
    border-spacing: 0 20px;
    width: 100%;
    @media (max-width: 800px) {
      border-spacing: 0 15px;
    }
    tbody {
    }

    tr {
      cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
          14 0,
        pointer !important;
      :last-child {
        td {
          border-bottom: 0;
        }
      }

      &:hover {
        transform: scale(1.005);
        .name {
          color: #cead29;
        }
        .imgProfilePicture {
          border: solid 2px #e4be23;
          background: #e4be23;
        }
      }
    }

    .name {
      overflow: hidden;
      color: #e4be23;
    }
    .address {
      margin: auto;
    }
    @media (max-width: 800px) {
      .name {
        font-size: 14px;
      }
      .hunterScore,
      .numberOfBeastsCollected {
        font-size: 20px;
      }
      .avatar {
        padding: 0;
      }
    }
    /* .numberOfBeastsCollected {
      text-align: right;
    }
    .hunterScore {
      text-align: right;
    } */
    .rankByTotalBeasts {
      margin-left: -55px;
      @media (max-width: 800px) {
        margin-left: -30px;
      }
    }
    .rankByHunterScore {
      margin-left: 15px;
      @media (max-width: 800px) {
        margin-left: 0px;
      }
    }
    .rankByHunterScore,
    .rankByTotalBeasts {
      width: 60px;
      font-size: 3em;
      @media (max-width: 800px) {
        font-size: 20px;
        width: 30px;
      }
    }
    .numberOfBeastsCollected {
      width: 150px;
      @media (max-width: 800px) {
        width: auto;
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border: none;
      /* border-right: 1px solid black; */
      font-weight: 400;
      text-align: left;
      font-size: 2em;

      :last-child {
        border-right: 0;
      }
    }
  }
  .pagination {
    padding: 0.5rem;
  }

  width: 100%;
  overflow: hidden;
  overflow-x: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`

const Img = styled.img`
  width: 60px;
  max-width: none;
  border-radius: 6px;
  margin-right: 5px;

  /* border: solid 2px #e4be23;
  background: #e4be23; */
  @media (max-width: 800px) {
    width: 40px;
  }
`

type Person = {
  rankByHunterScore: number
  rankByTotalBeasts: number
  address: string
  numberOfBeastsCollected: number
  hunterScore: number
  name: string
  avatar: string
  findName: string
}

const defaultData: Person[] = [
  // {
  //   rankByHunterScore
  //   address: "0x805727b65285a84d",
  //   numberOfBeastsCollected: 10,
  //   hunterScore: 1500,
  //   name: "three",
  // },
  // {
  //   address: "0x16af873a66616a17",
  //   numberOfBeastsCollected: 8,
  //   hunterScore: 120,
  //   name: "one",
  // },
  // {
  //   address: "0x624d7ad010c7092e",
  //   numberOfBeastsCollected: 5,
  //   hunterScore: 50,
  //   name: "two",
  // },
]

// Guide 1: Easy way to make columns
const columnHelper = createColumnHelper<Person>()

const columns = [
  columnHelper.accessor("rankByHunterScore", {
    header: () => <span>Rank</span>,
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("rankByTotalBeasts", {
    header: () => <span>Rank</span>,
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("avatar", {
    cell: (tableProps: any) => (
      <Img
        className="imgProfilePicture"
        src={tableProps.row.original.avatar}
        alt="avatar"
      />
    ),
  }),
  columnHelper.accessor("name", {
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("address", {}),
  columnHelper.accessor("findName", {}),
  columnHelper.accessor("numberOfBeastsCollected", {
    header: () => "Age",
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("hunterScore", {
    header: () => <span>Hunter Score</span>,
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
]
const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank,
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

type Props = {
  hunterData: any
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ")
}

const RankByButton = styled.div`
  border-radius: 10px;
  border: solid #bc9d24 2px;
  background: transparent;
  outline: none;
  &::placeholder {
    color: #bc9d24;
  }
  text-transform: uppercase;
  width: 150px;
  font-size: 1em;
  color: #bc9d24;
  &:hover {
    background: transparent;
  }
  display: flex;
  align-items: center;
  padding: 8px;
  padding-left: 15px;
  display: table;
  clear: both;
  .rank-by {
    float: left;
  }
  svg {
    float: right;
    margin-top: 5px;
    margin-right: 3px;
  }
  @media (max-width: 800px) {
    width: 120px;
  }
  @media (max-width: 330px) {
    .rank-by {
      display: none;
    }
    width: auto;
    svg {
      margin: 0;
    }
    padding: 12px;
  }
`

const DropDownList = styled.div`
  background-color: #212127;
  color: #bc9d24;
  border-radius: 10px;
`

const ChangePageButton = styled.button`
  border-radius: 10px;
  border: solid #bc9d24 2px;
  background: transparent;
  outline: none;
  &::placeholder {
    color: #bc9d24;
  }
  text-transform: uppercase;
  font-size: 1em;
  color: #bc9d24;
  &:hover {
    background: transparent;
  }
  &:disabled {
    cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABFklEQVRYR9WXURLDIAhE6/0PbSdOtUpcd1Gnpv1KGpTHBpCE1/cXq+vrMph7dGvXZTtpfW10DCA5jrH1H0Jhs5E0hnZdCR+vb5S8Nn8mQCeS9BdSalYJqMBjAGzq59xAESN7VFVUgV8AZB/dZBR7QTFDCqGquvUBVVoEtgIwpQRzmANSFHgWQKExHdIrPeuMvQNDarXe6nC/AutgV3JW+6bgqQLeV8FekRtgV+ToDKEKnACYKsfZjjkam7a0ZpYTytwmgainpC3HvwBocgKOxqRjehoR9DFKNFYtOwCGYCszobeCbl26N6yyQ6g8X/Wex/rBPsNEV6qAMaJPMynIHQCoSqS9JSMmwef51LflTgCRszU7DvAGiV6mHWfsaVUAAAAASUVORK5CYII=),
      auto !important;
    opacity: 0.4;
    border: none;
  }
  display: flex;
  align-items: center;
  padding: 2px 18px;

  @media (max-width: 330px) {
    .pageSize {
      display: none;
    }
  }
`

const Select = styled.select`
  border-radius: 10px;
  border: solid #bc9d24 2px;
  background: transparent;
  outline: none;
  &::placeholder {
    color: #bc9d24;
  }
  text-transform: uppercase;
  font-size: 1em;
  color: #bc9d24;
  &:hover {
    background: transparent;
  }
  display: flex;
  align-items: center;
  padding: 6.8px 18px;

  option {
    background-color: #212127;
    color: #bc9d24;
  }
`

// const Option = styled.option`
//
// `
const PaginationDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 30px;
`

const A = styled.a`
  font-size: 1em;
`

const DropDown: FC<{ setRankBy: any; setSorting: any }> = ({
  setRankBy,
  setSorting,
}) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button>
          <RankByButton>
            <span className="rank-by">Rank by</span>
            <ChevronDownIcon
              className="-mr-1 ml-2 h-5 w-5"
              aria-hidden="true"
            />
          </RankByButton>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <DropDownList>
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <A
                    onClick={() => {
                      setRankBy("hunter score")
                      setSorting([
                        {
                          id: "rankByHunterScore",
                          desc: false,
                        },
                      ])
                    }}
                    className={classNames(
                      active ? "bg-gray-700" : "",
                      "block px-4 py-2 text-sm",
                    )}
                  >
                    Hunter Score
                  </A>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <A
                    onClick={() => {
                      setRankBy("total beasts")
                      setSorting([
                        {
                          id: "rankByTotalBeasts",
                          desc: false,
                        },
                      ])
                    }}
                    className={classNames(
                      active ? "bg-gray-700" : "",
                      "block px-4 py-2 text-sm",
                    )}
                  >
                    Total Beasts
                  </A>
                )}
              </Menu.Item>
            </div>
          </DropDownList>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

const RankingList: FC<Props> = ({ hunterData }) => {
  const [rankBy, setRankBy] = useState<"hunter score" | "total beasts">(
    "hunter score",
  )
  const [globalFilter, setGlobalFilter] = useState("")
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "rankByHunterScore",
      desc: false,
    },
  ])

  useEffect(() => {
    if (hunterData != null) {
      setData(hunterData)
    }
    // Set Page Size here
    table.setPageSize(100)
  }, [hunterData])

  const [data, setData] = useState(() => [...defaultData])

  //   const rerender = useReducer(() => ({}), {})[1]
  // used for rerender button
  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      sorting,
      globalFilter,
    },
    globalFilterFn: fuzzyFilter,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <TableStyles>
      <Container>
        <div className="p-2">
          <InputContainer>
            <DebouncedInput
              value={globalFilter ?? ""}
              onChange={(value) => setGlobalFilter(String(value))}
              className="p-2 font-lg shadow border border-block"
              placeholder="Search"
            />
            <DropDown setRankBy={setRankBy} setSorting={setSorting} />
          </InputContainer>
          {rankBy == "hunter score" ? (
            <div>Rank by Hunter Score</div>
          ) : (
            <div>Rank by Total Beasts</div>
          )}
          <table>
            <tbody>
              {table.getRowModel().rows.map((row, i) => (
                <tr key={row.id}>
                  <TableRowWrapper>
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className={cell.column.id}>
                        <a
                          href={
                            row.getValue("findName") != ""
                              ? "/profile/" + row.getValue("findName")
                              : "/profile/" + row.getValue("address")
                          }
                        >
                          {/* <div>value: {row.getValue("address")}</div> */}
                          {cell.column.id == "findName" ? (
                            <></>
                          ) : (
                            <>
                              {cell.column.id == "address" ? (
                                <></>
                              ) : (
                                <>
                                  {cell.column.id == "hunterScore" ? (
                                    <Label>Hunter Score</Label>
                                  ) : cell.column.id ==
                                    "numberOfBeastsCollected" ? (
                                    <Label>Total Beasts</Label>
                                  ) : (
                                    <></>
                                  )}

                                  {/* show rank by...*/}
                                  {rankBy == "hunter score" &&
                                  cell.column.id == "rankByTotalBeasts" ? (
                                    <></>
                                  ) : (
                                    <>
                                      {rankBy == "total beasts" &&
                                      cell.column.id == "rankByHunterScore" ? (
                                        <></>
                                      ) : (
                                        <>
                                          {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext(),
                                          )}
                                        </>
                                      )}
                                    </>
                                  )}
                                </>
                              )}
                            </>
                          )}
                        </a>
                      </td>
                    ))}
                  </TableRowWrapper>
                </tr>
              ))}
            </tbody>
          </table>
          <PaginationDiv className="flex items-center gap-2">
            {table.getState().pagination.pageSize <
            table.getPrePaginationRowModel().rows.length ? (
              <>
                {" "}
                <ChangePageButton
                  className="border rounded p-1"
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                >
                  {"<<"}
                </ChangePageButton>
                <ChangePageButton
                  className="border rounded p-1"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  {"<"} <div>&nbsp;</div>
                  <div className="pageSize">
                    {table.getState().pagination.pageIndex == 0 ? (
                      <>
                        {table.getState().pagination.pageSize *
                          table.getState().pagination.pageIndex +
                          1 +
                          "-" +
                          table.getState().pagination.pageSize *
                            (table.getState().pagination.pageIndex + 1)}
                      </>
                    ) : (
                      <>
                        {table.getState().pagination.pageSize *
                          (table.getState().pagination.pageIndex - 1) +
                          1 +
                          "-" +
                          table.getState().pagination.pageSize *
                            (table.getState().pagination.pageIndex - 1 + 1)}
                      </>
                    )}
                  </div>
                </ChangePageButton>
                <ChangePageButton
                  className="border rounded p-1"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  <div className="pageSize">
                    {table.getCanNextPage() ? (
                      <>
                        {table.getState().pagination.pageSize *
                          (table.getState().pagination.pageIndex + 1) +
                          1}
                        -
                        {table.getState().pagination.pageSize *
                          (table.getState().pagination.pageIndex + 2) >
                        table.getPrePaginationRowModel().rows.length ? (
                          <>{table.getPrePaginationRowModel().rows.length}</>
                        ) : (
                          <>
                            {table.getState().pagination.pageSize *
                              (table.getState().pagination.pageIndex + 2)}
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        {
                          table.getState().pagination.pageSize *
                            table.getState().pagination.pageIndex +
                            1 +
                            "-" +
                            table.getPrePaginationRowModel().rows.length
                          // table.getState().pagination.pageSize *
                          //   (table.getState().pagination.pageIndex - 1 + 2)
                        }
                      </>
                    )}
                  </div>
                  <div>&nbsp;</div>
                  {">"}
                </ChangePageButton>
                <ChangePageButton
                  className="border rounded p-1"
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                >
                  {">>"}
                </ChangePageButton>
              </>
            ) : (
              <></>
            )}
          </PaginationDiv>

          <div className="h-4" />
        </div>
      </Container>
    </TableStyles>
  )
}
//  }

const Input = styled.input`
  border-radius: 10px;
  border: solid #bc9d24 2px;
  background: transparent;
  outline: none;
  &::placeholder {
    color: #bc9d24;

    text-transform: uppercase;
  }
  margin: 0 20px 20px;
  padding-left: 15px;
  width: 100%;
  @media (max-width: 800px) {
    margin: 0 10px 20px 0px;
  }
`
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value])

  return (
    <Input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  )
}

export default RankingList
