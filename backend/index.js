const express = require("express");
const { ethers } = require("ethers");
require("dotenv").config();
const cors = require("cors");
const abi = require("./utils/abi");
const abiGestor = require("./utils/abiGestor");

const app = express();
const port = 3000;

// Middlewares
app.use(cors());              // ✅ Permite que el frontend acceda
app.use(express.json());      // ✅ Habilita recibir JSON

// Proveedor y Wallet
const provider = new ethers.providers.JsonRpcProvider(process.env.SEPOLIA_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Contratos
const contrato = new ethers.Contract(
  process.env.ADDRESS_CONTRACT,
  abi,
  wallet
);

const contratoGestor = new ethers.Contract(
  process.env.ADDRESS_GESTOR,
  abiGestor,
  wallet
);

// Ruta: Ver detalles de una subasta individual (por dirección)
app.post("/subasta", async (req, res) => {
  try {
    const { direccion } = req.body;
    const contrato = new ethers.Contract(direccion, abi, wallet);

    const nombre = await contrato.nombreProducto();
    const mejorPuja = await contrato.mejorPuja();
    const mejorPostor = await contrato.mejorPostor();
    const tiempo = await contrato.tiempoFinalizacion();

    res.json({
      nombre,
      mejorPuja: ethers.utils.formatEther(mejorPuja),
      mejorPostor,
      tiempoFinalizacion: new Date(tiempo * 1000).toLocaleString()
    });

  } catch (error) {
    console.error("❌ Error al consultar la subasta:", error);
    res.status(500).json({ error: "No se pudo consultar la subasta." });
  }
});

// Ruta: Listar todas las subastas creadas (con filtro y checksum)
app.get("/subastas", async (req, res) => {
  try {
    const direccionesCrudas = await contratoGestor.obtenerSubastas();
    console.log("📦 DIRECCIONES CRUDAS:", direccionesCrudas);

    const direcciones = [];

    for (const dir of direccionesCrudas) {
      try {
        const checksumDir = ethers.utils.getAddress(dir);
        direcciones.push(checksumDir);
      } catch (e) {
        console.warn("❗ Dirección ignorada (error de checksum):", dir);
      }
    }

    res.json({ subastas: direcciones });
  } catch (error) {
    console.error("❌ Error al obtener subastas:", error);
    res.status(500).json({ error: "Error al obtener subastas" });
  }
});

// Ruta: Crear una nueva subasta desde el gestor
app.post("/crear-subasta", async (req, res) => {
  const { nombre, duracion } = req.body;

  try {
    const tx = await contratoGestor.crearSubasta(nombre, duracion);
    await tx.wait();
    res.json({ mensaje: "Subasta creada correctamente" });
  } catch (error) {
    console.error("❌ Error al crear subasta:", error);
    res.status(500).json({ error: "Error al crear subasta" });
  }
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${port}`);
});
