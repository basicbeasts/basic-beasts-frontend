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
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  FilterFn,
  getFilteredRowModel,
} from "@tanstack/react-table"

import {
  RankingInfo,
  rankItem,
  compareItems,
} from "@tanstack/match-sorter-utils"

import { Menu, Transition } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/solid"

const Container = styled.div`
  color: #fff;

  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 50px;
  line-height: 1.5em;
  margin-bottom: 120px;
`

const InputContainer = styled.div`
  display: flex;

  margin-right: 20px;
`

const TableRowWrapper = styled.div`
  border-radius: 15px;
  background-color: #212127;
  width: 100%;
  align-items: center;
  display: flex;
  padding: 20px;
`

const Label = styled.div`
  color: #bc9d24;
  font-size: 0.5em;
`

const TableStyles = styled.div`
  padding: 1rem;
  color: #2c3042;
  font-size: 1.2em;
  table {
    border-collapse: separate;
    border-spacing: 0 20px;

    width: 100%;
    tbody {
    }

    tr {
      cursor: pointer;
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    .name {
      width: 65%;
      overflow: hidden;
    }
    .rankByTotalBeasts {
      margin-left: -16px;
    }
    .numberOfBeastsCollected {
      width: 150px;
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

type Person = {
  rankByHunterScore: number
  rankByTotalBeasts: number
  address: string
  numberOfBeastsCollected: number
  hunterScore: number
  name: string
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
  columnHelper.accessor("name", {
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
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

  console.log("item Rank" + itemRank)

  // Store the itemRank info
  addMeta({
    itemRank,
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

type Props = {
  allHunterScores: any
  allBeastsCollected: any
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
`

const DropDownList = styled.div`
  background-color: #212127;
  color: #bc9d24;
  border-radius: 10px;
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
            Rank by
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
                          id: "hunterScore",
                          desc: true,
                        },
                      ])
                    }}
                    className={classNames(
                      active ? "bg-gray-100" : "",
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
                          id: "numberOfBeastsCollected",
                          desc: true,
                        },
                      ])
                    }}
                    className={classNames(
                      active ? "bg-gray-100" : "",
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

const RankingList: FC<Props> = ({
  allHunterScores,
  allBeastsCollected,
  hunterData,
}) => {
  const [rankBy, setRankBy] = useState<"hunter score" | "total beasts">(
    "hunter score",
  )
  const [globalFilter, setGlobalFilter] = useState("")
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "hunterScore",
      desc: true,
    },
  ])

  useEffect(() => {
    if (hunterData != null) {
      setData(hunterData)
    }
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
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  <TableRowWrapper>
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className={cell.column.id}>
                        {cell.column.id == "hunterScore" ? (
                          <Label>Hunter Score</Label>
                        ) : cell.column.id == "numberOfBeastsCollected" ? (
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
                      </td>
                    ))}
                  </TableRowWrapper>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="h-4" />
        </div>
      </Container>
    </TableStyles>
  )
}

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
