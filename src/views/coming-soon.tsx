import { defineComponent } from 'vue';
import { Plane } from 'lucide-vue-next';

const ComingSoon = defineComponent({
  name: 'ComingSoon',
  setup() {
    return () => (
      <div class="h-full">
        <div class="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
          <Plane size={72} />
          <h1 class="text-4xl leading-tight font-bold">Coming Soon 👀</h1>
          <p class="text-muted-foreground text-center">
            This page has not been created yet. <br />
            Stay tuned though!
          </p>
          <a
            href="https://github.com/tuin77/shadcn-admin-vue"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-4 inline-block rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Visit GitHub Repository
          </a>
        </div>
      </div>
    );
  },
});

export default ComingSoon;
