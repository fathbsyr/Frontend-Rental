import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/forgot-password",
        {
          email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        Swal.fire({
          title: "Berhasil!",
          text:
            response.data.message ||
            "Token reset password telah dikirim ke email Anda.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/reset-password");
        });
      } else {
        Swal.fire({
          title: "Gagal",
          text: response.data.message || "Gagal mengirim token ke email.",
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
                Forgot Password
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
                    placeholder="Masukkan email Anda yang terdaftar"
                    required
                    value={email}
                    onChange={handleChange}
                  />
                  {error && (
                    <div className="text-danger small mt-1">{error}</div>
                  )}
                </div>
                <div className="mt-4 mb-0">
                  <button className="btn btn-primary btn-block" type="submit"
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Lupa Password"}
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

export default ForgotPassword;
