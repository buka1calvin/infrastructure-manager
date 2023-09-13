import React from 'react'
import RetriveRideInfo from '../forms/RetriveRideInfos'
import BookingForm from '../forms/BookingForm'
import { useParams } from 'react-router-dom'
import Footer from './Footer'

const CreateBookingPage = () => {
    const {id}=useParams()
  return (
    <>
    <div className="flex h-[80vh] items-center  m-[0] justify-between font-jost">
      <RetriveRideInfo id={id}/>
      <BookingForm id={id}/>
    </div>
    <Footer/>
    </>
  )
}

export default CreateBookingPage
