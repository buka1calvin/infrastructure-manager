import React, { useEffect, useState } from 'react'
import PassengerBookingsTable from '../tables/PassengerBookingsTable'
import getUserInfo from '../utils/UserInfo'

const PassengerBookingsPage = () => {
    const [user, setUser] = useState();
    const info = getUserInfo();
    useEffect(() => {
      console.log("info",info)
        setUser(info);
      }, []);
  return (
    <div>
      {
        user?.data?.role==="passenger"&&(
            <PassengerBookingsTable/>
        )
      }
    </div>
  )
}

export default PassengerBookingsPage
