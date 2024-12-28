import Mobil from "./mobil/Mobil";
import Ulasan from "./ulasan/Ulasan";
import Pelanggan from "./pelanggan/Pelanggan";
import Denda from "./denda/Denda";
import Pembayaran from "./pembayaran/Pembayaran";
import Promosi from "./promosi/Promosi";
import Reservasi from "./reservasi/Reservasi";
const Dashboard = () => {
  return (
    <div>
      <h1 class="mb-5">Selamat Datang Admin</h1>
    <Mobil/>
    <Pelanggan/>
    <Reservasi/>
    <Pembayaran/>
    <Promosi/>
    <Denda/>
    <Ulasan/>
    </div>
  );
};

export default Dashboard;
