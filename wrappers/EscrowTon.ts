import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from 'ton-core';

export type EscrowTonConfig = {
                                arbiter:Address,
                                beneficiary:Address,
                                
                              };

export function escrowTonConfigToCell(config: EscrowTonConfig): Cell {
    return beginCell()
    .storeAddress(config.arbiter)
    .storeAddress(config.beneficiary)
    .endCell();
}

export class EscrowTon implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new EscrowTon(address);
    }

    static createFromConfig(config: EscrowTonConfig, code: Cell, workchain = 0) {
        const data = escrowTonConfigToCell(config);
        const init = { code, data };
        return new EscrowTon(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATLY,
            body: beginCell().endCell(),
        });
    }

    async getBeneficiary(provider: ContractProvider) {
        const result = await provider.get('get_beneficiary', []);
        return result.stack.readAddress();
    }

    async getArbiter(provider: ContractProvider) {
        const result = await provider.get('get_arbiter', []);
        return result.stack.readAddress();
    }
}
