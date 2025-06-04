import { ref, onMounted, watch } from 'vue'
import { cn } from '@/lib/utils'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface Props {
  children: React.ReactNode
  className?: string
  contentClassName?: string
}

export default function LongText({
  children,
  className = '',
  contentClassName = '',
}: Props) {
  const textRef = ref<HTMLElement | null>(null)
  const isOverflown = ref(false)
  // const [isOverflown, setIsOverflown] = useState(false)
  watch(() => props.children, updateIsOverflown)
  // useEffect(() => {
  //   if (checkOverflow(ref.current)) {
  //     setIsOverflown(true)
  //     return
  //   }

  //   setIsOverflown(false)
  // }, [])

  if (!isOverflown)
    return (
      <div ref={ref} class={cn('truncate', className)}>
        {children}
      </div>
    )

  return (
    <>
      <div class='hidden sm:block'>
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div ref={ref} class={cn('truncate', className)}>
                {children}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p class={contentClassName}>{children}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div class='sm:hidden'>
        <Popover>
          <PopoverTrigger asChild>
            <div ref={ref} class={cn('truncate', className)}>
              {children}
            </div>
          </PopoverTrigger>
          <PopoverContent class={cn('w-fit', contentClassName)}>
            <p>{children}</p>
          </PopoverContent>
        </Popover>
      </div>
    </>
  )
}

const checkOverflow = (textContainer: HTMLDivElement | null) => {
  if (textContainer) {
    return (
      textContainer.offsetHeight < textContainer.scrollHeight ||
      textContainer.offsetWidth < textContainer.scrollWidth
    )
  }
  return false
}
