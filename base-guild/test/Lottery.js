const { expect } = require('chai');
const { ethers } = require('hardhat');

describe("Lottery Contract", function() {
    let operator, player1, player2;
    let Lottery, lottery;
    

    before(async () => {
        [operator, player1, player2] = await ethers.getSigners();

        Lottery = await ethers.getContractFactory("Lottery");
        lottery = await Lottery.connect(operator).deploy();
    });

    it("Should set operator correctly", async () =>{
        const operatorAddress = await lottery.lotteryOperator();
        expect(operatorAddress).to.equal(operator.address);
    });

    it("Non-operator shouldn't be able to start lottery", async () => {
        await expect(lottery.connect(operator).DrawWinnerTicket()).to.be.reverted;
    })
    describe("Contract Functions", () => {
        let tickets = [];

        it("player 1 own 3 ticket", async () => {
            let player1Ticket = 3;
            let ticketCount = 0;
            await lottery.connect(player1).BuyTickets({value: ethers.utils.parseEther("0.03")});    
            let tickets = await lottery.connect(player1).getTickets();
           
            tickets.forEach(ticket => {
                if(ticket === player1.address) ticketCount++;
            });

            await expect(player1Ticket).to.be.equal(ticketCount);
        });

        it("player 2 own 1 ticket", async () => {
            let player2Ticket = 1;
            let ticketCount = 0;
            await lottery.connect(player2).BuyTickets({value: ethers.utils.parseEther("0.01")});    
            let tickets = await lottery.connect(player2).getTickets();
            
            tickets.forEach(ticket => {
                if(ticket === player2.address) ticketCount++;
            });
            
            await expect(player2Ticket).to.be.equal(ticketCount);
        });

        it("player 2 wrong pay", async () => {
            await expect(lottery.connect(player2).BuyTickets({value: ethers.utils.parseEther("0.051")})).to.be.reverted;    
        });

        it("Draw start ticket count > 0 ", async() => {
            let tickets = await lottery.connect(operator).getTickets();
            await expect(tickets.length).to.above(0);
        });

        it("Draw winner is operator", async() => {
            await lottery.DrawWinnerTicket();
            // let winnerAddress = await lottery.lastWinner();
            // let winnerAmount = await lottery.lastWinnerAmount();
            // console.log("Kazanan adress : {0} Toplam Kazanç: {1}", winnerAddress, winnerAmount);
        });
    });
});