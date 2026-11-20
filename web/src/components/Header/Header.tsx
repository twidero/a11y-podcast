import Image from 'next/image';
import { Heading, Link } from '@digdir/designsystemet-react';
import styles from './Header.module.css';

export function Header() {
    return (
        <header className={styles.header}>
            <nav className={styles.inner}>
                <Link href="/">
                    <Heading level={2}>
                        <Image
                            src="/img/A11y-Activists-logo.svg"
                            width="160"
                            height="80"
                            alt="A11y Activists logo. A pair of black glasses with A11y and Activists written in red above each of them"
                        />
                    </Heading>
                </Link>
                <ul className={styles.navList}>
                    <li><Link href="/episodes" className={styles.navLink}>Episodes</Link></li>
                    <li><Link href="/about" className={styles.navLink}>About</Link></li>
                </ul>
            </nav>
        </header>
    )
}
