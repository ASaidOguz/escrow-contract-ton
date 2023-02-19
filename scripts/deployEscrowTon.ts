import { toNano,Address, beginCell, Slice } from 'ton-core';
import { EscrowTon } from '../wrappers/EscrowTon';
import { compile, NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const DEPLOYER_ADDRESS=Address.parse("EQDjUc7m2zSZ_oWh4wvmLf5a3UqOUfSzvBODeY5RXy9EWy7p")
    const ARBITER_ADDRESS=Address.parse("EQDjUc7m2zSZ_oWh4wvmLf5a3UqOUfSzvBODeY5RXy9EWy7p")
    const BENEFICIARY_ADDRESS=Address.parse("EQB0glMVNLbDPto1xNJoAVxaK1cL7oTLNPvbdhXyk2htw59L")

    

    const escrowTon = EscrowTon.createFromConfig({
      arbiter:ARBITER_ADDRESS,
      beneficiary:BENEFICIARY_ADDRESS,
     
    }, await compile('EscrowTon'));

    await provider.deploy(escrowTon, toNano('0.05'));

    const openedContract = provider.open(escrowTon);

    // run methods on `openedContract`
}
