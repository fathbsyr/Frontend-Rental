import '../assets/landing/css/bootstrap.min.css';
import '../assets/landing/css/style.css';
import '../assets/landing/lib/owlcarousel/assets/owl.carousel.min.css';
import '../assets/landing/lib/tempusdominus/css/tempusdominus-bootstrap-4.min.css';
import Navbar from "../components/landing/Navbar/Navbar"
import Footer from "../components/landing/Footer/Footer"
function LandingLayout ({ children }) {
    return (
        <>
        <Navbar />
        <div>{children}</div>
        <Footer />
        </>
    )
}
export default LandingLayout;