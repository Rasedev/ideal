// import  { useEffect, useState } from 'react'
// import { Table } from 'antd';
// import axios from 'axios';

 

// const CategoryStatus = () => {
//     const [allCategory, setAllCategory] = useState([]);

//     useEffect(() =>{
//       async function getAllcategory(){
//             const data = await axios.get("http://localhost:3000/api/v1/category/getallcategory")
//             setAllCategory(data.data)
//          }
//          getAllcategory()

//     },[])

//   //console.log(allCategory)

//     const columns = [
//         {
//           title: 'Category Name',
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
//     <Table dataSource={allCategory} columns={columns} />
//     </>
//   )
// }

// export default CategoryStatus



// import { useEffect, useState } from "react";
// import { Table, Typography, Tag, Card, Spin } from "antd";
// import axios from "axios";

// const { Text } = Typography;

// const CategoryStatus = () => {
//   const [allCategory, setAllCategory] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function getAllCategory() {
//       try {
//         const response = await axios.get("http://localhost:3000/api/v1/category/getallcategory");
//         if (Array.isArray(response.data)) {
//           setAllCategory(response.data);
//         } else {
//           console.error("Unexpected response format:", response.data);
//           setAllCategory([]);
//         }
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     getAllCategory();
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
//     return (
//       <Tag color={color} className="w-[30%] text-xs font-dm  px-2 py-2 text-center">
//         {status?.toUpperCase() || "UNKNOWN"}
//       </Tag>
//     );
//   };

//   const columns = [
//     {
//       title: <div className=" font-dm text-primary text-base font-bold">Category Name</div>,
//       dataIndex: "name",
//       key: "name",
//       render: (text) => (
//         <Text className="font-dm text-[#767676] text-sm">
//           {text || "Unnamed Category"}
//         </Text>
//       ),
//       responsive: ["xs", "sm", "md", "lg"],
//     },
//     {
//       title: <div className=" font-dm text-primary text-base font-bold">Status</div>,
//       dataIndex: "status",
//       key: "status",
//       render: (status) => <div className="">{getStatusTag(status)}</div>,
//       responsive: ["xs", "sm", "md", "lg"],
//     },
//     {
//       title: <div className=" font-dm text-primary text-base font-bold">Active</div>,
//       dataIndex: "isActive",
//       key: "isActive",
//       render: (isActive) => (
//         <div className="">
//           <Tag color={isActive ? "green" : "red"} className="w-[30%] text-xs font-dm  px-2 py-2 text-center ">
//             {isActive ? "Active" : "Inactive"}
//           </Tag>
//         </div>
//       ),
//       responsive: ["xs", "sm", "md", "lg"],
//     },
//   ];

//   return (
//     <Card title="Category Status" className="shadow-lg rounded-lg px-4 text-sm font-dm font-bold">
//       {loading ? (
//         <div className="flex justify-center items-center h-40">
//           <Spin size="large" />
//         </div>
//       ) : (
//         <Table
//           dataSource={allCategory.map((item, index) => ({
//             ...item,
//             key: item.id || index, // Ensure unique key
//           }))}
//           columns={columns}
//           pagination={{ pageSize: 10 }}
//           rowKey="key"
//           className="overflow-x-auto"
//           bordered
//         />
//       )}
//     </Card>
//   );
// };

// export default CategoryStatus;


import { useEffect, useState } from "react";
import { Table, Typography, Tag, Card, Spin} from "antd";
import axios from "axios";

const { Text } = Typography;

const CategoryStatus = () => {
  const [allCategory, setAllCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getAllCategory() {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:3000/api/v1/category/getallcategory");
        if (Array.isArray(response.data)) {
          setAllCategory(response.data);
        } else {
          console.error("Unexpected response format:", response.data);
          setAllCategory([]);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    }
    getAllCategory();
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
        color={color}
        className="w-full sm:w-[50%] md:w-[30%] text-xs font-dm px-2 py-2 text-center"
      >
        {status?.toUpperCase() || "UNKNOWN"}
      </Tag>
    );
  };

  const columns = [
    {
      title: (
        <Text strong className="font-dm text-primary text-sm md:text-base font-bold">
          Category Name
        </Text>
      ),
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <Text className="font-dm text-[#767676] text-xs md:text-sm">
          {text || "Unnamed Category"}
        </Text>
      ),
      responsive: ["xs", "sm", "md", "lg"],
    },
    {
      title: (
        <Text strong className="font-dm text-primary text-sm md:text-base font-bold">
          Status
        </Text>
      ),
      dataIndex: "status",
      key: "status",
      render: (status) => <div className="">{getStatusTag(status)}</div>,
      responsive: ["xs", "sm", "md", "lg"],
    },
    {
      title: (
        <Text strong className="font-dm text-primary text-sm md:text-base font-bold">
          Active
        </Text>
      ),
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive) => (
        <div className="">
          <Tag
            color={isActive ? "green" : "red"}
            className="w-full sm:w-[50%] md:w-[30%] text-xs font-dm px-2 py-2 text-center"
          >
            {isActive ? "Active" : "Inactive"}
          </Tag>
        </div>
      ),
      responsive: ["xs", "sm", "md", "lg"],
    },
   
    
  ];

  return (
    <div className="container mx-auto">
      <Card className="shadow-lg rounded-lg p-3 sm:p-5 md:p-6 lg:p-8 font-dm" >
        <h2 className="text-primary text-center text-lg sm:text-xl md:text-2xl font-bold mb-6 mr-4"style={{ marginBottom: "30px" }}>
        ✅ Category Status
        </h2>
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Spin size="large" />
          </div>
        ) : (
          <Table
            dataSource={allCategory.map((item, index) => ({
              ...item,
              key: item.id || index, // Ensure unique key
            }))}
            columns={columns}
            pagination={{ pageSize: 10 }}
            rowKey="key"
            bordered
            className="min-w-full"
          />
        )}
      </Card>
    </div>
  );
};

export default CategoryStatus;