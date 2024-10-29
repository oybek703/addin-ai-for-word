import * as React from 'react'
import { ReactNode, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'
import MobileStepper from '@mui/material/MobileStepper'
import Button from '@mui/material/Button'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import { Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import { defaultFreeExecutions } from '@utils/constants'
import { Colors } from '@components/layout/theme'
import { useAppStore } from '@components/store/app.store'

interface IStep {
  title?: string | ReactNode
  text?: ReactNode
  content?: ReactNode
}

export default function GetStartedStepper() {
  const { updateViewGetStarted } = useAppStore()
  const [isLastStep, setIsLastStep] = useState(false)
  const theme = useTheme()
  const [activeStep, setActiveStep] = useState(0)

  const handleNext = () => {
    if (isLastStep) updateViewGetStarted(true)
    else setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  useEffect(() => {
    if (activeStep === 2) setIsLastStep(true)
    else setIsLastStep(false)
  }, [activeStep])

  const steps: IStep[] = [
    {
      title: (
        <Typography sx={{ fontSize: '18px' }} component='span'>
          Give it a try
        </Typography>
      ),
      content: (
        <Grid sx={{ placeItems: 'center' }}>
          <Typography sx={{ mb: '70px', color: '#666', fontSize: '14px' }} align='center'>
            You have {defaultFreeExecutions} FREE executions to try AI functions in action
          </Typography>
        </Grid>
      )
    }
  ]

  const maxSteps = steps.length

  return (
    <Box>
      <Typography sx={{ fontWeight: 400, fontSize: '1.1em' }} align='center'>
        {steps[activeStep].title}
      </Typography>
      <Typography sx={{ fontWeight: 550, fontSize: '1em', mb: '10px' }} align='center'>
        {steps[activeStep].text}
      </Typography>
      <Grid container justifyContent='center' alignItems='center'>
        {steps[activeStep].content}
      </Grid>
      <MobileStepper
        variant='dots'
        steps={maxSteps}
        position='static'
        activeStep={activeStep}
        color='error'
        sx={{
          '& .MuiMobileStepper-dotActive': { bgcolor: Colors.secondary },
          '& .MuiMobileStepper-dots': {
            display: 'flex',
            justifyContent: 'center',
            minWidth: '120px'
          }
        }}
        nextButton={
          <Button
            sx={{ textTransform: 'none', color: Colors.secondary, fontWeight: 600, whiteSpace: 'nowrap' }}
            size='small'
            onClick={handleNext}
          >
            {isLastStep ? 'Finish' : 'Next Step'}
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button
            sx={{ textTransform: 'none', color: Colors.secondary, fontWeight: 600, whiteSpace: 'nowrap' }}
            size='small'
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Prev Step
          </Button>
        }
      />
    </Box>
  )
}
