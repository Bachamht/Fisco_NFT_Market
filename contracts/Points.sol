// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract Points {

    address administrator;
    address market;

    mapping (address => uint256) TPointsBalance;
    mapping (address => uint256) RPointsBalance;
    
    uint256 constant public MILLION = 10 ** 7;


    error NotAdministrator(address administrator);
    error NotMarket(address market);
    error InsufficientBalance();


    modifier onlyAdministrator{
        if (msg.sender !=  administrator) revert NotAdministrator(msg.sender);
        _;
    }

    modifier onlyMarket{
        if (msg.sender !=  market) revert NotMarket(msg.sender);
        _;
    }

    constructor() {
        administrator = msg.sender;
    }
    
                     /*«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-*/
                     /*                  PUBLIC FUNCTIONS                          */
                     /*-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»*/
    function rechargeTPoints(address _to, uint256 _amount) public onlyAdministrator {
        mintToints(_to, _amount * MILLION);
    }

    function allocateRPoints(address _to, uint256 _amount) public onlyAdministrator {
        RPointsBalance[_to] += _amount * MILLION;
    }

    function withdrawTPoints(address _to, uint256 _amount) public onlyMarket {
        if (TPointsBalance[_to] < _amount * MILLION) revert InsufficientBalance();

        TPointsBalance[_to] -= _amount * MILLION;
    }

    function addTPoints(address _to, uint256 _amount) public onlyMarket {
        TPointsBalance[_to] += _amount * MILLION;
    }

    function withdrawRPoints(address _to, uint256 _amount) public onlyAdministrator {
        if (RPointsBalance[_to] < _amount * MILLION) revert InsufficientBalance();
        RPointsBalance[_to] -= _amount * MILLION;
    }

    function setMarket(address _market) public onlyAdministrator {
        market = _market;
    }
  

                     /*«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-*/
                     /*                  INTERNAL FUNCTIONS                        */
                     /*-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»*/

    function mintToints(address _to, uint256 _amount) internal onlyAdministrator {
        TPointsBalance[_to] += _amount * MILLION;
    }


} 