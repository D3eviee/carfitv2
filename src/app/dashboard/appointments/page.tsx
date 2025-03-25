'use client'
import DashboardContentContainer from "@/components/dashboard/dashboard-content-container";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table"
export default function ServiceVisits() {

  const data = [
    { id: "1", clientName: "Hipolit Roszkowski", clientPhone: "514 036 891", clientEmail: "hipolitroszkowski@protonmail.ch", price: "$140", date: "12.04.2025", status: "ongoing" }, 
    { id: "2", clientName: "Hipolit Roszkowski", clientPhone: "514 036 891", clientEmail: "hipolitroszkowski@protonmail.ch", price: "$140", date: "12.04.2025", status: "ongoing" }, 
  ];

  const columns = [
    { accessorKey: "id", header: "id" },
    { accessorKey: "clientName", header: "Client name" },
    { accessorKey: "clientPhone", header: "Client phone" },
    { accessorKey: "clientEmail", header: "Client email" },
    { accessorKey: "price", header: "Price" },
    { accessorKey: "date", header: "Date" },
    { accessorKey: "status", header: "Status" },
  ];

  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });

  return (
    <DashboardContentContainer>
      <div className="mb-[50px]">
        <h1 className="m-0 p00 text-[27px] font-semibold text-black">
          Appointments
        </h1>
        <h3 className="mt-[5px] p-0 text-sm font-light">
          Here you can find all apointments.
        </h3>
      </div>

      <table className="border w-full bg-white">
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id} className="text-left">{header.column.columnDef.header}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id}>{cell.getValue()}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    </DashboardContentContainer>
  );
}
