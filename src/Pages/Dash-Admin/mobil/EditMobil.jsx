import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function EditMobil() {
  const { id } = useParams();
  const navigate = useNavigate();
  const ketersediaanOptions = [
    { id: 1, value: "tersedia", label: "Tersedia" },
    { id: 2, value: "kosong", label: "Tidak Tersedia" },
  ];
  const [error, setError] = useState(null);
  const [brand, setBrand] = useState([]);

  const [formData, setFormData] = useState({
    brand_id: "",
    nama: "",
    harga: "",
    ketersediaan: "",
    deskripsi: "",
  });

  useEffect(() => {
    if (!id) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "id mobil tidak ditemukan",
      });
      return;
    }

    const fetchBrand = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/brand");
        setBrand(response.data.data);
      } catch (error) {
        setError(error.message);
      }
    };
    const fetchEditMobil = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8000/api/mobil-edit/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data.success && response.data.data.length > 0) {
          setFormData({
            brand_id: response.data.data[0].brand_id || "",
            nama: response.data.data[0].nama || "",
            harga: response.data.data[0].harga || "",
            ketersediaan: response.data.data[0].ketersediaan || "",
            deskripsi: response.data.data[0].deskripsi || "",
          });
        } else {
          setError("Data mobil tidak ditemukan");
        }
      } catch (error) {
        setError(error.message || "Api gagal di akses");
      }
    };
    fetchEditMobil();
    fetchBrand();
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
        `http://localhost:8000/api/mobil/${id}`,
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
          text: "Data berhasil diubah.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/admin/mobil");
        });
      } else {
        Swal.fire({
          title: "Gagal!",
          text: "Data mobil gagal diuabah.",
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
      <h2>Edit Mobil</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="brand">Brand</label>
          <select
            id="brand_id"
            name="brand_id"
            className="custom-select"
            value={formData.brand_id}
            onChange={handleChange}
          >
            <option value="">Pilih Brand</option> {/* Opsi default kosong */}
            {brand.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
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
          <label htmlFor="harga">Harga</label>
          <p>*minimal 10000000</p>
          <input
            id="harga"
            name="harga"
            type="number"
            min="10000000"
            value={formData.harga}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="ketersediaan">Ketersediaan</label>
          <select
            id="ketersediaan"
            name="ketersediaan"
            className="custom-select"
            value={formData.ketersediaan}
            onChange={handleChange}
          >
            <option value="">Pilih Ketersediaan</option>
            {ketersediaanOptions.map((option) => (
              <option key={option.id} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="deskripsi">Deskripsi</label>
          <input
            id="deskripsi"
            name="deskripsi"
            type="text"
            value={formData.deskripsi}
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
export default EditMobil;
