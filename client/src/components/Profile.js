import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Navbar from './Navbar';
import { getProfile, resetProfile } from "../redux/actions/profileActions";

const Profile = (props) => {
  const [profile, setProfile] = useState(props.profile.data);

  useEffect(() => {
    document.title = "Profile"
    props.getProfile(props.auth.data.id)
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

  console.log(profile)
  if (props.auth.data) {
    return (
      <div className="bg-gray-100 h-screen">
        <Navbar goTo={"LogOut"} onNav={4}></Navbar>
        <div className="sm:pt-32 pt-40 px-8">
          <h1 className="text-3xl ml-2">Profile</h1>
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
                <Link to="#" className="text-primary text-semibold float-right">Edit Profile</Link>
                <h1 className="text-black text-base font-semibold border-border border-b-2">Info</h1>
                {profile && profile ?
                  <>
                    <p className="text-base text-text">Name Percetakan</p>
                    <p className="text-base text-black">{profile.info.business_name}</p>
                    <p className="text-base text-text">Name Lengkap</p>
                    <p className="text-base text-black">{profile.info.full_name}</p>
                    <p className="text-base text-text">Deskripsi</p>
                    <p className="text-base text-black">{profile.info.description}</p>
                    <p className="text-base text-text">Alamat</p>
                    <p className="text-base text-black">{profile.info.address}</p>
                  </>
                  : "Not found"}
                <h1 className="text-black text-base font-semibold border-border border-b-2 my-4">Status</h1>
                <Link to="#" className="text-primary text-semibold float-right">Tambah Jasa</Link>
                <h1 className="text-black text-base font-semibold border-border border-b-2">Jasa</h1>
                {profile && profile.products ?
                  <table className="table-fixed">
                    <thead>
                      <tr>
                        <th className="w-1/12 px-4 py-2">No.</th>
                        <th className="w-9/12 px-4 py-2">Nama</th>
                        <th className="w-1/12 px-4 py-2">Nominal</th>
                        <th className="w-1/12 px-4 py-2">Action</th>
                      </tr>
                    </thead>
                    {profile.products.map((product, index) => {
                      return (
                        <tbody>
                          <tr className={index % 2 == 1 ? "bg-border" : null}>
                            <td className="border px-4 py-2 border-text">{index}</td>
                            <td className="border px-4 py-2 border-text">{product.name}</td>
                            <td className="border px-4 py-2 border-text">{product.price}</td>
                            <td className="border px-4 py-2 border-text">
                              <div className="flex">
                                <button className="bg-primary rounded text-white px-4 py-2 mx-2">Edit</button>
                                <button className="bg-danger rounded text-white px-4 py-2">Hapus</button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      )
                    })}
                  </table>
                  : "Tidak ada product"}
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
    resetProfile: () => { dispatch(resetProfile()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)