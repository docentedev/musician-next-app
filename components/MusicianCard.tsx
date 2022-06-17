import Link from 'next/link'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import routes from '../config/routes'
import Alias from './Alias'
import styles from './MusicianCard.module.css'
import slugify from '../utils/slugify'

const MusicianCard = ({ musician }: any) => {
    return (
        <Card className={styles.card}>
            <CardMedia
                component="img"
                alt={musician.first_name + ' ' + musician.last_name}
                height="180"
                image={musician.image}
                onError={(e: any) => e.target.src = 'https://via.placeholder.com/150?text=No+Image'}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {musician.first_name} {musician.last_name}
                </Typography>
                <Alias alias={musician.alias} />
            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                <Link href={routes.publicMusician(slugify(`${musician.first_name} ${musician.last_name}_${musician.id}`))}>
                    <Button size="small">Learn More</Button>
                </Link>
            </CardActions>
        </Card>
    )
}

export default MusicianCard