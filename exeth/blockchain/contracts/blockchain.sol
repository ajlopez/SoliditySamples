
contract Blockchain {
	struct BlockInfo {
		uint32 number;
		uint hash;
		uint parentHash;
	}
	
	mapping(uint => BlockInfo) public blockInfos;
	
	function addBlock(uint32 number, uint hash, uint parentHash) public returns (bool) {
		if (blockInfos[hash].hash != 0)
			return false;
			
		if (number > 1 && blockInfos[parentHash].hash == 0)
			return false;
			
		BlockInfo memory binfo = BlockInfo(number, hash, parentHash);
		
		blockInfos[hash] = binfo;
		
		return true;
	}
}

