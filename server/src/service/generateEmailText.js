const  generateEmailText = (bookings, rides) => {
  const tableStyle = `
      width: 100%;
      border-collapse: collapse;
    `;
  const headerCellStyle = `
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #ddd;
      background-color: #f2f2f2;
    `;
  const dataCellStyle = `
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    `;

  let HTMLText = `
      <html>
      <head>
        <style>
          table {
            ${tableStyle}
          }
          
          th {
            ${headerCellStyle}
          }
          
          td {
            ${dataCellStyle}
          }
          
          .full {
            display: flex;
            align-items: center;
            justify-content: center;
          }
        </style>
      </head>
      <body>
        <table>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Booker</th>
              <th>Number of Seats</th>
              <th>Origin</th>
              <th>Destination</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>`;

  bookings.forEach((booking, index) => {
    const ride = rides[index];
    console.log('ride', ride);
    HTMLText += `
        <tr>
          <td>${booking.id}</td>
          <td>${booking.user_id}</td>
          <td>${booking.booked_seats}</td>
          <td>${ride.origin}</td>
          <td>${ride.destination}</td>
          <td>${ride.price}</td>
        </tr>`;
  });

  HTMLText += `
          </tbody>
        </table>
      </body>
      </html>`;

  return HTMLText;
};

export default generateEmailText;
