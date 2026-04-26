import styles from './footer.module.css'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer className={styles.footerContainer}>
            <div className={styles.brand}>
                <img src="/imgs/logo.png" alt="Logo My Gastronomy" />
                My Gastronomy
            </div>

            <nav className={styles.linksContainer}>
                <Link className={styles.link} to="/">Home</Link>
                <Link className={styles.link} to="/plates">Plates</Link>
                <Link className={styles.link} to="/profiles">Profile</Link>
            </nav>

            <div className={styles.credits}>
                <span>Developed by</span>
                <a href="https://github.com/romaomiguel" target="_blank" rel="noreferrer">
                    Miguel Romão
                </a>
            </div>
        </footer>
    )
}