import {
  BanknoteArrowDown,
  Shield,
  UsersRound,
  ShieldUser,
} from 'lucide-vue-next'
import { type UserStatus } from './schema'


import { h } from 'vue'
import ArrowDownIcon from '~icons/radix-icons/arrow-down'
import ArrowRightIcon from '~icons/radix-icons/arrow-right'
import ArrowUpIcon from '~icons/radix-icons/arrow-up'
import CheckCircledIcon from '~icons/radix-icons/check-circled'
import CircleIcon from '~icons/radix-icons/circle'
import CrossCircledIcon from '~icons/radix-icons/cross-circled'
import QuestionMarkCircledIcon from '~icons/radix-icons/question-mark-circled'
import StopwatchIcon from '~icons/radix-icons/stopwatch'

export const callTypes = new Map<UserStatus, string>([
  ['active', 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'],
  ['inactive', 'bg-neutral-300/40 border-neutral-300'],
  ['invited', 'bg-sky-200/40 text-sky-900 dark:text-sky-100 border-sky-300'],
  [
    'suspended',
    'bg-destructive/10 dark:bg-destructive/50 text-destructive dark:text-primary border-destructive/10',
  ],
])

export const userTypes = [
  {
    label: 'Superadmin',
    value: 'superadmin',
    icon: Shield,
  },
  {
    label: 'Admin',
    value: 'admin',
    icon: ShieldUser,
  },
  {
    label: 'Manager',
    value: 'manager',
    icon: UsersRound,
  },
  {
    label: 'Cashier',
    value: 'cashier',
    icon: BanknoteArrowDown,
  },
] as const

export const labels = [
  {
    value: 'bug',
    label: 'Bug',
  },
  {
    value: 'feature',
    label: 'Feature',
  },
  {
    value: 'documentation',
    label: 'Documentation',
  },
]

export const statuses = [
  {
    value: 'backlog',
    label: 'Backlog',
    icon: h(QuestionMarkCircledIcon),
  },
  {
    value: 'todo',
    label: 'Todo',
    icon: h(CircleIcon),
  },
  {
    value: 'in progress',
    label: 'In Progress',
    icon: h(StopwatchIcon),
  },
  {
    value: 'done',
    label: 'Done',
    icon: h(CheckCircledIcon),
  },
  {
    value: 'canceled',
    label: 'Canceled',
    icon: h(CrossCircledIcon),
  },
]


