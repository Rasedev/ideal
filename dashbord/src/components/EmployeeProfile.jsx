// import { Avatar, Button, Tag, Typography, Descriptions } from "antd";
// import {
//   MessageOutlined,
//   MailOutlined,
//   PhoneOutlined,
//   LinkOutlined,
//   UserOutlined,
//   TeamOutlined,
// } from "@ant-design/icons";
// import moment from "moment";

// const { Title, Text } = Typography;

// function EmployeeProfile({ selectedEmployee }) {

//   // const [profileDetails, setProfileDetails] = useState(null);
//   // const [loading, setLoading] = useState(false);
//   if (!selectedEmployee) {
//     return (
//       <div className="flex flex-col items-center justify-center h-full text-gray-500">
//         <TeamOutlined style={{ fontSize: "48px", marginBottom: "16px" }} />
//         <Text>Click on an employee row to view their profile.</Text>
//       </div>
//     );
//   }

//   // Helper function to determine status tag color
//   const getStatusColor = (status) => {
//     switch (status) {
//       case "waiting":
//         return "orange";
//       case "approved":
//         return "green";
//       case "rejected":
//         return "red";
//       default:
//         return "gray";
//     }
//   };

//   return (
//     <div className="flex flex-col items-center">
//       <Avatar
//         size={120}
//         src={selectedEmployee.image}
//         icon={<UserOutlined />}
//         alt="Employee Avatar"
//         className="mb-4"
//       />
//       <Title level={5} className="text-center">
//         {selectedEmployee.firstName} {selectedEmployee.lastName}
//       </Title>
//       <Text type="secondary" className="mb-4">
//         {selectedEmployee.role || "N/A"} at{" "}
//         {selectedEmployee.store?.batch || "N/A"}
//       </Text>

//       <Descriptions bordered column={1} size="small" className="w-full text-left">
//         <Descriptions.Item label="Email">
//           {selectedEmployee.email || "N/A"}
//         </Descriptions.Item>
//         <Descriptions.Item label="Phone">
//           {selectedEmployee.telephone || "N/A"}
//         </Descriptions.Item>
//         <Descriptions.Item label="Address">
//           {selectedEmployee.address || "N/A"}
//         </Descriptions.Item>
//         <Descriptions.Item label="DOB">
//           {selectedEmployee.dob ? moment(selectedEmployee.dob).format("YYYY-MM-DD") : "N/A"}
//         </Descriptions.Item>
//         <Descriptions.Item label="Status">
//           <Tag color={getStatusColor(selectedEmployee.status)}>
//             {selectedEmployee.status ? selectedEmployee.status.toUpperCase() : "N/A"}
//           </Tag>
//         </Descriptions.Item>
//         <Descriptions.Item label="ERP No.">
//           {selectedEmployee.erpNumber || "N/A"}
//         </Descriptions.Item>
//         <Descriptions.Item label="Job ID Card No.">
//           {selectedEmployee.jobIdCardNumber || "N/A"}
//         </Descriptions.Item>
//         <Descriptions.Item label="Qualification">
//           {selectedEmployee.educationalQualification || "N/A"}
//         </Descriptions.Item>
//         {selectedEmployee.employmentHistory &&
//           selectedEmployee.employmentHistory.length > 0 && (
//             <Descriptions.Item label="Employment History">
//               {selectedEmployee.employmentHistory.map((history, index) => (
//                 <div key={index} className="mb-2">
//                   <Text strong>{history.position}</Text> <br />
//                   <Text type="secondary">
//                     {moment(history.startDate).format("YYYY-MM-DD")}{" "}
//                     -{" "}
//                     {history.endDate
//                       ? moment(history.endDate).format("YYYY-MM-DD")
//                       : "Present"}
//                       {/* You can also add history.status here if desired */}
//                       {history.status && (
//                         <Tag style={{ marginLeft: 8 }} color={getStatusColor(history.status)}>
//                             {history.status.toUpperCase()}
//                         </Tag>
//                       )}
//                   </Text>
//                 </div>
//               ))}
//             </Descriptions.Item>
//           )}
//       </Descriptions>

//       {/* Additional sections from your provided EmployeeProfile component */}
//       <h5 className="text-lg font-semibold mt-6 mb-3">Contact Options</h5>
//       <div className="flex justify-center space-x-4 mb-6">
//         <Button type="primary" icon={<MessageOutlined />}>
//           Message
//         </Button>
//         <Button icon={<MailOutlined />} />
//         <Button icon={<PhoneOutlined />} />
//         <Button icon={<LinkOutlined />} />
//       </div>

