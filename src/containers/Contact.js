import React from 'react'
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from 'reactstrap'
export default function Contact() {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col className="w-50">
          <form name="contact" netlify netlify-honeypot="bot-field" hidden>
            <input type="text" name="name" />
            <input type="email" name="email" />
            <textarea name="message" />
          </form>
          <Form name="contact" method="post">
            <Input type="hidden" name="form-name" value="contact" />
            <FormGroup>
              <Label for="name">Name</Label>
              <Input type="text" name="name" id="name" placeholder="Name" />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input type="text" name="email" id="email" placeholder="Email" />
            </FormGroup>
            <FormGroup>
              <Label for="message">Message</Label>
              <Input
                type="textarea"
                name="message"
                id="message"
                placeholder="Message"
              />
            </FormGroup>
            <Button type="submit">Send</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}
