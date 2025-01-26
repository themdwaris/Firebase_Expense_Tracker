import React from "react";

const ContextMenu = ({ setIsContext, left, top, edit,setEditId,setFormData,deleteUser }) => {
  
  return (
    <span
      className={`rounded-md bg-white text-black flex flex-col gap-2 cursor-pointer shadow-lg absolute `}
      style={{ left: left, top: top }}
    >
      <span
        className="px-4 pt-2 leading-3"
        onClick={() => {
          setEditId(edit.id)
          setFormData(edit);
          setIsContext(false);
          
        }}
      >
        Edit
      </span>
      <span className="h-[1px] bg-gray-500 w-full"></span>
      <span className="px-4 pb-2 leading-3" onClick={() => {
        deleteUser(edit.id)
        setIsContext(false)

      }}>
        Delete
      </span>
    </span>
  );
};

export default ContextMenu;
