import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import Navbar from './Navbar';
import { getProfile, resetProfile, addProduct } from "../redux/actions/profileActions";

const Product = (props) => {
  const [profile, setProfile] = useState(props.profile.data);

  const [values, setValues] = useState({
    name: "",
    price: ""
  })

  useEffect(() => {
    document.title = "Profile"
    if (!props.auth.data) {
      props.history.push("/login");
      props.resetProfile()
    } else {
      props.getProfile(props.auth.data.id)
      setValues({
        name: props.profile.data.info.business_name,
        price: props.profile.data.info.full_name,
      })
    }
    return () => {
      props.resetProfile()
    }
  }, [])

  useEffect(() => {
    if (!props.auth.data) {
      props.history.push("/login");
      props.resetProfile()
    }
  }, [props.auth.data])

  useEffect(() => {
    setProfile(props.profile.data)
  }, [props.profile])

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues({ ...values, [name]: value })
    console.log(values)
  }

  console.log(props.profile)
  if (props.auth.data) {
    return (
      <div className="bg-gray-100 h-screen">
        <Navbar goTo={"LogOut"} onNav={4}></Navbar>
        <div className="sm:pt-32 pt-40 px-8">
          <h1 className="text-3xl ml-2">Tambah Jasa</h1>
          <div className="px-8">
            <form onSubmit={() => {
              props.addProduct(profile.info.id, values)
              props.history.push("/profile")
            }}>
              <label
                className="text-base text-text">
                Name Jasa
              <input
                  type="text"
                  name="name"
                  id="name"
                  onChange={(event) => handleChange(event)}
                  className="w-full border-primary border-2 rounded-lg py-1 px-2 focus:shadow-outline placeholder-secondary"
                  required />
              </label>
              <label
                className="text-base text-text">
                Harga Jasa
              <input
                  type="number"
                  name="price"
                  id="price"
                  min="0"
                  defaultValue="0"
                  onChange={(event) => handleChange(event)}
                  className="w-full border-primary border-2 rounded-lg py-1 px-2 focus:shadow-outline placeholder-secondary"
                  required />
              </label>
              <div className="pt-2 mt-2">
                <input
                  type="submit"
                  className="rounded bg-primary text-white py-2 px-4 uppercase text-lg text-medium w-full focus:shadow-outline cursor-pointer hover:bg-secondary"
                  value="Tambah" />
              </div>
            </form>
          </div>
        </div>
      </div >
    )
  } else {
    return null;
  }
}
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    profile: state.profile
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProfile: (partnerId) => { dispatch(getProfile(partnerId)) },
    resetProfile: () => { dispatch(resetProfile()) },
    addProduct: (partnerId, values) => { dispatch(addProduct(partnerId, values)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)