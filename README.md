# Aplicación de Subastas en Blockchain
Esta aplicación descentralizada (dApp) permite la creación y gestión de subastas de artículos utilizando contratos inteligentes escritos en Solidity. La lógica está compuesta por dos contratos principales: un Gestor de Subastas que administra múltiples subastas, y un contrato de Subasta individual que gestiona cada proceso de puja por separado.

Características:
- Creación de subastas indicando el nombre del producto y su duración.
- Gestión individual de cada subasta a través de contratos desplegados dinámicamente.
- Registro del mejor postor y su puja más alta.
- Soporte para devolución automática de fondos a postores no ganadores.
- Eventos emitidos para registrar pujas y resultados de las subastas.
