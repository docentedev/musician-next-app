import Sidebar from './Sidebar'
import Footer from './Footer'
import styles from './Layout.module.css'

export default function Layout ({ children }: any) {
  return (
        <div className={styles.layout}>
            <Sidebar />
            <main className={styles.main}>
                <section className={styles.content}>
                    {children}
                </section>
                <Footer />
            </main>
        </div>
  )
}
