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
  ErrorMessage,
  FormFooter,
  SendMessageAlert,
} from './styles';

import SendIcon from '@material-ui/icons/Send';
import { useTranslation } from 'react-i18next';

import emailjs from 'emailjs-com';
import { useEffect, useRef, useState } from 'react';

interface FormValues {
  name: string;
  email: string;
  subject: string;
}

const ContactForm: React.FC = () => {
  const { t } = useTranslation();

  const [statusMessage, setStatusMessage] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);

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
    onSubmit: (values: FormValues) => {
      setSendingMessage(true);
      setStatusMessage('Enviando...');

      const formData = {
        name: values.name,
        email: values.email,
        message: values.subject,
      };

      emailjs.init('SwbBwarBkcezqnbo-x4gi');

      emailjs
        .send(
          'service_ei5fh8g', // Reemplaza con tu Service ID de EmailJS
          'template_gt6fa1g', // Reemplaza con tu Template ID de EmailJS
          formData,
          'DBkMbDW0O-VC-g7vZ'
        )
        .then((result) => {
          setStatusMessage('Mensaje enviado. Gracias!');
          cleanForm();

          setTimeout(() => {
            setStatusMessage('');
          }, 3000);
        })
        .catch((error) => {
          setStatusMessage('Error al enviar el mensaje.');
        })
        .finally(() => setSendingMessage(false));
    },
  });

  const cleanForm = () => {
    formik.resetForm();
  };

  const canSendMessage = () => {
    return !Boolean(
      formik.values.name &&
        !formik.errors.name &&
        formik.values.email &&
        !formik.errors.email &&
        formik.values.subject &&
        !formik.errors.subject
    );
  };

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
                  tabIndex={0}
                  disabled={sendingMessage}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name ? (
                  <ErrorMessage>{formik.errors.name}</ErrorMessage>
                ) : null}
              </FormField>

              <FormField>
                <Label htmlFor="email">{t('email')}</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  disabled={sendingMessage}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                  <ErrorMessage>{formik.errors.email}</ErrorMessage>
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
              rows={4}
              disabled={sendingMessage}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.subject}
            />
            {formik.touched.subject && formik.errors.subject ? (
              <ErrorMessage>{formik.errors.subject}</ErrorMessage>
            ) : null}
          </FormField>
        </FieldsWrapper>

        <FormFooter>
          <Button type="submit" disabled={sendingMessage || canSendMessage()}>
            <SendIcon />
            <span>{t('send_message')}</span>
          </Button>
          {statusMessage && (
            <SendMessageAlert>{statusMessage}</SendMessageAlert>
          )}
        </FormFooter>
      </form>
    </Container>
  );
};

export default ContactForm;
