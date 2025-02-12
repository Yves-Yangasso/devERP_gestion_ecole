import React from 'react'
import LoginForm from '../../formulaire/LoginForm';
import LayoutLogin from '../../formulaire/LayoutLogin';

const Login=()=> {
  return (
    <LayoutLogin
      leftText="Veuillez compléter les informations concernant l'étudiant en suivant les instructions ci-dessous." 
      formComponent={<LoginForm />}
    />
  )
}

export default Login;
