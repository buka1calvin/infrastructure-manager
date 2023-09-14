import React from 'react'
import BookingsPerUser from '../../pages/BookingsPerUser'
import CheckoutForm from '../forms/CheckoutForm'

const PaymentPage = () => {
  return (
    <div className="flex h-[100vh] items-center  m-[0] justify-between font-jost">
      <BookingsPerUser/>
      <CheckoutForm/>
    </div>
  )
}

export default PaymentPage
