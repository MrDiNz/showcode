import BaseException from './index'

export default class Unauthorized extends BaseException {
  constructor(message: string = 'Unauthorized.') {
    super(401, message)
  }
}
