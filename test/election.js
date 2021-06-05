var Election = artifacts.require("./Election.sol");
contract('Election', function(accounts) {
    var electionInstance;
    var candidateid
    it("initalizes with two candidates", function() {
        return Election.deployed().then(function(intance) {
            return intance.candidatesCount();
        }).then(function(count) {
            assert.equal(count, 2);
        });
    });

    it("it initalizes the candidates with the correct values", function() {
        return Election.deployed().then(function(instance) {
            electionInstance = instance;
            return electionInstance.candidates(1);
        }).then(function(candidate) {
            assert.equal(candidate[0], 1, "contain the correct id");
            assert.equal(candidate[1], "candidaie1", "contain the correct name");
            assert.equal(candidate[2], 0, "cantain the correct votes count");
            return electionInstance.candidates(2);
        }).then(function(candidate) {
            assert.equal(candidate[0], 2, "contain the correct id");
            assert.equal(candidate[1], "candiadie2", "contain the correct name");
            assert.equal(candidate[2], 0, "cantain the correct votes count");
        });





    });

    it("it allows a voter to cast a vote", function() {
        return Election.deployed().then(function(instance) {
            electionInstance = instance;
             candidateid =1 ;
            return electionInstance.vote(candidateid,{from:accounts[0]});
        }).then(function(receipt){
            return electionInstance.voters(accounts[0]);
        }).then(function(voted){
            assert(voted,"the voter was marked as voted");
            return electionInstance.candidates(candidateid);
        }).then(function(candidate){
           var voteCount = candidate[2];
           assert.equal(voteCount,1,"increment the candidate vot count");
        })
     });














     
});