import React from "react";
import Login from "../Login";

const LoginModalComponent = () => {
  return (
    <div className="modal-box bg-white">
      <form method="dialog">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
      </form>
      <div>
        <Login />
      </div>
    </div>
  );
};

export default LoginModalComponent;
