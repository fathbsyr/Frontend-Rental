import Pembayaran from "./Pembayaran/Pembayaran";
import Reservasi from "./Reservasi/Reservasi";
import Mobil from "./Mobil";
import Denda from "./Denda";
import Promosi from "./Promosi";
import Ulasan from "./Ulasan/Ulasan";
function Dashboard () {
    return (
        <>
        <h1 className="mb-2">Selamat Datang Di Dashboard</h1>
        <Pembayaran />
        <Reservasi />
        <Ulasan />
        <Denda />
        <Mobil />
        <Promosi/>
        </>
    )
}
export default Dashboard;