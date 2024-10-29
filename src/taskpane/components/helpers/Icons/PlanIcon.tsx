import React from 'react'
import { ActiveTabs } from '@utils/constants'
import { Colors } from '@components/layout/theme'
import { useAppStore } from '@components/store/app.store'

const PlanIcon = () => {
  const { activeTab, isDrawerOpen } = useAppStore()
  return (
    <svg width='18' height='16' viewBox='0 0 18 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M5.6665 0.5H12.3332V3.83333H17.3332V15.5H0.666504V3.83333H5.6665V0.5ZM7.33317 3.83333H10.6665V2.16667H7.33317V3.83333ZM2.33317 5.5V13.8333H15.6665V5.5H2.33317Z'
        fill={activeTab === ActiveTabs.premium ? Colors.secondary : isDrawerOpen ? '#fff' : Colors.iconColor}
      />
    </svg>
  )
}

export default PlanIcon
