import { Router } from 'express'
import PaymentVoucherController from '@/controllers/paymentVoucher'

const router: Router = Router()

router.get('/', PaymentVoucherController.get)
router.get('/:id', PaymentVoucherController.show)
router.post('/', PaymentVoucherController.create)
router.patch('/:id', PaymentVoucherController.update)
export default router
