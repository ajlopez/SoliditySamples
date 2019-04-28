
contract Methods {
    uint counter;
    
    function add(uint x) public {
        addToCounter(x);
        counter++;
    }
    
    function addToCounter(uint x) private {
        x++;
        counter += x;
    }
}

