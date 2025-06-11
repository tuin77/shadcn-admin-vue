import { ref, onMounted, defineComponent, Fragment, h } from 'vue'
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
  className?: string
  contentClassName?: string
}
export default defineComponent({
  name: "Longtext",
  props: {
    className: String,
    contentClassName: String,
  },
  setup(props: Props, { slots }) {
    const textRef = ref<HTMLElement | null>(null)
    const isOverflown = ref(false)

    const checkOverflow = (textContainer: HTMLElement | null) => {
      if (textContainer) {
        return (
          textContainer.offsetHeight < textContainer.scrollHeight ||
          textContainer.offsetWidth < textContainer.scrollWidth
        )
      }
      return false
    }


    onMounted(() => {

      if (checkOverflow(textRef.value)) {
        isOverflown.value = true
        return
      }
      isOverflown.value = false

    })


    return () => (
      !isOverflown.value ?
        <div ref={textRef} class={cn('truncate', props.className)}>
          {slots.default?.()}
        </div> :
        <>
          <div class='hidden sm:block'>
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div ref={textRef} class={cn('truncate', props.className)}>
                    {slots.default?.()}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p class={props.contentClassName}> {slots.default?.()}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div class='sm:hidden'>
            <Popover>
              <PopoverTrigger asChild>
                <div ref={textRef} class={cn('truncate', props.className)}>
                  {slots.default?.()}
                </div>
              </PopoverTrigger>
              <PopoverContent class={cn('w-fit', props.contentClassName)}>
                <p>{slots.default?.()}</p>
              </PopoverContent>
            </Popover>
          </div>
        </>
    )

  }
})

