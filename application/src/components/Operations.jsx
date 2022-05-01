// component for the operations to sell and buy
import React, { useState, useEffect, useContext } from 'react';
import AppContext from '../contexts/App';
import ToastContext from '../contexts/Toast';
import { Stack, Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button'

let calculateValue = (value, amount) => {
  return `AR$ ${value * amount}`
}

const Operations = ({ userHoldings }) => {
  const { selectedInvestment, refreshData } = useContext(AppContext)
  const { setToastOptions, setShowToast } = useContext(ToastContext)
  const [investmentToOperate, setInvestmentToOperate] = useState({})
  const [loadingData, setLoadingData] = useState(true)
  const [subscription, setSubscription] = useState(0)
  const [buyAmount, setBuyAmount] = useState(0)
  const [sellAmount, setSellAmount] = useState(0)

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

  const handleBuyAction = () => {
    fetch('api/holdings/'+selectedInvestment.id+'/'+buyAmount, {
      method: 'POST',
    })
    .then(response => response.json())
    .then(() => {
      setToastOptions({
        variant: 'success',
        header: 'Bought!',
        body: `Succesfully bought ${buyAmount} units of ${selectedInvestment.name}`
      })
      setShowToast(true);
      refreshData();
    })
  }

  const handleSellAction = () => {
    fetch(`api/holdings/${selectedInvestment.id}/${sellAmount * -1}`, {
      method: 'POST',
    })
    .then(response => response.json())
    .then(() => {
      setToastOptions({
        variant: 'warning',
        header: 'Sold!',
        body: `Succesfully sold ${sellAmount} units of ${selectedInvestment.name}`

      })
      setShowToast(true);
      refreshData();
    })
  }

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
            { subscription != 0 && <span> Valoracion Actual: AR$ {calculateValue(investmentToOperate.value, subscription)}</span> }
          </Stack>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <div style={{display: 'flex', gap: '10px 20px'}}>
            <input
              type="number"
              value={buyAmount}
              placeholder="Cantidad a comprar"
              onChange={(e) => setBuyAmount(e.target.value)}
            />
            <span style={{alignSelf: 'center'}}>{calculateValue(investmentToOperate.value, buyAmount)}</span>
            <Button variant="primary" onClick={handleBuyAction} disabled={buyAmount <= 0}>
              Comprar
            </Button>
          </div>
        </Card.Body>
      </Card>
      { subscription != 0 && 
        <Card>
          <Card.Body>
            <div style={{display: 'flex', gap: '10px 20px'}}>
              <input
                type="number"
                max={subscription}
                placeholder="Cantidad a vender"
                value={sellAmount}
                onChange={(e) => setSellAmount(e.target.value)}
              />
              <span style={{alignSelf: 'center'}}>{calculateValue(investmentToOperate.value, sellAmount)}</span>
              <Button variant="primary" onClick={handleSellAction} disabled={sellAmount <= 0 || sellAmount > subscription}>
                Vender
              </Button>
            </div>
          </Card.Body>
        </Card>
      }
      <Button variant="link" onClick={refreshData}>Cancel Operation</Button>
    </Stack>
  )
}

export default Operations