// landing page.
import React, { useState, useEffect, useContext } from 'react';
import AppContext from '../contexts/App';
import HoldingsGraph from './HoldingsGraph';
import Operations from './Operations';
import { Container, Row, Col, Stack } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { FormatCurrency } from '../utils';

const Dashboard = () => {
  const { investments, selectedInvestment, setSelectedInvestment } = useContext(AppContext)
  const [availableInvestments, setAvailableInvestments] = useState([])
  const [loadingData, setLoadingData] = useState(true)
  const [holdings, setHoldings] = useState({})

  useEffect(() => {
    setLoadingData(true)
    // Get user Data
    fetch('api/holdings')
    .then(response => response.json())
    .then(data => {
      setHoldings(data);
      // separate all the investments from the ones the user already have.
      let investmentDifferences = investments.filter(investment => {
        return !data.investments.find(i => i.id === investment.id)
      });

      setAvailableInvestments(investmentDifferences);

      setLoadingData(false);
    });
  }, [])
  
  return (
      !loadingData && 
      <Container>
        <Row>
          <Col lg={5} md={12}>
            <Stack gap={2}>
              <Card>
                <Card.Body>
                  <Card.Title>Mis Inversiones</Card.Title>
                  <Card.Body>
                    <Table hover>
                      <tbody>
                        <tr key={1}>
                          <td>Caja de Ahorro</td>
                          <td>{FormatCurrency(holdings.cash)}</td>
                          <td></td>
                        </tr>
                        {holdings.investments.map((investment) => (
                          <tr key={investment.id}>
                            <td>{investment.name}</td>
                            <td>{investment.holdings} unidades</td>
                            <td><Button variant="primary" onClick={() => setSelectedInvestment(investment)}>Operar</Button></td>
                          </tr>
                        ))}
                      </tbody>

                    </Table>
                  </Card.Body>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <Card.Title>Otras Inversiones</Card.Title>
                  <Card.Body>
                    {availableInvestments.length > 0 ? (
                      <Table hover>
                        <tbody>
                          {availableInvestments.map((investment) => (
                            <tr key={investment.id}>
                              <td>{investment.name}</td>
                              <td>{FormatCurrency(investment.value)} / unidad</td>
                              <td><Button variant="primary" onClick={() => setSelectedInvestment(investment)}>Operar</Button></td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    ) : (
                      <p>No hay inversiones disponibles</p>
                    )}
                  </Card.Body>
                </Card.Body>
              </Card>
            </Stack>
          </Col>
          <Col lg={7} md={12}>
            {selectedInvestment ? <Operations userHoldings={holdings}/> : <HoldingsGraph userHoldings={holdings}/>}
          </Col>
        </Row>
      </Container>
  )
}

export default Dashboard