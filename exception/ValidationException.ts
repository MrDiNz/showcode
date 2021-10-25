import BaseException from './index'

export default class ValidationException extends BaseException {
  public data: any

  constructor(message: string, errors: any) {
    super(400, message)
    this.data = errors
  }
}
