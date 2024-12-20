import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function AddMobil() {
  const [mobil, setMobil] = useState({
    brand: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8000/api/mobil/create",
        mobil,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        // SweetAlert2 untuk pesan sukses
        Swal.fire({
          title: "Berhasil!",
          text: "Data promosi berhasil ditambahkan.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/admin/promosi");
        });
      } else {
        Swal.fire({
          title: "Gagal!",
          text: "Data promosi gagal ditambahkan.",
          icon: "error",
          confirmButtonText: "Coba Lagi",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Terjadi Kesalahan!",
        text:
          err.response?.data?.message ||
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
          <input
            id="brand"
            name="brand"
            type="text"
            value={mobil.brand}
            onChange={(e) => setMobil({ ...mobil, brand: e.target.value })}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="nama">Nama</label>
          <input
            id="nama"
            name="nama"
            type="text"
            value={mobil.nama}
            onChange={(e) => setMobil({ ...mobil, nama: e.target.value })}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="harga">Harga</label>
          <input
            id="harga"
            name="harga"
            type="number"
            min="10000000"
            value={mobil.harga}
            onChange={(e) => setMobil({ ...mobil, harga: e.target.value })}
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
            onChange={(e) =>
              setMobil({ ...mobil, ketersediaan: e.target.value })
            }
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
            onChange={(e) => setMobil({ ...mobil, deskripsi: e.target.value })}
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
