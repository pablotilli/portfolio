import { useFormik, FormikHelpers } from 'formik';

import * as Yup from 'yup';

import {
  Container,
  FormField,
  Label,
  Input,
  TextArea,
  Button,
  FieldsWrapper,
  TwoColumnsContainer,
  FieldsColumn,
  ImageColumn,
} from './styles';

import SendIcon from '@material-ui/icons/Send';
import { useTranslation } from 'react-i18next';

interface FormValues {
  name: string;
  email: string;
  subject: string;
}

const ContactForm: React.FC = () => {
  const { t } = useTranslation();

  const validationSchema = Yup.object({
    name: Yup.string().required(t('name_field_is_required')),
    email: Yup.string()
      .email(t('invalid_email'))
      .required(t('email_field_is_required')),
    subject: Yup.string().required(t('subject_field_is_required')),
  });

  const formik = useFormik<FormValues>({
    initialValues: {
      name: '',
      email: '',
      subject: '',
    },
    validationSchema,
    onSubmit: (
      values: FormValues,
      formikHelpers: FormikHelpers<FormValues>
    ) => {
      alert('Mensaje enviado: ' + JSON.stringify(values, null, 2));
      formikHelpers.resetForm();
    },
  });

  return (
    <Container>
      <form onSubmit={formik.handleSubmit}>
        <FieldsWrapper>
          <TwoColumnsContainer>
            <FieldsColumn>
              <FormField>
                <Label htmlFor="name">{t('name')}</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div style={{ color: 'red', marginTop: '5px' }}>
                    {formik.errors.name}
                  </div>
                ) : null}
              </FormField>

              <FormField>
                <Label htmlFor="email">{t('email')}</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div style={{ color: 'red', marginTop: '5px' }}>
                    {formik.errors.email}
                  </div>
                ) : null}
              </FormField>
            </FieldsColumn>
            <ImageColumn>
              <img src="/images/contact_icon.png" alt="Contact icon" />
            </ImageColumn>
          </TwoColumnsContainer>
          <FormField>
            <Label htmlFor="subject">{t('subject')}</Label>
            <TextArea
              id="subject"
              name="subject"
              rows={5}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.subject}
            />
            {formik.touched.subject && formik.errors.subject ? (
              <div style={{ color: 'red', marginTop: '5px' }}>
                {formik.errors.subject}
              </div>
            ) : null}
          </FormField>
        </FieldsWrapper>

        <Button type="submit">
          <SendIcon />
          <span>{t('send_message')}</span>
        </Button>
      </form>
    </Container>
  );
};

export default ContactForm;
