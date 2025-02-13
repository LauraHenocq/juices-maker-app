export class EmptyError extends Error {
    private _name: string
  
    constructor (message: string) {
      super(message)
      this._name = 'EmptyError'
    }
  }
  