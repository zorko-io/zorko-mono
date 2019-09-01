class MarkerAttribute {
  private readonly name: string;
  private readonly value:  string;

  constructor(name: string, value: string){
    this.name = name;
    this.value = value;
  }

  toProp() {
    return { [this.name]: this.value}
  }

  toSelector() {
    return `[${this.name}=${this.value}]`;
  }
}

export class LoginAttributes {
  private readonly attrName: string;

  constructor(attrName: string){
    this.attrName = attrName;
  }

  loginInput () {
    return new MarkerAttribute(
      this.attrName,
      'email-inputttt'
    )
  }

  passwordInput () {
    return new MarkerAttribute(
      this.attrName,
      'password-index'
    )
  }

  submit() {
    return new MarkerAttribute(
      this.attrName,
      'submit'
    )
  }
}

