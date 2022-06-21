import Sidebar from './Sidebar'
import Footer from './Footer'
import styles from './Layout.module.css'
import { useAuth, useRolesValidation } from '../contexts/AuthContext'
import ButtonAppBar from './Menu'

const Layout = ({ children }: any) => {
    const auth = useAuth()
    const roleValidation = useRolesValidation()
    const isAdmin = roleValidation(['admin'], auth.data)
    return (
        <div>
            <div className={`${styles.menu} ${auth.data.isLogin ? styles.login : styles.anonymous}`}>
                <ButtonAppBar />
            </div>
            <div className={`${styles.layout} ${auth.data.isLogin ? styles.login : styles.anonymous}`}>
                {isAdmin && <Sidebar />}
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
