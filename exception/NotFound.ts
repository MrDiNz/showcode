import BaseException from './index'

export default class NotFound extends BaseException {
  constructor(message: string = 'Resource not found.') {
    super(404, message)
  }
}
