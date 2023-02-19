import { toNano,Address } from 'ton-core';
import { EscrowTon } from '../wrappers/EscrowTon';
import { compile, NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const DEPLOYER_ADDRESS=Address.parse("EQDjUc7m2zSZ_oWh4wvmLf5a3UqOUfSzvBODeY5RXy9EWy7p")
    const ARBITER_ADDRESS=Address.parse("EQDjUc7m2zSZ_oWh4wvmLf5a3UqOUfSzvBODeY5RXy9EWy7p")
    const BENEFICIARY_ADDRESS=Address.parse("EQDjUc7m2zSZ_oWh4wvmLf5a3UqOUfSzvBODeY5RXy9EWy7p")
    const Contract_address=Address.parse("EQBkfhVwJCAVuXq_ktyYyLoElobxMfHvapN1xqbDXgalvUcc")
    const escrowTon = EscrowTon.createFromAddress(Contract_address);

    const openedContract =  provider.open(escrowTon);
    const beneficiary=await openedContract.getBeneficiary()

    console.log("Beneficiary:",beneficiary)
    // run methods on `openedContract`
}