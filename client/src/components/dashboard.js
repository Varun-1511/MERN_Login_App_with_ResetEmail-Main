import React, { useEffect, useState } from "react";
import useFetch from "../hooks/fetch.hook";
import { useAuthStore } from "../store/store";
import axios from "axios";
import Header from "./header";
import Sidebar from "./sidebar";
import { toast } from "react-hot-toast";
const Dashboard = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const { username } = useAuthStore((state) => state.auth);
  const { email } = useAuthStore((state) => state.auth);
  const [{ apiData }] = useFetch(`/user/${username} `);

  function FetchRequest() {
    const [data, setData] = useState([]);
    // const [dasData, setDasData] = useState([]);
    useEffect(() => {
      fetch("/api/allrequest", { method: "GET" })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setData(data.data);
        });
    }, []);

    // useEffect(() => {
    //   fetch("/api/disRequest", { method: "GET" })
    //     .then((res) => res.json())
    //     .then((dasdata) => {
    //       console.log(dasdata);
    //       setDasData(dasdata.dasdata);
    //     });
    // }, []);
  }

  // async function dasEmail() {
  //   try {
  //   } catch (error) {}
  // }

  const [showModal, setShowModal] = useState(false);
  const [to, setTo] = useState("");
  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  async function RequestFun(e) {
    e.preventDefault();
    try {
      const RequestApi = {
        to,
      };
      axios
        .post("/api/request", RequestApi)
        .then(alert("request sent successfully"));
    } catch (err) {
      console.error(err);
    }
  }
  // const handleUpload = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append("file", file);
  //   try {
  //     await axios.post("/api/upload", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });
  //     setMessage("File uploaded successfully");
  //   } catch (error) {
  //     console.error(error);
  //     setMessage("Error uploading file");
  //   }
  // };

  // const handleDownload = async (filename) => {
  //   try {
  //     const response = await axios.get(`/api/download/${filename}`, {
  //       responseType: "blob",
  //     });
  //     const url = window.URL.createObjectURL(new Blob([response.data]));
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.setAttribute("download", filename);
  //     document.body.appendChild(link);
  //     link.click();
  //   } catch (error) {
  //     console.error(error);
  //     setMessage("Error downloading file");
  //   }
  // };

  // const handleRequest = async () => {
  //   try {
  //     const request = await axios.post(`/api/request`);
  //   } catch (error) {
  //     console.error(error);
  //     setMessage("Error downloading file");
  //   }
  // };

  // const handlePopupClose = () => {
  //   setShowPopup(false);
  // };

  // const formik = useFormik({
  //   initialValues: {
  //     to: "example@gmail.com",
  //   },
  //   //  validate: registerValidation,
  //   validateOnBlur: false,
  //   validateOnChange: false,
  //   onSubmit: async (values) => {
  //     values = await Object.assign(values);
  //     let requestPromise = requestUser(values);
  //     // toast.promise(requestPromise, {
  //     //   loading: "Creating...",
  //     //   success: <b>Register Successfully...!</b>,
  //     //   error: <b>Could not Register.</b>,
  //     // });

  //     // registerPromise.then(function () {
  //     //   navigate("/");
  //     // });
  //   },
  // });
  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   // const to = req.body;
  //   const permitData = {
  //     To: "example@gmail.com",
  //     From: "user@gmail.com",
  //     // request: true,
  //     peruqid: "12345",
  //   };

  //   const response = await axios.post("/api/", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(permitData),
  //   });

  //   if (response.ok) {
  //     const permit = await response.json();
  //     console.log("New permit saved:", permit);
  //   } else {
  //     console.error("Error saving permit:", response.status);
  //   }
  // };
  // const requestSubmit = async (req, res) => {
  //   try {
  //     const to = req.body;
  //     await axios.post("/api/request", to, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     setMessage("Request failed");
  //   }
  // };

  // const requestBar =  () => {};
  const head = `DASHBOARD ${apiData?.firstName || apiData?.username} `;
  //   const apiname =  `${apiData?.firstName || apiData?.username}`
  // "DASHBOARD`${apiData?.firstName || apiData?.username}`"}
  return (
    <div className="dashboard">
      <Sidebar />
      <div>
        <div className="dash-head">
          <Header name={head} />
          <button onClick={handleOpenModal}>+request</button>
          <div>
            {showModal && (
              <div className="requestModal">
                <div className="modal-content">
                  <span className="close" onClick={handleCloseModal}>
                    &times;
                  </span>
                  <form onSubmit={RequestFun}>
                    <h2>email-id:</h2>
                    <div className="email-head">
                      <input
                        // {...formik.getFieldProps("to")}
                        type="email"
                        className="email"
                        onChange={(e) => setTo(e.target.value)}
                        value={to}
                      />
                      <button type="submit">request</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

// import React, { useState } from "react";
// import useFetch from "../hooks/fetch.hook";
// import { useAuthStore } from "../store/store";
// import axios from "axios";

// // const new
// function Dashboard() {
//   const [file, setFile] = useState(null);
//   const [message, setMessage] = useState("");
//   const { username } = useAuthStore((state) => state.auth);
//   const [{ apiData }] = useFetch(`/user/${username}`);
//   // function to handle file upload
//   const handleUpload = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("file", file);
//     try {
//       await axios.post("/api/upload", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       setMessage("File uploaded successfully");
//     } catch (error) {
//       console.error(error);
//       setMessage("Error uploading file");
//     }
//   };

//   // function to handle file download
//   const handleDownload = async (filename) => {
//     try {
//       const response = await axios.get(`/api/download/${filename}`, {
//         responseType: "blob",
//       });
//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", filename);
//       document.body.appendChild(link);
//       link.click();
//     } catch (error) {
//       console.error(error);
//       setMessage("Error downloading file");
//     }
//   };

//   // request
//   const handleRequest = async () => {
//     try {
//       const request = await axios.post(`/api/request`);
//     } catch (error) {
//       console.error(error);
//       setMessage("Error downloading file");
//     }
//   };
//   return (
//     <div>
//       <h1>Dashboard {apiData?.firstName || apiData?.username}</h1>
//       <form onSubmit={handleUpload}>
//         <label htmlFor="file">Upload file:</label>
//         <input
//           type="file"
//           id="file"
//           accept=".pdf,.doc,.docx,.txt"
//           onChange={(e) => setFile(e.target.files[0])}
//         />
//         <button type="submit">Upload</button>
//       </form>
//       {message && <p>{message}</p>}
//       <h2>Files</h2>
//       <div>
//         <button onClick={handleRequest}>submit</button>
//       </div>
//       {/* <ul>
//         <li>
//           <a href="#" onClick={() => handleDownload("example.pdf")}>
//             example.pdf
//           </a>
//         </li>
//         <li>
//           <a href="#" onClick={() => handleDownload("example.docx")}>
//             example.docx
//           </a>
//         </li>
//       </ul> */}
//     </div>
//   );
// }

// export default Dashboard;
