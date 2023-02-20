import { toNano,Address } from 'ton-core';
import { EscrowTon } from '../wrappers/EscrowTon';
import { compile, NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const DEPLOYER_ADDRESS=Address.parse("EQDjUc7m2zSZ_oWh4wvmLf5a3UqOUfSzvBODeY5RXy9EWy7p")
    const ARBITER_ADDRESS=Address.parse("EQDjUc7m2zSZ_oWh4wvmLf5a3UqOUfSzvBODeY5RXy9EWy7p")
    const BENEFICIARY_ADDRESS=Address.parse("EQDjUc7m2zSZ_oWh4wvmLf5a3UqOUfSzvBODeY5RXy9EWy7p")
    const Contract_address=Address.parse("EQClqsTmsHjRvRRd97lFWlBkycTE0fuQRV18F2UY9FDYAlTW")
    const escrowTon = EscrowTon.createFromAddress(Contract_address);

    const openedContract =  provider.open(escrowTon);

    const beneficiary=await openedContract.getBeneficiary();
    await sleep(1000);
    const arbiter=await openedContract.getArbiter();
    
    //arbiter and beneficiary addreses;
    console.log("Arbiter:",arbiter);
    console.log("Beneficiary:",beneficiary);
    
}

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
