import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/navbar";
import useCreateFolder from "../hooks/useCreateFolder";
import useGetFileFolders from "../hooks/useGetFileFolders";
import useUploadFile from "../hooks/useUploadFile";

const Home = () => {
  const inputRef = useRef(null);
  const [newFolder, setNewFolder] = useState("");
  const [folderStructure, setFolderStructure] = useState([{ _id: null, name: "Cloud Home" }]);
  const parentFolder = folderStructure[folderStructure.length - 1];
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const { createFolder } = useCreateFolder();
  const { getFileFolders, fileFolders } = useGetFileFolders();

  const handleAllowCreateFolder = () => {
    setShowCreateFolder(true);
  };

  const handleDoubleClick = (elem) => {
    if (elem.type === "folder") {
      setFolderStructure([...folderStructure, elem]);
    }

    else {
      window.open(elem.link)
    }
  }

  const handleCreateFolder = async () => {
    if (newFolder.length > 0) {
      await createFolder({
        name: newFolder,
        parentId: parentFolder._id,
      });

      getFileFolders(parentFolder._id);
      setNewFolder("")
      // setShowCreateFolder(false);
    }
  };

  const handleBackClick = (clickIdx) => {
    const newFolderStructure = folderStructure.filter((elem, idx) => idx <= clickIdx);
    setFolderStructure(newFolderStructure);
  };

  const { isUploadAllowed, uploadFile } = useUploadFile();

  const handleFileUpload = async (e) => {
    if (isUploadAllowed) {
      const file = e.target.files;
      await uploadFile({ file: file[0], parentId: parentFolder._id, });
      getFileFolders(parentFolder._id)
    }
    else {
      alert("Uploading is already in progress. Please wait...");
    }

  }

  useEffect(() => {
    getFileFolders(parentFolder._id);
  }, [folderStructure]);

  return (
    <div className="page">
      <Navbar />
      <div className="homepage-main-container">
        <h3 className="heading">Welcome to Cloud Home</h3>

        <button className="create" onClick={handleAllowCreateFolder}>Create Folder</button>

        <p className="heading-2">Upload File from your device</p>
        <input className="file-upload-input" ref={inputRef} type="file" onChange={handleFileUpload}  />

        <ul style={{ display: "flex", flexWrap: "wrap", padding: "24px", gap: "24px" }}>
          {folderStructure.flatMap((elem, idx) => {
            if (elem.name) return <li onClick={() => handleBackClick(idx)}>{elem.name}</li>
            else return null;
          })}</ul>

        <div>
          {showCreateFolder && (
            <div className="input-Feild-container">
              <input className="input-Feild-container-input"
                value={newFolder}
                onChange={(e) => setNewFolder(e.target.value)}
              />

              <button onClick={handleCreateFolder} className="input-Feild-container-create-button">Create</button>
              <button onClick={() => setShowCreateFolder(false)} className="input-Feild-container-cancel-button">Cancel</button>
            </div>
          )}
        </div>

        <div style={{display: "flex", flexWrap: "wrap"}}>
          {fileFolders.map((elem) => {
            return <div style={{
              backgroundColor: elem.type === "folder" ? "grey" : "green",
              border: "1px solid grey",
              borderRadius: "8px",
              width: "fit-content",
              margin: "8px 16px",
              cursor: "pointer",
              color: "white",
              fontSize: "20px",
              width: "280px",
              height: "60px",
              textAlign: "center", 
              paddingTop: "35px"    
            }}
              onDoubleClick={() => handleDoubleClick(elem)}>{elem.name}</div>;
          })}
        </div>
      </div>
    </div>
  );
};

export default Home