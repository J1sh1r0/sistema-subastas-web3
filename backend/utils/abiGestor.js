const abiGestor = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "contrato",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "nombre",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "duracion",
        "type": "uint256"
      }
    ],
    "name": "SubastaCreada",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_nombre",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_duracion",
        "type": "uint256"
      }
    ],
    "name": "crearSubasta",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "obtenerSubastas",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

module.exports = abiGestor;
