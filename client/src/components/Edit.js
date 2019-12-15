import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Navbar from './Navbar';
import { getProfile, resetProfile, editProfile } from "../redux/actions/profileActions";

const Edit = (props) => {
  const [profile, setProfile] = useState(props.profile.data);

  const [values, setValues] = useState({
    businessName: "",
    fullName: "",
    phoneNumber: "",
    description: "",
    address: ""
  })

  useEffect(() => {
    document.title = "Profile"
    if (!props.auth.data) {
      props.history.push("/login");
      props.resetProfile()
    } else {
      props.getProfile(props.auth.data.id)
      setValues({
        businessName: props.profile.data.info.business_name,
        fullName: props.profile.data.info.full_name,
        phoneNumber: props.profile.data.info.phone_number,
        description: props.profile.data.info.description,
        address: props.profile.data.info.address
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
          <h1 className="text-3xl ml-2">Edit Profile</h1>
          <div className="inline px-8">
            {props.profile.isLoading ?
              "Loading" :
              <>
                {profile && profile.info.photo ?
                  <img
                    src={`/api/partner/${props.auth.data.id}/photo`}
                    className="mx-auto max-w-sm" />
                  :
                  <img
                    src={process.env.PUBLIC_URL + "/images/default_photo.svg"}
                    className="mx-auto max-w-sm" />
                }
                <h1 className="text-black text-base font-semibold border-border border-b-2 mt-2">Info</h1>
                <form onSubmit={() => {
                  props.editProfile(profile.info.id, values)
                  props.history.push("/profile")
                }}>
                  {profile && profile ?
                    <>
                      <label
                        className="text-base text-text">
                        Name Percetakan
                        <input
                          type="text"
                          name="businessName"
                          id="businessName"
                          defaultValue={profile.info.business_name}
                          onChange={(event) => handleChange(event)}
                          className="w-full border-primary border-2 rounded-lg py-1 px-2 focus:shadow-outline placeholder-secondary"
                          required />
                      </label>
                      <label
                        className="text-base text-text">
                        Name Lengkap
                        <input
                          type="text"
                          name="fullName"
                          id="fullName"
                          defaultValue={profile.info.full_name}
                          onChange={(event) => handleChange(event)}
                          className="w-full border-primary border-2 rounded-lg py-1 px-2 focus:shadow-outline placeholder-secondary"
                          required />
                      </label>
                      <label
                        className="block text-md uppercase font-base text-text py-2">
                        Nomor Telepon
                        <input
                          type="tel"
                          name="phoneNumber"
                          id="phoneNumber"
                          pattern="[0-9]{10,15}"
                          defaultValue={profile.info.phone_number}
                          onChange={(event) => handleChange(event)}
                          className="w-full border-primary border-2 rounded-lg py-1 px-2 focus:shadow-outline"
                          required />
                      </label>
                      <label
                        className="text-base text-text">
                        Deskripsi
                        <input
                          type="text"
                          name="description"
                          id="description"
                          defaultValue={profile.info.description ? profile.info.description : "-"}
                          onChange={(event) => handleChange(event)}
                          className="w-full border-primary border-2 rounded-lg py-1 px-2 focus:shadow-outline placeholder-secondary"
                          required />
                      </label>
                      <label
                        className="text-base text-text">
                        Alamat
                        <textarea
                          type="text"
                          name="address"
                          id="address"
                          defaultValue={profile.info.address}
                          onChange={(event) => handleChange(event)}
                          className="w-full border-primary border-2 rounded-lg py-1 px-2 focus:shadow-outline h-32"
                          required />
                      </label>
                    </>
                    : "Not found"}
                  <div className="pt-2 mt-2 border-border border-t-2">
                    <input
                      type="submit"
                      className="rounded bg-primary text-white py-2 px-4 uppercase text-lg text-medium w-full focus:shadow-outline cursor-pointer hover:bg-secondary" />
                  </div>
                </form>
              </>
            }
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
    editProfile: (partnerId, values) => { dispatch(editProfile(partnerId, values)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit)