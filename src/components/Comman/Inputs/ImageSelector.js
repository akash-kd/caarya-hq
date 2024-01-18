import React, { useEffect, useRef, useState } from "react";
import { FilePicker } from "react-file-picker";
import { uploadFile, deleteFile } from "config/APIs/files";
import { useDispatch } from "react-redux";
import { showToast } from "redux/toaster";

const ImageSelector = ({
  onSuccess,
  onError,
  onDelete,
  image,
  showImage,
  showName = true,
  disabled,
}) => {
  const dispatch = useDispatch();
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(image ? true : false);
  const [selectedFile, setSelectedFile] = useState(image || {});
  const [selectedFileSize, setSelectedFileSize] = useState();
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setUploaded(image ? true : false);
    setSelectedFile(image || {});
  }, [image]);

  const handleError = (err) => {
    dispatch(showToast({ message: err, type: "error" }));

    onError && onError(err);
  };

  const handleFilePicker = async (pickedFile) => {
    if (pickedFile.size > 10485760) {
      handleError("File size cannot exceed 10MB");
      return;
    }
    console.log(pickedFile);
    setUploading(true);
    try {
      const response = await uploadFile({ file: pickedFile });
      const { file } = response.data.data;
      onSuccess(file);
      setSelectedFile(file);
      setSelectedFileSize(pickedFile.size);
      setUploaded(true);
    } catch (err) {
      console.log("File Upload error", err);
      const message = `File Upload Error!`;
      handleError(message);
    }
    setUploading(false);
  };

  const handleDelete = async () => {
    setDeleting(true);
    await deleteFile({ id: selectedFile.id });
    setSelectedFile({});
    setUploaded(false);
    setDeleting(false);
    onDelete();
  };

  const handleFilePickerError = (err) => {
    console.log("File Picker Error", err);
    const message = `Please select an appropriate image file!`;
    handleError(message);
  };

  return (
    <div>
      {uploaded ? (
        <>
          <div className="flex flex-col items-start">
            {showImage && (
              <img
                src={selectedFile.url}
                style={{ width: 100, borderRadius: 10 }}
              />
            )}

            {showName && (
              <div style={{ margin: 5 }}>
                <a href={selectedFile.url} download={selectedFile.name}>
                  {selectedFile.name || "Profile Pic"}
                  {selectedFileSize &&
                    `${Math.round(selectedFileSize / (1024 * 1024))} MB`}
                </a>
              </div>
            )}
            {!disabled && (
              <>
                {
                  deleting ? (
                    <div className="red text-2xs font-lato">Deleting...</div>
                  ) : (
                    //  showName ? (
                    //   <div style={{ margin: 5 }}>
                    //     <Button
                    //       onClick={handleDelete}
                    //       color="outline"
                    //       className="capitalize font-medium text-xs rounded"
                    //     >
                    //       Delete
                    //     </Button>
                    //   </div>
                    // ) : (
                    <div
                      onClick={handleDelete}
                      className="text-red-600 text-2xs"
                    >
                      Delete Image
                    </div>
                  )
                  // )
                }
              </>
            )}
          </div>
          {selectedFileSize > 1048576 ? (
            <div className="text-xs text-purple-300">
              {"Warning:Image size is >1MB, try compressing it."}
            </div>
          ) : (
            ""
          )}
        </>
      ) : uploading ? (
        <div className="flex flex-row items-center">
          <div>Uploading...</div>
        </div>
      ) : (
        <FilePicker
          extensions={["png", "jpeg", "jpg", "svg"]}
          onChange={handleFilePicker}
          onError={handleFilePickerError}
          maxSize={6000}
        >
          <button
            color="outline"
            className="capitalize font-normal text-xs rounded"
            disabled={disabled}
          >
            Upload Image
          </button>
        </FilePicker>
      )}
    </div>
  );
};

export default ImageSelector;
