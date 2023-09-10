'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { riskStore } from "@/store/riskStore";
import { Risk } from "@/types"
import { MoveDownRight, MoveUpRight, Square } from "lucide-react";
import { useStore } from "zustand";

export default function OperationalRiskTable() {

  const data = useStore(riskStore, state => state);

  const risks = data.risks.slice(3);

  const scoreHandler = (risk: Risk) => {
    if (risk.impact * risk.likelihood < 6) {
      return <TableCell className="text-[black] text-center dark:text-[red] bg-[red] dark:bg-transparent font-medium">Low</TableCell>;
    } else if (risk.impact * risk.likelihood >= 6 && risk.impact * risk.likelihood < 25) {
      return <TableCell className="text-[black] text-center dark:text-[yellow] bg-[yellow] dark:bg-transparent font-medium">Medium</TableCell>;
    } else {
      return <TableCell className="text-[black] text-center dark:text-[green] bg-[green] dark:bg-transparent font-medium">High</TableCell>;
    }
  };

  const trendHandler = (risk: Risk) => {
    // switch (item.trend) {
    //   case -1:
    //     return <TableCell><MoveDownRight size={18} color="#008000" /></TableCell>;
    //   case 0:
    //     return <TableCell><Square size={18} color="#ffff00" /></TableCell>;
    //   case 1:
    //     return <TableCell><MoveUpRight size={18} color="#ff0000" /></TableCell>;
    //   default:
    //     break;
    // }
    // if (risk.) {

    // }
  };

  return (
    <Table className="overflow-y-auto">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Risk Description</TableHead>
          <TableHead>Score</TableHead>
          <TableHead>Trend</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
          {risks.map(risk => (
            <TableRow key={risk.id}>
              <TableCell className="font-medium">{risk.riskName}</TableCell>
              {scoreHandler(risk)}
              {/* {trendHandler(item)} */}
            </TableRow>
          ))}
      </TableBody>
    </Table>
  )
}