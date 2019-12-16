import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Navbar from './Navbar';
import { getProfile, resetProfile, changeStatus } from "../redux/actions/profileActions";

const Profile = (props) => {
  const [profile, setProfile] = useState(props.profile.data);

  useEffect(() => {
    document.title = "Profile"
    if (!props.auth.data) {
      props.history.push("/login");
      props.resetProfile()
    } else {
      props.getProfile(props.auth.data.id)
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

  const handleRemoveProduct = (partnerId, productId) => {
    fetch(`/api/partner/${partnerId}/product/${productId}`, {
      method: "DELETE"
    })
      .then(res => {
        if (res.ok) {
          props.getProfile(props.auth.data.id)
        }
      })
  }

  const handleUpload = (e) => {
    const data = new FormData()
    data.append('photo', e.target.files[0])
    fetch(`/api/partner/${props.auth.data.id}/photo`, {
      method: "PATCH",
      body: data
    })
      .then(res => {
        if (res.ok) {
          props.getProfile(props.auth.data.id)
        }
      })
  }

  console.log(profile)
  if (props.auth.data) {
    return (
      <div className="bg-gray-100 h-screen">
        <Navbar goTo={"LogOut"} onNav={4}></Navbar>
        <div className="sm:pt-24 pt-32 px-8">
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
                <input type="file" onChange={(e) => handleUpload(e)} />
                <div>
                  <Link to="/profile/edit" className="text-primary text-semibold float-right">Edit Profile</Link>
                  <h1 className="text-black text-base font-semibold border-border border-b-2 mt-2">Info</h1>
                </div>
                {profile && profile ?
                  <>
                    <p className="text-base text-text">Name Percetakan</p>
                    <p className="text-base text-black">{profile.info.business_name}</p>
                    <p className="text-base text-text">Name Lengkap</p>
                    <p className="text-base text-black">{profile.info.full_name}</p>
                    <p className="text-base text-text">Nomor Telepon</p>
                    <p className="text-base text-black">{profile.info.phone_number}</p>
                    <p className="text-base text-text">Deskripsi</p>
                    <p className="text-base text-black">{profile.info.description ? profile.info.description : "-"}</p>
                    <p className="text-base text-text">Alamat</p>
                    <p className="text-base text-black">{profile.info.address}</p>
                  </>
                  : "Not found"}
                <h1 className="text-black text-base font-semibold border-border border-b-2 mt-2">Status</h1>
                <div className="block text-xs font-base">
                  <label className="flex items-center text-base">
                    <input type="checkbox" className="mr-2"
                      checked={profile && profile.info.status === 1 ? true : false}
                      onChange={() => props.changeStatus(profile.info.id)} />
                    {profile && profile.info.status ? "Buka" : "Tutup"}
                  </label>
                </div>
                <div>
                  <Link to="/profile/product" className="text-primary text-semibold float-right">Tambah Jasa</Link>
                  <h1 className="text-black text-base font-semibold border-border border-b-2 mt-2">Jasa</h1>
                </div>
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
                        <tbody key={product.id}>
                          <tr className={index % 2 === 1 ? "bg-border" : null}>
                            <td className="border px-4 py-2 border-text">{index+1}</td>
                            <td className="border px-4 py-2 border-text">{product.name}</td>
                            <td className="border px-4 py-2 border-text">{product.price}</td>
                            <td className="border px-4 py-2 border-text">
                              <div className="flex">
                                {/* <button className="bg-primary rounded text-white px-4 py-2 mx-2">Edit</button> */}
                                <button className="bg-danger rounded text-white px-4 py-2"
                                  onClick={() => handleRemoveProduct(profile.info.id, product.id)}>Hapus</button>
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
    resetProfile: () => { dispatch(resetProfile()) },
    changeStatus: (partnerId) => { dispatch(changeStatus(partnerId)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)