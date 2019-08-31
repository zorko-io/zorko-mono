export class LoginAttributes {

  get password() {
    return { 'data-test': 'password-input' }
  }


  loginAsSelector () {
    return '[data-test=email-input]'
  }

  get login () {
     return { 'data-test': 'email-input' }
  }

  get submit () {
    return { 'data-test': 'submit' }
  }

}

