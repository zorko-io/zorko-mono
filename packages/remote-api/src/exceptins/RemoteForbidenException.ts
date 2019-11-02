export class RemoteForbiddenException extends Error {

  constructor(message){
    super(message);
  }

  toString(): string {
    return `RemoteForbiddenException: ${this.message}`;
  }
}
