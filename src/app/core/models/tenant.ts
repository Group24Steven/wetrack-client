export class Tenant {
  constructor(
    public id: number,
    public email: string,
    public weclappToken: string,
    public weclappUrl: string,
    public name?: string,
  ) { }
}
