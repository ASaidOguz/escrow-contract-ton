import { Blockchain } from '@ton-community/sandbox';
import { Cell, toNano } from 'ton-core';
import { EscrowTon } from '../wrappers/EscrowTon';
import '@ton-community/test-utils';
import { compile } from '@ton-community/blueprint';

describe('EscrowTon', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('EscrowTon');
    });

    it('should deploy', async () => {
        const blockchain = await Blockchain.create();

        const escrowTon = blockchain.openContract(EscrowTon.createFromConfig({}, code));

        const deployer = await blockchain.treasury('deployer');

        const deployResult = await escrowTon.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: escrowTon.address,
            deploy: true,
        });
    });
});
