import React from 'react'
import getUserInfo from '../utils/UserInfo'
import PassengerBookingsPage from '../pages/PassengerBookingsPage'
import RidesTable from '../tables/Rides';
import GetUsers from './Admin/GetUsers';
import { Outlet } from 'react-router-dom';


const DashBoardContent=()=>{
    const activeUserRole = getUserInfo()?.data?.role;
    const roleSpecificComponent = activeUserRole === "admin" ? (
        <GetUsers />
      ) : activeUserRole === "passenger" ? (
        <PassengerBookingsPage />
      ) :activeUserRole === "driver" ? (
        <RidesTable />
      ):(
        null
      )
    
      return (
        <div>
          {roleSpecificComponent}
          <Outlet />
        </div>
      );
}

export default DashBoardContent
