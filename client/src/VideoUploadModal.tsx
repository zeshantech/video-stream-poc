import React, { useState } from "react";
import { Dialog, Pane, Spinner } from "evergreen-ui"; // Import Spinner component for loading state
import axios from "axios";
import { SERVER_URL } from "./constants";

interface VideoUploadModalProps {
  showModal: boolean;
  onClose: () => void;
}

export default function VideoUploadModal({ showModal, onClose }: VideoUploadModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // State variable to track loading state

  const handleUploadOnServer = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      setLoading(true);

      const response = await axios.post(SERVER_URL + "video", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status !== 200) {
        throw new Error("Failed to upload file");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false); // Set loading state to false after upload completes or errors
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      await handleUploadOnServer(selectedFile);
      setSelectedFile(null);
      onClose();
    }
  };

  return (
    <Dialog isShown={showModal} title='Upload Video' onCloseComplete={onClose} confirmLabel='Upload' onConfirm={handleUpload} cancelLabel='Close' onCancel={onClose} shouldCloseOnOverlayClick={true} isConfirmLoading={loading} isConfirmDisabled={loading}>
      <Pane>
        <input type='file' onChange={handleFileChange} accept='video/*' />
      </Pane>
      {loading && <Spinner marginX='auto' marginTop={20} />}
    </Dialog>
  );
}
