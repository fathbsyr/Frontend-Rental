import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function EditPelanggan() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    nama: "",
    nik: "",
    email: "",
    no_hp: "",
    alamat_lengkap: "",
  });

  useEffect(() => {
    if (!id) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "ID pelanggan tidak ditemukan",
      });
      return;
    }

    const fetchEditPelanggan = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8000/api/pelanggan-edit/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data.success && response.data.data.length > 0) {
          setFormData({
            nama: response.data.data[0].nama || "",
            nik: response.data.data[0].nik || "",
            email: response.data.data[0].email || "",
            no_hp: response.data.data[0].no_hp || "",
            alamat_lengkap: response.data.data[0].alamat_lengkap || "",
          });
        } else {
          setError("Data pelanggan tidak ditemukan");
        }
      } catch (error) {
        setError(error.message || "API gagal diakses");
      }
    };
    fetchEditPelanggan();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:8000/api/pelanggan/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        Swal.fire({
          title: "Berhasil!",
          text: "Data pelanggan berhasil diubah.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/admin/pelanggan");
        });
      } else {
        Swal.fire({
          title: "Gagal!",
          text: "Data pelanggan gagal diubah.",
          icon: "error",
          confirmButtonText: "Coba Lagi",
        });
      }
    } catch (err) {
      Swal.fire({
        title: "Gagal!",
        text: "Terjadi Kesalahan",
        icon: "error",
        confirmButtonText: "Coba Lagi",
      });
    }
  };

  return (
    <div className="m-3 p-3">
      <h2>Edit Pelanggan</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nama">Nama</label>
          <input
            id="nama"
            name="nama"
            type="text"
            value={formData.nama}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="nik">NIK</label>
          <input
            id="nik"
            name="nik"
            type="text"
            value={formData.nik}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="no_hp">No HP</label>
          <input
            id="no_hp"
            name="no_hp"
            type="text"
            value={formData.no_hp}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="alamat_lengkap">Alamat Lengkap</label>
          <input
            id="alamat_lengkap"
            name="alamat_lengkap"
            type="text"
            value={formData.alamat_lengkap}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <button name="submit" type="submit" className="btn btn-primary" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditPelanggan;
