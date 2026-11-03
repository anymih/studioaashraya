'use client'

import React from 'react'
import { StageList, StageItem } from '@/components/ui/StageList'
import { trackEvent } from '@/lib/analytics'
import { methodStages } from '@/lib/method-data'

export function MethodStageSection() {
  const stages: StageItem[] = methodStages.map((st) => ({
    id: `stage-${st.num}`,
    number: st.num,
    title: st.name,
    summary: st.description,
    gate: st.gate,
    whatWeDo: st.description,
    whatYouReceive: st.receive,
    checks: st.checks,
  }))

  const handleStageOpen = (stageId: string) => {
    trackEvent('method_stage_open', { stage: stageId })
  }

  return (
    <StageList
      stages={stages}
      expandable={true}
      onStageOpen={handleStageOpen}
      className="mt-8"
    />
  )
}
