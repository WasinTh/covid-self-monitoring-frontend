import logo from '../logo.svg';
import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Button, Menu, Container, Image, Icon, Dimmer, Loader } from 'semantic-ui-react';
import { fetchSymptom, fetchMeasurement, getErrorDisplay, deleteMeasurement } from '../frameworks/HttpClient';
import { Toast } from '../frameworks/Toast';
import { logout } from '../frameworks/HttpClient';
import MeasurementList from '../components/MeasurementList';
import MeasurementInput from '../components/MeasurementInput';

export default function HomeScreen(props) {
  const history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [symptoms, setSymptoms] = useState([]);
  const [editTarget, setEditTarget] = useState(null);
  const [openMeasurement, setOpenMeasurement] = useState(false);
  const [measurements, setMeasurements] = useState([]);

  useEffect(() => {
    fetchData();
  }, [])

  async function fetchData() {
    try {
      setLoading(true);
      const symptomResponse = await fetchSymptom();
      const measurementResponse = await fetchMeasurement();
      setSymptoms(symptomResponse.data);
      setMeasurements(measurementResponse.data);
    } catch (error) { console.log(error); Toast.error(getErrorDisplay(error)) }
    finally { setLoading(false); }
  };

  async function deleteData(measurement) {
    try {
      setLoading(true);
      await deleteMeasurement(measurement.id);
      fetchData();
    } catch (error) { console.log(error); Toast.error(getErrorDisplay(error)); }
  }

  return(
    <div>
      <Dimmer active={isLoading}>
        <Loader>Loading...</Loader>
      </Dimmer>
      <MeasurementInput 
        symptoms={symptoms} 
        open={openMeasurement} 
        setOpen={setOpenMeasurement}
        editTarget={editTarget}
        onUpdated={() => {
          fetchData();
          setEditTarget(null);
        }}
      />
      <Menu
        fixed={'top'}
        inverted={true}
        size='large'
      >
        <Container>
          <Menu.Item>
            <Image size='mini' src={logo} style={{ marginRight: '1.5em' }} />
            Covid 19 Self Monitoring
          </Menu.Item>
          <Menu.Item>
            <Button basic color='green' inverted={true} icon labelPosition='right' onClick={() => {setOpenMeasurement(true)}}>
              สร้างแบบประเมิน
              <Icon name='add' />
            </Button>
          </Menu.Item>
          <Menu.Item position='right'>
            <Button as='a' inverted={true} onClick={() => {logout(); history.replace("/login");}}>
              Log out
            </Button>
          </Menu.Item>
        </Container>
      </Menu>
      <Container style={{ marginTop: '7em' }}>
        <MeasurementList 
          symptoms={symptoms} 
          measurements={measurements}
          onEdit={measurement => {
            setEditTarget(measurement);
            setOpenMeasurement(true);
          }}
          onDelete={deleteData}
        />
      </Container>
    </div>
  )
}