import Sidebar from './Sidebar'
import Footer from './Footer'
import styles from './Layout.module.css'
import { useAuth } from '../contexts/AuthContext'
import ButtonAppBar from './Menu'

const Layout = ({ children }: any) => {
    const auth = useAuth()
    return (
        <div>
            <div className={`${styles.menu} ${auth.data.isLogin ? styles.login : styles.anonymous}`}>
                <ButtonAppBar />
            </div>
            <div className={`${styles.layout} ${auth.data.isLogin ? styles.login : styles.anonymous}`}>
                <Sidebar />
                <main className={styles.main}>
                    <section className={styles.content}>
                        {children}
                    </section>
                    <Footer />
                </main>
            </div>
        </div>
    )
}

export default Layout
