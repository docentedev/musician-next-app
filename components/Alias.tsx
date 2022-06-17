import { Chip } from '@mui/material'
import styles from './Alias.module.css'

const Alias = ({ alias = '' }: { alias: string }) => {
    return (
        <div className={styles.chips}>{
            alias.split(',').filter((e: string) => e !== '').map((word: string) => (
                <div className={styles.chipContainer} key={word}>
                    <Chip label={word} />
                </div>
            ))
        }</div>
    )
}

export default Alias
