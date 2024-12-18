import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function AddPelanggan() {
  const [pelanggan, setPelanggan] = useState({
    nama: "",
    nik: "",
    email: "",
    password: "",
    no_hp: "",
    alamat_lengkap: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi untuk password
    if (pelanggan.password.length < 8) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password harus minimal 8 karakter",
      }));
      return;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "", // Reset error password jika valid
      }));
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8000/api/pelanggan/create",
        pelanggan,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        alert("Data Pelanggan Berhasil Dibuat");
        navigate("/admin/pelanggan");
      } else {
        alert("Gagal Menambahkan Pelanggan");
      }
    } catch (err) {
      alert("Terjadi kesalahan, silahkan coba lagi");
      console.error(err);
    }
  };

  return (
    <div className="m-3 p-3">
      <h2>Tambah Pelanggan</h2>
      <form onSubmit={handleSubmit}>
        {/* Nama */}
        <div className="form-group">
          <label htmlFor="nama">Nama</label>
          <input
            id="nama"
            name="nama"
            type="text"
            value={pelanggan.nama}
            onChange={(e) =>
              setPelanggan({ ...pelanggan, nama: e.target.value })
            }
            className="form-control"
          />
        </div>

        {/* NIK */}
        <div className="form-group">
          <label htmlFor="nik">NIK</label>
          <input
            id="nik"
            name="nik"
            type="text"
            value={pelanggan.nik}
            onChange={(e) =>
              setPelanggan({ ...pelanggan, nik: e.target.value })
            }
            className="form-control"
          />
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={pelanggan.email}
            onChange={(e) =>
              setPelanggan({ ...pelanggan, email: e.target.value })
            }
            className="form-control"
          />
        </div>

        {/* Password */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            minLength="8" // Menambahkan batasan panjang minimal password
            value={pelanggan.password}
            onChange={(e) =>
              setPelanggan({ ...pelanggan, password: e.target.value })
            }
            className="form-control"
            required
          />
          {errors.password && (
            <small className="text-danger">{errors.password}</small>
          )}
        </div>

        {/* No HP */}
        <div className="form-group">
          <label htmlFor="no_hp">No HP</label>
          <input
            id="no_hp"
            name="no_hp"
            type="text"
            value={pelanggan.no_hp}
            onChange={(e) =>
              setPelanggan({ ...pelanggan, no_hp: e.target.value })
            }
            className="form-control"
          />
        </div>

        {/* Alamat Lengkap */}
        <div className="form-group">
          <label htmlFor="alamat_lengkap">Alamat Lengkap</label>
          <input
            id="alamat_lengkap"
            name="alamat_lengkap"
            type="text"
            value={pelanggan.alamat_lengkap}
            onChange={(e) =>
              setPelanggan({ ...pelanggan, alamat_lengkap: e.target.value })
            }
            className="form-control"
          />
        </div>

        {/* Submit */}
        <div className="form-group">
          <button name="submit" type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddPelanggan;
