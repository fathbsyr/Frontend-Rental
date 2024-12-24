import React from 'react'
import { format } from 'date-fns';
function Footer() {
    return (
        <footer class="sticky-footer bg-white">
            <div class="container my-auto">
                <div class="copyright text-center my-auto">
                    <span>Copyright &copy; El-Rental {format(new Date(), 'yyyy')}</span>
                </div>
            </div>
        </footer>
    );
};
export default Footer;