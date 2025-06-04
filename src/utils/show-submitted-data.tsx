// import { toast } from 'sonner'
import { h } from 'vue'
import { toast } from '@/components/ui/toast'


export function showSubmittedData(values: unknown, title?: string) {
  toast({
    title: title || 'You submitted the following values:',
    description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(values, null, 2))),
  })
}
