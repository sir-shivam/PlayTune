// import React, { useEffect, useState } from "react";
// import Nav from "./nav";
// import { useNavigate, useParams } from "react-router-dom";
// import { authGet } from "../utils/serverFetch";
// import Loader from "./loader/Loader";

// export default function Home() {
//   const [myList1, setmyList1] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const getData = async () => {
//       setLoading(true);

//       try {
//         const response = await authGet("/playlist/get/all");
//         setmyList1(response);
//       } catch (error) {
//         console.error("Error fetching playlist data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getData();
//   }, []);

//   const PlaylistCard1 = ({ info, playlistId }) => {
//     const navigate = useNavigate();
//     return (
//       <div
//         className=" w-full h-full border  rounded-2xl m-8 flex  flex-col  items-center  "
//         onClick={() => {
//           navigate("/playlist/view/" + playlistId);
//         }}
//       >
//         <div className="r w-[80%] h-[20%] m-2 text-white text-3xl flex justify-center items-center">
//           {info.name}{" "}
//         </div>
//         <img
//           alt="thumbnail"
//           src={info.thumbnail}
//           className="box1  w-[80%] h-[65%] mt-3 rounded-xl "
//         ></img>
//       </div>
//     );
//   };


//   return (
//     <div>
//       <div className="full w-screen h-screen bg-[#0f0f0f] flex">
//         <Nav />
//         <div className="w-[80vw] h-[100vh]">
//           <div className="h-[25%] w-[100%]   flex ">
//             <div className="w-[70%]  h-[100%] content-end pb-3 ">
//               <div className="text-7xl text-white m-10 ">Discover </div>
//               <div className="flex  m-10 ">
//                 <div className="inline-block text-white m-6 ml-0 opacity-50  ">
//                   Popular
//                 </div>
//                 <div className="inline-block text-white m-6 ml-0 opacity-50  ">
//                   Popular
//                 </div>
//                 <div className="inline-block text-white m-6 ml-0 opacity-50  ">
//                   Popular
//                 </div>
//                 <div className="inline-block text-white m-6 ml-0 opacity-50  ">
//                   Popular
//                 </div>
//                 <div className="inline-block text-white m-6 ml-0 opacity-50  ">
//                   Popular
//                 </div>
//                 <div className="inline-block text-white m-6 ml-0 opacity-50  ">
//                   Popular
//                 </div>
//               </div>
//             </div>
//             <div className="text-white flex ml-[10%] mt-[5%] border  ">
//               <div className="w-[60px] h-[60px] border rounded-[50%] flex justify-center items-center  ">
//                 <i class="fa-solid fa-user text-4xl "></i>
//               </div>
//               <div className=" h-[60px] border flex flex-col justify-evenly items-center ml-4 ">
//                 <p className="cursor-pointer " >Shivam</p>
//                 <p>India</p>
//               </div>
//               <div className="text-white cursor-pointer" >Upload song</div>
//             </div>
//           </div>

//           <div className="h-[72%] w-[95%] p-8  overflow-y-auto ">
//             {loading ? (
//               <Loader />
//             ) : (
//               <>
//                 <div className="   grid gap-8 grid-cols-3 ">
//                   {myList1.map((item) => {
//                     return (
//                       <PlaylistCard1
//                         key={JSON.stringify(item)}
//                         info={item}
//                         playlistId={item._id}
//                       />
//                     );
//                   })}
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import Nav from "./nav";
import { useNavigate } from "react-router-dom";
import { authGet } from "../utils/serverFetch";
import Loader from "./loader/Loader";

export default function Home() {
  const [myList1, setMyList1] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSinger, setIsSinger] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);

      try {
        const response = await authGet("/playlist/get/all");
        setMyList1(response);

        // // Assume user info is also returned or fetched from another endpoint
        // const userInfo = await authGet("/user/me");
        // setIsSinger(userInfo.singer);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const PlaylistCard1 = ({ info, playlistId }) => {
    const navigate = useNavigate();
    return (
      <div
        className="w-full h-full border rounded-2xl m-4 p-4 flex flex-col items-center cursor-pointer"
        onClick={() => {
          navigate("/playlist/view/" + playlistId);
        }}
      >
        <div className="w-[80%] h-[20%] text-white text-2xl flex justify-center items-center">
          {info.name}
        </div>
        <img
          alt="thumbnail"
          src={info.thumbnail}
          className="w-[80%] h-[65%] mt-3 rounded-xl object-cover"
        />
      </div>
    );
  };

  return (
    <div className="w-full  h-screen bg-[#0f0f0f] flex flex-col md:flex-row">
      <div className="hidden md:block">
      <Nav />
      </div>
      <div className="w-full  md:w-[80vw] border h-full">
      <div className=" md:hidden">
      <Nav />
      </div>
        <div className="flex flex-col md:flex-row items-center md:items-start md:h-[25%] w-full p-4 md:p-10">
          <div className="flex flex-col w-full md:w-[70%] text-white">
            <div className="text-4xl md:text-7xl mb-4">Discover</div>
            <div className="flex flex-wrap">
              {["Popular", "Trending", "New", "Hot", "Charts", "Genres"].map((category, index) => (
                <div key={index} className="inline-block text-white m-2 opacity-50 cursor-pointer">
                  {category}
                </div>
              ))}
            </div>
          </div>
          <div className="text-white flex mt-4 md:ml-[10%] md:mt-[5%] items-center">
            {/* <div className="w-[60px] h-[60px] border rounded-full flex justify-center items-center">
              <i className="fa-solid fa-user text-4xl"></i>
            </div> */}
            {/* <div className="flex flex-col justify-evenly items-center ml-4">
              <p className="cursor-pointer">Shivam</p>
              <p>India</p>
            </div> */}
            {isSinger && (
              <div className="text-white cursor-pointer ml-4">Upload song</div>
            )}
          </div>
        </div>
        <div className="h-[72%] w-[97%] border p-4 md:p-8 overflow-y-auto ">
          
        
          {loading ? (
            <Loader />
          ) : (
            <div className="grid gap-4 md:gap-8 grid-cols-2 md:grid-cols-3">
              {myList1.map((item) => (
                <PlaylistCard1 key={item._id} info={item} playlistId={item._id} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