//       <h5 className="text-lg font-semibold mb-3">Project in Queue</h5>
//       {selectedEmployee.projectsInQueue &&
//       selectedEmployee.projectsInQueue.length > 0 ? (
//         selectedEmployee.projectsInQueue.map((project, index) => (
//           <div key={index} className="flex justify-between items-center py-1">
//             <span>{project.name}</span>
//             <Tag
//               color={
//                 project.status === "New"
//                   ? "green"
//                   : project.status === "Waiting"
//                   ? "yellow"
//                   : "blue"
//               }
//             >
//               {project.status}
//             </Tag>
//           </div>
//         ))
//       ) : (
//         <p className="text-gray-400 text-sm">No projects in queue.</p>
//       )}

//       <h5 className="text-lg font-semibold mt-6 mb-3">Social</h5>
//       <div className="flex space-x-4">
//         {selectedEmployee.social?.facebook && (
//           <a
//             href={selectedEmployee.social.facebook}
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Button icon={<LinkOutlined />} shape="circle" />{" "}
//             {/* Placeholder icon */}
//           </a>
//         )}
//         {!selectedEmployee.social && (
//           <p className="text-gray-400 text-sm">No social links available.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default EmployeeProfile;

////////////////////////////Final////////////////////////

// import React, { useEffect, useState } from "react";
// import { Avatar, Button, Tag, Typography, Descriptions } from "antd";
// import { ImFacebook } from "react-icons/im";
// import { BiLogoTelegram } from "react-icons/bi";
// import { FaLinkedinIn,FaTwitter } from "react-icons/fa6";
// import {
//   MessageOutlined,
//   MailOutlined,
//   PhoneOutlined,
//   LinkOutlined,
//   UserOutlined,
//   TeamOutlined,
// } from "@ant-design/icons";
// import moment from "moment";

// const { Title, Text } = Typography;

// const getStatusColor = (status) => {
//   switch (
//     status?.toLowerCase() 
//   ) {
//     case "approved":
//       return "green";
//     case "waiting":
//       return "orange";
//     case "rejected":
//       return "red";
//     default:
//       return "gray";
//   }
// };

// function EmployeeProfile({ selectedEmployee }) {
//   const [profileDetails, setProfileDetails] = useState(null);
//   const [loading, setLoading] = useState(false);
//   //const social = selectedEmployee.social || {};

//   useEffect(() => {
//     if (selectedEmployee) {
//       setLoading(true);
//       const enrichedEmployee = {
//         ...selectedEmployee,
//         social: {
//           facebook: "https://facebook.com/testuser",
//           twitter: "https://twitter.com/testuser",
//           linkedin: "https://linkedin.com/in/testuser",
//           telegram: "https://t.me/testuser",
          
//         },
        
//       };
//      // console.log("Current Workplace:", enrichedEmployee.currentWorkplace);

//       console.log(
//         "SOCIAL DATA KEYS:",
//         Object.keys(enrichedEmployee?.social || {})
//       );

//       setProfileDetails(enrichedEmployee);
//       setLoading(false);
//     } else {
//       setProfileDetails(null);
//     }
//   }, [selectedEmployee]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-[200px]">
//         <Spin size="large" />
//       </div>
//     );
//   }

//   if (!profileDetails) {
//     return (
//       <div className="text-center text-gray-500 mt-3">
//         <UserOutlined style={{ fontSize: "50px", marginBottom: "16px" }} />
//         <p>Click on an employee row to view their profile.</p>
//       </div>
//     );
//   }

