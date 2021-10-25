import BaseException from './index'

export default class BadRequest extends BaseException {
  constructor(message: string) {
    super(400, message)
  }
}
