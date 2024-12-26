import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Registrasi() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nama: "",
    nik: "",
    email: "",
    password: "",
    confirm_password: "",
    no_hp: "",
    alamat_lengkap: "",
  });

  const [error, setError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirm_password) {
      setError({
        confirm_password: "Password dan konfirmasi password tidak cocok",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/register",
        {
          nama: formData.nama,
          nik: formData.nik,
          email: formData.email,
          password: formData.password,
          no_hp: formData.no_hp,
          alamat_lengkap: formData.alamat_lengkap,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      Swal.fire({
        title: "Berhasil!",
        text: response.data.message || "Anda berhasil melakukan registrasi.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/login");
      });
    } catch (err) {
      if (err.response && err.response.status === 422) {
        setError(err.response.data); // Menampilkan error spesifik tiap field
      } else {
        Swal.fire({
          title: "Terjadi Kesalahan!",
          text: "Gagal melakukan registrasi. Silakan coba lagi.",
          icon: "error",
          confirmButtonText: "Coba Lagi",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card shadow-lg border-0 rounded-lg mt-5">
            <div className="card-header">
              <h3 className="text-center font-weight-light my-4">
                Registrasi Akun
              </h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <div className="form-floating mb-3 mb-md-0">
                      <input
                        className="form-control"
                        id="nama"
                        name="nama"
                        type="text"
                        placeholder="Nama Lengkap Anda"
                        required
                        value={formData.nama}
                        onChange={handleChange}
                      />
                      {error.nama && (
                        <div className="text-danger small mt-1">
                          {error.nama}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        className="form-control"
                        id="nik"
                        type="text"
                        name="nik"
                        placeholder="NIK"
                        required
                        value={formData.nik}
                        onChange={handleChange}
                      />
                      {error.nik && (
                        <div className="text-danger small mt-1">
                          {error.nik}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="email"
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {error.email && (
                    <div className="text-danger small mt-1">{error.email}</div>
                  )}
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <div className="form-floating mb-3 mb-md-0">
                      <input
                        className="form-control"
                        id="no_hp"
                        type="text"
                        name="no_hp"
                        placeholder="Nomor HP"
                        required
                        value={formData.no_hp}
                        onChange={handleChange}
                      />
                      {error.no_hp && (
                        <div className="text-danger small mt-1">
                          {error.no_hp}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating mb-3 mb-md-0">
                      <input
                        className="form-control"
                        id="alamat_lengkap"
                        name="alamat_lengkap"
                        type="text"
                        placeholder="Alamat Lengkap"
                        required
                        value={formData.alamat_lengkap}
                        onChange={handleChange}
                      />
                      {error.alamat_lengkap && (
                        <div className="text-danger small mt-1">
                          {error.alamat_lengkap}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <div className="form-floating mb-3 mb-md-0">
                      <input
                        className="form-control"
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                      />
                      {error.password && (
                        <div className="text-danger small mt-1">
                          {error.password}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating mb-3 mb-md-0">
                      <input
                        className="form-control"
                        id="confirm_password"
                        type="password"
                        name="confirm_password"
                        placeholder="Konfirmasi Password"
                        required
                        value={formData.confirm_password}
                        onChange={handleChange}
                      />
                      {error.confirm_password && (
                        <div className="text-danger small mt-1">
                          {error.confirm_password}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-4 mb-0">
                  <button
                    className="btn btn-primary btn-block"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Membuat Akun"}
                  </button>
                </div>
              </form>
            </div>
            <div className="card-footer text-center py-3">
              <div className="small">
                <Link to="/login">Sudah Punya Akun? Login!</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registrasi;
