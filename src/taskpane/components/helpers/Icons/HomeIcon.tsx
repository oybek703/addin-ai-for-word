import React from 'react'
import { ActiveTabs } from '@utils/constants'
import { Colors } from '@components/layout/theme'
import { useAppStore } from '@components/store/app.store'

const HomeIcon = () => {
  const { activeTab, isDrawerOpen } = useAppStore()
  return (
    <>
      <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M5.00016 15.8333H7.50016V10.8333H12.5002V15.8333H15.0002V8.33333L10.0002 4.58333L5.00016 8.33333V15.8333ZM3.3335 17.5V7.5L10.0002 2.5L16.6668 7.5V17.5H10.8335V12.5H9.16683V17.5H3.3335Z'
          fill={activeTab === ActiveTabs.home ? Colors.secondary : isDrawerOpen ? '#fff' : Colors.iconColor}
        />
      </svg>
    </>
  )
}

export default HomeIcon
