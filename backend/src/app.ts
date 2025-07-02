import express from "express";
import personRoutes from "../routes/person.routes";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import testRoutes from "../routes/test.routes";
import cors from "cors";
import producerRoutes from "../routes/producer.routes";

const swaggerDoc = YAML.load("./docs/openapi.yml");

const app = express();

app.use(
  cors({
    origin: "http://localhost:8081",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc)); // swagger docs
app.use("/person", personRoutes); // POST /person
app.use("/test", testRoutes);
app.use("/producer", producerRoutes);

export default app;
