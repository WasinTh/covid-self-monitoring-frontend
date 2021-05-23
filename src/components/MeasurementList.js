import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import {
  isNormalBodyTemp, isNormalO2Sat, isNormalSystolic, isNormalDiastolic
} from '../frameworks/Clinical';
import { Icon, Table, Button } from 'semantic-ui-react';


export default function MeasurementList(props) {

  useEffect(() => {
    renderTableHeader();
  }, [props.symptoms])

  const renderTableHeader = () => {
    return(
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell textAlign='center'>Date</Table.HeaderCell>
          <Table.HeaderCell textAlign='center'>Time</Table.HeaderCell>
          <Table.HeaderCell textAlign='center'>Temperature</Table.HeaderCell>
          <Table.HeaderCell textAlign='center'>O2Sat</Table.HeaderCell>
          <Table.HeaderCell textAlign='center'>Systolic</Table.HeaderCell>
          <Table.HeaderCell textAlign='center'>Diastolic</Table.HeaderCell>
          {
            props.symptoms.map( s => (
              <Table.HeaderCell textAlign='center' key={s.id}>{s.name}</Table.HeaderCell>
            ))
          }
          <Table.HeaderCell textAlign='center'>Actions</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    )
  }

  const renderVitalSign = (validateFunction, value) => {
    return validateFunction(value) ? <p>{value}</p> : <p style={{ color: 'red' }}>{value}</p>
  }

  const renderTableBody = () => {
    return(
      <Table.Body>
        {
          props.measurements.map( m => (
            <Table.Row key={`row-${m.id}`}>
              <Table.Cell textAlign='center'><Moment format="DD/MM/YYYY">{m.created}</Moment></Table.Cell>
              <Table.Cell textAlign='center' ><Moment format="HH:MM">{m.created}</Moment></Table.Cell>
              <Table.Cell textAlign='center'>{renderVitalSign(isNormalBodyTemp, m.temperature)}</Table.Cell>
              <Table.Cell textAlign='center'>{renderVitalSign(isNormalO2Sat, m.o2sat)}</Table.Cell>
              <Table.Cell textAlign='center'>{renderVitalSign(isNormalSystolic, m.systolic)}</Table.Cell>
              <Table.Cell textAlign='center'>{renderVitalSign(isNormalDiastolic, m.diastolic)}</Table.Cell>
              {
                props.symptoms.map(s => (
                  <Table.Cell textAlign='center' key={`cell-${s.id}`}>{
                    m.symptoms.some(obj => obj.id === s.id) ? 
                    (<Icon key={`icon-${s.id}`} name="exclamation circle" color="red"/>) : "-"
                  }</Table.Cell>
                ))
              }
              <Table.Cell textAlign='center'>
                <Button basic color='blue' animated='vertical' size='mini' onClick={() => props.onEdit(m)}>
                  <Button.Content hidden>แก้ไข</Button.Content>
                  <Button.Content visible>
                    <Icon name='edit' />
                  </Button.Content>
                </Button>
                <Button basic color='red' animated='vertical' size='mini' onClick={() => props.onDelete(m)}>
                  <Button.Content hidden>ลบ</Button.Content>
                  <Button.Content visible>
                    <Icon name='delete' />
                  </Button.Content>
                </Button>
              </Table.Cell>
            </Table.Row>
          ))
        }
      </Table.Body>
    )
  }

  return(
    <Table celled padded>
      {renderTableHeader()}
      {renderTableBody()}
    </Table>
  )
}


MeasurementList.propTypes = {
  symptoms: PropTypes.array,
  measurements: PropTypes.array,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
}

MeasurementList.defaultProps = {
  symptoms: [],
  measurements: [],
  onEdit: () => {},
  onDelete: () => {},
}
