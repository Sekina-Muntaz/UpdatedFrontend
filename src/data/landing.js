
import fasterPaymentsIcon from '@/assets/icons/faster-payments.svg'
import traceabilityIcon from '@/assets/icons/traceability.svg'
import stakeholdersIcon from '@/assets/icons/stakeholders.svg'
import brokersIcon from '@/assets/icons/brokers.svg'
import buyersIcon from '@/assets/icons/buyers.svg'
import nceIcon from '@/assets/icons/nce.svg'
import dssoperationsIcon from '@/assets/icons/dss-operations.svg' 
import farmersIcon from '@/assets/icons/fcs.svg'
import millersIcon from '@/assets/icons/millers.svg' 
  
export const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Co-op Online', href: '#coop-online' },
  { label: 'NCE', href: '#nce' },
  { label: 'AFA', href: '#afa' },
  { label: 'CMA', href: '#cma' }
]

export const features = [
  {
    icon: fasterPaymentsIcon,
    title: 'Faster Payments',
    description:
      'Settlements clear in days, not months. Funds reach cooperatives and farmers without manual reconciliation delays.'
  },
  {
    icon: traceabilityIcon,
    title: 'End-to-End Traceability',
    description:
      'Track every transaction from delivery to final payout with a complete, auditable record across the chain.'
  },
  {
    icon: stakeholdersIcon,
    title: 'Built for Stakeholders',
    description:
      'Role-based access for every party. Each stakeholder sees exactly what concerns them, and nothing more.'
  }
]

export const stakeholders = [
  {
    icon: farmersIcon,
    title: 'Farmer Cooperative Societies',
    description: 'Receive timely payouts and track member settlements in one place.'
  },
  {
    icon: millersIcon,
    title: 'Millers',
    description: 'Reconcile processed volumes against deliveries with confidence.'
  },
  {
    icon: brokersIcon,
    title: 'Brokers',
    description: 'Manage trades and confirm settlement on closed lots.'
  },
  {
    icon: buyersIcon,
    title: 'Buyers',
    description: 'Settle purchases with full, end-to-end payment traceability.'
  },
  {
    icon: nceIcon,
    title: 'Nairobi Coffee Exchange',
    description: 'Oversee auction outcomes and central clearing across the market.'
  },
  {
    icon: dssoperationsIcon,
    title: 'DSS Operations',
    description: 'Monitor system health and resolve exceptions quickly.'
  }
]