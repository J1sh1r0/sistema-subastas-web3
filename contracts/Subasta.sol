// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Subasta {
    address public vendedor;
    string public nombreProducto;
    uint public tiempoFinalizacion;
    uint public mejorPuja;
    address public mejorPostor;
    bool public finalizada;

    mapping(address => uint) public pujas;

    event PujaRealizada(address postor, uint cantidad);
    event SubastaFinalizada(address ganador, uint cantidad);

    constructor(string memory _nombreProducto, uint _duracionEnSegundos) {
        vendedor = msg.sender;
        nombreProducto = _nombreProducto;
        tiempoFinalizacion = block.timestamp + _duracionEnSegundos;
    }

    function pujar() public payable {
        require(block.timestamp < tiempoFinalizacion, "La subasta ha finalizado.");
        require(msg.value > mejorPuja, "La puja debe ser mayor a la actual.");

        if (mejorPuja != 0) {
            pujas[mejorPostor] += mejorPuja;
        }

        mejorPuja = msg.value;
        mejorPostor = msg.sender;

        emit PujaRealizada(msg.sender, msg.value);
    }

    function retirar() public {
        uint cantidad = pujas[msg.sender];
        require(cantidad > 0, "No tienes fondos que retirar.");

        pujas[msg.sender] = 0;
        payable(msg.sender).transfer(cantidad);
    }

    function finalizarSubasta() public {
        require(block.timestamp >= tiempoFinalizacion, "La subasta aun no termina.");
        require(!finalizada, "La subasta ya fue finalizada.");

        finalizada = true;
        emit SubastaFinalizada(mejorPostor, mejorPuja);
        payable(vendedor).transfer(mejorPuja);
    }
}
