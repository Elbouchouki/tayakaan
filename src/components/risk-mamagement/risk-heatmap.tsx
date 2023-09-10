'use client'

import React from 'react'
import { HeatMapGrid } from 'react-grid-heatmap'

const xLabels = ['Rare', 'Unlikely', 'Moderate', 'Likely', 'Almost Certain'];
const yLabels = ['Insignificant', 'Minor', 'Moderate', 'Major', 'Servere'];
const data = [[204, 144, 52, 58, 35], [400, 208, 110, 39, 48], [110, 105, 149, 49, 39], [105, 89, 159, 51, 3], [22, 81, 105, 4, 1]];

const RiskHeatMap = () => {
  return (
    <HeatMapGrid
      data={data}
      xLabels={xLabels}
      yLabels={yLabels}
      cellHeight='30px'
      cellRender={(x, y, value) => (
        <div className='text-white' title={`Pos(${x}, ${y}) = ${value}`}>{value}</div>
      )}
      xLabelsStyle={(index) => ({
        color: '#fff',
        fontSize: '.8rem'
      })}
      yLabelsStyle={() => ({
        fontSize: '.7rem',
        textTransform: 'uppercase',
        color: '#fff'
      })}
    />
  )
}

export default RiskHeatMap;