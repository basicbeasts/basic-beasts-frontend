import type { NextPage } from 'next'
import ComingSoon from "@components/ui/ComingSoon"
import PackStore from '@components/ui/PackStore'

const Store: NextPage = () => {
    return (
      	<div>
        	<ComingSoon title="Store is Open" description="Buy a Basic Beast. Evolve it, use it for breeding, flex it."/>
          <PackStore/>
      	</div>
    )
  }
  
export default Store

  