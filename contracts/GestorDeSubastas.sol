// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Subasta.sol";

contract GestorDeSubastas {
    Subasta[] public subastas;

    event SubastaCreada(address contrato, string nombre, uint duracion);

    function crearSubasta(string memory _nombre, uint _duracion) public {
        Subasta nueva = new Subasta(_nombre, _duracion);
        subastas.push(nueva);
        emit SubastaCreada(address(nueva), _nombre, _duracion);
    }

    function obtenerSubastas() public view returns (address[] memory) {
        address[] memory direcciones = new address[](subastas.length);
        for (uint i = 0; i < subastas.length; i++) {
            direcciones[i] = address(subastas[i]);
        }
        return direcciones;
    }
}
