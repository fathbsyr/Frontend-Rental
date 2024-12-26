import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function ResetPasswordAdmin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState([]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password_confirmation: "",
    token: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError([]);

    // Validasi frontend
    if (
      !formData.token ||
      !formData.email ||
      !formData.password ||
      !formData.password_confirmation
    ) {
      Swal.fire({
        title: "Peringatan",
        text: "Harap isi semua bidang dengan benar.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    if (formData.password !== formData.password_confirmation) {
      setError({
        password_confirmation: "Password dan konfirmasi password tidak cocok.",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/admin/reset-password",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        Swal.fire({
          title: "Berhasil!",
          text: response.data.message || "Password Anda telah diubah.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/login");
        });
      } else {
        Swal.fire({
          title: "Gagal",
          text: response.data.message || "Gagal mengubah password.",
          icon: "error",
          confirmButtonText: "Coba Lagi",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Gagal",
        text:
          error.response?.data?.message ||
          "Terjadi kesalahan. Silakan coba lagi.",
        icon: "error",
        confirmButtonText: "Coba Lagi",
      });
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
                Ubah Password Anda
              </h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Email Anda Yang Terdaftar"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {error.email && (
                    <div className="text-danger small mt-1">{error.email}</div>
                  )}
                </div>
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="token"
                    type="text"
                    name="token"
                    placeholder="Token Yang Sudah Terkirim Ke Email Anda"
                    required
                    value={formData.token}
                    onChange={handleChange}
                  />
                  {error.token && (
                    <div className="text-danger small mt-1">{error.token}</div>
                  )}
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <div className="form-floating mb-3 mb-md-0">
                      <input
                        className="form-control"
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Password Baru Anda"
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
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        placeholder="Konfirmasi Password Baru"
                        required
                        value={formData.password_confirmation}
                        onChange={handleChange}
                      />
                      {error.password_confirmation && (
                        <div className="text-danger small mt-1">
                          {error.password_confirmation}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-4 mb-0">
                  <button className="btn btn-primary btn-block" type="submit"
                  disabled={loading}
                  >
                    {loading ? "Loading..." : "Ubah Password"}
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
export default ResetPasswordAdmin;
