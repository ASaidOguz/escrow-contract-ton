import { toNano,Address } from 'ton-core';
import { EscrowTon } from '../wrappers/EscrowTon';
import { compile, NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const DEPLOYER_ADDRESS=Address.parse("EQDjUc7m2zSZ_oWh4wvmLf5a3UqOUfSzvBODeY5RXy9EWy7p")
    const ARBITER_ADDRESS=Address.parse("EQDjUc7m2zSZ_oWh4wvmLf5a3UqOUfSzvBODeY5RXy9EWy7p")
    const BENEFICIARY_ADDRESS=Address.parse("EQDjUc7m2zSZ_oWh4wvmLf5a3UqOUfSzvBODeY5RXy9EWy7p")
    const Contract_address=Address.parse("EQAVT18Nt68xrJPe05y9_TQrNNmCFnKd5Ee8R5PGaxuORMAx")
    const escrowTon = EscrowTon.createFromAddress(Contract_address);

    const openedContract =  provider.open(escrowTon);
     
    const result=await openedContract.sendApprove(provider.sender(),{value:toNano("0.05")})
    
    console.log("Result:",result)
}

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
