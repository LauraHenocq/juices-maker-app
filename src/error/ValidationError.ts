export class ValidationError extends Error {
    private _name: string
  
    constructor (message: string) {
      super(message)
      this._name = 'ValidationError'
    }
  }
  