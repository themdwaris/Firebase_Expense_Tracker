import React from "react";
import UserAuth from "./components/UserAuth";

const App = () => {
  return (
    <div className="w-full min-h-lvh bg-gray-900 px-5">
      <div className="max-w-5xl mx-auto py-4 text-white">
        <UserAuth />
      </div>
    </div>
  );
};

export default App;
