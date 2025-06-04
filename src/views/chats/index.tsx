import { computed, defineComponent, ref } from "vue";
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { format } from 'date-fns'

import { NewChat } from './new-chat'

import { Check, Plus, ImagePlus, Send, MessagesSquare, SquarePen, Search, Paperclip, ArrowLeft, Video, Phone, EllipsisVertical } from 'lucide-vue-next'




import { type ChatUser, type Convo } from './data/chat-types'
import { conversations } from './data/convo.json'

export default defineComponent({
  name: "TsxDemo",
  setup(props) {

    const search = ref('')

    const selectedUser = ref<ChatUser | null>(null)
    const mobileSelectedUser = ref<ChatUser | null>(null)
    const currentMessage = ref()

    function setSelectedUser(val: ChatUser | null) {
      selectedUser.value = val
      currentMessage.value = selectedUser.value?.messages.reduce(
        (acc: Record<string, Convo[]>, obj) => {
          const key = format(obj.timestamp, 'd MMM, yyyy')

          // Create an array for the category if it doesn't exist
          if (!acc[key]) {
            acc[key] = []
          }

          // Push the current object to the array
          acc[key].push(obj)

          return acc
        },
        {}
      )
    }
    function setMobileSelectedUser(val: ChatUser | null) {
      mobileSelectedUser.value = val

    }

    // Filtered data based on the search query
    const filteredChatList = computed(() => conversations.filter(({ fullName }) =>
      fullName.toLowerCase().includes(search.value.trim().toLowerCase())
    ))




    const createConversationDialogOpened = ref(false)


    const users = conversations.map(({ messages, ...user }) => user)
    function setCreateConversationDialog(val: boolean) {

      createConversationDialogOpened.value = val
    }

    return () => (
      <div
        class={[
          'peer-[.header-fixed]/header:mt-16',
          'px-4 py-6',
          'fixed-main flex grow flex-col overflow-hidden',]
        }>
        <section class='flex h-full gap-6'>
          {/* Left Side */}
          <div class='flex w-full flex-col gap-2 sm:w-56 lg:w-72 2xl:w-80'>
            <div class='bg-background sticky top-0 z-10 -mx-4 px-4 pb-3 shadow-md sm:static sm:z-auto sm:mx-0 sm:p-0 sm:shadow-none'>
              <div class='flex items-center justify-between py-2'>
                <div class='flex gap-2'>
                  <h1 class='text-2xl font-bold'>Inbox</h1>
                  <MessagesSquare size={20} />
                </div>

                <Button
                  size='icon'
                  variant='ghost'
                  onClick={() => setCreateConversationDialog(true)}
                  class='rounded-lg'
                >
                  <SquarePen size={24} class='stroke-muted-foreground' />
                </Button>
              </div>

              <label class='border-input focus-within:ring-ring flex h-12 w-full items-center space-x-0 rounded-md border pl-2 focus-within:ring-1 focus-within:outline-hidden'>
                <Search size={15} class='mr-2 stroke-slate-500' />
                <span class='sr-only'>Search</span>
                <input
                  type='text'
                  class='w-full flex-1 bg-inherit text-sm focus-visible:outline-hidden'
                  placeholder='Search chat...'
                  value={search.value}
                  onChange={(e) => search.value = (e.target as HTMLInputElement).value}
                />
              </label>
            </div>
            <ScrollArea class='-mx-3 h-full p-3'>
              {filteredChatList.value.map((chatUsr: ChatUser) => {
                const { id, profile, username, messages, fullName } = chatUsr
                const lastConvo = messages[0]
                const lastMsg =
                  lastConvo.sender === 'You'
                    ? `You: ${lastConvo.message}`
                    : lastConvo.message
                return (
                  <>
                    <button
                      type='button'
                      key={id}
                      class={cn(
                        `hover:bg-secondary/75 -mx-1 flex w-full rounded-md px-2 py-2 text-left text-sm`,
                        selectedUser.value?.id === id && 'sm:bg-muted'
                      )}
                      onClick={() => {
                        setSelectedUser(chatUsr)
                        setMobileSelectedUser(chatUsr)
                      }}
                    >
                      <div class='flex gap-2'>
                        <Avatar>
                          <AvatarImage src={profile} alt={username} />
                          <AvatarFallback>{username}</AvatarFallback>
                        </Avatar>
                        <div>
                          <span class='col-start-2 row-span-2 font-medium'>
                            {fullName}
                          </span>
                          <span class='text-muted-foreground col-start-2 row-span-2 row-start-2 line-clamp-2 text-ellipsis'>
                            {lastMsg}
                          </span>
                        </div>
                      </div>
                    </button>
                    <Separator class='my-1' />
                  </>
                )
              })}
            </ScrollArea>
          </div>

          {/* Right Side */}
          {selectedUser.value ? (
            <div
              class={cn(
                'bg-primary-foreground absolute inset-0 left-full z-50 hidden w-full flex-1 flex-col rounded-md border shadow-xs transition-all duration-200 sm:static sm:z-auto sm:flex',
                mobileSelectedUser.value && 'left-0 flex'
              )}
            >
              {/* Top Part */}
              <div class='bg-secondary mb-1 flex flex-none justify-between rounded-t-md p-4 shadow-lg'>
                {/* Left */}
                <div class='flex gap-3'>
                  <Button
                    size='icon'
                    variant='ghost'
                    class='-ml-2 h-full sm:hidden'
                    onClick={() => setMobileSelectedUser(null)}
                  >
                    <ArrowLeft />
                  </Button>
                  <div class='flex items-center gap-2 lg:gap-4'>
                    <Avatar class='size-9 lg:size-11'>
                      <AvatarImage
                        src={selectedUser.value.profile}
                        alt={selectedUser.value.username}
                      />
                      <AvatarFallback>{selectedUser.value.username}</AvatarFallback>
                    </Avatar>
                    <div>
                      <span class='col-start-2 row-span-2 text-sm font-medium lg:text-base'>
                        {selectedUser.value.fullName}
                      </span>
                      <span class='text-muted-foreground col-start-2 row-span-2 row-start-2 line-clamp-1 block max-w-32 text-xs text-nowrap text-ellipsis lg:max-w-none lg:text-sm'>
                        {selectedUser.value.title}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right */}
                <div class='-mr-1 flex items-center gap-1 lg:gap-2'>
                  <Button
                    size='icon'
                    variant='ghost'
                    class='hidden size-8 rounded-full sm:inline-flex lg:size-10'
                  >
                    <Video size={22} class='stroke-muted-foreground' />
                  </Button>
                  <Button
                    size='icon'
                    variant='ghost'
                    class='hidden size-8 rounded-full sm:inline-flex lg:size-10'
                  >
                    <Phone size={22} class='stroke-muted-foreground' />
                  </Button>
                  <Button
                    size='icon'
                    variant='ghost'
                    class='h-10 rounded-md sm:h-8 sm:w-4 lg:h-10 lg:w-6'
                  >

                    <EllipsisVertical class='stroke-muted-foreground sm:size-5' />
                  </Button>
                </div>
              </div>

              {/* Conversation */}
              <div class='flex flex-1 flex-col gap-2 rounded-md px-4 pt-0 pb-4'>
                <div class='flex size-full flex-1'>
                  <div class='chat-text-container relative -mr-4 flex flex-1 flex-col overflow-y-hidden'>
                    <div class='chat-flex flex h-40 w-full grow flex-col-reverse justify-start gap-4 overflow-y-auto py-2 pr-4 pb-4'>
                      {currentMessage.value &&
                        Object.keys(currentMessage.value).map((key) => (
                          < >
                            {currentMessage.value[key].map((msg: Convo, index: number) => (
                              <div
                                key={`${msg.sender}-${msg.timestamp}-${index}`}
                                class={cn(
                                  'chat-box max-w-72 px-3 py-2 break-words shadow-lg',
                                  msg.sender === 'You'
                                    ? 'bg-primary/85 text-primary-foreground/75 self-end rounded-[16px_16px_0_16px]'
                                    : 'bg-secondary self-start rounded-[16px_16px_16px_0]'
                                )}
                              >
                                {msg.message}{' '}
                                <span
                                  class={cn(
                                    'text-muted-foreground mt-1 block text-xs font-light italic',
                                    msg.sender === 'You' && 'text-right'
                                  )}
                                >
                                  {format(msg.timestamp, 'h:mm a')}
                                </span>
                              </div>
                            ))}
                            <div class='text-center text-xs' key={key}>{key}</div>
                          </>
                        ))}
                    </div>
                  </div>
                </div>
                <form class='flex w-full flex-none gap-2'>
                  <div class='border-input focus-within:ring-ring flex flex-1 items-center gap-2 rounded-md border px-2 py-1 focus-within:ring-1 focus-within:outline-hidden lg:gap-4'>
                    <div class='space-x-1'>
                      <Button
                        size='icon'
                        type='button'
                        variant='ghost'
                        class='h-8 rounded-md'
                      >
                        <Plus
                          size={20}
                          class='stroke-muted-foreground'
                        />
                      </Button>
                      <Button
                        size='icon'
                        type='button'
                        variant='ghost'
                        class='hidden h-8 rounded-md lg:inline-flex'
                      >
                        <ImagePlus
                          size={20}
                          class='stroke-muted-foreground'
                        />
                      </Button>
                      <Button
                        size='icon'
                        type='button'
                        variant='ghost'
                        class='hidden h-8 rounded-md lg:inline-flex'
                      >
                        <Paperclip
                          size={20}
                          class='stroke-muted-foreground'
                        />
                      </Button>
                    </div>
                    <label class='flex-1'>
                      <span class='sr-only'>Chat Text Box</span>
                      <input
                        type='text'
                        placeholder='Type your messages...'
                        class='h-8 w-full bg-inherit focus-visible:outline-hidden'
                      />
                    </label>
                    <Button
                      variant='ghost'
                      size='icon'
                      class='hidden sm:inline-flex'
                    >
                      <Send size={20} />
                    </Button>
                  </div>
                  <Button class='h-full sm:hidden'>
                    <Send size={18} /> Send
                  </Button>
                </form>
              </div>
            </div>
          ) : (
            <div
              class={cn(
                'bg-primary-foreground absolute inset-0 left-full z-50 hidden w-full flex-1 flex-col justify-center rounded-md border shadow-xs transition-all duration-200 sm:static sm:z-auto sm:flex'
              )}
            >
              <div class='flex flex-col items-center space-y-6'>
                <div class='border-border flex size-16 items-center justify-center rounded-full border-2'>
                  <MessagesSquare class='size-8' />
                </div>
                <div class='space-y-2 text-center'>
                  <h1 class='text-xl font-semibold'>Your messages</h1>
                  <p class='text-muted-foreground text-sm'>
                    Send a message to start a chat.
                  </p>
                </div>
                <Button
                  class='bg-blue-500 px-6 text-white hover:bg-blue-600'
                  onClick={() => setCreateConversationDialog(true)}
                >
                  Send message
                </Button>
              </div>
            </div>
          )}
        </section>
        <NewChat
          users={users}
          onOpenChange={setCreateConversationDialog}
          open={createConversationDialogOpened.value}
        />
      </div >
    )
  },
});
