import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Toast } from '../frameworks/Toast';
import { createMeasurement, updateMeasurement, getErrorDisplay } from '../frameworks/HttpClient';
import { Modal, Header, Form, Divider, Button, Dimmer, Loader} from 'semantic-ui-react';

export default function MeasurementInput(props) {
  const [isLoading, setLoading] = useState(false);
  const validationSchema = Yup.object().shape({
    temperature: Yup.number().required("required"),
    o2sat: Yup.number().required("required"),
    systolic: Yup.number().required("required"),
    diastolic: Yup.number().required("required"),
  });

  const formik = useFormik({
    validateOnChange: false,
    validationSchema: validationSchema,
    initialValues: {
      temperature: '',
      o2sat: '',
      systolic: '',
      diastolic: '',
      symptoms: [],
    },
    onSubmit: (values) => onSubmitMeasurement(values),
  });

  useEffect(() => {
    if (props.editTarget != null) {
      formik.setValues({...props.editTarget});
    }
  }, [props.editTarget])

  const onSubmitMeasurement = async (values) => {
    try {
      setLoading(true);
      props.editTarget == null ? await createMeasurement(values) : await updateMeasurement(props.editTarget.id, values);
      Toast.success('บันทึกข้อมูลสำเร็จ')
      formik.resetForm();
      props.setOpen(false);
      props.onUpdated();
    } catch (error) { console.log(error); Toast.error(getErrorDisplay(error))}
    finally { setLoading(false); }
  }

  return(
    <Modal
      closeOnDimmerClick={false}
      onClose={() => {formik.resetForm(); props.setOpen(false);}}
      open={props.open}
    >
      <Dimmer inverted active={isLoading}>
        <Loader>Loading</Loader>
      </Dimmer>
      <Header icon='universal access' content='แบบประเมินตนเองโควิด 19' />
      <Modal.Content>
        <Form id='measurementForm' onSubmit={formik.handleSubmit} >
          <Form.Group widths='equal'>
            <Form.Input
              label='อุณหภูมิ'
              name='temperature'
              placeholder={"อุณหภูมิ"}
              value={formik.values.temperature}
              error={formik.errors.temperature}
              onChange={formik.handleChange}
            />
            <Form.Input
              label='O2 Sat'
              name='o2sat'
              placeholder={"O2Sat"}
              value={formik.values.o2sat}
              error={formik.errors.o2sat}
              onChange={formik.handleChange}
            />
            <Form.Input
              label='ความดัน (ตัวบน)'
              name='systolic'
              placeholder={"ความดัน (ตัวบน)"}
              value={formik.values.systolic}
              error={formik.errors.systolic}
              onChange={formik.handleChange}
            />
            <Form.Input
              label='ความดัน (ตัวล่าง)'
              name='diastolic'
              placeholder={"ความดัน (ตัวล่าง)"}
              value={formik.values.diastolic}
              error={formik.errors.diastolic}
              onChange={formik.handleChange}
            />
          </Form.Group>
          <Divider horizontal>อาการ</Divider>
          <Form.Group>
            {
              props.symptoms.map( s => (
                <Form.Checkbox 
                  key={`check-${s.id}`}
                  name={`${s.id}`}
                  label={s.name} 
                  checked={formik.values.symptoms.some(obj => obj.id === s.id)}
                  onChange={(_, data) => {
                    if(data.checked) {
                      formik.setFieldValue('symptoms', [...formik.values.symptoms, s]);
                    }
                    else {
                      formik.setFieldValue('symptoms', formik.values.symptoms.filter(symptom => symptom.id !== s.id));
                    }
                  }}
                />
              ))
            }
          </Form.Group>
        </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button primary type='submit' form="measurementForm">บันทึกข้อมูล</Button>
          <Button color='black' onClick={() => { formik.resetForm(); props.setOpen(false); }}>ยกเลิก</Button>
        </Modal.Actions>
    </Modal>
  )
}

MeasurementInput.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  onUpdated: PropTypes.func,
  editTarget: PropTypes.object,
  symptoms: PropTypes.array,
};

MeasurementInput.defaultProps = {
  open: false,
  symptoms: [],
  setOpen: () => {},
  onUpdated: () => {},
}
