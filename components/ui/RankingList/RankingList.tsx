import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useReducer,
  useState,
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

const Container = styled.div`
  color: #fff;
`

type Person = {
  address: string
  numberOfBeastsCollected: number
  hunterScore: number
  name: string
}

const defaultData: Person[] = [
  {
    address: "0x805727b65285a84d",
    numberOfBeastsCollected: 10,
    hunterScore: 1500,
    name: "three",
  },
  {
    address: "0x16af873a66616a17",
    numberOfBeastsCollected: 8,
    hunterScore: 120,
    name: "one",
  },
  {
    address: "0x624d7ad010c7092e",
    numberOfBeastsCollected: 5,
    hunterScore: 50,
    name: "two",
  },
]

// Guide 1: Easy way to make columns
const columnHelper = createColumnHelper<Person>()

const columns = [
  {
    Header: "",
    id: "row",
    maxWidth: 50,
    filterable: false,
    Cell: (row: any) => {
      return <div>{row.index}</div>
    },
  },
  columnHelper.accessor("name", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  //   columnHelper.accessor((row) => row.lastName, {
  //     id: "lastName",
  //     cell: (info) => <i>{info.getValue()}</i>,
  //     header: () => <span>Last Name</span>,
  //     footer: (info) => info.column.id,
  //   }),
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

const RankingList: FC<Props> = ({
  allHunterScores,
  allBeastsCollected,
  hunterData,
}) => {
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
    <Container>
      <div className="p-2">
        <div style={{ color: "black" }}>
          <DebouncedInput
            value={globalFilter ?? ""}
            onChange={(value) => setGlobalFilter(String(value))}
            className="p-2 font-lg shadow border border-block"
            placeholder="Search"
          />
        </div>
        <table>
          {/* Header */}
          {/* <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead> */}
          <tbody>
            {table.getRowModel().rows.map((row, index) => (
              <tr key={row.id}>
                <td> {index + 1}</td>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <>
            {/* Footer */}
            {/* <tfoot>
            {table.getFooterGroups().map((footerGroup) => (
              <tr key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot> */}
          </>
        </table>
        <div className="h-4" />
        {/* Rerender Button */}
        {/* <button onClick={() => rerender()} className="border p-2">
          Rerender
        </button> */}
      </div>
    </Container>
  )
}

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
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  )
}

export default RankingList
