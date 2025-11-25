// function emailThemplate(token){
//     return `<img alt=logo src=https://ibb.co/ZR4MH3Tt ><h2 style="font-family:'DM Sans',sans-serif;font-weight:700">
//     CITY KOLLAN SOMITY</h2><p style="font-family:'DM Sans',sans-serif;font-size:18px;color:#767676">Please Verify Your Email Address. 
//     </p><a href="http://localhost:3000/api/v1/authentication/emailverification/${token}"style="font-family:'DM Sans',sans-serif;font-size:20px;
//     color:#767676;text-decoration:none;color:#fff;background:#262626;padding:20px;border:none;margin-top:10px;display:inline-block;
//     border-radius:5px;cursor:pointer;">Click For Verification</a> `
// }

// module.exports = emailThemplate;



// function emailThemplate(token){
//     return `
//     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//         <div style="text-align: center; padding: 20px; background: linear-gradient(to right, #10b981, #3b82f6); color: white;">
//             <h1 style="margin: 0; font-size: 24px;">ALAMGIR HOSSAIN CITY KALLAN SAMITY</h1>
//         </div>
//         <div style="padding: 30px; background: #f9fafb;">
//             <h2 style="color: #374151; margin-bottom: 20px;">Email Verification Required</h2>
//             <p style="color: #6b7280; font-size: 16px; line-height: 1.6;">
//                 Thank you for registering with Alamgir Hossain City Kallan Samity. 
//                 Please verify your email address to activate your account.
//             </p>
//             <div style="text-align: center; margin: 30px 0;">
//                 <a href="http://localhost:5173/api/v1/authentication/emailverification/${token}" 
//                    style="background: #10b981; color: white; padding: 15px 30px; 
//                           text-decoration: none; border-radius: 8px; font-size: 16px;
//                           display: inline-block; border: none; cursor: pointer;">
//                     Verify Email Address
//                 </a>
//             </div>
//             <p style="color: #6b7280; font-size: 14px;">
//                 If the button doesn't work, copy and paste this link in your browser:<br>
//                 <span style="color: #3b82f6; word-break: break-all;">
//                     http://localhost:5173/api/v1/authentication/emailverification/${token}
//                 </span>
//             </p>
//         </div>
//         <div style="padding: 20px; background: #374151; color: white; text-align: center;">
//             <p style="margin: 0; font-size: 14px;">&copy; 2024 Alamgir Hossain City Kallan Samity. All rights reserved.</p>
//         </div>
//     </div>`;
// }

// module.exports = emailThemplate;




function emailThemplate(token) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="utf-8">
      <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(to right, #10b981, #3b82f6); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { background: #10b981; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-size: 16px; font-weight: bold; }
          .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">

          <img alt=logo src=https://ibb.co/ZR4MH3Tt >
              <h1>ALAMGIR HOSSAIN CITY KALLAN SAMITY</h1>
          </div>
          <div class="content">
              <h2>Email Verification Required</h2>
              <p>Thank you for registering with Alamgir Hossain City Kallan Samity. Please verify your email address to activate your account.</p>
              
              <div style="text-align: center; margin: 30px 0;">
                  <a href="http://localhost:3000/api/v1/authentication/emailverification/${token}" class="button">
                      Verify Email Address
                  </a>
              </div>
              
              <p><strong>If the button doesn't work, copy and paste this link in your browser:</strong></p>
              <p style="background: #e5e7eb; padding: 10px; border-radius: 5px; word-break: break-all;">
                  http://localhost:3000/api/v1/authentication/emailverification/${token}
              </p>
              
              <p><strong>Note:</strong> This verification link will expire in 24 hours.</p>
          </div>
          <div class="footer">
              <p>&copy; 2024 Alamgir Hossain City Kallan Samity. All rights reserved.</p>
          </div>
      </div>
  </body>
  </html>`;
}

module.exports = emailThemplate;


