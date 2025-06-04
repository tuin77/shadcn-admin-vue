import { ref, watchEffect, watch } from 'vue'
import { Check, X } from 'lucide-vue-next'

import { showSubmittedData } from '@/utils/show-submitted-data'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { type ChatUser } from './data/chat-types'

type User = Omit<ChatUser, 'messages'>

type Props = {
  users: User[]
  open: boolean
  onOpenChange: (open: boolean) => void
}
export function NewChat({ users, onOpenChange, open }: Props) {
  const selectedUsers = ref<User[]>([])
  const count = ref(1)
  function setSelectedUsers(val: User[]) {

    selectedUsers.value = val
  }

  const handleSelectUser = (user: User) => {
    if (!selectedUsers.value.find((u: User) => u.id === user.id)) {
      setSelectedUsers([...selectedUsers.value, user])
    } else {
      handleRemoveUser(user.id)
    }
  }

  const handleRemoveUser = (userId: string) => {
    setSelectedUsers(selectedUsers.value.filter((user: User) => user.id !== userId))
  }

  watchEffect(() => {
    if (!open) {
      console.log("open", open);

      setSelectedUsers([])
    }
  },)

  return (
    <Dialog open={open} onUpdate:open={onOpenChange} >
      <DialogContent class='sm:max-w-[600px]' >
        <DialogHeader>
          <DialogTitle>New message</DialogTitle>
        </DialogHeader>
        <div class='flex flex-col gap-4'>
          <div>count: {count.value}</div>
          <button
            onClick={() => {
              count.value++
            }}
          >
            add
          </button>
          <div class='flex flex-wrap items-center gap-2'>
            <span class='text-muted-foreground text-sm'>To:</span>
            {selectedUsers.value.map((user: User) => (
              <Badge key={user.id} variant='default'>
                {user.fullName}
                <button
                  class='ring-offset-background focus:ring-ring ml-1 rounded-full outline-hidden focus:ring-2 focus:ring-offset-2'
                  onKeydown={(e: KeyboardEvent) => {
                    if (e.key === 'Enter') {
                      handleRemoveUser(user.id)
                    }
                  }}
                  onClick={() => handleRemoveUser(user.id)}
                >
                  <X class='text-muted-foreground hover:text-foreground h-3 w-3' />
                </button>
              </Badge>
            ))}
          </div>
          <Command class='rounded-lg border'>
            <CommandInput placeholder='Search people...' class='text-foreground' />
            <CommandList>
              <CommandEmpty>No people found.</CommandEmpty>
              <CommandGroup>
                {users.map((user) => (
                  <CommandItem
                    key={user.id}
                    value={user.id}
                    onSelect={() => handleSelectUser(user)}
                    class='flex items-center justify-between gap-2'
                  >
                    <div class='flex items-center gap-2'>
                      <img
                        src={user.profile || '/placeholder.svg'}
                        alt={user.fullName}
                        class='h-8 w-8 rounded-full'
                      />
                      <div class='flex flex-col'>
                        <span class='text-sm font-medium'>
                          {user.fullName}
                        </span>
                        <span class='text-muted-foreground text-xs'>
                          {user.username} aa
                        </span>
                      </div>
                    </div>

                    {selectedUsers.value.find((u: User) => u.id === user.id) && (
                      <Check class='h-4 w-4' />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
          <Button
            variant={'default'}
            onClick={() => showSubmittedData(selectedUsers.value)}
            disabled={selectedUsers.value.length === 0}
          >
            Chat
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
