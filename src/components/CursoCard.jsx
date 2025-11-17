import { Card, Button } from "react-bootstrap";
import styles from "./CursoCard.module.css";

const CursoCard = ({unCurso}) => {
  return (
    <Card className={styles["custom-card"]}>
      <Card.Img
        variant="top"
        src={unCurso.imagen}
        alt={unCurso.titulo}
        className={styles["custom-card-img"]}
      />
      <Card.Body>
        <Card.Title className="fw-bold">{unCurso.titulo}</Card.Title>
        <Card.Text className="text-muted">Autor: {unCurso.autor}</Card.Text>
        <Button variant="primary" className={styles["custom-btn"]}>
          Ver más
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CursoCard;