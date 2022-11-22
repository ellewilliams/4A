import * as React from "react"
import { IconSpot } from "./iconSpot"
import { IconStripe } from "./iconStripe"
import { IconName } from "./iconName"

enum IconVariants {
  SPOT = "spot",
  STRIPE = "stripe",
  NONE = "none",
  NAME = "name",
}

interface IconProps {
  fill?: string
  variant?: "spot" | "stripe" | "none" | "name" | unknown
  className?: string
}

export const Icon = ({ fill = "#FF8039", variant = "stripe" }: IconProps) => {
  switch (variant) {
    case IconVariants.SPOT:
      return <IconSpot fill={fill} />
    case IconVariants.STRIPE:
      return <IconStripe fill={fill} />
    case IconVariants.NONE:
      return null
    default:
      return <IconName fill={fill} />
  }
}
