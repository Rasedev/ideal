
// import  { useEffect, useState } from 'react'
// import { Table } from 'antd';
// import axios from 'axios';

 

// const SubCategoryStatus = () => {
//     const [allSubCategory, setAllSubCategory] = useState([]);

//     useEffect(() =>{
//       async function getAllSubCategory(){
//             const data = await axios.get("http://localhost:3000/api/v1/category/getallsubcategory")
//             setAllSubCategory(data.data)
//          }
//          getAllSubCategory()

//     },[])

//   console.log(allSubCategory)

//     const columns = [
//         {
//           title: 'Sub Category Name',
//           dataIndex: 'name',
//           key: 'name',
//         },
//         {
//           title: 'isActive',
//           dataIndex: 'isActive',
//           key: 'isActive',
//           render:(isActive) => <p>{isActive ? "Active" : "Inactive"}</p>
//         },
//         {
//           title: 'Status',
//           dataIndex: 'status',
//           key: 'status',
//         },
//       ];
      



//   return (
//     <>
//     <Table dataSource={allSubCategory} columns={columns} />
//     </>
//   )
// }

// export default SubCategoryStatus


// import { useEffect, useState } from "react";
// import { Table, Tag, Card, Typography, Spin } from "antd";
// import axios from "axios";

// const { Text } = Typography;

// const SubCategoryStatus = () => {
//   const [allSubCategory, setAllSubCategory] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function getAllSubCategory() {
//       try {
//         const response = await axios.get("http://localhost:3000/api/v1/category/getallsubcategory");
//         if (Array.isArray(response.data)) {
//           setAllSubCategory(response.data);
//         } else {
//           console.error("Unexpected response format:", response.data);
//           setAllSubCategory([]);
//         }
//       } catch (error) {
//         console.error("Error fetching subcategories:", error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     getAllSubCategory();
//   }, []);

//   const getStatusTag = (status) => {
//     let color;
//     switch (status) {
//       case "approved":
//         color = "green";
//         break;
//       case "rejected":
//         color = "red";
//         break;
//       case "waiting":
//         color = "orange";
//         break;
//       default:
//         color = "gray";
//     }
//     return <Tag className="w-[30%] text-xs font-dm  px-2 py-2 text-center" color={color}>{status?.toUpperCase() || "UNKNOWN"}</Tag>;
//   };

//   const columns = [
//     {
//       title: <Text strong className="font-dm text-primary text-base font-bold">Sub Category Name</Text>,
//       dataIndex: "name",
//       key: "name",
//       render: (text) => <Text className="font-dm text-[#767676] text-sm">{text || "Unnamed Subcategory"}</Text>,
//       responsive: ["xs", "sm", "md", "lg"],
//     },
//     {
//       title: <Text strong className="font-dm text-primary text-base font-bold">Active Status</Text>,
//       dataIndex: "isActive",
//       key: "isActive",
//       render: (isActive) => (
//         <Tag className="w-[30%] text-xs font-dm  px-2 py-2 text-center" color={isActive ? "green" : "red"}>
//           {isActive ? "Active" : "Inactive"}
//         </Tag>
//       ),
//       responsive: ["xs", "sm", "md", "lg"],
//     },
//     {
//       title: <Text strong className="font-dm text-primary text-base font-bold">Approval Status</Text>,
//       dataIndex: "status",
//       key: "status",
//       render: (status) => getStatusTag(status),
//       responsive: ["xs", "sm", "md", "lg"],
//     },
//   ];

//   return (
//     <Card title="Sub Category Status" className="shadow-lg rounded-lg px-5 text-sm font-dm font-bold">
//       {loading ? (
//         <div className="flex justify-center items-center h-40">
//           <Spin size="large" />
//         </div>
//       ) : (
//         <Table
//           dataSource={allSubCategory.map((item, index) => ({
//             ...item,
//             key: item.id || index, // Ensure unique key
//           }))}
//           columns={columns}
//           pagination={{ pageSize: 10 }}
//           rowKey="key"
//           bordered
//         />
//       )}
//     </Card>
//   );
// };

// export default SubCategoryStatus;



import { useEffect, useState } from "react";
import { Table, Tag, Card, Typography, Spin } from "antd";
import axios from "axios";

const { Text } = Typography;

const SubCategoryStatus = () => {
  const [allSubCategory, setAllSubCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getAllSubCategory() {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/category/getallsubcategories");
        if (Array.isArray(response.data)) {
          setAllSubCategory(response.data);
        } else {
          console.error("Unexpected response format:", response.data);
          setAllSubCategory([]);
        }
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      } finally {
        setLoading(false);
      }
    }
    getAllSubCategory();
  }, []);

  const getStatusTag = (status) => {
    let color;
    switch (status) {
      case "approved":
        color = "green";
        break;
      case "rejected":
        color = "red";
        break;
      case "waiting":
        color = "orange";
        break;
      default:
        color = "gray";
    }
    return (
      <Tag
        className="text-xs font-dm px-2 py-2 text-center w-full md:w-[50%] xl:w-[30%]"
        color={color}
      >
        {status?.toUpperCase() || "UNKNOWN"}
      </Tag>
    );
  };

  const columns = [
    {
      title: (
        <Text strong className="font-dm text-primary text-sm md:text-base font-bold">
          Sub Category Name
        </Text>
      ),
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <Text className="font-dm text-[#767676] text-xs md:text-sm">{text || "Unnamed Subcategory"}</Text>
      ),
      responsive: ["xs", "sm", "md", "lg"],
    },
    {
      title: (
        <Text strong className="font-dm text-primary text-sm md:text-base font-bold">
          Active Status
        </Text>
      ),
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive) => (
        <Tag
          className="text-xs font-dm px-2 py-2 text-center w-full md:w-[50%] xl:w-[30%]"
          color={isActive ? "green" : "red"}
        >
          {isActive ? "Active" : "Inactive"}
        </Tag>
      ),
      responsive: ["xs", "sm", "md", "lg"],
    },
    {
      title: (
        <Text strong className="font-dm text-primary text-sm md:text-base font-bold">
          Approval Status
        </Text>
      ),
      dataIndex: "status",
      key: "status",
      render: (status) => getStatusTag(status),
      responsive: ["xs", "sm", "md", "lg"],
    },
  ];

  return (
    <div className="container mx-auto">
      <Card className="shadow-lg rounded-lg p-3 sm:p-5 md:p-6 lg:p-8 font-dm" >
        <h2 className="text-primary text-center text-lg sm:text-xl md:text-2xl font-bold mb-7" >
        ✅ Sub Category Status
        </h2>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Spin size="large" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table
              dataSource={allSubCategory.map((item, index) => ({
                ...item,
                key: item.id || index, // Ensure unique key
              }))}
              columns={columns}
              pagination={{ pageSize: 10 }}
              rowKey="key"
              bordered
              className="min-w-full"
            />
          </div>
        )}
      </Card>
    </div>
  );
};

export default SubCategoryStatus;
