import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function AddMobil() {
  const [error, setError] = useState({});
  const [brand, setBrand] = useState([]);
  const [mobil, setMobil] = useState({
    brand_id: "",
    nama: "",
    harga: "",
    ketersediaan: "",
    deskripsi: "",
  });

  const navigate = useNavigate();
  const ketersediaanOptions = [
    { id: 1, value: "tersedia", label: "Tersedia" },
    { id: 2, value: "kosong", label: "Tidak Tersedia" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMobil({ ...mobil, [name]: value });
  };

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/brand");
        setBrand(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBrand();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Mobil Data:", mobil);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8000/api/mobil/create",
        mobil,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        // SweetAlert2 untuk pesan sukses
        Swal.fire({
          title: "Berhasil!",
          text: "Data mobil berhasil ditambahkan.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/admin/mobil");
        });
      } else {
        Swal.fire({
          title: "Gagal!",
          text: "Data mobil gagal ditambahkan.",
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
    <div className="m-3 p-3">
      <h2>Tambah Mobil</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="brand">Brand</label>
          <select
            id="brand_id"
            name="brand_id"
            className="custom-select"
            value={mobil.brand_id}
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
            value={mobil.nama}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="harga">Harga</label>
          <p>*minimal harga 10000000</p>
          <input
            id="harga"
            name="harga"
            type="number"
            min="10000000"
            value={mobil.harga}
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
            value={mobil.ketersediaan}
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
            value={mobil.deskripsi}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <button name="submit" type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddMobil;
