import React from 'react'

const Navbar = (props) => {
  return (
    <nav class="flex fixed top-0 left-0 right-0 justify-between flex-wrap bg-white p-6 shadow-md">
      <div className="flex items-center" style={{ width: "100%" }}>
        <div className="flex flex-grow font-bold text-3xl" >
          <div className="text-purple-900">Wak</div>
          <div className="text-purple-400">Print</div>
        </div>
        <div>
          <button
            onClick={() => props.goToRedirect()}
            className="btn btn-primary text-lg text-medium px-12">
            {props.goTo}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;