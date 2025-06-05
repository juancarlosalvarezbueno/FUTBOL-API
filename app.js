// const express = require("express");
import fieldsRoutes from "./routes/fieldsRoutes.js";
import matchesRoutes from "./routes/matchesRoutes.js";
import express from "express";

const app = express();

const PORT = 3001;

app.use(express.json());

app.use("/fields", fieldsRoutes);
app.use("/matches", matchesRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  // guardar este registro con la hora en un log
  res.status(500).json({ error: "Error interno en el servidor" });
});

app
  .listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
  })
  .on("error", (err) => {
    console.error(`Error al iniciar el servidor con error: ${err}`);
  });
