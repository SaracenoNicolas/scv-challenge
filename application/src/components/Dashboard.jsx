// landing page.
import React, { useState, useEffect, useContext } from 'react';
import AppContext from '../contexts/App';
import { Container, Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

const Dashboard = () => {
  const { investments } = useContext(AppContext)
  const [loadingData, setLoadingData] = useState(true)
  const [holdings, setHoldings] = useState({})

  useEffect(() => {
    // Get user Data
    fetch('api/holdings')
    .then(response => response.json())
    .then(data => {
      setHoldings(data);
      setLoadingData(false)
    });
  }, [])
  
  return (
      !loadingData && 
      <Container>
        <Row>
          <Col sm={5}>
            <Card>
              <Card.Body>
                <Card.Title>My Investments</Card.Title>
                <Card.Body>
                  <Table hover>
                    <tbody>
                      <tr key={1}>
                        <td>Caja de Ahorro</td>
                        <td>AR$ {holdings.cash}</td>
                        <td></td>
                      </tr>
                      {holdings.investments.map((investment) => (
                        <tr key={investment.id}>
                          <td>{investment.name}</td>
                          <td>{investment.holdings} unidades</td>
                          <td><Button variant="primary">Operate</Button></td>
                        </tr>
                      ))}
                    </tbody>

                  </Table>
                </Card.Body>
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <Card.Title>Other Invesments</Card.Title>
                <Card.Text>
                  TODO: Available Invesments List
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={7}>
            some cool holding diagram / operations window
          </Col>
        </Row>
      </Container>
  )
}

export default Dashboard