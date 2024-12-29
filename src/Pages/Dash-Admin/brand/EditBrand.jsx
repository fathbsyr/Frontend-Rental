import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function EditBrand() {
  const [formData, setFormData] = useState({
    name: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      setError("ID brand tidak ditemukan");
      return;
    }

    const fetchEditBrand = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8000/api/brand-edit/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.success && response.data.data.length > 0) {
          setFormData({
            name: response.data.data[0].name || "",
          });
        } else {
          setError("Data mobil tidak ditemukan");
        }
      } catch (error) {
        setError(error.message || "Api gagal di akses");
      }
    };
    fetchEditBrand();
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
        `http://localhost:8000/api/brand/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        // SweetAlert2 untuk pesan sukses
        Swal.fire({
          title: "Berhasil!",
          text: "Data brand berhasil diubah.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/admin/brand");
        });
      } else {
        Swal.fire({
          title: "Gagal!",
          text: "Data brand gagal diubah.",
          icon: "error",
          confirmButtonText: "Coba Lagi",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Terjadi Kesalahan!",
        text:
          error.response?.data?.message ||
          "Tidak dapat terhubung ke server. Periksa koneksi internet Anda.",
        icon: "error",
        confirmButtonText: "Coba Lagi",
      });
    }
  };

  return (
    <div className="m-5 p-3">
      <h2>Edit Brand</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="text">Brand</label>
          <div className="input-group">
            <div className="input-group-prepend"></div>
            <input
              id="text"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>
        <div className="form-group">
          <button
            name="submit"
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditBrand;
