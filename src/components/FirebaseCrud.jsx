import React, { useEffect, useState } from "react";
import { db } from "../fbConfig";
import {
  getDocs,
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import ContextMenu from "./ContextMenu";

const FirebaseCrud = ({ user,isLoading, logout }) => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
    owner:""
  });
  const [isContext, setIsContext] = useState(false);
  const [contextPosition, setContextPosition] = useState({});
  const [edit, setEdit] = useState({});
  const [editId, setEditId] = useState("");
  const [category, setCategory] = useState("");

  const usersCollectionRef = collection(db, "crud");
  // console.log(usersCollectionRef);
  
  const createUser = async (e) => {
    e.preventDefault();
    if (
      formData.title === "" ||
      formData.category === "" ||
      formData.price === ""
    ) {
      alert("Please enter all fields");
      return;
    }
    const productExist = users.find(
      (product) => product.title.toLowerCase() === formData.title.toLowerCase()
    );
    if (productExist){
      setFormData({ title: "", category: "", price: "" });
      alert("Item is already present")
      return;
    }

    if (editId) {
      const updateUserRef = doc(db, "crud", editId);
      await updateDoc(updateUserRef, {...formData});

      setEditId("");
    } else {
      await addDoc(usersCollectionRef, {...formData,owner:user?.uid});
    }
    setFormData({ title: "", category: "", price: "" });
    getUsers(user?.uid)
  };

  const getUsers = async (uid) => {
    const q=query(usersCollectionRef,where("owner","==",uid))
    const data = await getDocs(q);
    let expense=[]
    data.forEach((d)=>{ 
      expense.push({...d.data(),id:d.id})
    })
    setUsers(expense);
  };

  const deleteUser = async (id) => {
    if (id) {
      const deleteUserRef = doc(db, "crud", id);
      await deleteDoc(deleteUserRef);
      getUsers(user?.uid)
    }
  };
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    setContextPosition({ left: e.clientX, top: e.clientY });
    setIsContext(true);
  };

  const filteredExpense = users?.filter((expense) =>
    expense?.category?.includes(category)
  );

  const totalPrice =
    users?.length &&
    filteredExpense?.reduce((acc, val) => acc + parseFloat(val.price), 0);

  useEffect(() => {
    getUsers(user?.uid);
  }, [user,isLoading]);

  return (
    <div className="min-h-lvh relative">
      <h1 className="text-3xl pt-10 text-center">CRUD Using firebase</h1>
      <p className="text-center pt-5 pb-1 text-xl">Welcome {user?.displayName}</p>
      <p className="text-sm text-center pb-10 md:hidden">Press & hold row which you want to Update or Delete</p>
      <p className="text-sm text-center pb-10 hidden md:block">Mouse over any row which you want to Update or Delete</p>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 justify-center gap-4 mb-10">
        <form
          onSubmit={createUser}
          className="w-full max-w-xl mx-auto flex flex-col gap-3"
        >
          <input
            type="text"
            name="title"
            id=""
            value={formData.title}
            placeholder="Name"
            className="w-full p-2 px-3 rounded-md bg-white/20 text-xl outline-none"
            onChange={handleInput}
          />

          <select
            name="category"
            value={formData.category}
            className="w-full p-2 px-3 rounded-md bg-white/20 text-xl outline-none"
            onChange={handleInput}
          >
            <option hidden className=" bg-white/20">
              Select category
            </option>
            <option value="Education" className="option-custom">
              Education
            </option>
            <option value="Tech" className="option-custom">
              Tech
            </option>
            <option value="Grocery" className="option-custom">
              Grocery
            </option>
            <option value="Medicine" className="option-custom">
              Medicine
            </option>
          </select>
          <input
            type="number"
            name="price"
            id=""
            value={formData.price}
            placeholder="Enter price"
            className="remove-arrow w-full p-2 px-3 rounded-md bg-white/20 text-xl outline-none"
            onChange={handleInput}
          />
          <button
            type="submit"
            className="w-full p-2 rounded-md cursor-pointer bg-green-600 text-white text-xl transition-transform active:scale-90 hover:bg-green-800"
          >
            {editId ? "Update" : "Create"}
          </button>
        </form>

        <div className="mb-20">
          <table className="mt-6 md:mt-0 w-full border border-gray-300">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="border border-gray-300 px-4 py-2">Title</th>
                <th className="border border-gray-300 px-4 py-2">
                  <select
                    name="category"
                    value={category}
                    className="w-full rounded-md p-1 bg-white/20 outline-none"
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option hidden className=" bg-white/20">
                      Category
                    </option>
                    <option value="" className="option-custom">
                      All
                    </option>
                    <option value="Education" className="option-custom">
                      Education
                    </option>
                    <option value="Tech" className="option-custom">
                      Tech
                    </option>
                    <option value="Grocery" className="option-custom">
                      Grocery
                    </option>
                    <option value="Medicine" className="option-custom">
                      Medicine
                    </option>
                  </select>
                </th>
                <th className="border border-gray-300 px-4 py-2">Price</th>
              </tr>
            </thead>
            <tbody
              onClick={(e) => {
                e.stopPropagation();
                setIsContext(false);
              }}
              className="select-none"
            >
              {isContext && (
                <tr>
                  <td>
                    <ContextMenu
                      setIsContext={setIsContext}
                      left={contextPosition.left}
                      top={contextPosition.top}
                      edit={edit}
                      setEditId={setEditId}
                      setFormData={setFormData}
                      deleteUser={deleteUser}
                    />
                  </td>
                </tr>
              )}
              {filteredExpense?.map((user) => (
                <tr
                  key={user.id}
                  onContextMenu={(e) => {
                    handleContextMenu(e);
                    setEdit(user);
                  }}
                >
                  <td className="border border-gray-300 px-2 py-2 ">
                    <div className="custom-scrollbar max-w-[150px] md:max-w-[250px] overflow-x-auto ">
                      {user.title}
                    </div>
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    {user.category}
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <div className="custom-scrollbar max-w-[60px] md:max-w-[200px] overflow-x-auto ">
                      {user.price}
                    </div>
                  </td>
                </tr>
              ))}
              <tr>
                <td className="border border-gray-300 px-2 py-2 font-bold">
                  Total
                </td>
                <td></td>
                <td className="border border-gray-300 px-2 py-2 ">
                  <div className="custom-scrollbar max-w-[70px] md:max-w-[250px] overflow-x-auto font-bold">
                    ₹{totalPrice}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <button
        className=" p-3 flex items-center gap-2 rounded-lg cursor-pointer bg-red-500 text-white absolute right-0 bottom-0 transition-transform active:scale-90 hover:bg-red-600"
        onClick={logout}
      >
        Logout
        <span className="text-xl leading-3">
          <ion-icon name="log-out"></ion-icon>
        </span>
      </button>
    </div>
  );
};

export default FirebaseCrud;
