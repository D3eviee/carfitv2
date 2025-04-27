"use client";
import DashboardContentContainer from "@/components/dashboard/dashboard-content-container";
import { useQuery } from "@tanstack/react-query";
import { useReactTable, getCoreRowModel, getSortedRowModel, flexRender, getFilteredRowModel, ColumnFiltersState } from "@tanstack/react-table";
import { getAppointmentsTableData } from "../actions";
import AppointmenDateCell from "@/components/dashboard/appointments/appointments-date-cell"
import AppointmenPriceCell from "@/components/dashboard/appointments/appointments-price-cell"
import AppointmentStatusCell from "@/components/dashboard/appointments/appointments-status-cell"
import { ArrowDown, ArrowDownUp, ArrowUp, Filter, Search, X, } from "lucide-react";
import { serviceAuth } from "@/lib/session";
import { useState } from "react";

export default function ServiceVisits() {
  const columns = [
    {
      accessorKey: "client.name",
      header: "Client name",
    },
    {
      accessorKey: "client.email",
      header: "Client phone",
      enableSorting: false
    },
    {
      accessorKey: "reservationStart",
      header: "Date",
      cell: AppointmenDateCell 
    },
    {
      accessorKey: "charge",
      header: "Price",
      cell: AppointmenPriceCell
    },
    {
      accessorKey: "status",
      header: "Status",
      enableSorting: false,
      cell: AppointmentStatusCell
    },
  ];

  const {data: user} = useQuery({
    queryKey: ["getAppointmentsTableData"],
    queryFn: async () => {
      const result = await serviceAuth()
      return result
    }
  })

  const {data, status} = useQuery({
    queryKey: ["getAppointmentsTableData", user?.id],
    queryFn: async () => {
      const result = await getAppointmentsTableData(user?.id)
      return result
    }
  })


  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>() 

  const table = useReactTable({
    data: data ?? [],
    columns,
    state: {
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel()
  });
  

  if (status === "pending") return <p>Loading...</p>
  if (status === "error") return <p>Error</p>

  return (
    <DashboardContentContainer>
      <div className="mb-[50px]">
        <h1 className="m-0 p-0 text-[27px] font-semibold text-black">
          Appointments
        </h1>
        <h3 className="mt-[5px] p-0 text-sm font-light">
          Here you can find all apointments. Sort them, filter and more.
        </h3>
      </div>

      <div className="mb-5 flex flex-row justify-between">
        <div className="flex flex-row items-center gap-3 w-64 border rounded pl-3 pr-1">
          <Search color="#333" size={20}/>
          <input
            type="text"
            placeholder="Search client name"
            className="py-1.5 w-full focus:outline-none focus:border-none text-sm"
            onChange={(e) => setColumnFilters([{id: "client_name", value: e.target.value}])}
          />
        </div>
        <div className="flex flex-row gap-2">
          <div className="flex flex-row items-center gap-1 border bg-[#FFF] border-[#D4D4D4] rounded px-2 hover:bg-[#EEE] hover:cursor-pointer">
              <X color="#333" size={15} strokeWidth={3}/>
              <p className="text-sm font-normal ">Clear Filters</p>
            </div>
          <div className="flex flex-row items-center gap-1 border bg-[#FFF] border-[#D4D4D4] rounded px-2 hover:bg-[#EEE] hover:cursor-pointer">
            <Filter color="#333" size={15} strokeWidth={2}/>
            <p className="text-sm font-normal ">Filter</p>
          </div>
        </div>
        
      </div>

      <div className="overflow-clip rounded-md">
        <table className="border w-full bg-white">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className=" bg-[#F6F5F8] text-[#333333] font-semibold text-sm">
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="text-left py-3 first-of-type:pl-10">
                    <div className="flex flex-row gap-3 justify-left items-center">
                      {header.column.columnDef.header}
                      {header.column.getCanSort() && !header.column.getIsSorted() && 
                      <ArrowDownUp
                        size={15}
                        strokeWidth={1}
                        onClick={header.column.getToggleSortingHandler()}
                      /> }
                      {
                        {
                          asc: <ArrowDown size={15} strokeWidth={1} onClick={header.column.getToggleSortingHandler()}/>,
                          desc: <ArrowUp size={15} strokeWidth={1} onClick={header.column.getToggleSortingHandler()}/>,
                        }[header.column.getIsSorted()]
                      }
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody >
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="even:bg-slate-100 ">
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="py-2 first-of-type:pl-10 text-sm text-[#111] font-normal">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
              ))}
            </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end items-center mt-4 gap-3 w-full">
        <div className="flex flex-row space-x-2"> 
          <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"> 
            Previous 
          </button> 
          <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50" > 
            Next 
          </button> 
        </div>
        <div>
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
      </div>
    </DashboardContentContainer>
  );
}
