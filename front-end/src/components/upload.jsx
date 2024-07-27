import { OpenUploadWidget } from "../utils/cloudinaryService";

const CloudinaryUpload = ({ setUrl, setName , settime}) => {
  const uploadImageWidget = () => {
    let myUploadWidget = OpenUploadWidget(
      {
        cloudName: "dih9hnlxw",
        uploadPreset: "upload", 
        sources: ["local"],
      },
      function (error, result) {
        if (!error && result.event === "success") {
          console.log(result);
          setUrl(result.info.secure_url);
          setName(result.info.original_filename);
          settime(result.info.duration/60);
        } else {
          if (error) {
            console.log(error);
          }
        }
      }
    );
    myUploadWidget.open();
  };

  return (
    <button
      className="bg-white text-black  rounded-full p-4 font-semibold"
      onClick={uploadImageWidget}
    >
      Select Track
    </button>
  );
};

export default CloudinaryUpload;
