import { useTranslation } from 'react-i18next'
import { Button } from '@/components/button'
import * as ContractActions from '@/features/contract/actions'
import { ContractDeliver } from '@/features/contract/deliver'
import { type ContractResponse } from '@/types/spacetraders'

export const AvailableContractAction = ({ contract }: { contract: ContractResponse }) => {
  const { t } = useTranslation()

  return contract.terms.deliver.every((item) => item.unitsRequired === item.unitsFulfilled) ? (
    <ContractActions.Fulfill contract={contract}>
      {(args) => (
        <Button
          ref={args.ref}
          disabled={args.disabled}
          intent="info"
          kind="solid"
          size="small"
          onClick={() => {
            void args.execute()
          }}
        >
          {t('contract.fulfill', { context: 'action' })}
        </Button>
      )}
    </ContractActions.Fulfill>
  ) : (
    <ContractDeliver contract={contract} />
  )
}
