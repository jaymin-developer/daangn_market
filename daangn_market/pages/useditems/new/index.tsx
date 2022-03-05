import { withAuth } from "../../../src/components/hocs/withAuth"
import UsedItemWrite from "../../../src/components/units/usedItem/write/usedItemWrite.container"

const UsedItemWritePage = () => {
  return <UsedItemWrite />
}

export default withAuth(UsedItemWritePage)
