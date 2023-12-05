<script lang="ts">
  import { devtools } from "$lib/runes-devtools"

  let counter = $state(0)
  let double = $derived(counter * 2)
  let numbers = $derived({ counter, double })

  $inspect(counter, devtools("counter"))
  $inspect(double, devtools("double"))
  $inspect(numbers, devtools("numbers", { trace: true }))
</script>

<p>
  {counter}
</p>

<button on:click={() => counter++}>
  Increment
</button>