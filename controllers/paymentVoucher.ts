import Express from 'express'
import { getConnection, ILike } from 'typeorm'
import { PaymentVoucher } from '@/entity/postgres/PaymentVoucher'
import dayjs from 'dayjs'

export default class PaymentVoucherController {
  public static async get(
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ): Promise<any> {
    try {
      const [paymentVouchers, count] = await getConnection()
        .getRepository(PaymentVoucher)
        .findAndCount({
          order: { number: 'DESC' },
          relations: ['project', 'user'],
          skip: parseInt(req.query.skip.toString()) || 0,
          take: 20,
          where: [
            { number: ILike(`%${req.query.search || ''}%`) },
            { payTo: ILike(`%${req.query.search || ''}%`) }
          ]
        })
      res.send({ count: count, payload: paymentVouchers })
    } catch (e) {
      next(e)
    }
  }

  public static async show(
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ): Promise<any> {
    try {
      const paymentVoucher = await getConnection()
        .getRepository(PaymentVoucher)
        .findOne(req.params.id, {
          relations: [
            'paymentVoucherItems',
            'paymentVoucherItems.budgetType',
            'project',
            'company',
            'paymentType',
            // 'budgetType',
            'user',
            'withholdingTaxType'
          ]
        })
      //,
      res.send(paymentVoucher)
    } catch (e) {
      next(e)
    }
  }
  public static async create(
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ): Promise<any> {
    try {
      // check if new month start from 0001 again
      let number =
        dayjs().format('PVBBMM') +
        req.body.company.id.toString().padStart(2, '0') +
        '0001'

      //if custom date and number
      if (req.body.customDateAndNumber) {
        number = req.body.number
      } else {
        //use normal sorting from backend
        const lastNumber = (
          await getConnection()
            .getRepository(PaymentVoucher)
            .findOne({
              order: {
                number: 'DESC'
              }
            })
        ).number
        console.log(lastNumber, 'lastNumber')
        const newMonth = !(
          await getConnection()
            .getRepository(PaymentVoucher)
            .find({ number: number })
        ).length
        // if same month continue the number
        if (!newMonth) {
          number =
            dayjs().format('PVBBMM') +
            req.body.company.id.toString().padStart(2, '0') +
            (parseInt(lastNumber.slice(8)) + 1).toString().padStart(4, '0')
        }
      }
      console.log(number, 'number')

      const pv = await getConnection()
        .getRepository(PaymentVoucher)
        .save({
          ...req.body,
          ...{
            user: (req as any).user,
            number: number
          }
        })
      res.send(pv)
    } catch (e) {
      next(e)
    }
  }

  public static async update(
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ): Promise<any> {
    try {
      console.log({ id: req.params.id })
      const paymentVoucher = await getConnection()
        .getRepository(PaymentVoucher)
        .save(req.body)

      res.send(paymentVoucher)
    } catch (e) {
      next(e)
    }
  }
}