//   const items = [
//     {
//       key: "1",
//       label: "Name",
//       children: `${profileDetails.firstName || ""} ${
//         profileDetails.lastName || ""
//       }`,
//     },
//     {
//       key: "2",
//       label: "Email",
//       children: profileDetails.email || "N/A",
//     },
//     {
//       key: "3",
//       label: "Status",
//       children: (
//         <Tag
//           color={
//             profileDetails.status === "approved"
//               ? "green"
//               : profileDetails.status === "waiting"
//               ? "orange"
//               : profileDetails.status === "rejected"
//               ? "red"
//               : "gray"
//           }
//         >
//           {profileDetails.status?.toUpperCase() || "N/A"}
//         </Tag>
//       ),
//     },
//     {
//       key: "4",
//       label: "Telephone",
//       children: profileDetails.telephone || "N/A",
//     },
//     {
//       key: "5",
//       label: "Address",
//       children: profileDetails.address || "N/A",
//     },
//     {
//       key: "6",
//       label: "Date of Birth",
//       children: profileDetails.dob
//         ? moment(profileDetails.dob).format("YYYY-MM-DD")
//         : "N/A",
//     },
//     {
//       key: "7",
//       label: "Store Batch",
//       children: profileDetails.store?.batch || "N/A",
//     },
//     {
//       key: "8",
//       label: "Role",
//       children: profileDetails.role || "N/A",
//     },
//     {
//       key: "9",
//       label: "ERP Number",
//       children: profileDetails.erpNumber || "N/A",
//     },
//     {
//       key: "10",
//       label: "Job ID Card",
//       children: profileDetails.jobIdCardNumber || "N/A",
//     },
//     {
//       key: "11",
//       label: "Educational Qual.",
//       children: profileDetails.educationalQualification || "N/A",
//     },
//     {
//       key: "12",
//       label: "Father's Name",
//       children: profileDetails.fatherName || "N/A",
//     },
//     {
//       key: "13",
//       label: "Birthplace",
//       children: profileDetails.birthplace || "N/A",
//     },
//     // Employment History (display only the first entry for brevity, or loop for all)
//     {
//       key: "14",
//       label: "Position",
//       children: profileDetails.employmentHistory?.[0]?.position || "N/A",
//     },
//     {
//       key: "15",
//       label: "current Workplace",
//       children: profileDetails.currentWorkplace || "N/A",
//     },
//     {
//       key: "16",
//       label: "Employment Period",
//       children:
//         profileDetails.employmentHistory?.[0]?.startDate &&
//         profileDetails.employmentHistory?.[0]?.endDate
//           ? `${moment(profileDetails.employmentHistory[0].startDate).format(
//               "YYYY-MM-DD"
//             )} to ${moment(profileDetails.employmentHistory[0].endDate).format(
//               "YYYY-MM-DD"
//             )}`
//           : "N/A",
//     },
//   ];

//   const social = profileDetails?.social || {};

//   return (
//     <div className="flex flex-col items-center font-railway my-3">
//       <Avatar
//         size={100}
//         src={profileDetails.image || <UserOutlined />}
//         icon={!profileDetails.image && <UserOutlined />}
//         alt={`${profileDetails.firstName} ${profileDetails.lastName}`}
//         className="mb-3"
//       />
//       <Title level={4} className="text-center mb-0 font-railway">
//         {selectedEmployee.firstName} {selectedEmployee.lastName}
//         <br />
//         <Text type="secondary">
//           {profileDetails.employmentHistory?.[0]?.position || "Employee"}
//         </Text> 
//         <Text type="secondary">
//          / {profileDetails.store?.batch || "N/A"}
//         </Text>
//         {/* <Text type="secondary">
//          / {profileDetails.currentWorkplace || "N/A"}
//         </Text> */}

//       </Title>

//       <Descriptions
//         bordered
//         column={1}
//         size="small"
//         className="w-full text-left mt-5 font-railway"
//       >
//         <Descriptions.Item label="Email">
//           {selectedEmployee.email || "N/A"}
//         </Descriptions.Item>
//         <Descriptions.Item label="Phone">
//           {selectedEmployee.telephone || "N/A"}
//         </Descriptions.Item>
//         <Descriptions.Item label="Address">
//           {selectedEmployee.address || "N/A"}
//         </Descriptions.Item>
//         <Descriptions.Item label="DOB">
//           {selectedEmployee.dob
//             ? moment(selectedEmployee.dob).format("YYYY-MM-DD")
//             : "N/A"}
//         </Descriptions.Item>
//         <Descriptions.Item label="Status">
//           <Tag color={getStatusColor(selectedEmployee.status)}>
//             {selectedEmployee.status
//               ? selectedEmployee.status.toUpperCase()
//               : "N/A"}
//           </Tag>
//         </Descriptions.Item>
//         <Descriptions.Item label="ERP No.">
//           {selectedEmployee.erpNumber || "N/A"}
//         </Descriptions.Item>
//         <Descriptions.Item label="Job ID No.">
//           {selectedEmployee.jobIdCardNumber || "N/A"}
//         </Descriptions.Item>
//         <Descriptions.Item label="Qualification">
//           {selectedEmployee.educationalQualification || "N/A"}
//         </Descriptions.Item>
//         <Descriptions.Item label="Current Workplace">
//          {profileDetails.currentWorkplace || "N/A"}
//         </Descriptions.Item>


