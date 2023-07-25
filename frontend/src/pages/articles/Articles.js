import AppLayout from "../../components/layout/AppLayout";
import Typography from "@mui/material/Typography";
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import Link from "@mui/material/Link";

function Articles() {


  return (
    <AppLayout title="Articles">
      <RouterLink to="/articles/create">Add article</RouterLink>
      <Typography>
        Tabs - My articles, Public articles?
      </Typography>
      <Typography>
        Add article option will be here
      </Typography>
      <Typography>
        My articles will be here
      </Typography>
    </AppLayout>
  )
}

export default Articles;