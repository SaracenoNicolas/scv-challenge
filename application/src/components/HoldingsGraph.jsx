// component to show total holdings value in a graphic
// landing page.
import React, { useState, useEffect, useContext } from 'react';
import AppContext from '../contexts/App';
import { PieChart } from 'react-minimal-pie-chart';
import { Stack } from 'react-bootstrap';
import { FormatCurrency } from '../utils';

const HoldingsGraph = ({userHoldings}) => {
  const { investments } = useContext(AppContext)
  const [pieData, setPieData] = useState(true)
  const [totalInvestments, setTotalInvestments] = useState(0)

  useEffect(() => {
    // Safety check to wait for the context to be filled
    if (investments === undefined || investments.length === 0) return;

    let total = userHoldings.cash;
    let preparePieData = [
      { title: 'Caja de Ahorro', value: userHoldings.cash, color: '#0088FE' },
    ];

    userHoldings.investments.forEach(investment => {
      let invesmentElement = investments.find(i => i.id === investment.id);

      preparePieData.push({
        title: investment.name,
        value: investment.holdings * invesmentElement.value,
        color: '#' + Math.floor(Math.random() * 16777215).toString(16)
      })

      total += investment.holdings * invesmentElement.value;
    })

    setPieData(preparePieData);
    setTotalInvestments(total);
  }, [])

  const pieLabel = ({ x, y, dx, dy, dataEntry }) => {
    return (
      <text key={dataEntry.title}
        x={x}
        y={y}
        dx={dx}
        dy={dy}
        dominantBaseline="central"
        textAnchor="middle"
        style={{ fontSize: "2px" }}
      >
        {`${dataEntry.title} (${FormatCurrency(dataEntry.value)})`}
      </text>
    );
  };

  return (
    <Stack gap={3}>
      <div style={{textAlign: 'center'}}>
        <h2>Valor Total Cartera: {FormatCurrency(totalInvestments)}</h2>
      </div>
      <div>
        <PieChart
          data={pieData}
          radius={30}
          label={(dataEntry) => pieLabel(dataEntry)}
        />
      </div>
    </Stack>
  )
}

export default HoldingsGraph