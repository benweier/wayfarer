import { useTranslation } from 'react-i18next'
import { Button } from '@/components/button'
import * as ContractActions from '@/features/contract/actions'
import { type ContractResponse } from '@/types/spacetraders'

export const AcceptContractAction = ({ contract }: { contract: ContractResponse }) => {
  const { t } = useTranslation()

  return (
    <ContractActions.Accept contract={contract}>
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
          {t('contract.accept', { context: 'action' })}
        </Button>
      )}
    </ContractActions.Accept>
  )
}
