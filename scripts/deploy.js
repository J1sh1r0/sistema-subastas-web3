// scripts/deploy.js
const hre = require("hardhat");
const fs = require("fs");

async function main() {
  console.log("⏳ Desplegando GestorDeSubastas...");
  const Gestor = await hre.ethers.getContractFactory("GestorDeSubastas");
  const gestor = await Gestor.deploy();
  await gestor.deployed(); // ✅ Compatible con ethers v5

  const direccionGestor = gestor.address; // ✅ CORREGIDO
  console.log(`✅ Gestor desplegado en: ${direccionGestor}`);

  // Crear una subasta desde el gestor
  const nombre = "Smartphone Galaxy S21";
  const duracion = 3600;
  const tx = await gestor.crearSubasta(nombre, duracion);
  await tx.wait();
  console.log("📦 Subasta creada desde el Gestor");

  // Guardar las direcciones
  const data = {
    GestorDeSubastas: direccionGestor
  };

  fs.writeFileSync("contract-address.json", JSON.stringify(data, null, 2));
  console.log("💾 Dirección guardada en contract-address.json");
}

main().catch((error) => {
  console.error("❌ Error en el despliegue:", error);
  process.exitCode = 1;
});
