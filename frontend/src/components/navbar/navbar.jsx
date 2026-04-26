import { LuShoppingCart, LuCircleUser, LuMenu  } from "react-icons/lu";
import { Drawer } from "@mui/material";
import styles from "./navbar.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {

    const [openMenu, setOpenMenu] = useState(false)
    
    const handleOpenMenu = () => {
        setOpenMenu(!openMenu)
    }


    return (
        <nav className={styles.navbarContainer}>
            <div className={styles.navbarItems}>
                <Link to={'/'}>
                    <img src="/imgs/logo.png" alt="Logo My Gastronomy" className={styles.logo} />
                </Link>

                <div className={styles.navbarLinksContainer}>
                    <Link to={'/'} className={styles.navbarLink}>Home</Link>
                    <Link to={'/plates'} className={styles.navbarLink}>Plates</Link>
                    <Link to={'/cart'}>
                        <LuShoppingCart className={styles.navbarLink} />
                    </Link>
                    <Link to={'/profiles'}>
                        <LuCircleUser className={styles.navbarLink} />
                    </Link>
                </div>
            </div>
        
            <div className={styles.mobileNavbarItems}>
                <Link to={'/'}>
                    <img src="/imgs/logo.png" alt="Logo My Gastronomy" className={styles.logo} />
                </Link>

                <div className={styles.mobileNavbarBtns}>
                    <Link to={'/cart'}>
                        <LuShoppingCart className={styles.navbarLink} />
                    </Link>
                    <LuMenu className={styles.navbarLink} onClick={handleOpenMenu} />
                </div>
            </div>

            <Drawer
                anchor= 'right'
                open={openMenu}
                onClose={handleOpenMenu}
            >
                <div className={styles.drawer}>
                    <Link to={'/'} className={styles.navbarLink}>Home</Link>
                    <Link to={'/plates'} className={styles.navbarLink}>Plates</Link>
                    <Link to={'/profiles'} className={styles.navbarLink}>Profile</Link>
                </div>
            </Drawer>

        </nav>
    )
}