//         {selectedEmployee.employmentHistory &&
//           selectedEmployee.employmentHistory.length > 0 && (
//             <Descriptions.Item label="Employment History">
//               {selectedEmployee.employmentHistory.map((history, index) => (
//                 <div key={index} className="mb-2 font-railway">
//                   {/* <Text strong>{history.position}</Text> <br /> */}
//                   <Text type="secondary">
//                     Join Date:- {moment(history.startDate).format("YYYY-MM-DD")}{" "}
//                     <br />
//                     End Date:-{" "}
//                     {history.endDate
//                       ? moment(history.endDate).format("YYYY-MM-DD")
//                       : "Present"}
//                     {/* You can also add history.status here if desired */}
//                     {history.status && (
//                       <Tag
//                         style={{ marginLeft: 8 }}
//                         color={getStatusColor(history.status)}
//                       >
//                         {history.status.toUpperCase()}
//                       </Tag>
//                     )}
//                   </Text>
//                 </div>
//               ))}
//             </Descriptions.Item>
//           )}
//       </Descriptions>

//       <div className="flex justify-center space-x-4 my-8 font-railway">
//         <Button type="primary" icon={<MessageOutlined />}>
//           Message
//         </Button>
//         <Button icon={<MailOutlined />} />
//         <Button icon={<PhoneOutlined />} />
//         <Button icon={<LinkOutlined />} />
//       </div>

//       <div className="flex justify-between items-center font-railway gap-5">
//         <h5 className="text-lg font-semibold  text-transpa">Social</h5>
//         {["facebook", "twitter", "linkedin", "telegram"].some(
//           (key) => social[key]
//         ) ? (
//           <div className="flex space-x-4 text-transpa">
//             {social.facebook && (
//               <a
//                 href={social.facebook}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <Button icon= { <ImFacebook  size={15} color="#bdc1c6"/>}/>
               
//               </a>
//             )}
//             {social.twitter && (
//               <a
//                 href={social.twitter}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <Button icon= { <FaTwitter  size={15} color="#bdc1c6"/>}/>
                
//               </a>
//             )}
//             {social.linkedin && (
//               <a
//                 href={social.linkedin}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <Button icon= { <FaLinkedinIn  size={15} color="#bdc1c6"/>}/>
               
//               </a>
//             )}
//             {social.telegram && (
//               <a
//                 href={social.telegram}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <Button icon= { <BiLogoTelegram size={15} color="#bdc1c6"/>}/>
               
//               </a>
//             )}
//           </div>
//         ) : (
//           <p className="text-gray-400 text-sm">No social links available.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default EmployeeProfile;


// EmployeeProfile.jsx


import React, { useEffect, useState } from "react";
import { Avatar, Button, Tag, Typography, Descriptions, Spin } from "antd";
import { ImFacebook } from "react-icons/im";
import { BiLogoTelegram } from "react-icons/bi";
import { FaLinkedinIn, FaTwitter } from "react-icons/fa6";
import {MessageOutlined,MailOutlined,PhoneOutlined,LinkOutlined,UserOutlined,} from "@ant-design/icons";
import moment from "moment";
import { useDispatch } from "react-redux"; 
import { clearSelectedEmployee } from "./slices/employeeSlice"; 

const { Title, Text } = Typography;

const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case "approved":
      return "green";
    case "waiting":
      return "orange";
    case "rejected":
      return "red";
    default:
      return "gray";
  }
};

