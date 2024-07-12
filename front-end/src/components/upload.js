import { OpenUploadWidget } from "../utils/cloudinaryService";

const CloudinaryUpload = () => {
  const uploadImageWidget = ({setUrl , setName}) => {
    console.log("hello");
    let myUploadWidget = OpenUploadWidget(
      {
        cloudName:"aggsgha",
        uploadPreset:"uploadBox" ,
        sources: ["local"]
      },
      function (error, result) {
        if (!error && result.event === "success") {
          setUrl(result.info.secure_url ); 
          setName(result.info.original_filename ); 
        }
        else{
          if(error){
            console.log("error");
          }
        }
      }
    );
    myUploadWidget.open();
  };

  return (
    <button className="greenButton border text-white " onClick={uploadImageWidget}>
      Upload Image
    </button>
  );
};

export default CloudinaryUpload;
