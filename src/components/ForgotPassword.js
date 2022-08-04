import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useUserAuth } from "../context/UserAuthContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";

export default function ForgotPassword() {

  const emailRef = useRef()
  const { resetPassword } = useUserAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  async function handleSubmit(e) {
    e.preventDefault();
    
    try {
      setMessage('')
      setError('')
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage('Chequea tu bandeja de entrada y sigue las instrucciones')
    } catch {
      setError('Fallo al restaurar tu password')
    }

    setLoading(false)
  }

  return (
    <div>
      <section className="login">
        <div className="loginContainer">
          <h1>Recovery Password</h1>
          { error && <h1>{error}</h1> }
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
            <label>Email</label>
            <Form.Control
              type='email'
              autoFocus
              required
              ref={emailRef}
            />
            </Form.Group>
            <div className="btnContainer">
              <Button type='submit' disabled={loading}>Restore password</Button>
              <p><Link to='/home'><span>Back</span></Link></p>
            </div>
          </Form>
        </div>
      </section>
    </div>
  )
}