function EmployeeProfile({ selectedEmployee }) {
  const dispatch = useDispatch(); 
  const [profileDetails, setProfileDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedEmployee) {
      setLoading(true);

      const enrichedEmployee = {
        ...selectedEmployee,
        social: {
          facebook: "https://facebook.com/testuser", 
          twitter: "https://twitter.com/testuser",
          linkedin: "https://linkedin.com/in/testuser",
          telegram: "https://t.me/testuser",
        },
      };
      setProfileDetails(enrichedEmployee);
      setLoading(false);
    } else {
      setProfileDetails(null);
    }
  }, [selectedEmployee]); 

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Spin size="large" />
      </div>
    );
  }

  if (!profileDetails) {
    return (
      <div className="text-center text-gray-500 mt-3">
        <UserOutlined style={{ fontSize: "50px", marginBottom: "16px" }} />
        <p>Click on an employee row to view their profile.</p>
      </div>
    );
  }

  const social = profileDetails?.social || {};

  return (
    <div className="flex flex-col items-center font-railway my-3">
      <Avatar
        size={100}
        src={profileDetails.image} 
        icon={!profileDetails.image && <UserOutlined />} 
        alt={`${profileDetails.firstName} ${profileDetails.lastName}`}
        className="mb-3"
      />
      <Title level={4} className="text-center mb-0 font-railway">
        {profileDetails.firstName} {profileDetails.lastName}
        <br />
        <Text type="secondary">
          {profileDetails.employmentHistory?.[0]?.position || "Employee"}
        </Text>
        <Text type="secondary">/ {profileDetails.store?.batch || "N/A"}</Text>
      </Title>
      <Descriptions bordered column={1} size="small" className="w-full text-left mt-5 font-railway">
        <Descriptions.Item label="Email">
          {" "}
          {profileDetails.email || "N/A"}{" "}
        </Descriptions.Item>{" "}
        <Descriptions.Item label="Phone">
          {" "}
          {profileDetails.telephone || "N/A"}{" "}
        </Descriptions.Item>{" "}
        <Descriptions.Item label="Address">
          {" "}
          {profileDetails.address || "N/A"}{" "}
        </Descriptions.Item>{" "}
        <Descriptions.Item label="DOB">
          {" "}
          {profileDetails.dob ? moment(profileDetails.dob).format("YYYY-MM-DD") : "N/A"}{" "}
        </Descriptions.Item>{" "}
        <Descriptions.Item label="Status">
          {" "}
          <Tag color={getStatusColor(profileDetails.status)}>
            {" "}
            {profileDetails.status ? profileDetails.status.toUpperCase() : "N/A"}{" "}
          </Tag>{" "}
        </Descriptions.Item>{" "}
        <Descriptions.Item label="ERP No.">
          {" "}
          {profileDetails.erpNumber || "N/A"}{" "}
        </Descriptions.Item>{" "}
        <Descriptions.Item label="Job ID No.">
          {" "}
          {profileDetails.jobIdCardNumber || "N/A"}{" "}
        </Descriptions.Item>{" "}
        <Descriptions.Item label="Qualification">
          {" "}
          {profileDetails.educationalQualification || "N/A"}{" "}
        </Descriptions.Item>{" "}
        <Descriptions.Item label="Current Workplace">
          {profileDetails.currentWorkplace || "N/A"}
        </Descriptions.Item>
        {profileDetails.employmentHistory &&
          profileDetails.employmentHistory.length > 0 && (
            <Descriptions.Item label="Employment History">
              {" "}
              {profileDetails.employmentHistory.map((history, index) => (
                <div key={index} className="mb-2 font-railway">
                  {" "}
                  <Text type="secondary">
                    {" "}
                    Join Date:- {moment(history.startDate).format("YYYY-MM-DD")}{" "}
                    <br /> End Date:-{" "}
                    {history.endDate ? moment(history.endDate).format("YYYY-MM-DD") : "Present"}{" "}
                    {history.status && (
                      <Tag style={{ marginLeft: 8 }} color={getStatusColor(history.status)}>
                        {history.status.toUpperCase()}
                      </Tag>
                    )}{" "}
                  </Text>
                </div>
              ))}{" "}
            </Descriptions.Item>
          )}{" "}
      </Descriptions>
      <div className="flex justify-center space-x-4 my-8 font-railway">
        {" "}
        <Button type="primary" icon={<MessageOutlined />}>
          {" "}
          Message{" "}
        </Button>{" "}
        <Button icon={<MailOutlined />} />{" "}
        <Button icon={<PhoneOutlined />} />{" "}
        <Button icon={<LinkOutlined />} />{" "}
      </div>
      <div className="flex justify-between items-center font-railway gap-5">
        {" "}
        <h5 className="text-lg font-semibold  text-transpa">Social</h5>{" "}
        {Object.values(social).some(link => link) ? ( 
          <div className="flex space-x-4 text-transpa">
            {social.facebook && (
              <a href={social.facebook} target="_blank" rel="noopener noreferrer">
                <Button icon={<ImFacebook size={15} color="#bdc1c6" />} />{" "}
              </a>
            )}{" "}
            {social.twitter && (
              <a href={social.twitter} target="_blank" rel="noopener noreferrer">
                {" "}
                <Button icon={<FaTwitter size={15} color="#bdc1c6" />} />{" "}
              </a>
            )}{" "}
            {social.linkedin && (
              <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
                {" "}
                <Button icon={<FaLinkedinIn size={15} color="#bdc1c6" />} />{" "}
              </a>
            )}{" "}
            {social.telegram && (
              <a href={social.telegram} target="_blank" rel="noopener noreferrer">
                {" "}
                <Button icon={<BiLogoTelegram size={15} color="#bdc1c6" />} />{" "}
              </a>
            )}{" "}
          </div>
        ) : (
          <p className="text-gray-400 text-sm">No social links available.</p>
        )}{" "}
      </div>
    </div>
  );
}
export default EmployeeProfile;
