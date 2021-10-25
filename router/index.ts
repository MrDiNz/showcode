import { Router } from 'express'
import { isAuthorize } from '@/middlewares/authentication'
import User from './user'
import Company from './company'
import Project from './project'
import PaymentVoucher from './paymentVoucher'
import PaymentType from './paymentType'
import BudgetType from './budgetType'
import WithholdingTaxType from './withholdingTaxType'

const router: Router = Router()

router.use(isAuthorize)

router.use('/user', User)
router.use('/company', Company)
router.use('/project', Project)
router.use('/payment_type', PaymentType)
router.use('/payment_voucher', PaymentVoucher)
router.use('/budget_type', BudgetType)
router.use('/withholding_tax_type', WithholdingTaxType)

export default router
