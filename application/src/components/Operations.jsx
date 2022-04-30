// component for the operations to sell and buy
// component to show total holdings value in a graphic
// landing page.
import React, { useState, useEffect, useContext } from 'react';
import AppContext from '../contexts/App';
import { Stack, Card } from 'react-bootstrap';

const Operations = ({ userHoldings }) => {
  const { selectedInvestment } = useContext(AppContext)
  const [investmentToOperate, setInvestmentToOperate] = useState({})
  const [loadingData, setLoadingData] = useState(true)
  const [subscription, setSubscription] = useState(0)

  useEffect(() => {
    setLoadingData(true);
    setSubscription(0);

    fetch('api/investments/' + selectedInvestment.id)
    .then(response => response.json())
    .then(data => {
      setInvestmentToOperate(data)

      // check if the user is subscribed to the investment
      userHoldings.investments.forEach(investment => {
        if (investment.id === data.id) {
          setSubscription(investment.holdings);
        }
      })
      setLoadingData(false)
    });
  }, [selectedInvestment])

  return !loadingData && (
    <Stack gap={4}>
      <div style={{textAlign: 'center'}}>
        <h2>{investmentToOperate.name}</h2>
      </div>
      <Card>
        <Card.Header>My holdings</Card.Header>
        <Card.Body>
          <Stack gap={1}>
            <span>Cantidad Subscripta: {subscription != 0 ? subscription + ' unidades' : 'Not Subscribed'}</span>
            <span>Cotizacion: AR$ {investmentToOperate.value} / Unidad</span>
            { subscription != 0 && <span> Valoracion Actual: AR$ {subscription * investmentToOperate.value}</span> }
          </Stack>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          COMPRAR
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          VENDER
        </Card.Body>
      </Card>
    </Stack>
  )
}

export default Operations