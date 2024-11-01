import { Container, Typography, Button } from "@mui/material";
import Link from "next/link";

export default function Custom404() {
  return (
    <Container
      maxWidth="sm"
      style={{ textAlign: "center", marginTop: "100px" }}
    >
      <Typography variant="h1" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="h5" gutterBottom>
        {`Oops! The page you're looking for doesn't exist.`}
      </Typography>
      <Link href="/" passHref>
        <Button variant="contained" color="primary">
          Go Back Home
        </Button>
      </Link>
    </Container>
  );
}
