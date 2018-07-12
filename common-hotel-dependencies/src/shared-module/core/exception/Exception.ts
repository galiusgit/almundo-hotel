export class Exception extends Error {

  constructor(message: string, className: string) {
    super(message);
    this.name = (className || 'Exception');
    this.message = (message || 'An error has occurred.');
    // this.stack = (<any> new Error(message)).stack;
    // this.stack = super.stack;
  }

  public getName(): string {
    return this.name;
  }

  public getMessage(): string {
    return this.message;
  }

  public getStack(): string {
    return this.stack;
  }
}