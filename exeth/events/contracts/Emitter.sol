
contract Emitter {
    event BeginEvents();
    event Cross(address indexed token, address indexed receiver, uint256 amount);
    event EndEvents();
    
    function emitEvents(address[] memory receivers, address[] memory tokens, uint256[] memory amounts) public {
        uint nevents = receivers.length;
        
        emit BeginEvents();
        
        for (uint k = 0; k < nevents; k++)
            emit Transfer(receivers[k], tokens[k], amounts[k]);
            
        emit EndEvents();
    }
}