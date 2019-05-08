import React from 'react'
import {VictoryChart, VictoryAxis, VictoryBar, VictoryTheme} from 'victory'

export default function Chart({data}) {
  return (
    <VictoryChart
      // adding the material theme provided with Victory
      theme={VictoryTheme.material}
      domainPadding={15}
    >
      <VictoryAxis
        tickValues={[1, 2, 3, 4, 5, 6,7]}
        tickFormat={['Zillow', 'Chase', 'Epp', 'PM', 'Attom', 'Realtor','M.E.']}
      />
      <VictoryAxis dependentAxis tickFormat={x => `$${x / 1000}k`} />
      <VictoryBar data={data} x="estimator" y="value" />
    </VictoryChart>
  )
}
