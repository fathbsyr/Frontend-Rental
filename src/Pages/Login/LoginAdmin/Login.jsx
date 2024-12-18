import React, { useState } from "react";
import axios from "axios";

function LoginAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

/*************  ✨ Codeium Command ⭐  *************/
  /**
   * Handle login form submission
   * @param {React.FormEvent} e - The form event
   */
/******  6a686e8f-d454-4c3e-a3e3-5f3a47d455f6  *******/
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password.trim()) {
      setError("Email dan password tidak boleh kosong.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/api/admin/login", {
        email,
        password,
      });
      const { token, name: adminName } = response.data;
      alert("Login berhasil!");
      localStorage.setItem("token", token);
      localStorage.setItem("name", adminName);
      localStorage.setItem("role", "admin");
      window.location.href = "/admin/dashboard";

    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        "Terjadi kesalahan saat login. Silakan coba lagi."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5">
            <div className="card shadow-lg border-10 rounded-7 mt-5">
              <div className="card-header">
                <h3 className="text-center font-weight-light my-4">Login Administrator</h3>
              </div>
              <div className="card-body">
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleLogin}>
                  <div className="form-floating mb-3">
                    <label htmlFor="inputEmail">Email address</label>
                    <input
                      className="form-control"
                      id="inputEmail"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-floating mb-3">
                    <label htmlFor="inputPassword">Password</label>
                    <input
                      className="form-control"
                      id="inputPassword"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      id="inputRememberPassword"
                      type="checkbox"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="inputRememberPassword"
                    >
                      Remember Password
                    </label>
                  </div>
                  <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                    <button type="submit" className="btn btn-primary" disabled={isLoading}>
                      {isLoading ? "Logging in..." : "Login"}
                    </button>
                  </div>
                </form>
              </div>
              <div className="card-footer text-center py-3">
                <div className="small">
                  <a href="register.html">Need an account? Sign up!</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default LoginAdmin;
